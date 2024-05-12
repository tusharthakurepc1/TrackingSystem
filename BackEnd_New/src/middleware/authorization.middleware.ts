import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'
import SECRET_KEY from '../constants/common'
import { AuthUser } from '../typings/common';
import { ExtendedRequest } from '../typings/type'

class Authorization {
  public verfiyToken = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    const tokenString = req.headers['authorization']
    const token = tokenString.split(" ")[1];
    
    
    await jwt.verify(token, SECRET_KEY, (err: Error, decodedToken: AuthUser)=> {
      if(err){
        return res.status(400).json({
          data: {
            msg: "Invalid Token"
          },
          status: 400
        });
      }
      
      req.user = decodedToken
      
      next();

    });
  }

}

export default Authorization;


