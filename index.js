const express = require('express');
const morgan = require('morgan');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('express-flash');//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const routes = require('./config/routes');
const customResponses = require('./lib/customResponses');
const authentication = require('./lib/authentication');
const errorHandler = require('./lib/errorHandler');
const User = require('./models/user');
// const Exhibition = require('./models/exhibition');



const app = express();
const { port, dbUri, sessionSecret } = require('./config/environment');

mongoose.Promise = require('bluebird');
mongoose.connect(dbUri, { useMongoClient: true });


//create settings
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

//set up middle wear
app.use(expressLayouts);
app.use(express.static(`${__dirname}/public`));
app.use(morgan('dev'));

app.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false
}));


app.use((req, res, next) => {
  if (!req.session.userId) return next();

  User
    .findById(req.session.userId)
    .exec()
    .then(user=> {
      if (!user) {
        return req.session.regenerate(() => {
          req.flash('danger', 'You must be logged in.');
          res.redirect('/');
        });
      }
      req.session.userId = user._id;
      res.locals.user = user;
      res.locals.isLoggedIn = true;

      next();
    });
});

app.use((req, res, next) => {
  global.currentPath = req.path;
  next();
});



app.use(customResponses);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride(function (req) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));
app.use(flash());
app.use(authentication);
app.use(routes);
app.use(errorHandler);

app.listen(port, () => console.log(`Express is listening on port ${port}`));
