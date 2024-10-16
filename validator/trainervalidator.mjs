import { body } from "express-validator";

export const trainervalidator =[
    body("name")
    .trim()
    .notEmpty()
    .withMessage("Name can not be empty"),

    body("region")
    .trim()
    .notEmpty()
    .withMessage("Region can not be empty"),
]; 