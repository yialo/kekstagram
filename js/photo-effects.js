'use strict';

(function () {
  var overlay = document.querySelector('.img-upload__overlay');
  var preview = overlay.querySelector('img');
  var scale = overlay.querySelector('.scale');
  var input = scale.querySelector('.scale__value');
  var line = scale.querySelector('.scale__line');
  var pin = line.querySelector('.scale__pin');
  var level = line.querySelector('.scale__level');
  var effectsList = overlay.querySelector('.img-upload__effects');

  var hideScale = function () {
    scale.classList.add('hidden');
  };

  var setDefaultDepth = function () {
    level.style.width = '100%';
    pin.style.left = '100%';
  };

  var currentEffect = 'none';
  hideScale();
  setDefaultDepth();

  var removeEffect = function () {
    preview.removeAttribute('class');
    preview.removeAttribute('style');
  };

  var getEffectClassname = function (effect) {
    return ('effects__preview--' + effect);
  };

  var getEffectClickHandler = function (effect) {
    removeEffect();
    scale.classList.remove('hidden');
    preview.classList.add(getEffectClassname(effect));
    currentEffect = effect;
    setControlClickListeners();
  };

  var resetEffect = function () {
    removeEffect();
    hideScale();
    currentEffect = 'none';
    input.value = '100';
  };

  var EFFECTS = [
    {
      name: 'none',
      clickHandler: function () {
        resetEffect();
        setControlClickListeners();
      },
    },
    {
      name: 'chrome',
      clickHandler: function () {
        getEffectClickHandler('chrome');
      },
      getFilter: function (depth) {
        return 'grayscale(' + depth + ')';
      },
    },
    {
      name: 'sepia',
      clickHandler: function () {
        getEffectClickHandler('sepia');
      },
      getFilter: function (depth) {
        return 'grayscale(' + depth + ')';
      },
    },
    {
      name: 'marvin',
      clickHandler: function () {
        getEffectClickHandler('marvin');
      },
      getFilter: function (depth) {
        return 'invert(' + 100 * depth + '%)';
      },
    },
    {
      name: 'phobos',
      clickHandler: function () {
        getEffectClickHandler('phobos');
      },
      getFilter: function (depth) {
        var blurValue = 3 * depth;
        return 'blur(' + blurValue + 'px)';
      },
    },
    {
      name: 'heat',
      clickHandler: function () {
        getEffectClickHandler('heat');
      },
      getFilter: function (depth) {
        var brightnessValue = 1 + 2 * depth;
        return 'brightness(' + brightnessValue + ')';
      },
    },
  ];

  var getEffectControl = function (effect) {
    var effectControl = effectsList.querySelector('#effect-' + effect);
    return effectControl;
  };

  var setControlClickListeners = function () {
    for (var i = 0; i < EFFECTS.length; i += 1) {
      var effect = EFFECTS[i];
      var control = getEffectControl(effect.name);
      if (effect.name === currentEffect) {
        control.removeEventListener('click', effect.clickHandler);
      } else {
        control.addEventListener('click', effect.clickHandler);
      }
    }
  };

  setControlClickListeners();

  window.photoEffects = {
    resetEffect: function () {
      resetEffect();
    },
  };
}());
