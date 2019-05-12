'use strict';

(function () {
  var photo = document.querySelector('.big-picture');
  var closeButton = photo.querySelector('.big-picture__cancel');
  var image = photo.querySelector('.big-picture__img img');
  var loadButton = photo.querySelector('.social__comment-loadmore');
  var socialCommentsCount = photo.querySelector('.social__comment-count');

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
    loadButton.classList.remove('hidden');
    socialCommentsCount.classList.remove('hidden');
    document.body.classList.remove('modal-open');
    addPhotoLinksClickHandlers();
    closeButton.removeEventListener('click', closeButtonClickHandler);
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

  var LoadButtonHandler = function (source) {
    this.click = function () {
      window.createBigPhoto.showAllComments(source);
    };
    this.enterPress = function (evt) {
      if (window.utilities.isEscKeycode(evt)) {
        window.createBigPhoto.showAllComments(source);
      }
    };
  };

  var photoLinkClickHandler = function (evt) {
    evt.preventDefault();
    var targetPhoto = evt.currentTarget.querySelector('.picture__img');
    var targetPhotoSrc = targetPhoto.getAttribute('src');

    if (targetPhoto.src !== image.src) {
      var urlNumber = window.smallPhotosRender.urlSet
        .indexOf(targetPhotoSrc);
      var dataSource = window.smallPhotosRender.fullSet[urlNumber];
      window.createBigPhoto.create(dataSource);

      var loadButtonHandlers = window.smallPhotosRender.fullSet
      .map(function (item) {
        return new LoadButtonHandler(item);
      });

      if (dataSource.comments.length > 5) {
        loadButton.addEventListener('click', loadButtonHandlers[urlNumber]);
      }
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
