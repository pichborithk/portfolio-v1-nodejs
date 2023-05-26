require('dotenv').config();

const MONGO_URL = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.v0qsabw.mongodb.net/my-mail`;

const SERVER_PORT = Number(process.env.SERVER_PORT) || 1337;

module.exports.config = {
  mongo: {
    url: MONGO_URL,
  },
  server: {
    port: SERVER_PORT,
  },
};
