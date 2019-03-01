"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
class App {
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }
    config() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
    routes() {
        const router = express.Router();
        router.get('/', (_req, res) => {
            res.status(200).send({
                message: "It's a beautiful day!"
            });
        });
        router.post('/', (req, res) => {
            const data = req.body;
            if (data) {
                res.status(200).json(data);
            }
            else {
                res.status(404).json({ error: "Request failed." });
            }
        });
        this.app.use('/', router);
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map