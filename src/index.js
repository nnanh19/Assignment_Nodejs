import express from "express";
import morgan from "morgan";
import cors from 'cors';
import bodyparser from 'body-parser';
import apiRoute from './routes/router.js'
import db from "./configs/db/index.js";
db.connect();

const port =  3001;

const app = express();
app.use(express.static('src/public'))
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(bodyparser.json({
    extended : true
}))

app.use("/api", apiRoute);


app.listen(port ,()=> console.log(`Bạn đang chạy trên cổng ${port}`));