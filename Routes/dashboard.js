const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const userQuery = require('../models/user');
const orm = require('../config/orm');
const mkdirp = require('mkdirp');
const { nanoid } = require('nanoid');
const fs = require('fs');


// route to load dashboard form page
router.get('/:userId', (req, res) => {
    res.render('dashboard', { layout: 'form' });
});

// route to recieve user's dashboard submission, save to db and redirect to message page
router.post('/:userId', async(req, res) => {
    try {
        const userId = req.params.userId;
        const date = new Date().toISOString().split('T')[0];
        const { mood, water, steps, sleep, exercise, calorie, alcohol, coffee } = req.body;
        console.log(`mood: ${mood} water: ${water} steps: ${steps} sleep: ${sleep} exercise: ${exercise} date :${date}`);
        const user = await orm.Users.findOne({ where: { sessionId: userId }, raw: true });
        userQuery.createStress(user.id, mood, sleep, exercise, coffee, date);
        userQuery.createHealth(user.id, water, alcohol, steps, calorie, date);
        return res.send({ redirect: `/dashboard/${userId}/message` });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, payload: { mesaage: 'failed to save to database' } });
    }
});

// route to load affirmation page from an api call. Need to get name from db to personalise experience
router.get('/:userId/message', async(req, res) => {
    try {
        const userId = req.params.userId;
        const response = await fetch('https://www.affirmations.dev/');
        if (response.ok) {
            const payload = await response.json();
            console.log(payload);
            const getDataUser = await orm.Users.findOne({ where: { sessionId: userId }, raw: true });
            console.log(getDataUser);
            res.render('message', { layout: 'logs', payload, getDataUser });
        }
    } catch (error) {
        console.log(error);
        res.status(503).render('message', { layout: 'logs', message: 'Unable to fetch data...' });
    }
});

router.post('/:userId/message/', async(req, res) => {
    try {
        const userId = req.params.userId;
        const name = req.files.file.name;
        const data = req.files.file.data;
        const date = new Date().toISOString().split('T')[0];
        const photoName = `${nanoid()}${name}`;
        if (name && data) {
            const user = await orm.Users.findOne({ where: { sessionId: userId }, raw: true });
            await userQuery.createImage(user.id, photoName, data, date);
            await mkdirp('public/selfies');
            res.json({ name: photoName });
        } else {
            res.sendStatus(400);
        }
    } catch (error) {
        console.log(error);
        res.status(503).render('message', { layout: 'logs', message: 'Unable to fetch data...' });
    }
});

// route to send user history dashboard
router.get('/:userId/history', (req, res) => {
    res.render('history', { layout: 'logs' });
});

// route to send user mood logs
router.get('/:userId/mood', async(req, res) => {
    try {
        const userId = req.params.userId;
        const user = await orm.Users.findOne({ where: { sessionId: userId }, raw: true });
        const getData = await orm.Stress.findAll({ where: { usersId: user.id }, raw: true });
        console.log(getData);
        res.render('mood', { layout: 'logs', getData, user });
    } catch (error) {
        console.log(error);
        res.status(503).render('mood', { layout: 'logs', message: 'Unable to fetch data...' });
    }
});

// route to send user excercise logs
router.get('/:userId/exercise', async(req, res) => {
    try {
        const userId = req.params.userId;
        const user = await orm.Users.findOne({ where: { sessionId: userId }, raw: true });
        const getData = await orm.Stress.findAll({ where: { usersId: user.id }, raw: true });
        res.render('exercise', { layout: 'logs', getData, user });
    } catch (error) {
        console.log(error);
        res.status(503).render('exercise', { layout: 'logs', message: 'Unable to fetch data...' });
    }
});

// route to send user sleep logs
router.get('/:userId/sleep', async(req, res) => {
    try {
        const userId = req.params.userId;
        const user = await orm.Users.findOne({ where: { sessionId: userId }, raw: true });
        const getData = await orm.Stress.findAll({ where: { usersId: user.id }, raw: true });
        res.render('sleep', { layout: 'logs', getData, user });
    } catch (error) {
        console.log(error);
        res.status(503).render('sleep', { layout: 'logs', message: 'Unable to fetch data...' });
    }
});

