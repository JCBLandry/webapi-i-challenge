// implement your API here
//libraries
const express = require('express');

//other files
const db = require('./data/db.js')

//global objects
const server = express();

//middleware IMPORTANT
server.use(express.json());




server.post('/api/users', (req, res) =>{
    const newUser = req.body;
    const { name, bio } = req.body;

  if (!name || !bio) {
    res
      .status(400)
      .json({ errorMessage: 'Please provide name and bio for the user.' });
  } else {
    db.insert(newUser)
    .then(hub => {
        res.status(201).json(hub);
    })
    .catch(err =>{
        res.status(400).json({
            err: err,
            message: { errorMessage: "Could not add the user." }
        })
    })
}
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


        server.listen(5000, () =>
  console.log('Server running on http://localhost:5000')
);