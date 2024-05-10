import Router from 'express'
import OrganizationController from '../controller/organization.controller'

class OrganizationRoute {
  public path = '/organization'
  public router = Router()
  public orgController = new OrganizationController()

  constructor(){
    this.initilizeOrganizationRoute();
  }

  private initilizeOrganizationRoute(){
    this.router.get(`${this.path}:orgName`, this.orgController.getOrganization);
    this.router.post(`${this.path}`, this.orgController.addOrganization);
    this.router.put(`${this.path}`, this.orgController.addOrganizationEmail);
  }
  
}

export default OrganizationRoute