import db from "../config/db.js";
import dayjs from "dayjs";

export async function votePost(req, res) {
    const { id } = req.params;
    const data = dayjs().format("YYYY-MM-DD HH:mm");

    try {
        const opção = await db.collection("opcoes").insertOne(
            {
                votoData: data,
                votoId: id,
            }
        );
        res.status(201).send("Voto cadastrado no banco de dados!");
    }
    catch {
        return res.status(400).send("Erro ao registrar a opção!");
    }


};