// SQL-Class
// Author: Thomas Mack

const DEBUG = true;

const { Pool } = require('pg');
const pool = new Pool({
  		user: 'postgres',
  		host: 'localhost',
  		database: 'bidat_cookbook',
  		password: 'postgres',
  		port: 5432
});


const  query = function (text, params, callback) {
    const start = Date.now()
    return pool.query(text, params, (err, res) => {
      const duration = Date.now() - start;
      //if(res)
      console.log('executed query', { text, duration})
      callback(err, res)
    })
}
const getClient = function (callback) {
    pool.connect((err, client, done) => {
      callback(err, client, done)
    })
}

const dataStructure = {

  categories: {
    tableName: "kategorie",
    jsonName: "categories"
  },

  units: {
    tableName: "einheit",
    jsonName: "units"
  },

  tools: {
    tableName: "geraet",
    jsonName: "tools"
  },

  difficulties: {
    tableName: "schwierigkeit",
    jsonName: "difficulties"
  },

  ingredients: {
    tableName: "zutat",
    jsonName: "ingredients"
  },

  ratingcategories: {
    tableName: "wertungkategorie",
    jsonName: "ratingcategories"
  }

}

const selectAllFromTable = (table) => {
    return "SELECT * FROM "+table+";";
}

const selectAllFromTableByFieldValue = (table, field, value) => {
    return "SELECT * FROM "+table+" WHERE "+field+"="+value+";";
}

const selectItemFromTable = function (table, id) {
    return "SELECT * FROM "+table+" WHERE id = "+id+";";
}

const deleteItemFromTable = function (table, id) {
    return "DELETE FROM "+table+" WHERE id = "+id+";";
}

const deleteNameKeyObject = function(req, res, next) {
  if(DEBUG) console.log("Delte Valuelist");
  let structure = getStructure(req);
  let obj = req.body[structure.jsonName][0];
  let query = "DELETE FROM "+structure.tableName+
              " WHERE id = "+req.itemId;
  query(query, (err, rs) => {
      if(err) {
        console.log(query);
        next(err)
      } else {
        res.status(204).send();
      }
  });

}

const updateNameKeyObject = function(req, res, next) {
  if(DEBUG) console.log("Update Valuelist");
  let structure = getStructure(req);
  if(DEBUG) console.log(req.body[structure.jsonName]);
  let obj = req.body[structure.jsonName][0];
  let query = "UPDATE "+structure.tableName+
              " set schluessel = '"+obj.schluessel+
              "', name = '"+obj.name+
              "', beschreibung =  '"+obj.beschreibung+
              "' WHERE id = "+req.itemId+" returning *";
  query(query, (err, rs) => {
    if(err) {
      console.log(query);
      next(err)
    } else {
      let result  = {};
      result[structure['jsonName']] = rs.rows;
      res.status(200).json(result);
    }
    });
}

const insertNameKeyObject = function(req, res, next) {
  if(DEBUG) console.log("Insert Valuelist");
  let structure = getStructure(req);
  if(DEBUG) console.log(req.body[structure.jsonName]);
  let obj = req.body[structure.jsonName][0];

  let query =  "INSERT INTO "+structure.tableName+" (schluessel, name, beschreibung) "+
          " VALUES ('"+obj.schluessel+"','"+obj.name+"','"+obj.beschreibung+"')" +
          " returning *";
          if(DEBUG) console.log(query);
  query(query, (err, rs) => {
    if(err) {
      console.log(query);
      next(err)
    } else {
      let result  = {};
      result[structure['jsonName']] = rs.rows;
      console.log(result);
      res.status(200).json(result);
      }
      });
}


const getStructure = function(req) {
  let path = req.pathCall;
  let structure = dataStructure[path];
  return structure;

}

const getAllFromTable = function(req, res, next) {

  let structure = getStructure(req);
  if(DEBUG) {
    console.log("Found Structure-Object: ");
    console.log(structure);
  }
  if(structure === undefined) return res.status(404).send();
    query(selectAllFromTable(structure.tableName), (err, rs) => {
      if(err) next(err)
      else {
        if(DEBUG) console.log(res);
        let result  = {};
        result[structure['jsonName']] = rs.rows;
        console.log(result);
        res.status(200).json(result);
      }
  })
}


module.exports = {
  query,
  selectAllFromTable,
  selectAllFromTableByFieldValue,
  deleteItemFromTable,
  updateNameKeyObject,
  insertNameKeyObject,
  deleteNameKeyObject,
  getAllFromTable,
  getStructure
};
