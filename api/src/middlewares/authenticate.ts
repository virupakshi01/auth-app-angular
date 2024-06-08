import { NextFunction, Request, Response } from "express";
import config from "../config/config";
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request{
    userId:string;
}

const authenticate = (req:Request,res:Response,next:NextFunction)=>{
    const token = req.header('Authorization');

    if(!token){
        return res.status(401).json({message:"Authorization token is required"});
    }

    try {
        const parsedtext = token.split(" ")[1];
        const decoded = jwt.verify(parsedtext,config.jwtSecret as string);4
        const _request = req as AuthRequest;
        _request.userId = decoded.sub as string;
        return next();
    } catch (error) {
        return res.status(401).json({message:"Unauthorization"});
    }
}

export default authenticate;