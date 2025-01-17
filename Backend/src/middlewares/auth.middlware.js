import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken'

const checkJWT = asyncHandler(async(req, res, next)=>{    
    const token = req.header("Authorization")?.replace("Bearer ", "")
    if(!token){
        throw new ApiError(401, "Unauthorized request")
    }
    let decodedToken
    try{
        decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    }catch(err){
        throw new ApiError(403, "ACCESS_TOKEN_EXPIRED")
    }

    const user = await User.findById(decodedToken?._id);
    if(!user){
        throw new ApiError(403, "Invalid Access Token")
    }

    req.user = user;
    next()
})

export {checkJWT}