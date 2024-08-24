const express = require('express');
const router = express();
const {getGoals, delGoal, postGoal} = require('../repository/goalRepo');
const winston = require('winston');

const logger = winston.createLogger({level: 'info'});


router.get('/:email', async function(req, res, next){
    const {email} = req.params;

    logger.info(`Received request to get user with email: ${email}`);

    try{
        const response = await getGoals({email});
        res.status(200).send(JSON.stringify(response));
    }
    catch(err){
        console.log(err);
    }
});

router.delete('/:email', async function(req, res, next){
    const {email} = req.params;

    logger.info(`Received request to delete user with email: ${email}`);

    try{
        const response = await delGoal({email});
        res.status(200).send(JSON.stringify(response));
    }
    catch(err){
        console.log(err);
    }
});

router.post('/', async function(req, res, next){
    const {email, items} = req.body;

    logger.info(`Received request to add goal to : ${email}`);

    try{
        const response = await postGoal({email, items});
        res.status(200).send(JSON.stringify(response));
    }
    catch(err){
        console.log(err);
    }
});

module.exports = router;