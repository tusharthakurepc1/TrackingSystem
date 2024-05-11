import { Router } from 'express'
import SendMailController from '../controller/sendmail.controller';

class SendMailRoute {
  public path = '/mail';
  public router = Router()
  public sendMailController = new SendMailController()


  constructor() {
    this.sendMailRoutes()
  }

  private sendMailRoutes() {
    this.router.get(`${this.path}/:email`, this.sendMailController.sendOtp);
  }  
  

}

export default SendMailRoute;