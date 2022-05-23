import dayjs from "dayjs";

export default async function pollPostmiddleware(req, res, next) {
    const { expireEm } = req.body;

    if (!expireEm) {
        const dataExpira = dayjs().add(30, "day").format("YYYY-MM-DD HH:mm").toString()
        expireEm = dataExpira;
    }
    if (!title) {
        return res.status(422).send("Titulo não pode ser vazio");
    }

    next();
}