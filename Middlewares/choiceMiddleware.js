import db from "../config/db.js";
import joi from "joi";

export default async function choicePostmiddleware(req, res, next) {
    const opcaoSchema = joi.object({
        title: joi.string().min(1).required(),
        poolId: joi.any().required(),
    });
    const { error } = opcaoSchema.validate(opcao, { abortEarly: false });
    if (error) return res.status(406).send(error.details.map(detail => detail.message));

    const titulo = title;
    if (titulo.length < 1) { res.sendStatus(422) };
    const tituloRepetido = await db.collection("opcoes").findOne({ title });

    next();
}