const express = require('express')
const notesRouter = require('./notesRouter');
const myLogger = require('../middleware/middleware')


const app = express()

app.use('/notes', notesRouter);
app.use(myLogger)


module.exports =app;