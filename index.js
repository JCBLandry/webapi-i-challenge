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
    .then(users => {
        res.status(201).json(users);
    })
    .catch(err =>{
        res.status(400).json({
            err: err,
            message: { errorMessage: "Could not add the user." }
        })
    })
}
});

server.get('/api/users', (req, res) => {
    //what is the datatype? express takes care of this
    //what is my status code? express sends back 200 in this case
    //what am I sending back? next line
    db.find()
      .then(users => {
        res.status(200).json(users);
      })
      .catch(() => {
        res.status(500).json({
          errorMessage: 'The users information could not be retrieved.',
        });
      });
  });

  server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    //what is the datatype? express takes care of this
    //what is my status code? express sends back 200 in this case
    //what am I sending back? next line
    db.findById(id)

      .then(users => {
          if (users) {
        res.status(200).json(users);
          } else {
              res.status(404).json({
                 message: "The user with the specified ID does not exist." 
              })
          }
      })
      .catch(() => {
        res.status(500).json({
          errorMessage: { message: "The user with the specified ID does not exist." },
        });
      });
  });

  server.delete('/api/users/:id', (req, res) =>{
    const { id } = req.params;

    db.remove(id)
        .then(destroyUser=>{
            if (destroyUser) {
            res.json(destroyUser);
            } else {
                res.status(404).json({
                    message: "The user with the specified ID does not exist." 
                })
            }
        })
        .catch(err =>{
            res.status(500).json({
                err: err,
                message: { error: "The user could not be removed" }
            })
        })
    });

    server.put('/api/users/:id', (req, res)=>{
        const { id } = req.params;
        const changes = req.body;
    
        db.update(id, changes)
        .then(updated =>{
            if (updated) {
                res.json(updated);
            } else {
                res.status(404).json({
                    message: 'invalid hub id'
                });
            }
        })
        .catch(err =>{
            res.status(500).json({
                err: err,
                message: 'failed to create dat hub'
            })
        });
    });





        server.listen(5000, () =>
  console.log('Server running on http://localhost:5000')
);