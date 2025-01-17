import connectDB from "./db/index.js";
import {app} from "./app.js";
import dotenv from "dotenv";

dotenv.config({
    path: './.env'
})

connectDB()
.then(()=>{
    app.listen(
        process.env.PORT,
        ()=>{
            console.log("Server Running", process.env.PORT)
        }
    )
})
.catch((err)=>{
    console.log('Failed to start the server!!!',err )
})