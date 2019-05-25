'use strict';

(function () {
  var form = document.querySelector('.img-upload__form');
  var hashtagField = form.querySelector('.text__hashtags');
  var errorElement = form.querySelector('.img-upload__message--error');

  var getHashtags = function () {
    var rawHashtagString = hashtagField.value;
    var hashtagString = rawHashtagString.toLowerCase();
    var hashtags = hashtagString.split(' ');
    return hashtags;
  };

  var checkHashtagFirstChar = function (hashtag) {
    var firstChar = hashtag[0];
    return (firstChar === '#');
  };

  var clearCustomValidity = function (target) {
    target.setCustomValidity('');
    target.removeAttribute('style');
  };

  var hashtagFieldInputHandler = function () {
    var hashtags = getHashtags();

    if (hashtags[0] === '') {
      clearCustomValidity(hashtagField);
    } else {
      if (hashtags.length > 5) {
        hashtagField.setCustomValidity('Хэштегов должно быть не более 5');
        hashtagField.style.borderColor = 'red';
      } else {
        for (var i = 0; i < hashtags.length; i += 1) {
          if (!checkHashtagFirstChar(hashtags[i])) {
            hashtagField.setCustomValidity(
                'Каждый хэш-тег должен начинаться с символа решётки (#)'
            );
            hashtagField.style.borderColor = 'red';
            break;
          }

          if (hashtags[i].length < 2) {
            hashtagField.setCustomValidity(
                'Хэштег должен содержать не менее 2 символов'
            );
            hashtagField.style.borderColor = 'red';
            break;
          }

          if (hashtags[i].length > 20) {
            hashtagField.setCustomValidity(
                'Длина хэштега не должна превышать 20 символов'
            );
            hashtagField.style.borderColor = 'red';
            break;
          }

          if (hashtags.length > 1) {
            var noHashtagRepeat = true;

            for (var j = i + 1; j < hashtags.length; j += 1) {
              if (hashtags[j] === hashtags[i]) {
                hashtagField.setCustomValidity(
                    'Не должно быть одинаковых хэштегов'
                );
                hashtagField.style.borderColor = 'red';
                noHashtagRepeat = false;
                break;
              }
              clearCustomValidity(hashtagField);
            }
            if (!noHashtagRepeat) {
              break;
            }
          }
          clearCustomValidity(hashtagField);
        }
      }
    }

    hashtagField.reportValidity();
  };

  var formSubmitSuccessHandler = function () {
    errorElement.classList.add('hidden');
    errorElement.removeAttribute('style');
    window.showUploadForm.hideUpload();
  };

  var formSubmitErrorHandler = function () {
    errorElement.classList.remove('hidden');
    errorElement.style.zIndex = '3';
  };

  var formSubmitHandler = function (evt) {
    evt.preventDefault();
    window.backend.upload(
        new FormData(form),
        formSubmitSuccessHandler,
        formSubmitErrorHandler
    );
  };

  var manageFormValidationHandlers = function (action) {
    hashtagField[action + 'EventListener']('input', hashtagFieldInputHandler);
    form[action + 'EventListener']('submit', formSubmitHandler);
  };

  window.formValidation = {
    addHandlers: manageFormValidationHandlers('add'),
    removeHandlers: manageFormValidationHandlers('remove'),
  };
}());
