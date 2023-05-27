import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import * as dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import faintRoutes from "./routes/faintRoutes.js";
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import handleSocketConnection from './controllers/socketController.js';
import { Server } from 'socket.io';
import http from 'http';





const app = express();

dotenv.config();
const hostname = process.env.DEVURL;
const port = process.env.PORT;

const databaseURL = process.env.DBURL;
mongoose.set("debug", true);
mongoose.Promise = global.Promise;

mongoose
  .connect(databaseURL)
  .then(() => {
    console.log(`Connected to database`);
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/user", userRoutes);
app.use("/faint", faintRoutes);
app.use('/public',express.static('public'))


//SWAGGER
//Expended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
  swaggerDefinition:{
      info : {
          title : 'Syncaid',
          description : 'Syncaid iOS app',
          contact: {
              name : 'Ahmed Kazez et Fatma Abou El Hija'
          },
          servers : ["http://172.17.2.5:9095"]
      }
  },
  // ['.routes/*.js']
  apis: ["./routes/*.js"]
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve,swaggerUi.setup(swaggerDocs));


const server = http.createServer(app);
const io = new Server(server);
handleSocketConnection(io);

server.listen(port, hostname, () => {
  console.log(`Server running on ${hostname}:${port}`);
});

