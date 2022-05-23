import db from "../config/db.js";7
import chalk from "chalk";

export async function pollpost(req, res) {
    const { title, expireAt } = req.body;
    try {
        await db.collection("enquetes").insertOne({ title, expireAt });
        res.status(201).send("Enquete cadastrada no banco de dados")
    }

    catch (e) {
        return res.status(400).send("Erro ao registrar enquete!", e);
    }

};


export async function pollget(req, res) {
    try {
        const enquetes = await db.collection("enquetes").find().toArray();
        res.send(enquetes);
    } catch (e) {
        console.log(e);
        return res.status(500).send("Erro ao obter as enquetes!", e);
    }
};