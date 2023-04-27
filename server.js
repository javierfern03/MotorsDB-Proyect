require('dotenv').config();
const app = require('./app');
const { db } = require('./database/config');
const initModel = require('./models/init.model');

db.authenticate()
  .then(() => console.log('database authenticate'))
  .catch((error) => console.log(error));

initModel();

db.sync()
  .then(() => console.log('database Sync'))
  .catch((error) => console.log(error));
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log('app running on port 3001');
});
