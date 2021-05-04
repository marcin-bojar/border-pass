const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path');
const compression = require('compression');
const secure = require('express-sslify');

const app = express();
app.use(express.json());
app.use(compression());

//Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.log(err));

//Use routes
app.use('/api/countries', require('./routes/api/countries'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/tables', require('./routes/api/tables'));

//Serve static assets and enforce https in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/dist'));
  app.use(secure.HTTPS({ trustProtoHeader: true }));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
