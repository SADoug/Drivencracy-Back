import dayjs from "dayjs";

export default async function pollPostmiddleware(req, res, next) {
    const { expireAt , title } = req.body;

    if (!expireAt) {
        const dataExpira = dayjs().add(30, "day").format("YYYY-MM-DD HH:mm").toString()
        expireAt = dataExpira;
    }
    if (!title) {
        return res.status(422).send("Titulo não pode ser vazio");
    }

    next();
}