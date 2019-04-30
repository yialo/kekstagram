'use strict';

(function () {
  var hashtagField = document.querySelector('.text__hashtags');

  var getHashtags = function () {
    var rawHashtagString = hashtagField.value;
    var hashtagString = rawHashtagString.toLowerCase();
    var hashtags = hashtagString.split(' ');

    return hashtags;
  };

  var checkHashtagFirstChar = function (hashtag) {
    var hasCorrectStart = false;
    var firstChar = hashtag[0];
    if (firstChar === '#') {
      hasCorrectStart = true;
    }
    return hasCorrectStart;
  };

  var hashtagFieldInputHandler = function () {
    var hashtags = getHashtags();
    var firstHashtag = hashtags[0];

    if (firstHashtag !== '') {
      if (hashtags.length > 5) {
        hashtagField.setCustomValidity('Хэштегов должно быть не более 5');
      } else {
        for (var i = 0; i < hashtags.length; i += 1) {
          if (!checkHashtagFirstChar(hashtags[i])) {
            hashtagField.setCustomValidity(
                'Каждый хэш-тег должен начинаться с символа решётки (#)'
            );
            break;
          } else if (hashtags[i].length < 2) {
            hashtagField.setCustomValidity('Хэштег должен содержать не менее 2 символов');
            break;
          } else if (hashtags[i].length > 20) {
            hashtagField.setCustomValidity('Длина хэштега не должна превышать 20 символов');
            break;
          } else if (hashtags.length !== 1) {
            var noHashtagRepeat = true;

            for (var j = i + 1; j < hashtags.length; j += 1) {
              if (hashtags[j] === hashtags[i]) {
                hashtagField.setCustomValidity('Не должно быть одинаковых хэштегов');
                noHashtagRepeat = false;
                break;
              } else {
                hashtagField.setCustomValidity('');
              }
            }
            if (!noHashtagRepeat) {
              break;
            }
          } else {
            hashtagField.setCustomValidity('');
          }
        }
      }
    } else {
      hashtagField.setCustomValidity('');
    }

    hashtagField.reportValidity();
  };

  window.formValidation = {
    addHandler: function () {
      hashtagField.addEventListener('input', hashtagFieldInputHandler);
    },
    removeHandler: function () {
      hashtagField.removeEventListener('input', hashtagFieldInputHandler);
    },
  };
}());
