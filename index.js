var moment = require('moment');

/**
 * Convert a value to a momentjs date if it isn't already one
 * @param   {String|Date|Moment} value
 * @returns {Moment}
 */
function toMoment(value) {

  if (typeof value === 'string' || value instanceof Date) {
    value = moment(value);
  }

  //ensure the date is valid
  if (!(value && value.isValid())) {
    throw Error('Invalid date');
  }

  return value;
}

/**
 * Parse the value into a date according to the specified format
 * @param   {string} value
 * @param   {string} format
 * @returns {Date|null}
 */
function parse(value, format) {
  format = format || 'YYYY-MM-DD';

  //ensure the value is a string
  if (typeof value !== 'string') {
    return null;
  }

  return moment(value, format, true);
}

module.exports = {

  /**
   * Get whether the value is a valid date
   * @param   {string}        format
   * @returns {function(*):boolean}
   */
  valid: function(format) {
    return function(value) {
      var date = parse(value, format);
      return date && date.isValid();
    };
  },

  /**
   * Get whether the value is less than the specified date
   * @param   {Date}          date    The date
   * @param   {string}        format  The date format of the value
   * @returns {function(*):boolean}
   */
  lessThan: function(date, format) {

    //convert the date into a moment
    date = toMoment(date);

    return function(value) {

      //parse the value
      var value = parse(value, format);

      //if the moment is later than the moment you are passing to moment.fn.diff, the return value will be negative.
      var diff = date.diff(value);
      return (diff > 0);
    }
  },

  /**
   * Get whether the value is less than or equal to the specified date
   * @param   {Date}          date    The date
   * @param   {string}        format  The date format of the value
   * @returns {function(*):boolean}
   */
  lessThanEq: function(date, format) {

    //convert the date into a moment
    date = toMoment(date);

    return function(value) {

      //parse the value
      var value = parse(value, format);

      //if the moment is later than the moment you are passing to moment.fn.diff, the return value will be negative.
      var diff = date.diff(value);
      return (diff >= 0);
    }
  },

  /**
   * Get whether the value is greater than the specified date
   * @param   {Date}          date    The date
   * @param   {string}        format  The date format of the value
   * @returns {function(*):boolean}
   */
  greaterThan: function(date, format) {

    //convert the date into a moment
    date = toMoment(date);

    return function(value) {

      //parse the value
      var value = parse(value, format);

      //if the moment is later than the moment you are passing to moment.fn.diff, the return value will be negative.
      var diff = date.diff(value);
      return (diff < 0);
    }
  },

  /**
   * Get whether the value is greater than or equal to the specified date
   * @param   {Date}          date    The date
   * @param   {string}        format  The date format of the value
   * @returns {function(*):boolean}
   */
  greaterThanEq: function(date, format) {

    //convert the date into a moment
    date = toMoment(date);

    return function(value) {

      //parse the value
      var value = parse(value, format);

      //if the moment is later than the moment you are passing to moment.fn.diff, the return value will be negative.
      var diff = date.diff(value);
      return (diff <= 0);
    }
  }

};