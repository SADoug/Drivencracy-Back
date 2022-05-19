import joi from "joi";

export const postpollSchema = joi.object({
    title: joi.string().required(),
    expireAt: joi.any().required(),
});

