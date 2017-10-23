//talk to the database
const mongoose = require('mongoose');

mongoose.Promise = require('bluebird');
const { dbUri } = require('../config/environment');

mongoose.connect(dbUri, { useMongoClient: true });

// Require the model
const User = require('../models/user');
const Exhibition = require('../models/exhibition');

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
  .then((users) => {
    console.log(`${users.length} users created!`);

    return Exhibition
      .create([{
        name: 'The Bourne Identity',
        exhibitionDate: '2002-06-14',
        synopsis: 'A man is picked up by a fishing boat, bullet-riddled and suffering from amnesia, before racing to elude assassins and regain his memory.',
        disipline: 'Action',
        image: [
          'https://upload.wikimedia.org/wikipedia/en/a/ae/BourneIdentityfilm.jpg'
        ]
      }, {
        name: 'Run Lola Run',
        exhibitionDate: '1999-06-18',
        synopsis: 'After a botched money delivery, Lola has 20 minutes to come up with 100,000 Deutschmarks.',
        disipline: 'Thriller',
        image: [
          'http://cdn.miramax.com/media/assets/Run-Lola-Run1.png'
        ]
      }]);
  })
  .then((exhibitions) => {
    console.log(`${exhibitions.length} exhibitions created!`);
    console.log(exhibitions);
  })

  
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    mongoose.connection.close();
  });









// .catch((err) => console.log(err))
// .finally(() => mongoose.connection.close());
