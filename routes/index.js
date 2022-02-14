const express = require('express')
const router = express.Router()

const setDict = require('./modules/setDict')

router.use('/setDict', setDict)

module.exports = router
