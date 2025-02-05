import {Router} from 'express';
const healthRouter = Router();
import { ApiResponse } from '../utils/ApiResponse.js';

healthRouter.get('/',(req,res)=>{
    res.status(200).json(new ApiResponse(200,{},'Health check passed'))
})

export default healthRouter;