import queries from "../database/queries.mjs";

async function getThisTrainer(req, res){
    const trainer = await queries.getTrainerDetails(req.params.id);
    res.render("trainers/trainerDetail",{trainer: trainer});
}

function createTrainerGet(req, res){
    res.render("trainers/createTrainer");
}

function createTrainerPost(){

}

export default{
    getThisTrainer,
    createTrainerGet,
    createTrainerPost,
}