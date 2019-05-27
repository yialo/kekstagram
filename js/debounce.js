'use strict';

(function () {
  var LATENCY = 500;

  window.debounce = {
    create: function (callback) {
      var lastTimeout;
      return function () {
        var args = arguments;
        if (lastTimeout) {
          clearTimeout(lastTimeout);
        }
        lastTimeout = setTimeout(function () {
          callback.apply(null, args);
        }, LATENCY);
      };
    },
  };
}());
