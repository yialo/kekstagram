'use strict';

(function () {
  var LATENCY = 500;

  window.debounce = {
    create: function (callback) {
      var lastTimeout;
      return function () {
        if (lastTimeout) {
          clearTimeout(lastTimeout);
        }
        lastTimeout = setTimeout(callback, LATENCY);
      };
    },
  };
}());
