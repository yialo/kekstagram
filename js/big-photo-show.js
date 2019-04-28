'use strict';

(function () {
  var photo = document.querySelector('.big-picture');
  var closeButton = photo.querySelector('.big-picture__cancel');
  var image = photo.querySelector('.big-picture__img img');
  var loadButton = photo.querySelector('.social__comment-loadmore');
  var socialCommentsCount = photo.querySelector('.social__comment-count');
  var smallPhotoLinks = document.querySelectorAll('.picture__link');

  var showBigPhoto = function () {
    socialCommentsCount.classList.add('visually-hidden');
    loadButton.classList.add('visually-hidden');
    photo.classList.remove('hidden');
    removePhotoLinksClickHandlers();
    closeButton
      .addEventListener('click', bigPictureCloseButtonClickHandler);
    document.addEventListener('keydown', bigPhotoDocumentEscPressHandler);
    photo.addEventListener('click', bigPictureClickHandler);
  };

  var hideBigPhoto = function () {
    photo.classList.add('hidden');
    socialCommentsCount.classList.remove('visually-hidden');
    loadButton.classList.remove('visually-hidden');
    addPhotoLinksClickHandlers();
    closeButton
      .removeEventListener('click', bigPictureCloseButtonClickHandler);
    document.removeEventListener('keydown', bigPhotoDocumentEscPressHandler);
    photo.removeEventListener('click', bigPictureClickHandler);
  };

  var bigPictureClickHandler = function (evt) {
    if (evt.target === evt.currentTarget) {
      hideBigPhoto();
    }
  };

  var bigPictureCloseButtonClickHandler = function () {
    hideBigPhoto();
  };

  var photoLinkClickHandler = function (evt) {
    evt.preventDefault();
    var targetPhoto = evt.currentTarget.querySelector('.picture__img');
    var targetPhotoSrc = targetPhoto.getAttribute('src');

    if (targetPhoto.src !== image.src) {
      var urlNumber = window.smallPhotosData.urlSet.indexOf(targetPhotoSrc);
      var dataSource = window.smallPhotosData.fullSet[urlNumber];
      window.createBigPhoto(dataSource);
    }

    showBigPhoto();
  };

  var bigPhotoDocumentEscPressHandler = function (evt) {
    if (window.utilities.isEscKeycode(evt)) {
      hideBigPhoto();
    }
  };

  var addPhotoLinksClickHandlers = function () {
    for (var i = 0; i < smallPhotoLinks.length; i += 1) {
      smallPhotoLinks[i].addEventListener('click', photoLinkClickHandler);
    }
  };

  var removePhotoLinksClickHandlers = function () {
    for (var i = 0; i < smallPhotoLinks.length; i += 1) {
      smallPhotoLinks[i].removeEventListener('click', photoLinkClickHandler);
    }
  };

  addPhotoLinksClickHandlers();
}());
