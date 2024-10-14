import queries from "../database/queries.mjs";

function createTypeGet(req, res){
    res.render("types/createType");
}

function createTypePost(req, res){

}

export default {
    createTypeGet,
    createTypePost,
}