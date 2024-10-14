import { Router } from "express"
import pokeController from "../controllers/pokeController.mjs";
import trainerController from "../controllers/trainerController.mjs";
import typeController from "../controllers/typeController.mjs"

const appRouters= Router();

appRouters.get("/", pokeController.getAllPokemons);
appRouters.get("/details/pokemon/:id", pokeController.getThisPokemon);
appRouters.get("/details/trainer/:id", trainerController.getThisTrainer);
appRouters.get("/create/pokemons",pokeController.createPokeGet);
appRouters.post("/create/pokemons",pokeController.createPokePost);
appRouters.get("/create/trainer",trainerController.createTrainerGet);
appRouters.post("/create/trainer", trainerController.createTrainerPost);
appRouters.get("/create/type", typeController.createTypeGet);
appRouters.post("create/type", typeController.createTypePost);

export default appRouters;