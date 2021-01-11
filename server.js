const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const border = require('./routes/api/border');
const country = require('./routes/api/country');

const app = express();

app.use(express.json());

//Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.log(err));

//Use routes
app.use('/api/borders', border);
app.use('/api/countries', country);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
