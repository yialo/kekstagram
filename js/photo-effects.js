'use strict';

(function () {
  var overlay = document.querySelector('.img-upload__overlay');
  var preview = overlay.querySelector('.img-upload__preview img');
  var scale = overlay.querySelector('.scale');
  var input = scale.querySelector('.scale__value');
  var line = scale.querySelector('.scale__line');
  var pin = line.querySelector('.scale__pin');
  var level = line.querySelector('.scale__level');
  var effectsList = overlay.querySelector('.img-upload__effects');
  var currentEffect = 'none';

  var Effect = function (effect) {
    this.name = effect;
    this.clickHandler = function () {
      window.photoEffects.clearEffects();
      scale.classList.remove('hidden');
      preview.classList.add('effects__preview--' + effect);
      currentEffect = effect;
      setControlClickListeners();
      pin.addEventListener('mousedown', effectSliderHandler);
    };
  };

  var noEffect = {
    name: 'none',
    clickHandler: function () {
      window.photoEffects.clearEffects();
      window.photoEffects.setInitialState();
    },
  };

  var REAL_EFFECT_NAMES = ['chrome', 'sepia', 'marvin', 'phobos', 'heat'];

  var effects = [noEffect].concat(
      REAL_EFFECT_NAMES.map(function (item) {
        return new Effect(item);
      })
  );

  var filterMap = {
    'chrome': {
      getCssValue: function (depth) {
        return 'grayscale(' + depth + ')';
      },
    },
    'sepia': {
      getCssValue: function (depth) {
        return 'sepia(' + depth + ')';
      },
    },
    'marvin': {
      getCssValue: function (depth) {
        return 'invert(' + 100 * depth + '%)';
      },
    },
    'phobos': {
      getCssValue: function (depth) {
        var blurValue = 3 * depth;
        return 'blur(' + blurValue + 'px)';
      },
    },
    'heat': {
      getCssValue: function (depth) {
        var brightnessValue = 1 + 2 * depth;
        return 'brightness(' + brightnessValue + ')';
      },
    },
  };

  var setFilterDepth = function (depth) {
    var filterValue = filterMap[currentEffect].getCssValue(depth);
    preview.style.filter = filterValue;
  };

  var effectSliderHandler = window.slider.getHandler(setFilterDepth);

  var getEffectControl = function (effect) {
    return effectsList.querySelector('#effect-' + effect);
  };

  var setControlClickListeners = function () {
    effects.forEach(function (effect) {
      var control = getEffectControl(effect.name);
      if (effect.name === currentEffect) {
        control.removeEventListener('click', effect.clickHandler);
      } else {
        control.addEventListener('click', effect.clickHandler);
      }
    });
  };

  window.photoEffects = {
    clearEffects: function () {
      pin.removeEventListener('mousedown', effectSliderHandler);
      preview.removeAttribute('class');
      preview.removeAttribute('style');
      pin.style.left = '100%';
      level.style.width = '100%';
      input.value = '100';
    },
    setInitialState: function () {
      scale.classList.add('hidden');
      currentEffect = 'none';
      setControlClickListeners();
    },
    removeClickListeners: function () {
      effects.forEach(function (item) {
        if (item.name !== currentEffect) {
          getEffectControl(item.name)
            .removeEventListener('click', item.clickHandler);
        }
      });
    },
  };
}());
