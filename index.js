/*!
 * time-stamp <https://github.com/jonschlinkert/time-stamp>
 *
 * Copyright (c) 2015-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';

/**
 * Parse the given pattern and return a formatted
 * timestamp.
 *
 * @param  {String} `pattern` Date pattern.
 * @param  {Date} `date` Date object.
 * @return {String}
 */

module.exports = function(pattern, date) {
  if (typeof pattern !== 'string') {
    date = pattern;
    pattern = 'YYYY-MM-DD';
  }

  if (!date) date = new Date();

  function timestamp() {
    var regex = /(?=(YYYY|YY|MM|DD|HH|mm|ss|ms))\1([:\/]*)/;
    var match = regex.exec(pattern);

    if (match) {
      var increment = method(match[1]);
      var val = '00' + String(date[increment[0]]() + (increment[2] || 0));
      var res = val.slice(-increment[1]) + (match[2] || '');
      pattern = pattern.replace(match[0], res);
      timestamp();
    }
  }

  timestamp(pattern);
  return pattern;
};

function method(key) {
  return ({
    YYYY: ['getUTCFullYear', 4],
    YY: ['getUTCFullYear', 2],
    // getMonth is zero-based, thus the extra increment field
    MM: ['getUTCMonth', 2, 1],
    DD: ['getUTCDate', 2],
    HH: ['getUTCHours', 2],
    mm: ['getUTCMinutes', 2],
    ss: ['getUTCSeconds', 2],
    ms: ['getUTCMilliseconds', 3]
  })[key];
}
