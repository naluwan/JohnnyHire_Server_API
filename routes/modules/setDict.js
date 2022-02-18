const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')

// 徵厲害新增職缺dict
router.post('/jh/position', (req, res) => {
  const {position_name, regex_name} = req.query

  const fd = fs.openSync(path.resolve(__dirname, '/home/bill/桌面/Work/BF25_JohnnyHire/dict/position.txt'), 'as+', 0o666)
  const dict = fs.readFileSync(fd, 'utf-8', 'as+')
  const splitDict = dict.split(' 20\n')

  const updateDict = positionCheck(splitDict, position_name, regex_name, 'position')

  fs.closeSync(fd)

  res.status(200).send(updateDict)
})

// 徵厲害新增公司資訊dict
router.post('/jh/cpnyInfo', (req, res) => {
  const {info_name, regex_name} = req.query

  const fd = fs.openSync(path.resolve(__dirname, '/home/bill/桌面/Work/BF25_JohnnyHire/dict/cpnyInfo.txt'), 'as+', 0o666)

  const dict = fs.readFileSync(fd, 'utf-8', 'as+')
  const splitDict = dict.split(' 20\n')

  const updateDict = positionCheck(splitDict, info_name, regex_name, 'cpnyInfo')

  fs.closeSync(fd)

  res.status(200).send(updateDict)
})

// 檢查重複並呼叫appendFile()來寫入資料
function positionCheck(dict, name, regex_name, category){
  const nameCheck = dict.some(item => item == name)
  const regex_nameCheck = dict.some(item => item == regex_name)
  return appendFile({nameCheck, regex_nameCheck}, name, regex_name, category)
}

// 寫入資料並回傳寫入的結果
function appendFile(check, name, regex_name, category){
    const name_text = `${name} 20\n`
    const regex_name_text = `${regex_name} 20\n`
  if(!check.nameCheck){
    fs.appendFileSync(path.resolve(__dirname, `/home/bill/桌面/Work/BF25_JohnnyHire/dict/${category}.txt`), name_text, 'utf-8', '0o666', 'as+')
  }
  if(!check.regex_nameCheck){
    fs.appendFileSync(path.resolve(__dirname, `/home/bill/桌面/Work/BF25_JohnnyHire/dict/${category}.txt`), regex_name_text, 'utf-8', '0o666', 'as+')
  }

  return fs.readFileSync(path.resolve(__dirname, `/home/bill/桌面/Work/BF25_JohnnyHire/dict/${category}.txt`), 'utf-8')
}

module.exports = router
