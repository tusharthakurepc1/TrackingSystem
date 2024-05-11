import App from './app';
import OrganizationRoute from './routes/organization.router';
import SystemUserRoute from './routes/systemuser.router';
import OrganizaionUserRoute from './routes/organizationuser.router';
import SendMailRoute from './routes/sendmail.router'
import WfhApplicationRoute from './routes/wfhapplication.router';

import getConnection from './database/connection.database';

getConnection()

const app = new App([
  new OrganizationRoute(), 
  new SystemUserRoute(),
  new OrganizaionUserRoute(),
  new SendMailRoute(),
  new WfhApplicationRoute()
]);

app.listen();
