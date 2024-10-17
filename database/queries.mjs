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
    const {rows}= await pool.query("SELECT name, region,id from trainer where id=$1",[id]);
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

async function getType(id){
    const {rows}= await pool.query("SELECT * from type WHERE id=$1",[id]);
    return rows[0];
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

async function updatePokemon(pokemon){
    console.log(pokemon);
    const {name,
        id,
        level,
        type_id,
        trainer_id
    }=pokemon;

    const queryText=`
    UPDATE pokemon
    SET name=($1),
        level=($2),
        type_id=($3),
        trainer_id=($4)
    WHERE id=($5);
    `;

    try {
        await pool.query(queryText, [name, level, type_id, trainer_id,id]);
        console.log("Pokemon inserted successfully!");
    } catch (error) {
        console.error("Error inserting Pokemon:", error);
        throw error;
    }


}

async function updateTrainer(trainer){
const {name, region,id}= trainer;

const queryText = `
    UPDATE trainer 
    SET name=$1,
        region=$2
    WHERE id=$3;
`;
try{
    await pool.query(queryText, [name, region, id]);
    console.log("Trainer updated successfully");
}
catch(error){
    console.error("Error occured while updating trainer",error);
    throw error;
}
}

async function updateType(type){
    const {name,id}= type;
    console.log("name=",name," id=",id);
    const queryText = `
    UPDATE type
    SET type_name = $1
    WHERE id=$2;
    `;

    try{
        await pool.query(queryText,[name,id]);
        console.log("Type updated successfully");
    }catch(error){
        console.error("Error occured while updating type: ",error);
        throw error;
    }
}

async function deleteTrainer(id){
    const queryText = `
    DELETE FROM trainer WHERE id=$1`;

    try{
        await pool.query(queryText,[id]);
        console.log("Trainer successfully deleted");
    }catch(error){
        console.error("Error occured while deleting trainer: ",error);
        throw error;
    }
    
}

async function deleteType(id){
    const queryText = `
    DELETE FROM type WHERE id=$1`;

    try{
        await pool.query(queryText,[id]);
        console.log("Type successfully deleted");
    }catch(error){
        console.error("Error occured while deleting type: ",error);
        throw error;
    }
    
}

async function deletePokemon(id){
    const queryText = `
    DELETE FROM pokemon WHERE id=$1`;

    try{
        await pool.query(queryText,[id]);
        console.log("Pokemon successfully deleted");
    }catch(error){
        console.error("Error occured while deleting pokemon: ",error);
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
    updatePokemon,
    updateTrainer,
    getType,
    updateType,
    deletePokemon,
    deleteTrainer,
    deleteType,
}
export default queries;

