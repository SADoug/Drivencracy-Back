import { Router } from "express";

const voteRouter = Router();
voteRouter.post("/choice/:id/vote");

export default voteRouter;