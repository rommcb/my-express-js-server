import express from 'express';
import cors from 'cors';
require('dotenv').config();
import * as http from 'http';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import {CommonRoutesConfig} from './common/common.routes.config';
import {UsersRoutes} from './users/users.routes.config';
import debug from 'debug';
const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');
  
const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = 3030;
const routes: Array<CommonRoutesConfig> = [];
const debugLog: debug.IDebugger = debug('app');

app.use(express.json());
app.use(cors());

// here we are preparing the expressWinston logging middleware configuration,
// which will automatically log all HTTP requests handled by Express.js
const loggerOptions: expressWinston.LoggerOptions = {
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
      winston.format.json(),
      winston.format.prettyPrint(),
      winston.format.colorize({ all: true })
  ),
};

if (!process.env.DEBUG) {
  loggerOptions.meta = false; // when not debugging, log requests as one-liners
}

// initialize the logger with the above configuration
app.use(expressWinston.logger(loggerOptions));

// here we are adding the UserRoutes to our array,
// after sending the Express.js application object to have the routes added to our app!
routes.push(new UsersRoutes(app));

// this is a simple route to make sure everything is working properly
const runningMessage = `Server running at http://localhost:${port}`;
app.get('/', (req: express.Request, res: express.Response) => {
  res.status(200).send(runningMessage)
});

server.listen(port, () => {
  routes.forEach((route: CommonRoutesConfig) => {
      debugLog(`Routes configured for ${route.getName()}`);
  });
  // our only exception to avoiding console.log(), because we
  // always want to know when the server is done starting up
  console.log(runningMessage);
});

// app.post('/', (req: express.Request, res: express.Response)=>{
//     const { name } = req.body;
      
//     res.send(`Welcome ${name}`);
// })

// app.get('/', (req: express.Request, res: express.Response) => {
//     res.status(200);
//     res.setHeader('Content-Type', 'application/json');

//     res.send({msg: "welcome to root URL of Server"});
// });



// const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PWD}@cluster0.oby0lcp.mongodb.net/?retryWrites=true&w=majority`;

// main().catch(err => console.log(err));

// async function main() {
//   await mongoose.connect(uri);
  
//   const kittySchema = new mongoose.Schema({
//     name: String
//   });

//   kittySchema.methods.speak = function speak() {
//     const greeting = this.name
//       ? "Meow name is " + this.name
//       : "I don't have a name";
//     console.log(greeting);
//   };

//   const Kitten = mongoose.model('Kitten', kittySchema);

//   const kittens = await Kitten.find();
//   console.log(kittens);

//   const fluffyDocument = await Kitten.findOne({ name: /^fluff/ });
//   const fluffy = new Kitten(fluffyDocument);

//   console.log(fluffy.name);

//   fluffy.speak();
// }


// console.log('What else?');
