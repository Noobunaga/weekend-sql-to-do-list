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
}