import express from 'express';
import mongoose from "mongoose";
import cors from "cors";
import * as dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js'


const app=express();

dotenv.config()
const hostname=process.env.DEVURL;
const port=process.env.PORT;
const databaseName =process.env.DBNAME;
const databaseURL=process.env.DBURL
mongoose.set("debug", true);
mongoose.Promise = global.Promise;

mongoose
  .connect(`mongodb://${databaseURL}/${databaseName}`)
  .then(() => {
    console.log(`Connected to database`);
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/user',userRoutes);


app.listen(port,hostname,()=>{
    console.log(`Server running`);
});



