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

toDoRouter.get('/', (req, res) => {
    let qText = 'Select * FROM "todolist" ORDER BY completed ASC;';

    pool.query(qText)
        .then(result => {
            res.send(result.rows);
        })
        .catch(err => {
            console.log('Error trying to get TO DO list', err);
            res.sendStatus(500);
        });
});

toDoRouter.post('/', (req, res) => {
    const newToDoList = req.body;
    const qText = `INSERT INTO "toDoList" ("task", "notes", "completed")
    VALUES ($1, $2, $3)`;
    pool.query(qText, [newToDoList.task, newToDoList.notes, newToDoList.completed])
        .then(res.sendStatus(200))
        .catch((error) => {
            console.log(error);
            res.sendStatus(500)
        })
});

toDoRouter.put('/:id', (req, res) => {
    const toDoId = req.params.id;

    let queryText = `
    UPDATE "todolist"
    SET "completed" = NOT "completed"
    WHERE id = $1;`;

    pool.query(queryText, [toDoId])
        .then(dbResponse => {
            console.log('Updated row count: ',dbResponse.rowCount);
            res.sendStatus(202);
        })
        .catch(error => {
            console.log('There was an error updating the record.', error);
            res.sendStatus(500);
        });
})

toDoRouter.delete('/:id', (req, res) => {
    console.log('Request URL: ', req.url);
    console.log('Request route parameters: ', req.params);
    const toDoId = req.params.id;
    console.log(`to do id is ${toDoId}`);

    const qText = `DELETE FROM "todolist" WHERE id =$1`;

    pool.query(qText, [toDoId])
        .then(dbResponse => {
            console.log(`${dbResponse.rowCount === 1} was deleted from database`);
            res.sendStatus(201)
        })
        .catch(error => {
            console.log(`Could not delete task with id ${toDoId}.`, error);
            res.sendStatus(500);
        });
});

module.exports = toDoRouter;