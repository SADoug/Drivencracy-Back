import express, { json } from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import chalk from "chalk";
import cors from "cors";
import joi from "joi";
import expireAt from "expireat"

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
    console.log(chalk.bold.green("Connected to database!"));
} catch (error) {
    console.log(chalk.bold.red("Could't connet to database!"), error)
}

//ROTA POLL

app.post("/postpoll", async (req, res) => {
    const enquete = req.body;
    const enqueteSchema = joi.object({
        title: joi.string().min(1).required(),
        expireAt: joi.any().required(),       //Perguntar a vivi como montar a
    });


    const { error } = enqueteSchema.validate(enquete, { abortEarly: false });
    if (error) return res.status(406).send(error.details.map(detail => detail.message));
    try {
        await db.collection("enquetes").insertOne({ title: enquete.title, expireAt: enquete.expireAt });
        console.log(chalk.green.bold("cliente cadastrado no banco de dados"));
        res.sendStatus(201);
    }

    catch (e) {
        return res.status(400).send("Erro ao registrar o usuário!", e);
    }

});

app.get("/postpoll", async (req, res) => {
    try {
        const enquetes = await db.collection("enquetes").find().toArray();
        res.send(enquetes);
    } catch (e) {
        console.log(e);
        return res.status(500).send("Erro ao obter as enquetes!", e);
    }
});

//ROTA CHOICE

app.post("/choice", async (req, res) => {
    const opcao = req.body;
    const opcaoSchema = joi.object({
        title: joi.string().min(1).required(),
        poolId: joi.any().required(),
    });
    const titulo = opcao.titulo;
    if (titulo.length < 1) { res.sendStatus(409) };
    const tituloRepetido = await db.collection("opcoes").findOne({ title: opcao.title }).toArray();
    if (tituloRepetido) { res.sendStatus(409) };
    const { error } = opcaoSchema.validate(opcao, { abortEarly: false });
    if (error) return res.status(406).send(error.details.map(detail => detail.message));
    try {
        await db.collection("opcoes").insertOne({ title: opcao.title, poolId: opcao.poolId });
        console.log(chalk.green.bold("opção cadastrada no banco de dados"));
        res.status(201).send(opcao);
    }

    catch (e) {
        return res.status(400).send("Erro ao registrar a opção!", e);
    }

});

app.get("/poll/:id/choice", async (req, res) => {
    let id = req.params.id;
    console.log(id)
    try {
        const enquetes = await db.collection("opcoes").find({ poolId: `${id}` }).toArray();
        res.send(enquetes);

    } catch (e) {
        console.log(e);
        return res.status(404).send("Erro ao obter as enquetes!");
    }
});

//ROTA RESULTADO

app.post("/choice/:id/vote", async (req, res) => {
    let id = req.params.id;

    try {
        await db.collection("opcoes").insertOne({ title: opcao.title, poolId: opcao.poolId }); //Fazer um find buscando o objeto pelo id
        console.log(chalk.green.bold("opção cadastrada no banco de dados"));                   //manipular o numero de votos e substituir o obj no banco
        res.sendStatus(201);
    }

    catch (e) {
        return res.status(400).send("Erro ao registrar a opção!", e);
    }

});
app.listen(process.env.PORT, () =>
    console.log(chalk.bold.green(`Server online on port ${process.env.PORT}!`))
);