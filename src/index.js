import express, {json} from "express";
import {MongoClient} from "mongodb";
import dotenv from "dotenv";
import chalk from "chalk";
import cors from "cors";
import authRouter from "../routers/authRouter.js";


// Server configurations
dotenv.config();
const app = express();
app.use(cors());
app.use(json());

app.use(authRouter)


app.listen(process.env.PORT, () => 
    console.log(chalk.bold.green(`Server online on port ${process.env.PORT}!`))
);