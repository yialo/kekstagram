'use strict';

(function () {
  var photo = document.querySelector('.big-picture');
  var closeButton = photo.querySelector('.big-picture__cancel');
  var loadButton = photo.querySelector('.social__comment-loadmore');

  var showBigPhoto = function () {
    photo.classList.remove('hidden');
    document.body.classList.add('modal-open');
    removePhotoLinksClickHandlers();
    closeButton.addEventListener('click', closeButtonClickHandler);
    document.addEventListener('keydown', documentEscPressHandler);
    photo.addEventListener('click', overlayClickHandler);
  };

  var hideBigPhoto = function () {
    photo.classList.add('hidden');
    document.body.classList.remove('modal-open');
    addPhotoLinksClickHandlers();
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

    if (targetPhotoIndex !== window.createBigPhoto.lastShownPhoto) {
      var dataSource = window.smallPhotosRender
        .fullSet[targetPhotoIndex];
      window.createBigPhoto.create(dataSource);
    } else {
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

  var addPhotoLinksClickHandlers = function () {
    var smallPhotoLinks = document.querySelectorAll('.picture__link');
    smallPhotoLinks.forEach(function (link) {
      link.addEventListener('click', photoLinkClickHandler);
    });
  };

  var removePhotoLinksClickHandlers = function () {
    var smallPhotoLinks = document.querySelectorAll('.picture__link');
    smallPhotoLinks.forEach(function (link) {
      link.removeEventListener('click', photoLinkClickHandler);
    });
  };

  window.showBigPhoto = {
    addClickHandlers: function () {
      addPhotoLinksClickHandlers();
    },
  };
}());
