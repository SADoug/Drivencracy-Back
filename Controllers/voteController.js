import db from "../config/db.js";
import chalk from "chalk";

export async function choicepost(req, res) {
    let id = req.params.id;
    try {
        const opção = await db.collection("opcoes").updateOne(
            { id: `${id}` },
            { $inc: { vote: 1 } }
        ); 
        console.log(chalk.green.bold("Voto cadastrado no banco de dados!"));                 
        res.sendStatus(201);
    }

    catch (e) {
        return res.status(400).send("Erro ao registrar a opção!", e);
    }


};