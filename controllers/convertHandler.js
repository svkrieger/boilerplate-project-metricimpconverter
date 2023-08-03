function ConvertHandler() {
  let regEx = /^((\d*\.?\d*)(\/?)(\d*\.?\d*))(L|gal|mi|km|lbs|kg)$/

  this._validateFraction = function(numerator, denominator) {
    if (numerator === '') {
      throw new Error('No numerator provided for fraction.')
    } else if (denominator === '') {
      throw new Error('No denominator provided for fraction.')
    } else if (parseFloat(denominator) === 0) {
      throw new Error('Cannot devide by 0.')
    }
  }
  
  this.getNum = function(input) {
    let number = input.match(/^((\d*\.?\d*)(\/?)(\d*\.?\d*))[a-zA-Z]*$/)
    let result

    if (number === null) throw new Error('invalid number')

    if (number[1] === '') {
      result = 1
    } else if (number[3]) {
      this._validateFraction(number[2], number[4])
      result = parseFloat(number[2]) / parseFloat(number[4])
    } else {
      result = parseFloat(number[1])
    }

    return result
  };
  
  this.getUnit = function(input) {
    let unit = input.match(/^[^a-zA-Z]*(L|l|GAL|gal|MI|mi|KM|km|LBS|lbs|KG|kg)$/)

    if (unit === null) {
      throw new Error('invalid unit')
    }
    
    if (unit[1].length > 1) {
      unit[1] = unit[1].toLowerCase()
    } else {
      unit[1] = unit[1].toUpperCase()
    }
    return unit[1];
  };
  
  this.getReturnUnit = function(initUnit) {
    initUnit = initUnit.toLowerCase()
    switch (initUnit) {
      case 'kg':
        return 'lbs'
      case 'lbs':
        return 'kg'
      case 'km':
        return 'mi'
      case 'mi':
        return 'km'
      case 'l':
        return 'gal'
      case 'gal':
        return 'L'
    }
  };

  this.spellOutUnit = function(unit) {
    unit = unit.toLowerCase()
    switch (unit) {
      case 'kg':
        return 'kilograms'
      case 'lbs':
        return 'pounds'
      case 'km':
        return 'kilometers'
      case 'mi':
        return 'miles'
      case 'l':
        return 'liters'
      case 'gal':
        return 'gallons'
    }
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    initUnit = initUnit.toLowerCase()
    let result

    switch (initUnit) {
      case 'kg':
        result = (initNum / lbsToKg).toFixed(5)
        break
      case 'lbs':
        result = (initNum * lbsToKg).toFixed(5)
        break
      case 'km':
        result = (initNum / miToKm).toFixed(5)
        break
      case 'mi':
        result = (initNum * miToKm).toFixed(5)
        break
      case 'l':
        result = (initNum / galToL).toFixed(5)
        break
      case 'gal':
        result = (initNum * galToL).toFixed(5)
    }

    return Number(result)
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`
  };
  
}

module.exports = ConvertHandler;
