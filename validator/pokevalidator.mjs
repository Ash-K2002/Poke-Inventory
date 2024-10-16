import { body } from "express-validator";

export const pokeValidator =[
    body("name")
    .trim()
    .notEmpty()
    .withMessage("Name can not be empty"),

    body("level")
    .notEmpty()
    .withMessage("level must not be empty")
    .isInt({min:1})
    .withMessage("level must be a positive integer"),

];
