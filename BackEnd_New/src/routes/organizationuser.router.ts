import { Router } from 'express'
import OrganizationUserController from '../controller/organizationuser.controller'
import Authorization from '../middleware/authorization.middleware'

class OrganizaionUserRoute {
  public path = '/user'
  public router = Router()
  public organizationUserController = new OrganizationUserController()

  public authorizationMiddleware = new Authorization();

  constructor () {
    this.initilizeOrganizationUserRoute();
  }

  private initilizeOrganizationUserRoute () {
    this.router.get(`${this.path}/:email`, this.organizationUserController.getOrganizationUser);

    this.router.post(`${this.path}/dashboard`, this.authorizationMiddleware.verfiyToken, this.organizationUserController.getOrganizationUser);
    this.router.post(`${this.path}`, this.organizationUserController.addOrganizationUser);

    this.router.post(`${this.path}/delete`, this.organizationUserController.deleteOrganizationUser);

    this.router.put(`${this.path}`, this.organizationUserController.updateOrganizationUser);
  }

}

export default OrganizaionUserRoute