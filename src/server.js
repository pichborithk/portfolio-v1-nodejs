const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');

const { config } = require('./config/default');
const apiRoutes = require('./routes');

const server = express();

mongoose
  .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
  .then(() => {
    console.log('Connected to MongoDB');
    startServer();
  })
  .catch(error => {
    console.error('Unable to connect: ');
    console.error(error);
  });

const startServer = () => {
  server.use(cors());
  server.use(express.static('public'));
  server.use(express.urlencoded({ extended: true }));
  server.use(express.json());
  server.use(morgan('dev'));

  // Rules of our API
  server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if (req.method == 'OPTIONS') {
      res.header(
        'Access-Control-Allow-Methods',
        'PUT, POST, PATCH, DELETE, GET'
      );
      return res.status(200).json({});
    }

    next();
  });

  /** Routes */
  server.use('/api', apiRoutes);

  /** Health Check */
  server.get('/ping', (req, res, next) =>
    res.status(200).json({ message: 'Hello Server' })
  );

  /** Error handling */

  server.listen(config.server.port, () =>
    console.log(`Server is running on port ${config.server.port}`)
  );
};
