'use strict';

(function () {
  var upload = document.querySelector('.img-upload');
  var fileInput = upload.querySelector('#upload-file');
  var overlay = upload.querySelector('.img-upload__overlay');
  var cancel = overlay.querySelector('#upload-cancel');
  var hashtag = overlay.querySelector('.text__hashtags');
  var comment = overlay.querySelector('.text__description');

  var showUpload = function () {
    overlay.classList.remove('hidden');
    cancel.addEventListener('click', popupClickCloseHandler);
    document.addEventListener('keydown', popupDocumentEscPressHandler);
    overlay.addEventListener('click', popupOverlayClickHandler);
    fileInput.removeEventListener('change', popupClickOpenHandler);
    window.photoResize.addClickListeners();
  };

  var hideUpload = function () {
    overlay.classList.add('hidden');
    fileInput.value = '';
    hashtag.value = '';
    comment.value = '';
    cancel.removeEventListener('click', popupClickCloseHandler);
    document.removeEventListener('keydown', popupDocumentEscPressHandler);
    overlay.removeEventListener('click', popupOverlayClickHandler);
    fileInput.addEventListener('change', popupClickOpenHandler);
    window.photoResize.removeClickListeners();
  };

  var popupClickOpenHandler = function () {
    showUpload();
  };

  var popupClickCloseHandler = function () {
    hideUpload();
  };

  var popupOverlayClickHandler = function (evt) {
    if (evt.target === evt.currentTarget) {
      hideUpload();
    }
  };

  var popupDocumentEscPressHandler = function (evt) {
    if (window.utilities.isEscKeycode(evt) && [hashtag, comment].indexOf(document.activeElement) === -1) {
      evt.preventDefault();
      hideUpload();
    }
  };

  fileInput.addEventListener('change', showUpload);
}());
