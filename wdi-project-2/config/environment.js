module.exports = {
  port: process.env.PORT || 3000,
  dbUri: process.env.MONGODB_URI || 'mongodb://localhost/have-a-rest',
  sessionSecret: process.env.SESSION_SECRET || 'shh it\'s a secret'
};
