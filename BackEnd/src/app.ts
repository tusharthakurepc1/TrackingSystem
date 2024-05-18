import cookieParser from 'cookie-parser';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'
import Routes from './routes/routes';
import { Server } from 'socket.io';

class App {
  public app: express.Application;
  private io: Server;
  public port: string | number;
  private routes: [Routes];

  constructor(routes: [Routes]) {
    this.port = 5500;
    this.routes = routes;
    this.app = express();

    this.initializeMiddlewares();
  }

  public listen() {
    const server = this.app.listen(this.port, () => {
      console.log(`=================================`);
      console.log(`======= ENV: Devlopment =======`);
      console.log(`🚀 App listening on the port ${this.port}`);
      console.log(`=================================`);
    });

    this.io = new Server(server, {
      cors: {
        origin: "http://localhost:5173"
      }
    })

    this.io.listen(4000)
  }

  public getServer() {
    return this.app;
  }

  public getSocket() {
    return this.io;
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
