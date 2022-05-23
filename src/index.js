import express, { json } from "express";
import dotenv from "dotenv";
import chalk from "chalk";
import cors from "cors";
import pollRouter from "../Routers/pollRouter.js";
import choiceRouter from "../Routers/choiceRouters.js";
import voteRouter from "../Routers/voteRouter.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(json());

app.use(pollRouter);
app.use(choiceRouter);
app.use(voteRouter);

app.listen(process.env.PORT, () =>
    console.log(chalk.bold.green(`Servidor online na porta: ${process.env.PORT}!`))
);

