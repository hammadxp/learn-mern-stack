const { MongoClient } = require("mongodb");

let dbConnection;

function connectToDb(cb) {
  MongoClient.connect("mongodb://127.0.0.1:27017/college")
    .then((client) => {
      dbConnection = client.db();
      return cb();
    })
    .catch((err) => {
      console.log(err);
      return cb(err);
    });
}

function getDb() {
  return dbConnection;
}

module.exports = { connectToDb, getDb };
