// collection of Methods to help Routers do their job
const db = require('../db');

class Util {

  static insertIntoDatabase(req, schema) {
    db.addToDatabase(schema, req);
  }
}
