'use strict';

(function () {
  window.smallPhotos = {};
  var photoBlockTemplate = document.querySelector('#picture')
    .content.querySelector('.picture__link');

  var createPhoto = function (dataSource) {
    var photoBlock = photoBlockTemplate.cloneNode(true);
    photoBlock.photoIndex = dataSource.index;
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

  var getArrayWithProp = function (arr, prop) {
    arr.forEach(function (item, i) {
      item[prop] = i;
    });
    return arr;
  };

  var renderPhotos = function (photosData) {
    window.smallPhotos.fullSet = getArrayWithProp(photosData, 'index');
    window.smallPhotos.urlSet = photosData.map(function (item) {
      return item.url;
    });
    var temporaryContainer = document.createDocumentFragment();
    photosData.forEach(function (photoData) {
      var photo = createPhoto(photoData);
      temporaryContainer.appendChild(photo);
    });
    var container = document.querySelector('.pictures');
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
}());
