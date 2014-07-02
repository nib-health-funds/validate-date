# date-validators

Re-usable date validation methods.

See the list of accepted formats at [moment's documentation](http://momentjs.com/docs/#/parsing/string-format/).

## Installation

    component install nib-health-funds/date-validators

## Methods

### .valid(format : string)

Returns a method that will return whether a value is a string, adheres to the specified format and parts are in a valid range for a date (e.g. 13 is an invalid month).

### .lessThan(date : Date|moment, format : string)

Returns a method that will return whether a value is valid and less than the specified date.

### .greaterThan(date : Date|moment, format : string)

Returns a method that will return whether a value is valid and greater than the specified date.

## Usage

    var
        now = new Date(),
        validators = require('date-validators')
    ;
    
    validators.valid('YYYY-MM-DD')('asdfsadf');                 //false
    validators.valid('YYYY-MM-DD')('01/01/2015');               //false
    validators.valid('YYYY-MM-DD')('2015-01-01');               //true
    
    validators.lessThan(now, 'YYYY-MM-DD')('2015-01-01');       //false (at least for *now*)
    validators.lessThan(now, 'YYYY-MM-DD')('2012-01-01');       //true
    
    validators.greaterThan(now, 'YYYY-MM-DD')('2012-01-01');    //false
    validators.greaterThan(now, 'YYYY-MM-DD')('2015-01-01');    //true (at least for *now*)
    