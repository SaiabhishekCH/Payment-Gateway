import { JWT_SECRET } from "./config";
import { Response } from "express"; 
import { NextFunction } from "express";
import { Request } from "express";
import jwt from "jsonwebtoken";

interface reqI extends Request{
    user ? : {username : string};
}

export function AuthMiddleWare( req:reqI , res:Response , next:NextFunction ){
    //@ts-ignore
    const token = req.headers["authorization"];

    if( !token ){
        res.json({
            message : "Please send token"
        })
        return;
    }

    try{
        const decoded : any = jwt.verify(token , JWT_SECRET);
        req.user = decoded;
        next();
    }catch(e){
        res.json({
            message : "invalid user"
        })
        return;
    }
}