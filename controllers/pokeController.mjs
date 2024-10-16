import queries from "../database/queries.mjs";
import {pokeValidator} from '../validator/pokevalidator.mjs'
import { validationResult } from "express-validator";

async function getAllPokemons(req, res){
    const pokemons = await queries.getPokemons();
    res.render("index", {title:'pokemons',pokemons:pokemons});   
}

async function getThisPokemon(req, res){
    const pokemon=await queries.getPokeDetails(req.params.id);
    res.render("pokemons/pokeDetail", {pokemon: pokemon});
}

async function createPokeGet(req, res){
    const trainers= await queries.getAllTrainers();
    const types = await queries.getAllTypes();
    res.render("pokemons/createPoke",
        {title: "Create Pokemon", 
         trainers: trainers,
         types: types,
        }
    );    
}

const createPokePost=[
    pokeValidator,
    async (req,res)=>{
        const trainers= await queries.getAllTrainers();
        const types = await queries.getAllTypes();
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).render("pokemons/createPoke",{
                title: "Create pokemon",
                errors: errors.array(),
                trainers: trainers,
                types: types,
            });
        }
        const pokemon={
           name: req.body.name,
           level: req.body.level,
           type_id: req.body.type_id,
           trainer_id: (req.body.trainer_id=='')?null:req.body.trainer_id,
        };
        console.log(req.body);
        await queries.insertPokemon(pokemon);
        res.redirect("/");
    }
]

export default {
    getAllPokemons,
    getThisPokemon,
    createPokeGet,
    createPokePost,
}