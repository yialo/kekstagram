'use strict';

(function () {
  var photoBlockTemplate = document.querySelector('#picture')
    .content.querySelector('.picture__link');
  var fullSet = [];
  var urlSet = [];

  var createPhoto = function (dataSource) {
    var photoBlock = photoBlockTemplate.cloneNode(true);
    var imageElement = photoBlock.querySelector('.picture__img');
    var likesAmountElement = photoBlock
      .querySelector('.picture__stat--likes');
    var commentsAmountElement = photoBlock
      .querySelector('.picture__stat--comments');

    imageElement.src = dataSource.url;
    likesAmountElement.textContent = dataSource.likes;
    commentsAmountElement.textContent = dataSource.comments.length;

    return photoBlock;
  };

  var renderPhotos = function (photosData) {
    var container = document.querySelector('.pictures');
    var temporaryContainer = document.createDocumentFragment();

    for (var i = 0; i < photosData.length; i += 1) {
      var photoData = photosData[i];
      fullSet.push(photoData);
      urlSet.push(photoData.url);
      var photo = createPhoto(photoData);
      temporaryContainer.appendChild(photo);
    }

    container.appendChild(temporaryContainer);
    window.showBigPhoto.addClickHandlers();
  };

  var renderErrorMessage = function (message) {
    var errContainer = document.createElement('span');
    var css = errContainer.style;
    errContainer.textContent = message;
    css.position = 'absolute';
    css.zIndex = '1';
    css.top = '16px';
    css.left = '16px';
    css.textTransform = 'uppercase';
    css.color = 'red';
    document.querySelector('main').appendChild(errContainer);
  };

  window.backend.download(renderPhotos, renderErrorMessage);

  window.smallPhotosRender = {urlSet: urlSet, fullSet: fullSet};
}());
