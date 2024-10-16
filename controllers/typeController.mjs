import { validationResult } from "express-validator";
import queries from "../database/queries.mjs";
import {typevalidator} from '../validator/typevalidator.mjs';

function createTypeGet(req, res){
    res.render("types/createType");
}

const createTypePost= [
    typevalidator,
    async (req, res)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).render("types/createType",{
                errors: errors.array(),
            });
        }

        const type={name: req.body.name};
        await queries.insertType(type);
        res.redirect("/");
    }
];

export default {
    createTypeGet,
    createTypePost,
}