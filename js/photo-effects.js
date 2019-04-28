'use strict';

(function () {
  var overlay = document.querySelector('.img-upload__overlay');
  var preview = overlay.querySelector('img');
  var scale = overlay.querySelector('.scale');
  var input = scale.querySelector('.scale__value');
  var line = scale.querySelector('.scale__line');
  var pin = line.querySelector('.scale__pin');
  var effectsList = overlay.querySelector('.img-upload__effects');
  var effectNone = effectsList.querySelector('#effect-none');

  var hideScale = function () {
    scale.classList.add('hidden');
  };

  hideScale();

  var getEffectClassname = function (effect) {
    var effectClassname = 'effects__preview--' + effect;
    return effectClassname;
  };

  var checkEffectPresence = function (effect) {
    var isApplied = preview.classList.contains(getEffectClassname(effect));
    return isApplied;
  };

  var removeEffect = function () {
    preview.removeAttribute('style');
    preview.removeAttribute('class');
  };

  var addEffect = function (effect) {
    if (!checkEffectPresence(effect)) {
      removeEffect();
      preview.classList.add(getEffectClassname(effect));
      input.value = 100;
      scale.classList.remove('hidden');
    }
  };

  var addEffectElementClickListener = function (effectName, effectElement) {
    effectElement.addEventListener('click', function () {
      addEffect(effectName);
    });
  };

  effectNone.addEventListener('click', function () {
    removeEffect();
    hideScale();
  });

  var getEffectElement = function (effect) {
    return effectsList.querySelector('#effect-' + effect);
  };

  var EFFECTS = [
    {
      name: 'chrome',
      setFilter: function (depth) {
        return 'grayscale(' + depth + ')';
      },
    },
    {
      name: 'sepia',
      setFilter: function (depth) {
        return 'sepia(' + depth + ')';
      },
    },
    {
      name: 'marvin',
      setFilter: function (depth) {
        return 'invert(' + 100 * depth + '%)';
      },
    },
    {
      name: 'phobos',
      setFilter: function (depth) {
        var blurValue = 3 * depth;
        return 'blur(' + blurValue + 'px)';
      },
    },
    {
      name: 'heat',
      setFilter: function (depth) {
        var brightnessValue = 1 + 2 * depth;
        return 'brightness(' + brightnessValue + ')';
      },
    },
  ];

  for (var i = 0; i < EFFECTS.length; i += 1) {
    addEffectElementClickListener(EFFECTS[i].name, EFFECTS[i].element);
  }

  var getEffectDepthFromScale = function () {
    var lineLeft = line.getBoundingClientRect().left;
    var lineWidth = line.offsetWidth;
    var pinLeft = pin.getBoundingClientRect().left;
    var pinWidth = pin.offsetWidth;
    var pinCenterX = pinLeft + pinWidth / 2;
    var pinShift = pinCenterX - lineLeft;
    var relativeShift = pinShift / lineWidth;
    var relativeShiftPercentage = Math.round(relativeShift * 100) / 100;
    return relativeShiftPercentage;
  };

  var setEffect = function (effect, depth) {
    if (checkEffectPresence(effect.name)) {
      preview.style.filter = effect.setFilter(depth);
    }
  };

  var pinMousedownHandler = function (evt) {
    var startX = evt.clientX;

    var pinMousemoveHandler = function (moveEvt) {
      var shift = moveEvt.clientX - startX;
      startX = moveEvt.clientX;
      pin.style.left = (pin.offsetLeft + shift) + 'px';
    };

    var pinMouseupHandler = function () {
      var effectDepth = getEffectDepthFromScale();
      input.value = 100 * effectDepth;

      if (checkEffectPresence('chrome')) {
        preview.style.filter = 'grayscale(' + depth + ')';
      } else if (checkEffectPresence('sepia')) {
        preview.style.filter = 'sepia(' + depth + ')';
      } else if (checkEffectPresence('marvin')) {
        preview.style.filter = 'invert(' + 100 * depth + '%)';
      } else if (checkEffectPresence('phobos')) {
        var blurValue = 3 * depth;
        preview.style.filter = 'blur(' + blurValue + 'px)';
      } else if (checkEffectPresence('heat')) {
        var brightnessValue = 1 + 2 * depth;
        preview.style.filter = 'brightness(' + brightnessValue + ')';
      }

      pin.addEventListener('mousemove', pinMousemoveHandler);
      pin.addEventListener('mouseup', pinMousemoveHandler);
    };
  };

  pin.addEventListener('mousedown', pinMousedownHandler);

  // window.photoEffects = {
  //   addPin
  // };
}());
