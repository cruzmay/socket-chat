import { NextFunction, Response } from "express";
import { RequestInterface } from "../interfaces/RequestInterface";
import { UserRoleEnum } from "../interfaces";

export const validateRole = (req: RequestInterface<{}>, res: Response, next: NextFunction) => {

    if(!req.user) {
        return res.status(500).json({msg: "Not validated yet"})
    }

    if( req.user?.role !== UserRoleEnum.admin) {
        return res.status(401).json({msg: `${req.user?.name} is not ADMIN`})
    }
    next()
}

export const hasRole = (...rest: UserRoleEnum[]) => {

    return (req: RequestInterface<{}>, res: Response, next: NextFunction) => {

        if(req.user) {
            const userRole = req.user?.role as UserRoleEnum
                if(!rest.includes(userRole)) {
                    return res.status(401).json({ msg: `should have some of the roles: ${rest}`})
            }
        } else {
            return res.status(500).json({msg: "Not validated yet"}) 
        }
        next()
    }

}