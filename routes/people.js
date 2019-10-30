const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const Person = require('../models/Person');
const { setPagination, verityToken } = require('../helpers');

router.get('/', verityToken, async (req, res, next) => {
    try {
        const people = await Person.find();
        res.status(200).json({ results: people });
    } catch (err) {
        res.sendStatus(412);
    }
});

// pagination route
router.get('/pagination', verityToken, setPagination, async (req, res, next) => {
    try {
        const persons = await Person.find({}, {}, req.pagiQuery);
        res.status(200).json({ results: persons });
    } catch (err) {
        res.sendStatus(412);
    }
});

router.get('/:id', verityToken, async (req, res, next) => {
    try {
        const person = await Person.findById({ _id: req.params.id });
        res.status(200).json({ results: person });
    } catch (err) {
        res.sendStatus(412);
    }
});

router.post('/login', async (req, res, next) => {
    try {
        const user = {
            username: "tommy",
            email: 'tomy@t.com'
        }
        const token = await jwt.sign(user, 'secretkey');
        res.status(200).json({ key: token });
    } catch (err) {
        res.sendStatus(412);
    }
})

router.post('/person', verityToken, async (req, res, next) => {
    try {
        const person = new Person({
            name: req.body.name,
            age: parseInt(req.body.age),
            sex: req.body.sex,
            occupation: req.body.occupation
        });
        const newPerson = await person.save();
        res.status(200).json({ results: newPerson });
    } catch (err) {
        res.sendStatus(412);
    }
});

router.patch('/person/:id', verityToken, async (req, res, next) => {
    try {
        const updatedPerson = await Person.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body }, { upsert: true, new: true });
        res.status(200).json({ results: updatedPerson });
    } catch (err) {
        res.sendStatus(412);
    }
});

router.delete('/person/:id', verityToken, async (req, res, next) => {
    try {
        const deletedPerson = await Person.findByIdAndUpdate({ _id: req.params.id });
        res.status(204);
    } catch (err) {
        res.sendStatus(412);
    }
});


module.exports = router;