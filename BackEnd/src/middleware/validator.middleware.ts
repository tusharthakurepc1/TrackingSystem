import { Request, Response, NextFunction } from "express";
import { z, ZodError, ZodTypeAny } from 'zod'

class Validation {
  public validate(schema: ZodTypeAny) {
    return (req:Request,res:Response,next:NextFunction) =>{
      const resp = schema.safeParse(req.body);
      console.log(resp)
      if(resp.success){
        next()
      }
      else{
        return res.status(200).json(resp.error)
      }
    } 
  }
}

export default Validation;