const express = require('express')
const bodyParser = require('body-parser')
const mongoDB = require('mongodb')
const mongoClient = require('mongodb').MongoClient

const app = express()
const connectionString = 'mongodb+srv://nachokal:Wakeme09842@cluster0.xhlyo.mongodb.net/?retryWrites=true&w=majority'

mongoClient.connect(connectionString)
.then((client) => {
    console.log('Connected to Database')

    // Mongo client creates db and collection
    const db = client.db('star-wars-quotes')
    const quoteCollections = db.collection('quotes')

    // express now can handle req.body, json and content and serve public files
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(express.static('public'))
    app.use(bodyParser.json())

    // pug template engine integration
    app.set('view engine', 'pug')

    app.listen(3000, () => {
        console.log('server is running on port 3000')
    })

    app.get('/', (req, res) => {
        db.collection('quotes').find().toArray()
        .then((result) => {
            res.render(__dirname + '/index.pug', { result })
        })
        .catch((error) => console.log(error))
    })

    app.post('/quote', (req, res) => {
        quoteCollections.insertOne(req.body)
        .then((result) => console.log(result))
        .then(res.redirect('/'))
        .catch((error) => console.log(error))
    })

    app.put('/quote', (req, res) => {
        quoteCollections.findOneAndUpdate({
            _id: new mongoDB.ObjectId(req.body._id)}, {
                $set: {
                    name: req.body.name, 
                    quote: req.body.quote
                }
            })
        .then((result) => {
            console.log(result)
            res.end()
        })
        .catch((error) => console.log(error))
    })

    app.delete('/quote', (req, res) => {
        quoteCollections.deleteOne({
            _id: new mongoDB.ObjectId(req.body._id)
        })
        .then(result => {
            console.log(result)
            res.end()
        })
        .catch(error => console.log(error))
    })
})
.catch((error => console.log(error)))

