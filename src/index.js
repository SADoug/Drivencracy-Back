import express, { json } from "express";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
import chalk from "chalk";
import cors from "cors";
import pollRouter from "../Routers/pollRouter.js";
import choiceRouter from "../Routers/choiceRouters.js";
import voteRouter from "../Routers/voteRouter.js";


// Server configurations
dotenv.config();
const app = express();
app.use(cors());
app.use(json());

let db = null;
const mongoClient = new MongoClient(process.env.MONGO_URL);
try {
    await mongoClient.connect()
    db = mongoClient.db(process.env.DATABASE);
    console.log(chalk.bold.green("Conexão estabelecida com o banco!"));
} catch (error) {
    console.log(chalk.bold.red("Não foi possível conectar-se ao banco!"), error)
}

app.use(pollRouter);
app.use(choiceRouter);
app.use(voteRouter);




app.listen(process.env.PORT, () =>
    console.log(chalk.bold.green(`Servidor online na porta: ${process.env.PORT}!`))
);

