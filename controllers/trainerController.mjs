import { validationResult } from "express-validator";
import queries from "../database/queries.mjs";
import { trainervalidator } from "../validator/trainervalidator.mjs";

async function getThisTrainer(req, res){
    const trainer = await queries.getTrainerDetails(req.params.id);
    res.render("trainers/trainerDetail",{trainer: trainer});
}

function createTrainerGet(req, res){
    res.render("trainers/createTrainer");
}

const createTrainerPost=[
    trainervalidator,
    async (req, res)=>{
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).render("pokemons/createTrainer",{
                errors: errors.array(),
            });
        }

        const trainer ={
            name: req.body.name,
            region: req.body.region,
        };
        await queries.insertTrainer(trainer);
        res.redirect("/");
    }
];

async function updateTrainerGet(req, res){
    const trainer = await queries.getTrainerDetails(req.params.id);
    console.log(req.params.id);
    res.render("trainers/updateTrainer",{
        trainer: trainer
    });
}

const updateTrainerPost=[
    trainervalidator,
    async (req,res)=>{
        const trainer = {
            name: req.body.name,
            region: req.body.region,
            id: req.params.id,
        }
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).render("/pokemons/updateTrainer",{
                errors: errors.array(),
                trainer: trainer,
                id: req.params.id,
            });
        }
        await queries.updateTrainer(trainer);
        res.redirect("/");
    }
];

async function manageTrainers(req, res){
    const trainers= await queries.getAllTrainers();
    res.render("trainers/manageTrainers",{
        trainers:trainers
    });
}

export default{
    getThisTrainer,
    createTrainerGet,
    createTrainerPost,
    updateTrainerGet,
    updateTrainerPost,
    manageTrainers,
}