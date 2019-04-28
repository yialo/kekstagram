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

  var removeEffect = function () {
    pin.removeEventListener('mousedown', pinMousedownHandler);
    preview.removeAttribute('class');
    preview.removeAttribute('style');
    pin.style.left = '100%';
    level.style.width = '100%';
    input.value = '100';
  };

  var getEffectClickHandler = function (effect) {
    removeEffect();
    scale.classList.remove('hidden');
    preview.classList.add('effects__preview--' + effect);
    currentEffect = effect;
    setControlClickListeners();
    pin.addEventListener('mousedown', pinMousedownHandler);
  };

  var resetEffects = function () {
    removeEffect();
    scale.classList.add('hidden');
    currentEffect = 'none';
    setControlClickListeners();
  };

  var EFFECT_NAMES = ['none', 'chrome', 'sepia', 'marvin', 'phobos', 'heat'];

  var getClickHandler = function (effect) {
    if (effect === 'none') {
      resetEffects();
    } else {
      removeEffect();
      scale.classList.remove('hidden');
      preview.classList.add('effects__preview--' + effect);
      currentEffect = effect;
      setControlClickListeners();
      pin.addEventListener('mousedown', pinMousedownHandler);
    }
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
    },
    {
      name: 'sepia',
      clickHandler: function () {
        getEffectClickHandler('sepia');
      },
    },
    {
      name: 'marvin',
      clickHandler: function () {
        getEffectClickHandler('marvin');
      },
    },
    {
      name: 'phobos',
      clickHandler: function () {
        getEffectClickHandler('phobos');
      },
    },
    {
      name: 'heat',
      clickHandler: function () {
        getEffectClickHandler('heat');
      },
    },
  ];

  var FILTERS = {
    chrome: {
      getValue: function (depth) {
        return 'grayscale(' + depth + ')';
      },
    },
    sepia: {
      getValue: function (depth) {
        return 'sepia(' + depth + ')';
      },
    },
    marvin: {
      getValue: function (depth) {
        return 'invert(' + 100 * depth + '%)';
      },
    },
    phobos: {
      getValue: function (depth) {
        var blurValue = 3 * depth;
        return 'blur(' + blurValue + 'px)';
      },
    },
    heat: {
      getValue: function (depth) {
        var brightnessValue = 1 + 2 * depth;
        return 'brightness(' + brightnessValue + ')';
      },
    },
  };

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

  var pinMousedownHandler = function (downEvt) {
    var lineWidth = line.offsetWidth;
    var startX = downEvt.clientX;

    var scaleMousemoveHandler = function (moveEvt) {
      var pinLeft = pin.offsetLeft;
      var shift = moveEvt.clientX - startX;

      if (pinLeft + shift > 0 && pinLeft + shift < lineWidth) {
        pin.style.left = (pinLeft + shift) + 'px';
        level.style.width = (pinLeft + shift) + 'px';
      } else if (pinLeft + shift <= 0) {
        pin.style.left = '0';
      } else if (pinLeft + shift >= lineWidth) {
        pin.style.left = lineWidth + 'px';
      }

      var effectDepth = pinLeft / lineWidth;
      var filterValue = FILTERS[currentEffect].getValue(effectDepth);
      preview.style.filter = filterValue;
      input.value = Math.round(100 * effectDepth);

      startX = moveEvt.clientX;
    };

    var documentMouseupHandler = function () {
      scale.removeEventListener('mousemove', scaleMousemoveHandler);
      document.removeEventListener('mouseup', documentMouseupHandler);
    };

    scale.addEventListener('mousemove', scaleMousemoveHandler);
    document.addEventListener('mouseup', documentMouseupHandler);
  };

  window.photoEffects = {
    scalePin: pin,
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