// route to send user coffee logs
router.get('/:userId/coffee', async(req, res) => {
    try {
        const userId = req.params.userId;
        const user = await orm.Users.findOne({ where: { sessionId: userId }, raw: true });
        const getData = await orm.Stress.findAll({ where: { usersId: user.id }, raw: true });
        res.render('coffee', { layout: 'logs', getData, user });
    } catch (error) {
        console.log(error);
        res.status(503).render('coffee', { layout: 'logs', message: 'Unable to fetch data...' });
    }
});

// route to send user water logs
router.get('/:userId/water', async(req, res) => {
    try {
        const userId = req.params.userId;
        const user = await orm.Users.findOne({ where: { sessionId: userId }, raw: true });
        const getData = await orm.Health.findAll({ where: { usersId: user.id }, raw: true });
        res.render('water', { layout: 'logs', getData, user });
    } catch (error) {
        console.log(error);
        res.status(503).render('water', { layout: 'logs', message: 'Unable to fetch data...' });
    }
});

// route to send user alcohol logs
router.get('/:userId/alcohol', async(req, res) => {
    try {
        const userId = req.params.userId;
        const user = await orm.Users.findOne({ where: { sessionId: userId }, raw: true });
        const getData = await orm.Health.findAll({ where: { usersId: user.id }, raw: true });
        console.log(getData);
        res.render('alcohol', { layout: 'logs', getData, user });
    } catch (error) {
        console.log(error);
        res.status(503).render('alcohol', { layout: 'logs', message: 'Unable to fetch data...' });
    }
});

// route to send user steps logs
router.get('/:userId/steps', async(req, res) => {
    try {
        const userId = req.params.userId;
        const user = await orm.Users.findOne({ where: { sessionId: userId }, raw: true });
        const getData = await orm.Health.findAll({ where: { usersId: user.id }, raw: true });
        res.render('steps', { layout: 'logs', getData, user });
    } catch (error) {
        console.log(error);
        res.status(503).render('steps', { layout: 'logs', message: 'Unable to fetch data...' });
    }
});

// route to send user calories logs
router.get('/:userId/calories', async(req, res) => {
    try {
        const userId = req.params.userId;
        const user = await orm.Users.findOne({ where: { sessionId: userId }, raw: true });
        const getData = await orm.Health.findAll({ where: { usersId: user.id }, raw: true });
        res.render('calories', { layout: 'logs', getData, user });
    } catch (error) {
        console.log(error);
        res.status(503).render('calories', { layout: 'logs', message: 'Unable to fetch data...' });
    }
});

// route for redirecting to homepage
router.get('/:userId/logout', (req, res) => {
    res.redirect('/');
});

// route for deleting user db and local storage data
router.delete('/:userId', async(req, res) => {
    const userId = req.params.userId;
    // DB QUERY TO DELETE USER RECORDS AND GET EMAIL TO ADD TO RESPONSE
    const user = await orm.Users.findOne({ where: { sessionId: userId }, raw: true });
    await orm.Image.destroy({ where: { usersId: user.id }, raw: true });
    await orm.Health.destroy({ where: { usersId: user.id }, raw: true });
    await orm.Stress.destroy({ where: { usersId: user.id }, raw: true });
    res.json({ 'userId': userId });
});
router.get('/:userId/selfies', async(req, res) => {
    const userId = req.params.userId;
    const user = await orm.Users.findOne({ where: { sessionId: userId }, raw: true });
    const img = await orm.Image.findAll({ where: { usersId: user.id }, raw: true });
    await mkdirp('public/selfies');
    for (let i = 0; i < img.length; i++) {
        await fs.writeFile(`public/selfies/${img[i].imageName}`, img[i].image, (err) => {
            if (err) {
                console.log('error');
            } else {
                console.log('File created');
            }
        });
    }
    res.render('selfie', { layouts: 'logs', img });
});

module.exports = router;