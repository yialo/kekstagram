'use strict';

(function () {
  var getRandomArrayIndex = function (targetArray) {
    return Math.floor(Math.random() * targetArray.length);
  };

  window.utilities = {
    getRandomIntegerFromRange: function (maxNumber) {
      return (Math.floor(Math.random() * maxNumber) + 1);
    },
    getRandomArrayIndex: function (targetArray) {
      return getRandomArrayIndex(targetArray);
    },
    getRandomArrayElement: function (targetArray) {
      var randomIndex = getRandomArrayIndex(targetArray);
      var randomElement = targetArray[randomIndex];
      return randomElement;
    },
    isEscKeycode: function (evt) {
      var ESC_KEYCODE = 27;
      return evt.keyCode === ESC_KEYCODE;
    },
  };
}());
