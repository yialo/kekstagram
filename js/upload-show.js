'use strict';

(function () {
  var upload = document.querySelector('.img-upload');
  var fileInput = upload.querySelector('#upload-file');
  var overlay = upload.querySelector('.img-upload__overlay');
  var cancel = overlay.querySelector('#upload-cancel');
  var hashtagField = upload.querySelector('.text__hashtags');
  var commentField = overlay.querySelector('.text__description');

  var showUpload = function () {
    overlay.classList.remove('hidden');
    fileInput.removeEventListener('change', inputChangeHandler);
    cancel.addEventListener('click', cancelClickHandler);
    document.addEventListener('keydown', documentEscPressHandler);
    overlay.addEventListener('click', overlayClickHandler);
    window.photoResize.addClickListeners();
    window.photoResize.resetResize();
    window.photoEffects.setOriginalState();
  };

  var hideUpload = function () {
    overlay.classList.add('hidden');
    cancel.removeEventListener('click', cancelClickHandler);
    document.removeEventListener('keydown', documentEscPressHandler);
    overlay.removeEventListener('click', overlayClickHandler);
    window.photoResize.removeClickListeners();
    window.photoEffects.removeClickListeners();
    fileInput.value = '';
    hashtagField.value = '';
    commentField.value = '';
    fileInput.addEventListener('change', inputChangeHandler);
  };

  var inputChangeHandler = function () {
    showUpload();
  };

  var cancelClickHandler = function () {
    hideUpload();
  };

  var overlayClickHandler = function (evt) {
    if (evt.target === evt.currentTarget && document.activeElement !== window.photoEffects.scalePin) {
      hideUpload();
    }
  };

  var documentEscPressHandler = function (evt) {
    if (window.utilities.isEscKeycode(evt) && [hashtagField, commentField].indexOf(document.activeElement) === -1) {
      evt.preventDefault();
      hideUpload();
    }
  };

  fileInput.addEventListener('change', inputChangeHandler);
}());
