'use strict';

const MongoClient = require('mongodb');
const ObjectId    = require('mongodb').ObjectID;
const user        = require('../models/User.js');
const exercise    = require('../models/Exercise.js');

module.exports = (app, db) => {
  const Users = db.collection('appusers');
  const Logs  = db.collection('applogs');
  
  app.get("/", (req, res) => res.sendFile(process.cwd() + '/app/index.html'));
  
   app.post('/api/exercise/new-user', (req, res) => {
     let new_user = new user({user_id: ObjectId(), username: req.body.username});
     Users.findOne({username: req.body.username}, (err, docs) => {
       if (err) return err;
       if (docs) {
         return res.send('Username taken');
       } else {
         Users.insertOne(new_user, (err, update) => err ? res.send('Error saving data') : res.sendFile(process.cwd() + '/app/index.html'));
       }
     });
   });
  
  
  
};