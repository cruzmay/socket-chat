import { NextFunction, Response } from "express";
import { JwtPayload, verify } from "jsonwebtoken";
import { User } from "../models/User";
import { RequestInterface } from "../interfaces/RequestInterface";

export const validateJWT = async (req: RequestInterface<{}> , res: Response, next: NextFunction) => {
    const token = req.header("x-token")

    if(!token){
        res.status(401).json({
            msg: "no token is set"
        })
    }

    try {
        if(token && process.env.SECRET) {
           const { uid } : JwtPayload["uid"] = verify(token, process.env.SECRET)
           req.uid = uid
           const user = await User.findById(uid)
           if(user) {
             req.user = user
           } else {
            return res.status(401).json({msg: "not valid token"})
           }

           if (!user.active) {
            return res.status(401).json({msg: "user not active"})
           }

        }
        next()
    } catch (error) {
        res.status(401).json({
            msg: "No valid token"
        })
    }



}