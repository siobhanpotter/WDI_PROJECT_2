//A.require express
const express = require('express');
//A.require morgan
const morgan = require('morgan');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
//package for cookies
const session = require('express-session');
const flash = require('express-flash');
//d.1 require roots
const routes = require('./config/routes');
const customResponses = require('./lib/customResponses');
const authentication = require('./lib/authentication');
const errorHandler = require('./lib/errorHandler');


//A. envoke express
const app = express();
//3.set the port
const { port, dbUri, sessionSecret } = require('./config/environment');

mongoose.Promise = require('bluebird');
mongoose.connect(dbUri, { useMongoClient: true });


//A. create settings
//use ejs
app.set('view engine', 'ejs');
//for views look in views
app.set('views', `${__dirname}/views`);


//A. set up middle wear
app.use(expressLayouts);
app.use(express.static(`${__dirname}/public`));
app.use(morgan('dev'));


//for the session
app.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false
}));

app.use(session({
  secret: process.env.SESSION_SECRET || 'shh it\'s a secret',
  resave: false,
  saveUninitialized: false
}));

app.use(flash());
app.use(customResponses);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride(function (req) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));
app.use(authentication);
//d.2 use routes
app.use(routes);
app.use(errorHandler);

//A.listen to the port console.log in the terminal
app.listen(port, () => console.log(`Express is listening on port ${port}`));
