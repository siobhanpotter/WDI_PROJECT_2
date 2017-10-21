//talk to the database
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { dbUri } = require('../config/environment');

mongoose.connect(dbUri, { useMongoClient: true });



// Require the model
const User = require('../models/user');

// Drop the model
User.collection.drop();

// Create the models
User
  .create([{
    firstName: 'Mike',
    lastName: 'Hayden',
    username: 'mickyginger',
    email: 'mike.hayden@ga.co',
    password: 'password',
    passwordConfirmation: 'password'
  }])
  .then((users) => console.log(`${users.length} users created`))
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close());
