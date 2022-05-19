import { postpollSchema } from "../schemas/authSchemas.js";


export default async function validatepostpoll(req, res, next){
    
    const user = req.body;
    const {error} = postpollSchema.validate(user, {abortEarly: false});
    if(error) return res.status(406).send(error.details.map(detail => detail.message));
    try{
        await db.collection("enquetes").insertOne({title: user.title, expireAt: user.expireAt });
        console.log(chalk.green.bold("cliente cadastrado no banco de dados"));
        res.sendStatus(201);
        next();
    }
    
    catch(e){
        return res.status(400).send("Erro ao registrar o usuário!", e);
    }
}