import express from "express";
import log from "../config/logger";
import routes from "./routes";
import cors from 'cors';

const { port } = require('../config/index');
const { host } = require('../config/index');

const app = express();
app.use(cors({origin: '*'}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', routes);
app.use('/storage', express.static('storage'))
app.listen(port, host, () => {
    log.info(`Server listing at http://${host}:${port}`);
});