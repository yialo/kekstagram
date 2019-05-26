'use strict';

(function () {
  var getKeycodeChecker = function (keyName) {
    var Keycode = {ENTER: 13, ESC: 27};
    return function (evt) {
      return (evt.keyCode === Keycode[keyName]);
    };
  };

  var getRandomArrayIndex = function (arr) {
    return Math.floor(Math.random() * arr.length);
  };

  window.utilities = {
    isEscKeycode: getKeycodeChecker('ESC'),
    isEnterKeycode: getKeycodeChecker('ENTER'),
    getRandomItemsFromArray: function (targetArr, itemsAmount) {
      var arr = targetArr.slice();
      var newArr = [];
      if (itemsAmount > arr.length) {
        throw new Error('Количество элементов в новом массиве не может превышать длину исходного');
      } else {
        for (var i = 0; i < itemsAmount; i += 1) {
          do {
            var randomIndex = getRandomArrayIndex(arr);
            var randomItem = arr[randomIndex];
          } while (newArr.indexOf(randomItem) !== -1);
          newArr.push(randomItem);
          arr.splice(randomIndex, 1);
        }
      }
      return newArr;
    },
  };
}());
