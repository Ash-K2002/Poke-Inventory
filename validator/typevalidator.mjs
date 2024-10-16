import { body } from "express-validator";

export const typevalidator =[
    body("name")
    .notEmpty()
    .withMessage("Type name must not be empty"),

];