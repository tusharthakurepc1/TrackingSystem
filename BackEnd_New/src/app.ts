import cookieParser from 'cookie-parser';
import express from 'express';
import bodyParser from 'body-parser';

class App {
  public app: express.Application;
  public port: string | number;
  private routes: any;

  constructor(routes: any) {
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

    this.initializeRoutes(this.routes);
  }

  private initializeRoutes(routes: any) {
    routes.forEach((route: any) => {
      this.app.use('/', route.router);
    });
  }
}

export default App;
