const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');

require('dotenv').config()

const app = express();
const PORT = 3030;

app.use(
  cors({
    origin: 'http://localhost:4200'
  })
  );

app.post('/', (req, res)=>{
    const {name} = req.body;
      
    res.send(`Welcome ${name}`);
})

app.listen(PORT, (error) =>{
	if(!error)
		console.log("Server is Successfully Running, and App is listening on port "+ PORT);
	else
		console.log("Error occurred, server can't start", error);
	}
);

app.get('/', (req, res) => {
    res.status(200);
    res.send("welcome to root URL of Server");
});



const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PWD}@cluster0.oby0lcp.mongodb.net/?retryWrites=true&w=majority`;

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(uri);
  
  const kittySchema = new mongoose.Schema({
    name: String
  });

  kittySchema.methods.speak = function speak() {
    const greeting = this.name
      ? "Meow name is " + this.name
      : "I don't have a name";
    console.log(greeting);
  };

  const Kitten = mongoose.model('Kitten', kittySchema);

  const kittens = await Kitten.find();
  console.log(kittens);

  const fluffyDocument = await Kitten.findOne({ name: /^fluff/ });
  const fluffy = new Kitten(fluffyDocument);

  console.log(fluffy.name);

  fluffy.speak();
}


console.log('What else?');
