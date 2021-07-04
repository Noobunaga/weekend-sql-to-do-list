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
    idleTimeoutMillis: 30000,
};

const pool = new Pool(config);

pool.on('connect', (client) => {
    console.log('PostgeSQL connected');
});

pool.on('error', (err, client) => {
    console.log('Unexpected error, client nowhere to be found', err);
});

taskRouter.get('/', (req, res) => {
    let qText = 'SELECT * FROM "todolist" ORDER BY id ASC;';

    pool.query(qText)
        .then(result => {
            res.send(result.rows);
        })
        .catch(err => {
            console.log('Error trying to get TO DO list', err);
            res.sendStatus(500);
        });
});

taskRouter.post('/', (req, res) => {
    const newTaskList = req.body;
    const qText = `INSERT INTO "todolist" ("task", "notes", "completed")
    VALUES ($1, $2, $3)`;
    pool.query(qText, [newTaskList.task, newTaskList.notes, newTaskList.completed])
        .then(res.sendStatus(200))
        .catch((error) => {
            console.log(error);
            res.sendStatus(500)
        })
});

taskRouter.put('/:id', (req, res) => {
    const taskId = req.params.id;

    let qText = `
    UPDATE "todolist"
    SET "completed" = NOT "completed"
    WHERE id = $1;`;

    pool.query(qText, [taskId])
        .then(dbResponse => {
            console.log('Updated row count: ',dbResponse.rowCount);
            res.sendStatus(202);
        })
        .catch(error => {
            console.log('There was an error updating the record.', error);
            res.sendStatus(500);
        });
})

taskRouter.delete('/:id', (req, res) => {
    console.log('Request URL: ', req.url);
    console.log('Request route parameters: ', req.params);
    const taskId = req.params.id;
    console.log(`to do id is ${taskId}`);

    const qText = `DELETE FROM "todolist" WHERE id =$1;`;

    pool.query(qText, [taskId])
        .then(dbResponse => {
            console.log(`${dbResponse.rowCount === 1} was deleted from database`);
            res.sendStatus(201)
        })
        .catch(error => {
            console.log(`Could not delete task with id ${toDoId}.`, error);
            res.sendStatus(500);
        });
});

module.exports = taskRouter;