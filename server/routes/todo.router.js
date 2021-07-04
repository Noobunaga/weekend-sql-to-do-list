const { Router } = require('express');
const express = require('express');
const taskRouter = express.Router();

const pg = require('pg');
const Pool = pg.Pool;
const config = {
    database: 'weekend-to-do-app',
    host: 'localhost',
    port: 5432,
    max: 10,
};

const pool = new Pool(config);

pool.on('connect', (client) => {
    console.log('PostgeSQL connected');
});

pool.on('error', (err, client) => {
    console.log('Unexpected error, client nowhere to be found', err);
});

toDoRouter.get('/', (req, res) =>{
    let qText = 'Select * FROM "todolist" ORDER BY completed ASC;';

    pool.query(qtext)
        .then(result => {
            res.send(result.rows);
        })
        .catch(err => {
            console.log('Error trying to get TO DO list', err);
            res.sendStatus(500);
        });
});

