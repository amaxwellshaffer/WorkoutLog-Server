const router = require('express').Router();
const Log = require('../models/log');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validateSession = require('../middleware/validateSession');

router.get('/test', (req, res) =>{
    res.send('test whatever');
});

// CREATE NEW LOG
router.post('/', validateSession, (req, res) => {
    Log.create({
        description: req.body.description,
        definition: req.body.definition,
        result: req.body.result,
        owner_id: req.user.id
    })
    .then(log => res.status(200).json({Message: 'log successfully posted', log}))
    .catch(err => res.status(500).json({message: 'log posting failed', error: err}))
});

// SEE ALL LOGS FOR AN INDIVIDUAL USER
router.get('/', validateSession, (req, res) => {

    Log.findAll({
        where: {
            owner_id: req.user.id
        }
    })
    .then(logs => res.status(200).json({logs}))
    .catch(err => res.status(500).json({message: 'no logs found', error: err}))
});

// GET INDIVIDUAL LOGS FOR USER BY :ID
router.get('/:id', validateSession, (req, res) => {

    Log.findAll({
        where: {
            id: req.params.id,
            owner_id: req.user.id
        }
    })
    .then(logs => res.status(200).json({logs}))
    .catch(err => res.status(500).json({message: 'no logs found', error: err}))
});

// UPDATE ENTRIES BY ID, USER MUST OWN
router.put('/:id', validateSession, (req, res) => {

    Log.update(req.body, {where: {id: req.params.id, owner_id: req.user.id}})
        .then(update => res.status(200).json({message: 'log updated', update}))
        .catch(err => res.status(500).json({message: 'could not update log', error: err}))
});

// DELETE A POST, USER MUST OWN
router.delete('/:id', validateSession, (req,res) => {
    Log.destroy({where: {id: req.params.id, owner_id: req.user.id}})
        .then(deleted => res.status(200).json({message: 'log successfully deleted', deleted}))
        .catch(err => res.status(500).json({message: 'log could not be deleted', error: err}))
});



module.exports = router;

