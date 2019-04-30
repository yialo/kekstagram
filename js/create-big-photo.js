'use strict';

(function () {
  var createBigPhotoCommentElement = function (commentData) {
    var commentBlock = document.createElement('li');
    commentBlock.classList.add('social__comment');

    var commentImage = document.createElement('img');
    commentImage.classList.add('social__picture');
    commentImage.src = commentData.avatar;
    commentImage.alt = 'Аватар комментатора фотографии';
    commentImage.width = '35';
    commentImage.height = '35';
    commentBlock.appendChild(commentImage);

    var commentText = document.createElement('p');
    commentText.classList.add('social__text');
    commentText.textContent = commentData.message;
    commentBlock.appendChild(commentText);

    return commentBlock;
  };

  var bigPhotoBody = document.querySelector('.big-picture__preview');
  var bigPhotoImage = bigPhotoBody.querySelector('.big-picture__img img');
  var socialCaption = bigPhotoBody.querySelector('.social__caption');
  var likesCount = bigPhotoBody.querySelector('.likes-count');
  var commentsCount = bigPhotoBody.querySelector('.comments-count');
  var commentsList = bigPhotoBody.querySelector('.social__comments');

  window.createBigPhoto = function (dataSource) {
    while (commentsList.firstChild) {
      commentsList.removeChild(commentsList.firstChild);
    }

    bigPhotoImage.src = dataSource.url;
    likesCount.textContent = dataSource.likes;
    commentsCount.textContent = dataSource.comments.length;
    socialCaption.textContent = dataSource.description;

    var commentsContainer = document.createDocumentFragment();

    for (var i = 0; i < dataSource.comments.length; i += 1) {
      commentsContainer.appendChild(
          createBigPhotoCommentElement(dataSource.comments[i])
      );
    }

    commentsList.appendChild(commentsContainer);
  };
}());
