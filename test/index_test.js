var assert      = require('assert');
var moment      = require('moment');
var validators  = require('../index');

describe('#date', function() {

  describe('#valid', function() {

    var validator = validators.valid('YYYY-MM-DD');

    it('should return false', function() {
      assert(!validator(null));
      assert(!validator(true));
      assert(!validator(false));
      assert(!validator(1));
      assert(!validator({}));
      assert(!validator({ value: new Date()}));
      assert(!validator('sdfa'));
      assert(!validator('22/01/2012'));
    });

    it('should return true', function() {
      assert(validator('1900-01-01'));
      assert(validator('1948-11-11'));
      assert(validator('2014-07-02'));
    });

  });

  describe('#lessThan', function() {

    var validator = validators.lessThan(moment('2015-01-01'), 'YYYY-MM-DD');

    it('should return false', function() {
      assert(!validator('2015-01-01'));
      assert(!validator('2015-01-02'));
      assert(!validator('2015-12-31'));
      assert(!validator('2016-01-01'));

    });

    it('should return true', function() {
      assert(validator('2014-12-31'));
      assert(validator('2014-01-01'));
      assert(validator('2013-05-10'));
    });

  });

  describe('#greaterThan', function() {

    var validator1 = validators.greaterThan(moment('2015-01-01'), 'YYYY-MM-DD');

    it('should return false', function() {
      assert(!validator1('2015-01-01'));
      assert(!validator1('2014-12-31'));
      assert(!validator1('2014-01-01'));
      assert(!validator1('2013-05-10'));
    });

    it('should return true', function() {
      assert(validator1('2015-01-02'));
      assert(validator1('2015-12-31'));
      assert(validator1('2016-01-01'));
    });

  });

});