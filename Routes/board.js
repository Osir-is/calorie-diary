const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const userQuery = require('../models/user');
const orm = require('../config/orm');
const mkdirp = require('mkdirp');
const { nanoid } = require('nanoid');
const fs = require('fs');



router.get('/:userId', (req, res) => {
    res.render('user', { layout: 'form' });
});


router.post('/:userId', async(req, res) => {
    try {
        const userId = req.params.userId;
        const date = new Date().toISOString().split('T')[0];
        const { breakfast, breakfastcl, lunch, lunchcl, dinner, dinnercl, snacks, snackscl } = req.body;
        console.log(`breakfast: ${breakfast} berakfastcl: ${breakfastcl} lunch: ${lunch} lunchcl: ${lunchcl} dinner: ${dinner} dinnercl: ${dinnercl} snacks: ${snacks} snackscl: ${snackscl}`);
        const user = await orm.Users.findOne({ where: { sessionId: userId }, raw: true });
        userQuery.createStress(user.id, mood, sleep, exercise, coffee, date);
        userQuery.createHealth(user.id, water, alcohol, steps, calorie, date);
        return res.send({ redirect: `/dashboard/${userId}/message` });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, payload: { mesaage: 'failed to save to database' } });
    }
});




router.get('/:userId/history', (req, res) => {
    res.render('history', { layout: 'logs' });
});


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


router.get('/:userId/logout', (req, res) => {
    res.redirect('/');
});


router.delete('/:userId', async(req, res) => {
    const userId = req.params.userId;

    const user = await orm.Users.findOne({ where: { sessionId: userId }, raw: true });
    await orm.Image.destroy({ where: { usersId: user.id }, raw: true });
    await orm.Health.destroy({ where: { usersId: user.id }, raw: true });
    await orm.Stress.destroy({ where: { usersId: user.id }, raw: true });
    res.json({ 'userId': userId });
});


module.exports = router;