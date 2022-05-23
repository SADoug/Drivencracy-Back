import db from "../config/db.js";
import { ObjectId } from "mongodb";

export default async function votePostmiddleware(req, res, next) {
    
    try {
        const enqueteId = await db.collection("enquetes").findOne({ _id: new ObjectId(poolId) });
        if (!enqueteId) {
            return res.status(404).send("enquete não encontrada!");
        }
        const escolhaId = await db.collection("opcoes").find({
            $and: [{ "title": title },
            { "poolId": poolId }]}).toArray();

            if (escolhaId.length >= 1) {
                return res.status(403).send("Opção de voto já existe!");
            }
    } catch {}

    next();
}
