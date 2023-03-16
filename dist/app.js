"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http = __importStar(require("http"));
const winston = __importStar(require("winston"));
const expressWinston = __importStar(require("express-winston"));
const users_routes_config_1 = require("./users/users.routes.config");
const debug_1 = __importDefault(require("debug"));
const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');
require('dotenv').config();
const app = (0, express_1.default)();
const server = http.createServer(app);
const port = 3030;
const routes = [];
const debugLog = (0, debug_1.default)('app');
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// here we are preparing the expressWinston logging middleware configuration,
// which will automatically log all HTTP requests handled by Express.js
const loggerOptions = {
    transports: [new winston.transports.Console()],
    format: winston.format.combine(winston.format.json(), winston.format.prettyPrint(), winston.format.colorize({ all: true })),
};
if (!process.env.DEBUG) {
    loggerOptions.meta = false; // when not debugging, log requests as one-liners
}
// initialize the logger with the above configuration
app.use(expressWinston.logger(loggerOptions));
// here we are adding the UserRoutes to our array,
// after sending the Express.js application object to have the routes added to our app!
routes.push(new users_routes_config_1.UsersRoutes(app));
// this is a simple route to make sure everything is working properly
const runningMessage = `Server running at http://localhost:${port}`;
app.get('/', (req, res) => {
    res.status(200).send(runningMessage);
});
server.listen(port, () => {
    routes.forEach((route) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0RBQThCO0FBQzlCLGdEQUF3QjtBQUN4QiwyQ0FBNkI7QUFDN0IsaURBQW1DO0FBQ25DLGdFQUFrRDtBQUVsRCxxRUFBd0Q7QUFDeEQsa0RBQTBCO0FBQzFCLE1BQU0sRUFBRSxXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDN0QsTUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ3JDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQTtBQUUxQixNQUFNLEdBQUcsR0FBd0IsSUFBQSxpQkFBTyxHQUFFLENBQUM7QUFDM0MsTUFBTSxNQUFNLEdBQWdCLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDbkQsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2xCLE1BQU0sTUFBTSxHQUE4QixFQUFFLENBQUM7QUFDN0MsTUFBTSxRQUFRLEdBQW9CLElBQUEsZUFBSyxFQUFDLEtBQUssQ0FBQyxDQUFDO0FBRS9DLEdBQUcsQ0FBQyxHQUFHLENBQUMsaUJBQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQ3hCLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBQSxjQUFJLEdBQUUsQ0FBQyxDQUFDO0FBRWhCLDZFQUE2RTtBQUM3RSx1RUFBdUU7QUFDdkUsTUFBTSxhQUFhLEdBQWlDO0lBQ2xELFVBQVUsRUFBRSxDQUFDLElBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUM5QyxNQUFNLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQzFCLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEVBQ3JCLE9BQU8sQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLEVBQzVCLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxDQUFDLENBQ3pDO0NBQ0YsQ0FBQztBQUVGLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRTtJQUN0QixhQUFhLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLGlEQUFpRDtDQUM5RTtBQUVELHFEQUFxRDtBQUNyRCxHQUFHLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztBQUU5QyxrREFBa0Q7QUFDbEQsdUZBQXVGO0FBQ3ZGLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxpQ0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFFbEMscUVBQXFFO0FBQ3JFLE1BQU0sY0FBYyxHQUFHLHNDQUFzQyxJQUFJLEVBQUUsQ0FBQztBQUNwRSxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQW9CLEVBQUUsR0FBcUIsRUFBRSxFQUFFO0lBQzNELEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFBO0FBQ3RDLENBQUMsQ0FBQyxDQUFDO0FBRUgsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFO0lBQ3ZCLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUF5QixFQUFFLEVBQUU7UUFDekMsUUFBUSxDQUFDLHlCQUF5QixLQUFLLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3pELENBQUMsQ0FBQyxDQUFDO0lBQ0gsMkRBQTJEO0lBQzNELDBEQUEwRDtJQUMxRCxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBQzlCLENBQUMsQ0FBQyxDQUFDO0FBRUgsaUVBQWlFO0FBQ2pFLGlDQUFpQztBQUVqQyxtQ0FBbUM7QUFDbkMsS0FBSztBQUVMLGtFQUFrRTtBQUNsRSx1QkFBdUI7QUFDdkIseURBQXlEO0FBRXpELHdEQUF3RDtBQUN4RCxNQUFNO0FBSU4sZ0pBQWdKO0FBRWhKLHlDQUF5QztBQUV6QywwQkFBMEI7QUFDMUIsaUNBQWlDO0FBRWpDLDhDQUE4QztBQUM5QyxtQkFBbUI7QUFDbkIsUUFBUTtBQUVSLG1EQUFtRDtBQUNuRCxpQ0FBaUM7QUFDakMsc0NBQXNDO0FBQ3RDLGlDQUFpQztBQUNqQyw2QkFBNkI7QUFDN0IsT0FBTztBQUVQLDBEQUEwRDtBQUUxRCx5Q0FBeUM7QUFDekMsMEJBQTBCO0FBRTFCLHFFQUFxRTtBQUNyRSwrQ0FBK0M7QUFFL0MsOEJBQThCO0FBRTlCLG9CQUFvQjtBQUNwQixJQUFJO0FBR0osNkJBQTZCIn0=