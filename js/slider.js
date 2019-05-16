'use strict';

(function () {
  var scale = document.querySelector('.scale');
  var input = scale.querySelector('.scale__value');
  var line = scale.querySelector('.scale__line');
  var pin = line.querySelector('.scale__pin');
  var level = line.querySelector('.scale__level');

  var getMousedownHandler = function (callback) {
    return function (downEvt) {
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
        input.value = Math.round(100 * effectDepth);
        callback(effectDepth);

        startX = moveEvt.clientX;
      };

      var documentMouseupHandler = function () {
        scale.removeEventListener('mousemove', scaleMousemoveHandler);
        document.removeEventListener('mouseup', documentMouseupHandler);
      };

      scale.addEventListener('mousemove', scaleMousemoveHandler);
      document.addEventListener('mouseup', documentMouseupHandler);
    };
  };

  window.slider = {
    getHandler: function (cb) {
      return getMousedownHandler(cb);
    },
  };
}());
