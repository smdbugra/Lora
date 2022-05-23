const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then((con) => {
  console.log(con.connections);
  console.log('DB connection successful!');
});

const port = 3080;
app.listen(port, () => {
  console.log(`App is running ${port}...`);
});
