
const DEBUG  = true;
// Code to create the needed Tables

const createTableArtist = () => {
return
    "CREATE TABLE Artist ("+
      "id integer primary key AUTOINCREMENT,"+
      "name text not null,"+
      "date_of_birth text not null,"+
      "biography text not null,"+
      "is_currently_employed int not null default 1"+
    ")";
}


const createTableSeries = () => {
return
    "CREATE TABLE Series ("+
      "id integer primary key AUTOINCREMENT,"+
      "name text not null,"+
      "description text not null"+
    ")";
}

const createTableIssues = () => {
return
    "CREATE TABLE Issue ("+
      "id integer primary key AUTOINCREMENT,"+
      "name text not null,"+
      "issue_number text not null,"+
      "publication_date text not null,"+
      "artist_id int not null references Artist(id),"+
      "series_id int not null references Series(id)"+
    ")";
}
// END of table Defintion

const getQueryAllFromTable = (table) => {
    return "SELECT * FROM "+table+";";
}

const getQueryAllEmployedArtists = (table) => {
    return "SELECT * FROM "+table+" WHERE is_currently_employed = 1;";
}


const getQueryItemFromTable = function (table, id) {
    return "SELECT * FROM "+table+" WHERE id = "+id+";";

}
const getQueryIusse4Serie = function (id) {
    return "SELECT * FROM Issue WHERE series_id = "+id+";";
}

module.exports = {
  createTableArtist,
  createTableSeries,
  createTableIssues,
  getQueryAllFromTable,
  getQueryItemFromTable,
  getQueryAllEmployedArtists,
  getQueryIusse4Serie
};
