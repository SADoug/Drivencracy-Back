import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import chalk from "chalk";
dotenv.config();

let db = null;
const mongoClient = new MongoClient(process.env.MONGO_URL);
try {
    await mongoClient.connect()
    db = mongoClient.db(process.env.DATABASE);
    console.log(chalk.bold.green("Conexão estabelecida com o banco!"));
} catch (error) {
    console.log(chalk.bold.red("Não foi possível conectar-se ao banco!"), error)
}
export default db;