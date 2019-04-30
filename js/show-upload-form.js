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
    document.body.classList.add('modal-open');
    fileInput.removeEventListener('change', inputChangeHandler);
    cancel.addEventListener('click', cancelClickHandler);
    document.addEventListener('keydown', documentEscPressHandler);
    window.photoResize.addClickListeners();
    window.photoResize.resetResize();
    window.photoEffects.setOriginalState();
    window.formValidation.addHandler();
  };

  var hideUpload = function () {
    overlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
    cancel.removeEventListener('click', cancelClickHandler);
    document.removeEventListener('keydown', documentEscPressHandler);
    window.photoResize.removeClickListeners();
    window.photoEffects.removeClickListeners();
    window.formValidation.removeHandler();
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

  var documentEscPressHandler = function (evt) {
    if (window.utilities.isEscKeycode(evt) && [hashtagField, commentField].indexOf(document.activeElement) === -1) {
      evt.preventDefault();
      hideUpload();
    }
  };

  fileInput.addEventListener('change', inputChangeHandler);
}());
