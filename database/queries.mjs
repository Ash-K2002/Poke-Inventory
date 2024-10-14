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
                 INNER JOIN trainer tr ON tr.id=p.trainer_id 
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

const queries = {
    getPokemons,
    getPokeDetails,
    getTrainerDetails,
    getAllTrainers,
    getAllTypes,
}
export default queries;