'use strict';

(function () {
  var Keycode = {ENTER: 13, ESC: 27};
  window.utilities = {
    getRandomIntegerFromRange: function (maxNumber) {
      return (Math.floor(Math.random() * maxNumber) + 1);
    },
    getRandomArrayIndex: function (targetArray) {
      return Math.floor(Math.random() * targetArray.length);
    },
    getRandomArrayElement: function (targetArray) {
      var randomIndex = this.getRandomArrayIndex(targetArray);
      var randomElement = targetArray[randomIndex];
      return randomElement;
    },
    isEscKeycode: function (evt) {
      return (evt.keyCode === Keycode.ESC);
    },
    isEnterKeycode: function (evt) {
      return (evt.keyCode === Keycode.ENTER);
    },
  };
}());
