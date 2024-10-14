import queries from "../database/queries.mjs";

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

function createPokePost(req, res){

}

export default {
    getAllPokemons,
    getThisPokemon,
    createPokeGet,
    createPokePost,
}