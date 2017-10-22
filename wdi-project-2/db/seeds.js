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
  //*********************************************************************************
  .then((users) => {
    console.log(`${users.length} users created!`);

    return Exhibition
      .create([{
        name: 'The Bourne Identity',
        exhibitionDate: '2002-06-14',
        synopsis: 'A man is picked up by a fishing boat, bullet-riddled and suffering from amnesia, before racing to elude assassins and regain his memory.',
        disipline: 'Action'
        // images: [
        //   'https://upload.wikimedia.org/wikipedia/en/a/ae/BourneIdentityfilm.jpg',
        //   'http://cdn2.thr.com/sites/default/files/imagecache/scale_crop_768_433/2013/04/the_bourne_identity.jpg',
        //   'http://static.guim.co.uk/sys-images/Film/Pix/pictures/2008/06/06/bourneidentity460.jpg'
        // ]
      }, {
        name: 'Run Lola Run',
        exhibitionDate: '1999-06-18',
        synopsis: 'After a botched money delivery, Lola has 20 minutes to come up with 100,000 Deutschmarks.',
        disipline: 'Thriller'
        // images: [
        //   'http://cdn.miramax.com/media/assets/Run-Lola-Run1.png',
        //   'https://assets.mubi.com/images/film/124/image-w856.jpg?1481117473',
        //   'https://www.jonathanrosenbaum.net/wp-content/uploads/2010/04/run_lola_run-5.jpg'
        // ]
      }]);
  })
  .then((exhibitions) => {
    console.log(`${exhibitions.length} exhibitions created!`);
    console.log(exhibitions);
  })

  //****************************************************************************************
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    mongoose.connection.close();
  });









// .catch((err) => console.log(err))
// .finally(() => mongoose.connection.close());
