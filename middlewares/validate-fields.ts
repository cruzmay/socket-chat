import { NextFunction, Request, Response } from "express"
import  { validationResult } from "express-validator"

 export const validateFields = (req: Request, res: Response, next: NextFunction) => {
    const error = validationResult(req)
    if (!error.isEmpty()) {
      console.log(error)
      return res.status(401).json(error)   
    }
    next()
}
