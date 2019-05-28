'use strict';

(function () {
  window.showBigPhoto = {};
  var photo = document.querySelector('.big-picture');
  var closeButton = photo.querySelector('.big-picture__cancel');
  var loadButton = photo.querySelector('.social__comment-loadmore');

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
    loadButton.removeEventListener(
        'click',
        window.createBigPhoto.loadmoreClickHandler
    );
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

  var BIG_PHOTO_RENDERING_TIMEOUT = 20;
  var photoClickHandler = function (evt) {
    evt.preventDefault();
    var targetIndex = evt.currentTarget.photoIndex;
    if (targetIndex !== window.createBigPhoto.lastShownPhotoIndex) {
      var dataSource = window.smallPhotos.getInitialData()[targetIndex];
      window.createBigPhoto.create(dataSource);
    } else if (!loadButton.classList.contains('hidden')) {
      loadButton.addEventListener(
          'click',
          window.createBigPhoto.loadmoreClickHandler
      );
    }
    setTimeout(function () {
      showBigPhoto();
    }, BIG_PHOTO_RENDERING_TIMEOUT);
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

  window.showBigPhoto.clickHandler = photoClickHandler;
}());
