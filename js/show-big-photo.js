'use strict';

(function () {
  var photo = document.querySelector('.big-picture');
  var closeButton = photo.querySelector('.big-picture__cancel');
  var image = photo.querySelector('.big-picture__img img');
  var loadButton = photo.querySelector('.social__comment-loadmore');
  var socialCommentsCount = photo.querySelector('.social__comment-count');

  var showBigPhoto = function () {
    socialCommentsCount.classList.add('visually-hidden');
    loadButton.classList.add('visually-hidden');
    photo.classList.remove('hidden');
    document.body.classList.add('modal-open');
    removePhotoLinksClickHandlers();
    closeButton
      .addEventListener('click', closeButtonClickHandler);
    document.addEventListener('keydown', documentEscPressHandler);
    photo.addEventListener('click', overlayClickHandler);
  };

  var hideBigPhoto = function () {
    photo.classList.add('hidden');
    document.body.classList.remove('modal-open');
    socialCommentsCount.classList.remove('visually-hidden');
    loadButton.classList.remove('visually-hidden');
    addPhotoLinksClickHandlers();
    closeButton
      .removeEventListener('click', closeButtonClickHandler);
    document.removeEventListener('keydown', documentEscPressHandler);
    photo.removeEventListener('click', overlayClickHandler);
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
    var targetPhoto = evt.currentTarget.querySelector('.picture__img');
    var targetPhotoSrc = targetPhoto.getAttribute('src');

    if (targetPhoto.src !== image.src) {
      var urlNumber = window.smallPhotosRender.urlSet
        .indexOf(targetPhotoSrc);
      var dataSource = window.smallPhotosRender.fullSet[urlNumber];
      window.createBigPhoto(dataSource);
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
    for (var i = 0; i < smallPhotoLinks.length; i += 1) {
      smallPhotoLinks[i].addEventListener('click', photoLinkClickHandler);
    }
  };

  var removePhotoLinksClickHandlers = function () {
    var smallPhotoLinks = document.querySelectorAll('.picture__link');
    for (var i = 0; i < smallPhotoLinks.length; i += 1) {
      smallPhotoLinks[i].removeEventListener('click', photoLinkClickHandler);
    }
  };

  window.showBigPhoto = {
    addClickHandlers: function () {
      addPhotoLinksClickHandlers();
    },
  };
}());
