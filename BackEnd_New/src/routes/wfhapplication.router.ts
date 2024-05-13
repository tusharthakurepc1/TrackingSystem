import WfhApplicationController from "../controller/wfhapplication.controller"
import Authorization from "../middleware/authorization.middleware"
import { Router } from "express"


class WfhApplicationRoute {
  public path = '/application-status'
  public wfhApplicationController = new WfhApplicationController()
  public router = Router()

  private authorizationMiddleware = new Authorization();

  constructor(){
    this.initilizeApplicationRoute();
  }

  private initilizeApplicationRoute = async () => {
    this.router.post(`${this.path}`, this.authorizationMiddleware.verfiyToken, this.wfhApplicationController.insertApplication);
    this.router.post(`${this.path}/all`, this.wfhApplicationController.getAllApplication);
    this.router.put(`${this.path}/leave`, this.wfhApplicationController.updateApplicationStatus)
  }

}

export default WfhApplicationRoute;
