import db from "../config/db.js";

export async function resultpost(req, res) {
    let id = req.params.id;
    console.log(id)
    try {
        const enquetes = await db.collection("opcoes").find({ poolId: `${id}` }).toArray();
        for (let i = 0; i < enquetes.length; i++) {
            let resultado;
            for (let j = 1; j < enquetes.length; j++) {
                if (enquetes[i].votes > enquetes[j].votes) {
                    resultado = enquetes[i].title;
                }
            }
        }
        res.send(resultado);
    } catch {
        return res.send("Erro ao obter o resultado das enquetes!");
    }
};

