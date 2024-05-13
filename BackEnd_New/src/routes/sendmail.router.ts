import { Router } from 'express'
import SendMailController from '../controller/sendmail.controller';

class SendMailRoute {
  public path = '/mail';
  public sendMailController = new SendMailController()
  public router = Router()


  constructor() {
    this.sendMailRoutes()
  }

  private sendMailRoutes() {
    this.router.get(`${this.path}/:email`, this.sendMailController.sendOtp);
  }  
  

}

export default SendMailRoute;