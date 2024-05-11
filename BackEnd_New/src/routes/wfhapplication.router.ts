import WfhApplicationController from "../controller/wfhapplication.controller"
import Authorization from "../middleware/authorization.middleware"
import { Router } from "express"


class WfhApplicationRoute {
  public path = '/application-status'
  public router = Router()
  public wfhApplicationController = new WfhApplicationController()

  private authorizationMiddleware = new Authorization();

  constructor(){
    this.initilizeApplicationRoute();
  }

  private initilizeApplicationRoute = async () => {
    this.router.post(`${this.path}`, this.authorizationMiddleware.verfiyToken, this.wfhApplicationController.insertApplication);

    this.router.put(`${this.path}`, this.wfhApplicationController.updateApplicationStatus)
  }

}

export default WfhApplicationRoute;
