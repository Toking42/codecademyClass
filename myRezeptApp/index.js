
const express = require('express');
const router = express.Router();
const pg = require('pg');
const path = require('path');
const { Pool } = require('pg');
	const pool = new Pool({
  		user: 'postgres',
  		host: 'localhost',
  		database: 'hogwarts',
  		password: 'postgres',
  		port: 5432
	});	


pool.on('error', (err, client) => {
	console.error('Unexpected error on idle client', err)
	process.exit(-1)
});

router.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/api/v1/person', function(req, res, next) {
	const results = [];
	pool.connect((err, client, done) => {
		if (err) throw err
		client.query('SELECT * FROM v_person ORDER BY name ASC;', (err, rs) => {
			
			for(var i= 0; i<rs.rows.length; i++) {
				results.push(rs.rows[i]);
			}
  		console.log(err, rs);
  		done();
  		return res.json(results);

  		});
  		//done();
	})
});


router.get('/api/v1/person/:person_id', function(req, res, next) {
	const results = [];
	const id = req.params.person_id;

	pool.connect((err, client, done) => {
		if (err) throw err
		client.query('SELECT * FROM v_person WHERE id = $1;',[id], (err, rs) => {
	
			for(var i= 0; i<rs.rows.length; i++) {
				results.push(rs.rows[i]);
			}
		console.log(err, rs);
		done();
		return res.json(results);

  		});
	})
});


router.get('/api/v1/schuljahr', function(req, res, next) {
	const results = [];
	pool.connect((err, client, done) => {
		if (err) throw err
		client.query('SELECT * FROM schuljahr ORDER BY von ASC;', (err, rs) => {
			
			for(var i= 0; i<rs.rows.length; i++) {
				results.push(rs.rows[i]);
			}
  		console.log(err, rs);
  		done();
  		return res.json(results);

  		});
  		//done();
	})
});


router.get('/api/v1/punkte/:schuljahr', function(req, res, next) {
	const results = [];
	const id = req.params.schuljahr;
	const group = req.query.group;

	var queryString = 'SELECT * FROM v_hauspunkte_small WHERE schuljahr = $1;';

	if(group==1) queryString = 'SELECT schuljahr, haus, sum(punkte) FROM v_hauspunkte WHERE schuljahr = $1 GROUP BY schuljahr, haus;'
	
	pool.connect((err, client, done) => {
		if (err) throw err
		client.query(queryString,[id], (err, rs) => {
	
			for(var i= 0; i<rs.rows.length; i++) {
				results.push(rs.rows[i]);
			}
		console.log(err, rs);
		done();
		return res.json(results);

  		});
	})
});


module.exports = router;
