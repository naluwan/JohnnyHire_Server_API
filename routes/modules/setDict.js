const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')

// 徵厲害新增職缺dict
router.post('/jh/position', (req, res) => {
  const {position_name} = req.query
  const text = `${position_name} 20\n`

  fs.appendFileSync(path.resolve(__dirname, '/home/bill/桌面/Work/BF25_JohnnyHire/dict/position.txt'), text, 'utf-8', '0o666', 'as+')
  const dict = fs.readFileSync(path.resolve(__dirname, '/home/bill/桌面/Work/BF25_JohnnyHire/dict/position.txt'), 'utf-8')

  res.status(200).send(dict)
})

module.exports = router
