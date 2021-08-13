const express = require('express');
const LogEntry = require('../models/LogEntry');

const Router = express.Router();

Router.get('/', async (req, res, next) => {
    try {
        const logs = await LogEntry.find()
        res.send(logs);
    } catch (error) {
        next(error);
    }
});

Router.post('/', async (req, res, next) => {
    try {
        const logEntry = new LogEntry(req.body);
        const created = await logEntry.save();
        res.json(created)
    } catch (error) {
        if (error.name === 'ValidationError') res.status(400);
        next(error);
    }
})




module.exports = Router