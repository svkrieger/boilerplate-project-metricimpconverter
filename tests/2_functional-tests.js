const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    test('should convert a valid input such as 10L', function (done) {
        chai
          .request(server)
          .keepOpen()
          .get('/api/convert')
          .query({input: '10L'})
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.strictEqual(res.text, '{"initNum":10,"initUnit":"L","returnNum":2.64172,"returnUnit":"gal","string":"10 liters converts to 2.64172 gallons"}');
            done();
          });
      });

      test('should return an error message when invalid unit was provided', function (done) {
        chai
          .request(server)
          .keepOpen()
          .get('/api/convert')
          .query({input: '10g'})
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.strictEqual(res.text, 'invalid unit');
            done();
          });
      });

      test('should return an error message when invalid number was provided', function (done) {
        chai
          .request(server)
          .keepOpen()
          .get('/api/convert')
          .query({input: '3/7.2/4kg'})
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.strictEqual(res.text, 'invalid number');
            done();
          });
      });

      test('should return an error message when invalid number and unit was provided', function (done) {
        chai
          .request(server)
          .keepOpen()
          .get('/api/convert')
          .query({input: '3/7.2/4kgg'})
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.strictEqual(res.text, 'invalid number and unit');
            done();
          });
      });

      test('should use default of 1 when no number was provided', function (done) {
        chai
          .request(server)
          .keepOpen()
          .get('/api/convert')
          .query({input: 'kg'})
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.strictEqual(res.text, '{"initNum":1,"initUnit":"kg","returnNum":2.20462,"returnUnit":"lbs","string":"1 kilograms converts to 2.20462 pounds"}');
            done();
          });
      });
});
