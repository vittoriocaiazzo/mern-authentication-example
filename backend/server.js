const app = require('./app');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// configuring the .env file
dotenv.config();

// db configuration
const db = process.env.DATABASE;
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('### DB connected ###'));

// starting the server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`### Server listening on port ${port} ###`);
});
