import App from './app';
import Routes from './routes/routes'

import getConnection from './database/connection.database';
getConnection()

const app = new App([
  new Routes()
]);

app.listen();
