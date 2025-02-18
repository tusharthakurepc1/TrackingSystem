import Router from 'express'
import OrganizationController from '../controller/organization.controller'
import OrganizationUserController from '../controller/organizationuser.controller'
import Authorization from '../middleware/authorization.middleware'
import SendMailController from '../controller/sendmail.controller';
import SystemUserController from '../controller/systemuser.controller'
import WfhApplicationController from "../controller/wfhapplication.controller"
import Validation from '../middleware/validator.middleware';

import {OrganizationValidationSchema} from '../validator/organization.validation'
import {OrganizationUserValidationSchema, OrganizationUserUpdateValidationSchema} from '../validator/organizationuser.validation'
import {SystemUserValidationSchema} from '../validator/systemuser.validation'

class Routes {
  public orgController = new OrganizationController()  
  public organizationUserController = new OrganizationUserController()
  public sendMailController = new SendMailController()
  public systemUserController = new SystemUserController()
  public wfhApplicationController = new WfhApplicationController()


  public authorizationMiddleware = new Authorization();
  public validation = new Validation();
  public router = Router()


  
  constructor(){
    this.initilizeOrganizationRoute('/organization');
    this.initilizeOrganizationUserRoute('/user');
    this.sendMailRoutes('/mail')
    this.initilizeSystemUserRoute('/sysuser')
    this.initilizeApplicationRoute('/application-status');
  }

  private initilizeOrganizationRoute(prefix: string){
    this.router.get(`${prefix}/:orgName`, this.orgController.getOrganization);
    this.router.get(`${prefix}/data/list`, this.orgController.getAllOrganization);
    this.router.get(`${prefix}/data/all`, this.orgController.getAllOrganizationName);

    this.router.post(`${prefix}`, this.validation.validate(OrganizationValidationSchema), this.orgController.addOrganization);

    this.router.put(`${prefix}`, this.orgController.addOrganizationEmail);
    this.router.put(`${prefix}/admin`, this.orgController.makeOrganizationAdmin);
    // this.router.put(`${prefix}/admin`, this.orgController.makeOrganizationAdmin);
    this.router.put(`${prefix}/remove`, this.orgController.removeOrganization);
  }

  private initilizeOrganizationUserRoute (prefix: string) {
    // this.router.get(`${prefix}/:email`, this.organizationUserController.getOrganizationUser);
    this.router.get(`${prefix}/isAdmin/:orgName/:email`, this.orgController.isAdminOfOrganization);

    this.router.post(`${prefix}`, this.validation.validate(OrganizationUserValidationSchema), this.organizationUserController.addOrganizationUser);
    this.router.post(`${prefix}/login`, this.organizationUserController.getOrganizationUserCred);
    this.router.post(`${prefix}/dashboard`, this.authorizationMiddleware.verfiyToken, this.organizationUserController.getOrganizationUserAuth);
    this.router.post(`${prefix}/delete`, this.organizationUserController.deleteOrganizationUser);

    this.router.put(`${prefix}/update`, this.validation.validate(OrganizationUserUpdateValidationSchema), this.organizationUserController.updateOrganizationUser);
    this.router.put(`${prefix}/details/update`, this.validation.validate(OrganizationUserUpdateValidationSchema), this.organizationUserController.updateOrganizationUserOrg);
  }

  private sendMailRoutes(prefix: string) {
    this.router.get(`${prefix}/:email`, this.sendMailController.sendOtp);
  } 

  private initilizeSystemUserRoute = (prefix: string) => {
    this.router.get(`${prefix}`, this.systemUserController.getUserWithOffset);

    this.router.post(`${prefix}/login`, this.systemUserController.getSystemUserCred);
    this.router.post(`${prefix}/dashboard`, this.authorizationMiddleware.verfiyToken, this.systemUserController.getSystemUserAuth);
    this.router.post(`${prefix}/signup`, this.validation.validate(SystemUserValidationSchema), this.systemUserController.addSystemUser);

    this.router.put(`${prefix}/update`, this.systemUserController.updateSystemUser);
  }

  private initilizeApplicationRoute = async (prefix: string) => {
    // this.router.get(`${prefix}/:email`, this.wfhApplicationController.getUserApplications);      //currently pause for below api
    this.router.get(`${prefix}/:orgName/:email`, this.wfhApplicationController.getUserCompanyApplicationController);
    this.router.get(`${prefix}/:orgName/filter/application`, this.wfhApplicationController.getCompanyApplicationFilterController)
    // this.router.get(`${prefix}/:orgName/:page/:pageSize`, this.wfhApplicationController.getCompanyApplicationController)
    this.router.get(`${prefix}/:orgName/:page/:pageSize/filter`, this.wfhApplicationController.getCompanyApplicationFilterController)
    this.router.get(`${prefix}/:orgName/:email/:page/:pageSize`, this.wfhApplicationController.getUserCompanyApplicationOffsetController);

    this.router.post(`${prefix}`, this.authorizationMiddleware.verfiyToken, this.wfhApplicationController.insertApplication);
    this.router.post(`${prefix}/all`, this.wfhApplicationController.getAllApplication);
    this.router.post(`${prefix}/fetch`, this.wfhApplicationController.getAllApplicationFetch);
    this.router.post(`${prefix}/applications`, this.wfhApplicationController.getAllApplicationUser);

    this.router.put(`${prefix}/leave`, this.wfhApplicationController.updateApplicationStatus)
  }
  
}

export default Routes