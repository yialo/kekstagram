'use strict';

(function () {
  var upload = document.querySelector('.img-upload');
  var form = upload.querySelector('.img-upload__form');
  var fileInput = upload.querySelector('#upload-file');
  var previewImage = upload.querySelector('.img-upload__preview img');
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
    window.photoEffects.setInitialState();
    window.formValidation.addHandlers();
  };

  var hideUpload = function () {
    overlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
    cancel.removeEventListener('click', cancelClickHandler);
    document.removeEventListener('keydown', documentEscPressHandler);
    window.photoResize.removeClickListeners();
    window.photoEffects.removeClickListeners();
    window.photoEffects.clearEffects();
    window.formValidation.removeHandlers();
    form.reset();
    fileInput.value = '';
    hashtagField.value = '';
    commentField.value = '';
    fileInput.addEventListener('change', inputChangeHandler);
  };

  var inputChangeHandler = function () {
    var file = fileInput.files[0];
    var fileName = file.name.toLowerCase();
    var FILETYPES_REGEXP = /.(gif|jpeg|jpg|png)$/;
    var isPermittedType = fileName.match(FILETYPES_REGEXP);

    if (isPermittedType) {
      var reader = new FileReader();

      var readerLoadHandler = function () {
        previewImage.src = reader.result;
      };
      reader.addEventListener('load', readerLoadHandler);
      reader.readAsDataURL(file);
    }

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

  window.showUploadForm = {
    hideUpload: function () {
      hideUpload();
    },
  };
}());
