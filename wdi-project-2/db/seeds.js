//talk to the database
const mongoose = require('mongoose');

mongoose.Promise = require('bluebird');
const { dbUri } = require('../config/environment');

mongoose.connect(dbUri, { useMongoClient: true });

// Require the model
const User = require('../models/user');
const Exhibition = require('../models/exhibition');

// Drop the model
Exhibition.collection.drop();
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
        name: 'Wildlife Photographer of the year, Natural History museum',
        exhibitionDate: '2017-03-31',
        synopsis: 'Travel from the depths of the ocean to the dramatic landscape of Arizonas Sonoran Desert with the Wildlife Photographer of the Year exhibition at the Natural History Museum. Now in its 53rd year, the annual exhibition showcases the best 100 images selected from almost 50,000 professional and amateur photography and photojournalism competition entries, received from all across the globe.',
        disipline: 'Action',
        image: 'images/wildlife.jpg'
      }, {
        name: 'Insight Astronomy Photographer of the Year, Royal Observatory Greenwich',
        exhibitionDate: '1999-06-18',
        synopsis: 'The annual competition, which is now in its ninth year, sees talented professional and amateur photographers submit breathtaking shots of the skies, planets, space and stars in an effort to win the prestigious award. Enjoy some of the most spectacular visions of the cosmos in a beautiful setting steeped in astronomical history.',
        disipline: 'Thriller',
        image: 'images/astronomy.jpg'
      }, {
        name: 'SOMNYAMA NGONYAMA, HAIL THE DARK LIONESS, AUTOGRAPH ABP',
        exhibitionDate: '1999-10-28',
        synopsis: 'Taken primarily in Europe, North America and Africa, each portrait asks critical questions about social justice, human rights and contested representations of the black body. Everyday objects are transformed into dramatic and historically loaded props, merging the political with the aesthetic. Scouring pads and latex gloves address themes of domestic servitude, while alluding to sexual politics, violence and the suffocating prisms of gendered identity.',
        disipline: 'Thriller',
        image: 'images/Ntozakhe.jpg'
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
