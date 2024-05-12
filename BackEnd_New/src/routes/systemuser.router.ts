import { Router } from 'express'
import SystemUserController from '../controller/systemuser.controller'
import Authorization from '../middleware/authorization.middleware'

class SystemUserRoute {
  public path = '/sysuser'
  public router = Router()
  public systemUserController = new SystemUserController()

  public authorizationMiddleware = new Authorization();

  constructor () {
    this.initilizeSystemUserRoute();
  }

  private initilizeSystemUserRoute = () => {
    this.router.get(`${this.path}/:email`, this.systemUserController.getSystemUser);
    
    this.router.post(`${this.path}/login`, this.systemUserController.getSystemUserCred);
    this.router.post(`${this.path}/dashboard`, this.authorizationMiddleware.verfiyToken, this.systemUserController.getSystemUserAuth);

    this.router.post(`${this.path}/signup`, this.systemUserController.addSystemUser);

    this.router.delete(`${this.path}/:email`, this.systemUserController.deleteSystemUser);

    this.router.put(`${this.path}`, this.systemUserController.updateSystemUser);
  }

}

export default SystemUserRoute