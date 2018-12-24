class Database {

  constructor(dbfile) {
    const file = process.env.TEST_DATABASE || './database.sqlite';

    this.sqlite = require('sqlite3');
    this.db = new this.sqlite.Database(file);
    this.DEBUG = true;
    this.dataMapping = {};

    this.createTables();

    this.initDataMapping();
    console.log(this.db);

  }


  initDataMapping() {
    this.dataMapping['Artist'] = 'artists';
    this.dataMapping['Series'] = 'series';
    this.dataMapping['Issue'] = 'issue';
  }

// Code to create the needed Tables

  createTables() {
    this.createTableArtist();
    this.createTableSeries();
    this.createTableIssue();
  }

  createTableArtist () {
    this.db.run(
      "CREATE TABLE Artist ("+
        "id integer primary key AUTOINCREMENT,"+
        "name text not null,"+
        "date_of_birth text not null,"+
        "biography text not null,"+
        "is_currently_employed int not null default 1"+
      ")", (err) => {
        if(err) console.log(err);
      }
    );
  }


  createTableSeries () {
    this.db.run(
      "CREATE TABLE Series ("+
        "id integer primary key AUTOINCREMENT,"+
        "name text not null,"+
        "description text not null"+
      ")", (err) => {
        if(err) console.log(err);
      }
    );
  }

  createTableIssue () {
    this.db.run(
      "CREATE TABLE Issue ("+
        "id integer primary key AUTOINCREMENT,"+
        "name text not null,"+
        "issue_number text not null,"+
        "publication_date text not null,"+
        "artist_id int not null references Artist(id),"+
        "series_id int not null references Series(id)"+
      ")", (err) => {
        if(err) console.log(err);
      }
    );
  }
// END of table Defintion


// Helper functions
  getAllFromDatabase (table) {
    let query = "SELECT * FROM "+table+";";
    if(this.DEBUG) console.log("Query: "+query);
    let result = [];
    this.db.serialize(() => {
      this.db.all(
        query, (err, rows) => {
          if(err) {
            console.log('SQL-Error:'+err)
          } else {
            rows.forEach(row => {
              result.push(row);
            })
            return result;    //      console.log(jsonData);
          }
        }
      )
    })
  }



}
const file = process.env.TEST_DATABASE || './database.sqlite';
console.log("Working on Database: "+file);
const db = new Database(file);
//let result = db.getAllFromDatabase('Artist');
//console.log('XXX');
//console.log(result);


module.exports = Database;
