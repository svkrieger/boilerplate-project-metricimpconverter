const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    suite('getUnit', () => {
        test('should return the unit when number and unit is provided', () => {
            assert.equal(convertHandler.getUnit('3.2km'), 'km')
        })

        test('should return the unit when unit is provided', () => {
            assert.equal(convertHandler.getUnit('km'), 'km')
        })

        test('should return the unit when fraction is provided ', () => {
            assert.equal(convertHandler.getUnit('2/3km'), 'km')
        })

        test('should return the unit for supported unit L', () => {
            assert.equal(convertHandler.getUnit('L'), 'L')
        })

        test('should return the unit for supported unit km', () => {
            assert.equal(convertHandler.getUnit('km'), 'km')
        })

        test('should return the unit for supported unit gal', () => {
            assert.equal(convertHandler.getUnit('gal'), 'gal')
        })

        test('should return the unit for supported unit mi', () => {
            assert.equal(convertHandler.getUnit('mi'), 'mi')
        })

        test('should return the unit for supported unit lbs', () => {
            assert.equal(convertHandler.getUnit('lbs'), 'lbs')
        })

        test('should return the unit for supported unit kg', () => {
            assert.equal(convertHandler.getUnit('kg'), 'kg')
        })

        test('should return an error for double provided unit', () => {
            assert.throws(() => convertHandler.getUnit('LL'))
        })

        test('should return an error when no unit was provided', () => {
            assert.throws(() => convertHandler.getUnit('23'))
        })

        test('should return an error when an invalid unit was provided', () => {
            assert.throws(() => convertHandler.getUnit('xy'))
        })

        test('should should accept lowercase l, but return L', () => {
            assert.strictEqual(convertHandler.getUnit('l'), 'L')
        })

        test('should should accept uppercase unit like KG, but return kg', () => {
            assert.strictEqual(convertHandler.getUnit('KG'), 'kg')
        })
    })

    suite('getNum', () => {
        test('should correctly read a whole number input', () => {
            assert.strictEqual(convertHandler.getNum('3kg'), 3)
        })

        test('should correctly read a decimal number input', () => {
            assert.strictEqual(convertHandler.getNum('3.5kg'), 3.5)
        })

        test('should correctly read a fractal input', () => {
            assert.strictEqual(convertHandler.getNum('1/2kg'), 0.5)
        })

        test('should correctly read a fractal input with decimals', () => {
            assert.strictEqual(convertHandler.getNum('1.2/0.5kg'), 2.4)
        })

        test('should return an error when a double fraction was provided', () => {
            assert.throws(() => convertHandler.getNum('1/2/3kg'))
        })

        test('should default to 1 when no numerical value was provided', () => {
            assert.strictEqual(convertHandler.getNum('kg'), 1)
        })

        test('should throw an error if fractal without numerator was provided', () => {
            assert.throws(() =>convertHandler.getNum('/2kg'))
        })

        test('should throw an error if fractal without denominator was provided', () => {
            assert.throws(() =>convertHandler.getNum('1/kg'))
        })

        test('should throw an error if fractal was provided with a denominator of 0', () => {
            assert.throws(() =>convertHandler.getNum('1/0kg'))
        })
        
        test('should return an error when getUnit returns an error', () => {
            assert.throws(() => convertHandler.getUnit('2222xy'))
        })
    })

    suite('getReturnUnit', () => {
        test('should return lbs when kg was given', () => {
            assert.equal(convertHandler.getReturnUnit('kg'), 'lbs')
        })

        test('should return kg when lbs was given', () => {
            assert.equal(convertHandler.getReturnUnit('lbs'), 'kg')
        })

        test('should return mi when km was given', () => {
            assert.equal(convertHandler.getReturnUnit('km'), 'mi')
        })

        test('should return km when mi was given', () => {
            assert.equal(convertHandler.getReturnUnit('mi'), 'km')
        })

        test('should return gal when L was given', () => {
            assert.equal(convertHandler.getReturnUnit('L'), 'gal')
        })

        test('should return L when gal was given', () => {
            assert.equal(convertHandler.getReturnUnit('gal'), 'L')
        })
    })

    suite('spellOutUnit', () => {
        test('should return liters when L was given', () => {
            assert.equal(convertHandler.spellOutUnit('L'), 'liters')
        })

        test('should return gallons when gal was given', () => {
            assert.equal(convertHandler.spellOutUnit('gal'), 'gallons')
        })

        test('should return kilometers when km was given', () => {
            assert.equal(convertHandler.spellOutUnit('km'), 'kilometers')
        })

        test('should return miles when mi was given', () => {
            assert.equal(convertHandler.spellOutUnit('mi'), 'miles')
        })

        test('should return kilograms when kg was given', () => {
            assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms')
        })

        test('should return pounds when lbs was given', () => {
            assert.equal(convertHandler.spellOutUnit('lbs'), 'pounds')
        })
    })

    suite('convert', () => {
        test('should correctly convert kg to lbs', () => {
            assert.strictEqual(convertHandler.convert(1, 'kg'), 2.20462)
        })

        test('should correctly convert lbs to kg', () => {
            assert.strictEqual(convertHandler.convert(1, 'lbs'), 0.45359)
        })

        test('should correctly convert km to mi', () => {
            assert.strictEqual(convertHandler.convert(1, 'km'), 0.62137)
        })

        test('should correctly convert mi to km', () => {
            assert.strictEqual(convertHandler.convert(1, 'mi'), 1.60934)
        })

        test('should correctly convert L to gal', () => {
            assert.strictEqual(convertHandler.convert(1, 'L'), 0.26417)
        })

        test('should correctly convert gal to L', () => {
            assert.strictEqual(convertHandler.convert(1, 'gal'), 3.78541)
        })
    })

    suite('getString', () => {
        test('should return the correct string', () => {
            assert.strictEqual(convertHandler.getString(1, 'kg', '2.20462', 'lbs'), '1 kilograms converts to 2.20462 pounds')
        })
    })
});