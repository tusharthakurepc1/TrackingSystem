import App from './app';
import OrganizationRoute from './routes/organization.router';
import SystemUserRoute from './routes/systemuser.router';

import getConnection from './database/connection.database';

getConnection()

const app = new App([
  new OrganizationRoute(), 
  new SystemUserRoute()
]);

app.listen();
