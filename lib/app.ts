import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";

let list: any[] = [
  {
  id: 0,
  name: "Brock",
  age: 28
  }
]

let id: number = 1;

class App {
  constructor() {
    this.app = express(); 
    this.config();
    this.routes();
  }

  public app: express.Application;
  
  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({extended: true}));
  } 
  
  private routes(): void {
    const router = express.Router();

    router.get('/', (_req: Request, res: Response) => {
      res.status(200).send({
        message: "It's a beautiful day!"
      });
    });

    router.get('/people', (_req: Request, res: Response) => {
      res.status(200).send({
        people: list
      });
    });

    router.post('/people', (req: Request, res: Response) => {
      let name: string = req.body.name; 
      let age: number = req.body.age;

      list.push({name, age, id});

      id++;

      res.status(200).send({
        people: list
      });
    });

    router.delete('/people/:id', (req: Request, res: Response) => {

      list = list.filter((person) => person.id !== Number(req.params.id));

      res.status(200).send({
        people: list
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