// implement your API here
//libraries
const express = require('express');

//other files
const db = require('./data/db.js')

//global objects
const server = express();

//middleware IMPORTANT
server.use(express.json());

server.listen(5000, () =>
  console.log('Server running on http://localhost:5000')
);


server.post('/api/users', (req, res) =>{
    const newHub = req.body;
    db.insert(newHub)
    .then(hub => {
        res.status(201).json(hub);
    })
    .catch(err =>{
        res.status(400).json({
            err: err,
            message: { errorMessage: "Please provide name and bio for the user." }
        })
    })
});








server.get('/api/users', (req, res) =>{
    //what is the datatype? express takes care of this
    //what is my status code? express sends back 200 in this case
    //what am I sending back? next line
    res.send('Hello Worldz');
    });

    server.get('/now', (req, res) =>{
        res.send(new Date());
        }); 