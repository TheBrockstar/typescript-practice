import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";

class App {
  constructor() {
    this.app = express(); 
    this.config();
    this.routes();
  }

  public app: express.Application;
  
  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({extended: false}));
  } 
  
  private routes(): void {
    const router = express.Router();

    router.get('/', (_req: Request, res: Response) => {
      res.status(200).send({
        message: "It's a beautiful day!"
      });
    });
  
    router.post('/', (req: Request, res: Response) => {
      const data = req.body;
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json({error: "Request failed."});
      }
    });

    this.app.use('/', router);
  }

}

export default new App().app;