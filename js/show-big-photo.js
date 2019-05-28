'use strict';

(function () {
  var photo = document.querySelector('.big-picture');
  var closeButton = photo.querySelector('.big-picture__cancel');

  var showBigPhoto = function () {
    removePhotoClickHandlers();
    closeButton.addEventListener('click', closeButtonClickHandler);
    document.addEventListener('keydown', documentEscPressHandler);
    photo.addEventListener('click', overlayClickHandler);
    document.body.classList.add('modal-open');
    photo.classList.remove('hidden');
  };

  var hideBigPhoto = function () {
    photo.classList.add('hidden');
    document.body.classList.remove('modal-open');
    closeButton.removeEventListener('click', closeButtonClickHandler);
    document.removeEventListener('keydown', documentEscPressHandler);
    photo.removeEventListener('click', overlayClickHandler);
    window.createBigPhoto.manageLoadButtonListeners('remove');
    addPhotoClickHandlers();
  };

  var overlayClickHandler = function (evt) {
    if (evt.target === evt.currentTarget) {
      hideBigPhoto();
    }
  };

  var closeButtonClickHandler = function () {
    hideBigPhoto();
  };

  var lastShownPhotoIndex;
  var photoClickHandler = function (evt) {
    evt.preventDefault();
    var targetIndex = evt.currentTarget.photoIndex;
    if (targetIndex !== lastShownPhotoIndex) {
      var dataSource = window.smallPhotos.getInitialData()[targetIndex];
      window.createBigPhoto.create(dataSource);
      lastShownPhotoIndex = targetIndex;
    } else {
      window.createBigPhoto.manageLoadButtonListeners('add');
    }
    showBigPhoto();
  };

  var documentEscPressHandler = function (evt) {
    if (window.utilities.isEscKeycode(evt)) {
      hideBigPhoto();
    }
  };

  var managePhotoClickHandlers = function (action) {
    return function () {
      window.smallPhotos.currentElements.forEach(function (el) {
        el[action + 'EventListener']('click', photoClickHandler);
      });
    };
  };

  var addPhotoClickHandlers = managePhotoClickHandlers('add');
  var removePhotoClickHandlers = managePhotoClickHandlers('remove');

  window.showBigPhoto = {clickHandler: photoClickHandler};
}());
