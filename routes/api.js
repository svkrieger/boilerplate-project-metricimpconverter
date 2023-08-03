'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get((req, res) => {
    const input = req.query.input
    let initNum
    let initUnit
    let invalidNumber = false
    let invalidUnit = false

    try {
      initNum = convertHandler.getNum(input)
    } catch (error) {
      invalidNumber = true
    }

    try {
      initUnit = convertHandler.getUnit(input)
    } catch (error) {
      invalidUnit = true
    }

    if (invalidNumber && invalidUnit) {
      res.end('invalid number and unit')
    } else if (invalidNumber) {
      res.end('invalid number')
    } else if (invalidUnit) {
      res.end('invalid unit')
    } else {
      const returnNum = convertHandler.convert(initNum, initUnit)
      const returnUnit = convertHandler.getReturnUnit(initUnit)
      const returnString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit)
    
      res.json({'initNum': initNum, 'initUnit': initUnit, 'returnNum': returnNum, 'returnUnit': returnUnit, 'string': returnString})
    }
  })
};
