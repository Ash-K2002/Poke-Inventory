import { query } from "express";
import pool from "./pool.mjs";

async function getPokemons(){
    const {rows} = await pool.query("SELECT name, id from pokemon");
    return rows;
}

async function getPokeDetails(id){
    const query=`SELECT p.name as pokeName,
                        p.level, ty.type_name as type,
                        tr.name as trainer, 
                        tr.id as trainerId, 
                        p.id as pokeId 
                 FROM pokemon p 
                 LEFT JOIN trainer tr ON tr.id=p.trainer_id 
                 INNER JOIN type ty ON p.type_id=ty.id 
                 WHERE p.id=$1`
    const {rows}= await pool.query(query,[id]);
    return rows;
}

async function getTrainerDetails(id){
    const {rows}= await pool.query("SELECT name, region from trainer where id=$1",[id]);
    return rows[0];
}

async function getAllTrainers(){
    const {rows}= await pool.query("SELECT * from trainer");
    return rows;
}

async function getAllTypes(){
    const {rows}=await pool.query("SELECT * from type");
    return rows;
}

async function insertPokemon(pokemon){
    const {name,
        level,
        type_id,
        trainer_id
    }=pokemon;

    const queryText=`INSERT INTO pokemon (name, level, type_id, trainer_id)
    VALUES($1, $2, $3, $4);`;

    try {
        await pool.query(queryText, [name, level, type_id, trainer_id]);
        console.log("Pokemon inserted successfully!");
    } catch (error) {
        console.error("Error inserting Pokemon:", error);
        throw error;
    }
}

async function insertTrainer(trainer){
    const {name, region}= trainer;

    const queryText=`INSERT INTO trainer (name, region) 
    VALUES($1, $2);`;
    try{
        await pool.query(queryText,[name, region]);
        console.log("Trainer successfully inserted");
    }
    catch(error){
        console.error("Error inserting trainer: ",error);
        throw error;
    }
}

async function insertType(type){
    const {name}= type;
    const queryText =`
    INSERT INTO type (type_name) VALUES($1)`;
    console.log(name);
    try{
        await pool.query(queryText, [name]);
        console.log("Type successfully inserted");
    }
    catch(error){
        console.error("Error inserting type: ", error);
        throw error;
    }
}

const queries = {
    getPokemons,
    getPokeDetails,
    getTrainerDetails,
    getAllTrainers,
    getAllTypes,
    insertPokemon,
    insertTrainer,
    insertType,
}
export default queries;

