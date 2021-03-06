'use strict';

const MongoClient = require('mongodb');
const ObjectId    = require('mongodb').ObjectID;
const user        = require('../models/User.js');
const exercise    = require('../models/Exercise.js');

module.exports = (app, db) => {
  const Users = db.collection('appusers');
  const Logs  = db.collection('applogs');
  
  app.get('/', (req, res) => res.sendFile(process.cwd() + '/app/index.html'));
  
  app.get('/users', (req, res) => {
    Users.find({}).toArray((err, docs) => {
      if (err) return res.json({status: 0, message: err, request: 'All users'});
      
      return res.json({status: 200, message: 'Success!', request: 'All users', docs: docs});
    });
  });
  
  app.post('/new_user', (req, res) => {
    let new_user = new user({user_id: ObjectId(), username: req.body.username});
    
    Users.findOne({username: req.body.username}, (err, docs) => {
      if (err) return res.json({status: 0, message: err, request: 'Add user'});
      
      if (docs) {
        return res.json({status: 0, message: 'Username taken', request: 'Add user'});
      } else {
        Users.insertOne(new_user, (err, update) => {
          if (err) return res.json({status: 0, message: 'Error saving data', request: 'Add user'});
          return res.json({status: 200, message: update, request: 'Add user'})
        }); 
      }
    });
  });
  
  app.post('/exercise', (req, res) => {
    Users.findOne({_id: ObjectId(req.body._id)}, (err, docs) => {
      if (err) return res.json({status: 0, message: err, request: 'Add exercise'});
      let new_exercise = new exercise({
        for_userId:  docs.user_id,
        description: req.body.description,
        duration:    req.body.duration,
        date:        new Date(req.body.date)
      });
      
      Logs.insertOne(new_exercise, (err, update) => {
        if (err) return res.json({status: 0, message: 'Error saving data', request: 'Add exercise'});
        return res.json({status: 200, message: 'Exercise Saved!', request: 'Add exercise'})
      });
    });
  });
  
  app.get('/logs', (req, res) => {
    for (let param in req.query) {
      req.query['_id'] = ObjectId(req.query._id);
      if (!req.query[param]) {
        delete req.query[param];
      }
    }
    
    Users.findOne({_id: req.query._id}, (err, docs) => {
      if (err) return res.json({status: 0, message: err, request: 'Logs for user'});
      
      Logs.find({for_userId: docs.user_id}).toArray((err, docs) => {
        if (err) return res.json({status: 0, message: 'Error finding logs', request: 'Logs for user'});
        return res.json({status: 200, message: 'Logs found!', request: 'Logs for user', docs: docs});
      });
    });
  });
  
};