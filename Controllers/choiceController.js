import db from "../config/db.js";
import chalk from "chalk";

export async function choicepost(req, res) {
    const { title, poolId } = req.body;
    const opcao = req.body;

    try {
        if (tituloRepetido) { res.sendStatus(409) };
        const enquetes = await db.collection("enquetes").findOne({ id: new ObjectId(poolId) });
        if (enquetes.expireAt) {
            const expirou = dayjs().isBefore(enquetes.expireAt)
            if (expirou) {
                return res.send("Enquete aberta!");
            } else {
                return res.status(403).send("Enquete expirada!");
            }
        }
        await db.collection("opcoes").insertOne({ title, poolId });
        console.log(chalk.green.bold("Opção cadastrada no banco de dados!"));
        res.status(201).send(opcao);
    }

    catch (e) {
        return res.status(400).send("Erro ao registrar a opção!", e);
    }

};

export async function choiceget(req, res) {

    let id = req.params.id;
    console.log(id)
    try {
        const enquetes = await db.collection("opcoes").find({ poolId: `${id}` }).toArray();
        res.send(enquetes);

    } catch (e) {
        console.log(e);
        return res.status(404).send("Erro ao obter as enquetes!");
    }
}