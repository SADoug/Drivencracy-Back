import db from "./../config/db.js";
import dayjs from "dayjs";

export async function postpoll(req, res){
    const {title, expireAt} = req.user;
    try{
        await db.collection("sessions").insertOne({
            title,
            expireAt,
        })
        return res.sendStatus(201);
    }catch(e){
        return res.sendStatus(500);
    }
}

