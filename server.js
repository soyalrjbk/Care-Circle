//It reads the .env file containing MONGO_URL first that has my username & password for MongoDB Atlas. 
require('dotenv').config()

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const {MongoClient, ObjectId} = require('mongodb')

var db, collection;

const url = process.env.MONGO_URL;
const dbName = "care-circle";

//Render assigns PORT automatically, so 8000 is a fallback for local development.
  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

//Read (Show all providers)
app.get('/', (req, res) => {
  db.collection('providers').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', { providers: result })
  })
})

//Create (Add a provider)
app.post('/providers', (req, res) => {
  db.collection('providers').insertOne({name: req.body.name, type: req.body.type, address: req.body.address, phone: req.body.phone, availability: req.body.availability}, (err, result) => {
    if (err) return console.log(err)
    res.redirect('/')
  })
})

//Update (Update a provider)
app.put("/providers", (req, res) => {
     db.collection('providers').updateOne({_id: new ObjectId(req.body.id) }, {$set: {availability: req.body.availability}},
       (err, result) => {
        if (err) return res.status(500).send(err)
        res.json ("Provider Updated!")
    })
})

//Delete (Delete a provider)
app.delete('/providers', (req, res) => {
  db.collection('providers').findOneAndDelete({_id: new ObjectId(req.body.id)},
    (err, result) => {
      if (err) return res.status(500).send(err)
        res.json("Provider Deleted!")
  })
})
