'use strict';

(function () {
  var photo = document.querySelector('.big-picture');
  var closeButton = photo.querySelector('.big-picture__cancel');
  var loadButton = photo.querySelector('.social__comment-loadmore');

  var showBigPhoto = function () {
    photo.classList.remove('hidden');
    document.body.classList.add('modal-open');
    removePhotoLinkClickHandlers();
    closeButton.addEventListener('click', closeButtonClickHandler);
    document.addEventListener('keydown', documentEscPressHandler);
    photo.addEventListener('click', overlayClickHandler);
  };

  var hideBigPhoto = function () {
    photo.classList.add('hidden');
    document.body.classList.remove('modal-open');
    addPhotoLinkClickHandlers();
    closeButton.removeEventListener('click', closeButtonClickHandler);
    document.removeEventListener('keydown', documentEscPressHandler);
    photo.removeEventListener('click', overlayClickHandler);
    loadButton.removeEventListener(
        'click',
        window.createBigPhoto.loadmoreClickHandler
    );
  };

  var overlayClickHandler = function (evt) {
    if (evt.target === evt.currentTarget) {
      hideBigPhoto();
    }
  };

  var closeButtonClickHandler = function () {
    hideBigPhoto();
  };

  var photoLinkClickHandler = function (evt) {
    evt.preventDefault();
    var targetPhotoIndex = evt.currentTarget.photoIndex;
    if (targetPhotoIndex !== window.createBigPhoto.lastShownPhotoIndex) {
      var dataSource = window.smallPhotos.photos[targetPhotoIndex];
      window.createBigPhoto.create(dataSource);
    } else if (!loadButton.classList.contains('hidden')) {
      loadButton.addEventListener(
          'click',
          window.createBigPhoto.loadmoreClickHandler
      );
    }
    showBigPhoto();
  };

  var documentEscPressHandler = function (evt) {
    if (window.utilities.isEscKeycode(evt)) {
      hideBigPhoto();
    }
  };

  var managePhotoLinkClickHandlers = function (action) {
    return function () {
      var smallPhotoLinks = document.querySelectorAll('.picture__link');
      smallPhotoLinks.forEach(function (link) {
        link[action + 'EventListener']('click', photoLinkClickHandler);
      });
    };
  };

  var addPhotoLinkClickHandlers = managePhotoLinkClickHandlers('add');
  var removePhotoLinkClickHandlers = managePhotoLinkClickHandlers('remove');

  window.showBigPhoto = {addClickHandlers: addPhotoLinkClickHandlers};
}());
