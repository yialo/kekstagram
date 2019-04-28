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
  var currentEffect = 'none';

  var removeEffect = function () {
    preview.removeAttribute('class');
    preview.removeAttribute('style');
    level.style.width = '100%';
    pin.style.left = '100%';
    input.value = '100';
  };

  var getEffectClickHandler = function (effect) {
    removeEffect();
    scale.classList.remove('hidden');
    preview.classList.add('effects__preview--' + effect);
    currentEffect = effect;
    setControlClickListeners();
  };

  var resetEffects = function () {
    removeEffect();
    scale.classList.add('hidden');
    currentEffect = 'none';
    setControlClickListeners();
  };

  var EFFECTS = [
    {
      name: 'none',
      clickHandler: function () {
        resetEffects();
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

  window.photoEffects = {
    resetEffects: function () {
      resetEffects();
    },
    removeControlClickListeners: function () {
      for (var i = 0; i < EFFECTS.length; i += 1) {
        var effect = EFFECTS[i];
        if (effect.name !== currentEffect) {
          getEffectControl(effect.name)
            .removeEventListener('click', effect.clickHandler);
        }
      }
    },
  };
}());
