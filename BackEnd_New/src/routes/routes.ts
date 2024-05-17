import Router from 'express'
import OrganizationController from '../controller/organization.controller'
import OrganizationUserController from '../controller/organizationuser.controller'
import Authorization from '../middleware/authorization.middleware'
import SendMailController from '../controller/sendmail.controller';
import SystemUserController from '../controller/systemuser.controller'
import WfhApplicationController from "../controller/wfhapplication.controller"

class Routes {
  public orgController = new OrganizationController()  
  public organizationUserController = new OrganizationUserController()
  public sendMailController = new SendMailController()
  public systemUserController = new SystemUserController()
  public wfhApplicationController = new WfhApplicationController()
  

  public authorizationMiddleware = new Authorization();
  public router = Router()


  
  constructor(){
    this.initilizeOrganizationRoute('/organization');
    this.initilizeOrganizationUserRoute('/user');
    this.sendMailRoutes('/mail')
    this.initilizeSystemUserRoute('/sysuser')
    this.initilizeApplicationRoute('/application-status');
  }

  private initilizeOrganizationRoute(prefix: string){
    this.router.get(`${prefix}:orgName`, this.orgController.getOrganization);
    this.router.get(`${prefix}/all`, this.orgController.getAllOrganizationName);

    this.router.post(`${prefix}`, this.orgController.addOrganization);

    this.router.put(`${prefix}`, this.orgController.addOrganizationEmail);
    this.router.put(`${prefix}/admin`, this.orgController.makeOrganizationAdmin)
  }

  private initilizeOrganizationUserRoute (prefix: string) {
    this.router.get(`${prefix}/:email`, this.organizationUserController.getOrganizationUser);
    this.router.get(`${prefix}/isAdmin/:orgName/:email`, this.orgController.isAdminOfOrganization);

    this.router.post(`${prefix}`, this.organizationUserController.addOrganizationUser);
    this.router.post(`${prefix}/login`, this.organizationUserController.getOrganizationUserCred);
    this.router.post(`${prefix}/dashboard`, this.authorizationMiddleware.verfiyToken, this.organizationUserController.getOrganizationUserAuth);
    this.router.post(`${prefix}/delete`, this.organizationUserController.deleteOrganizationUser);

    this.router.put(`${prefix}/update`, this.organizationUserController.updateOrganizationUser);
  }

  private sendMailRoutes(prefix: string) {
    this.router.get(`${prefix}/:email`, this.sendMailController.sendOtp);
  } 

  private initilizeSystemUserRoute = (prefix: string) => {
    this.router.get(`${prefix}/:email`, this.systemUserController.getSystemUser);
    this.router.get(`${prefix}`, this.systemUserController.getUserWithOffset);

    this.router.post(`${prefix}/login`, this.systemUserController.getSystemUserCred);
    this.router.post(`${prefix}/dashboard`, this.authorizationMiddleware.verfiyToken, this.systemUserController.getSystemUserAuth);
    this.router.post(`${prefix}/signup`, this.systemUserController.addSystemUser);

    this.router.put(`${prefix}/update`, this.systemUserController.updateSystemUser);

    this.router.delete(`${prefix}/:email`, this.systemUserController.deleteSystemUser);
  }


  private initilizeApplicationRoute = async (prefix: string) => {
    // this.router.get(`${prefix}/:email`, this.wfhApplicationController.getUserApplications);      //currently pause for below api
    this.router.get(`${prefix}/:orgName/:email`, this.wfhApplicationController.getUserCompanyApplicationController);
    this.router.get(`${prefix}/:orgName/:page/:pageSize`, this.wfhApplicationController.getCompanyApplicationController)
    this.router.get(`${prefix}/:orgName/:email/:page/:pageSize`, this.wfhApplicationController.getUserCompanyApplicationOffsetController);

    this.router.post(`${prefix}`, this.authorizationMiddleware.verfiyToken, this.wfhApplicationController.insertApplication);
    this.router.post(`${prefix}/all`, this.wfhApplicationController.getAllApplication);
    this.router.post(`${prefix}/fetch`, this.wfhApplicationController.getAllApplicationFetch);
    this.router.post(`${prefix}/applications`, this.wfhApplicationController.getAllApplicationUser);

    this.router.put(`${prefix}/leave`, this.wfhApplicationController.updateApplicationStatus)
  }
  
}

export default Routes