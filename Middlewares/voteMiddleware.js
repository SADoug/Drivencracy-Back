
export default async function pollPostmiddleware(req, res, next) {
    const votoid = await db.collection("opcoes").findOne({ _id: `${id}` });
    if (!votoid) {
        return res.status(422).send("Opção de voto não encontrada!");
    }
    next();
}
