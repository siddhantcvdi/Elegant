import User from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

const registerUser = asyncHandler(async (req, res) => {
  console.log(req.body);

  const { displayName, email, password } = req.body;
  if (
    !displayName ||
    !email ||
    !password ||
    displayName === "" ||
    email === "" ||
    password === ""
  ) {
    throw new ApiError(400, "Please enter all details.");
  }
  const existedUser = await User.findOne({ email });
  if (existedUser) {
    throw new ApiError(403, "This user already exists.");
  }
  const user = await User.create({ displayName, email, password });

  const createdUser = await User.findById(user._id).select("-password");

  res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User Created Successfully."));
  console.log(user);
});

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (err) {
    throw new ApiError(500, "Something went wrong");
  }
};

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password || email === "" || password === "") {
    throw new ApiError(400, "Enter all details.");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "User not found.");
  }
  const isPassValid = await user.checkPassword(password);
  if (!isPassValid) {
    throw new ApiError(401, "Invalid Credentials.");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  const options = {
    path: "/",
    httpOnly: true,
    sameSite: "None",
    secure: "true",
  };
  res.status(201)
  .cookie("refreshToken", refreshToken, options)
  .cookie("accessToken",accessToken, options)
  .json(
    new ApiResponse(
      201,
      {
        loggedInUser,
      },
      "User logged in."
    )
  );
});

const logoutUser = asyncHandler(async (req, res) => {
  const user = req.user;
  const loggedInUser = await User.findById(user._id);
  loggedInUser.refreshToken = "";
  loggedInUser.save({ validateBeforeSave: false });
  res
    .status(200)
    .clearCookie("refreshToken", {
      path: "/",
      httpOnly: true,
      sameSite: "None",
      secure: true,
    })
    .json(new ApiResponse(200, "User logged out"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const oldrefreshToken = req.cookies.refreshToken;
  if (!oldrefreshToken) {
    throw new ApiError(401, "Unauthorized Request");
  }
  try {
    const decodedToken = jwt.verify(
      oldrefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    const user = await User.findById(decodedToken?._id);
    if (!user) {
      throw new ApiError(401, "Invalid Refresh Token");
    }
    if (oldrefreshToken !== user?.refreshToken)
      throw new ApiError(401, "Refresh token expired");

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      user._id
    );
    const options = {
      path: "/",
      httpOnly: true,
      sameSite: "None",
      secure: "true",
    };
    return res
      .status(200)
      .cookie("refreshToken", refreshToken, options)
      .cookie("accessToken", accessToken, options)
      .json(new ApiResponse(200, {loggedInUser:user }, "Access Token Refreshed"));
  } catch (err) {
    throw new ApiError(401, err?.message || "Invalid Refresh Token");
  }
});

export { registerUser, loginUser, logoutUser, refreshAccessToken };
