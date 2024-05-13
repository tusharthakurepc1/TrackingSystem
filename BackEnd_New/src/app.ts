import cookieParser from 'cookie-parser';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'
import Routes from './routes/routes';

class App {
  public app: express.Application;
  public port: string | number;
  private routes: [Routes];

  constructor(routes: [Routes]) {
    this.port = 5500;
    this.routes = routes;
    this.app = express();

    this.initializeMiddlewares();
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`=================================`);
      console.log(`======= ENV: Devlopment =======`);
      console.log(`🚀 App listening on the port ${this.port}`);
      console.log(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(cors())

    this.initializeRoutes(this.routes);
  }

  private initializeRoutes(routes: [Routes]) {
    routes.forEach((route: Routes) => {
      this.app.use('/', route.router);
    });
  }
}

export default App;