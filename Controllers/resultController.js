import db from "../config/db.js";


export async function resultpost(req, res) {
    let id = req.params.id;
    console.log(id)
    try {
        const enquetes = await db.collection("opcoes").find({ poolId: `${id}` }).toArray();
        res.send(enquetes);

    } catch (e) {
        console.log(e);
        return res.status(404).send("Erro ao obter as enquetes!");
    }
};