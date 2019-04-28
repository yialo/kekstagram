'use strict';

(function () {
  var photoBlockTemplate = document.querySelector('#picture')
    .content.querySelector('.picture__link');

  var createPhoto = function (dataObject) {
    var photoBlock = photoBlockTemplate.cloneNode(true);
    var imageElement = photoBlock.querySelector('.picture__img');
    var likesAmountElement = photoBlock
      .querySelector('.picture__stat--likes');
    var commentsAmountElement = photoBlock
      .querySelector('.picture__stat--comments');

    imageElement.src = dataObject.url;
    likesAmountElement.textContent = dataObject.likes;
    commentsAmountElement.textContent = dataObject.comments.length;

    return photoBlock;
  };

  var renderPhotos = function () {
    var container = document.querySelector('.pictures');
    var temporaryContainer = document.createDocumentFragment();

    for (var i = 0; i < window.smallPhotosData.totalAmount; i += 1) {
      var photoData = window.smallPhotosData.fullSet[i];
      var photo = createPhoto(photoData);
      temporaryContainer.appendChild(photo);
    }

    container.appendChild(temporaryContainer);
  };

  renderPhotos();
}());
