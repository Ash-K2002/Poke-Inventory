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

async function updateTypeGet(req, res){
    const type = await queries.getType(req.params.id);
    res.render("types/updateType",{
        type: type,
    });

}
const updateTypePost =[
    typevalidator,
    async function (req,res){
        const type = {
            name: req.body.name,
            id: req.params.id,
        }

        const errors= validationResult(req);
        if(!errors.isEmpty()){
            res.render("/types/updateTypes",{
                errors: console.errors,
                type:type,
            });
        }

        await queries.updateType(type);
        res.redirect("/");
    }
];

async function manageTypes(req, res){
    const types = await queries.getAllTypes();
    res.render("types/manageTypes",{
        types: types,
    });
}

async function deleteType(req, res){
    await queries.deleteType(req.params.id);
    res.redirect("/manage/types");
}


export default {
    createTypeGet,
    createTypePost,
    updateTypeGet,
    updateTypePost,
    manageTypes,
    deleteType,
}