import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const extractJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token)
    return next();

  jwt.verify(token, process.env.TOKEN_SECRET, async (error, decoded) => {
    if (error)
      return res.status(401).json({
        message: error.message,
        error
      })

    
    req.res.locals.user = decoded;
    return next();
  })

}


export default extractJWT;
