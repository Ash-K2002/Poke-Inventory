import express from 'express';
import appRouters from './routes/appRouters.mjs';
import path from 'path';

const app=express();
const PORT=process.env.PORT||3000;
const assetsPath = path.join(path.dirname(""), "assets");
app.use(express.static(assetsPath));
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));
app.use("/",appRouters);

app.listen(PORT, ()=>console.log('The app is listening to ',PORT));