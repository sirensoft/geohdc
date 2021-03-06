var express = require('express')
var router = express.Router();
var user = new require('../models/user')
var mUser = new user();
var tokenCheck = require('../modules/tokencheck')

router.use(tokenCheck)

router.get('/person', async(req, res) => {
    var rows = await mUser.list();
    res.status(200).json(rows[0])
})

module.exports = router