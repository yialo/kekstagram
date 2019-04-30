'use strict';

(function () {
  var overlay = document.querySelector('.img-upload__overlay');
  var preview = overlay.querySelector('.img-upload__preview');
  var input = overlay.querySelector('.resize__control--value');
  var minus = overlay.querySelector('.resize__control--minus');
  var plus = overlay.querySelector('.resize__control--plus');

  var Zoom = {MIN: 25, MAX: 100, STEP: 25};

  var getResizeValue = function () {
    var resizeValueString = input.value;
    var resizeValueNumber = +resizeValueString.slice(0, -1);
    return resizeValueNumber;
  };

  var setResize = function (value) {
    var scaleValue = (value === 100 ? 'none' : 'scale(0.' + value + ')');
    preview.style.transform = scaleValue;
    input.value = value + '%';
  };

  var minusClickHandler = function () {
    var currentValue = getResizeValue();
    if (currentValue > Zoom.MIN && currentValue <= Zoom.MAX) {
      currentValue -= Zoom.STEP;
    }
    setResize(currentValue);
  };

  var plusClickHandler = function () {
    var currentValue = getResizeValue();
    if (currentValue >= Zoom.MIN && currentValue < Zoom.MAX) {
      currentValue += Zoom.STEP;
    }
    setResize(currentValue);
  };

  window.photoResize = {
    addClickListeners: function () {
      minus.addEventListener('click', minusClickHandler);
      plus.addEventListener('click', plusClickHandler);
    },
    removeClickListeners: function () {
      minus.removeEventListener('click', minusClickHandler);
      plus.removeEventListener('click', plusClickHandler);
    },
    resetResize: function () {
      preview.removeAttribute('style');
      input.value = '100%';
    },
  };
}());
