'use strict';

(function () {
  var createCommentElement = function (commentData) {
    var commentBlock = document.createElement('li');
    commentBlock.classList.add('social__comment');

    var commentImage = document.createElement('img');
    commentImage.classList.add('social__picture');
    commentImage.src = commentData.avatar;
    commentImage.alt = commentData.name;
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
  var loadButton = bigPhotoBody.querySelector('.social__comment-loadmore');
  var socialCommentsCount = bigPhotoBody
    .querySelector('.social__comment-count');

  var addCommentsRest = function (source) {
    var commentsContainer = document.createDocumentFragment();
    for (var i = 5; i < source.comments.length; i += 1) {
      commentsContainer.appendChild(createCommentElement(source.comments[i]));
    }
    commentsList.appendChild(commentsContainer);
    loadButton.classList.add('hidden');
    socialCommentsCount.classList.add('hidden');
  };

  window.createBigPhoto = {
    lastShownPhoto: null,
    create: function (dataSource) {
      while (commentsList.firstChild) {
        commentsList.removeChild(commentsList.firstChild);
      }

      bigPhotoImage.src = dataSource.url;
      likesCount.textContent = dataSource.likes;
      commentsCount.textContent = dataSource.comments.length;
      socialCaption.textContent = dataSource.description;

      var commentsContainer = document.createDocumentFragment();
      var commentsToRender = dataSource.comments.length;
      if (dataSource.comments.length <= 5) {
        loadButton.classList.add('hidden');
        socialCommentsCount.classList.add('hidden');
      } else {
        this.setLoadmoreClickHandler(dataSource);
        this.setLoadmoreEnterPressHandler(dataSource);
        loadButton.classList.remove('hidden');
        socialCommentsCount.classList.remove('hidden');
        commentsToRender = 5;
      }
      for (var i = 0; i < commentsToRender; i += 1) {
        commentsContainer
          .appendChild(createCommentElement(dataSource.comments[i]));
      }
      commentsList.appendChild(commentsContainer);
    },

    loadmoreClickHandler: function () {
      return null;
    },
    setLoadmoreClickHandler: function (dataSource) {
      this.loadmoreClickHandler = function () {
        addCommentsRest(dataSource);
      };
    },
    loadmoreEnterPressHandler: function () {
      return null;
    },
    setLoadmoreEnterPressHandler: function (dataSource) {
      this.loadmoreEnterPressHandler = function (evt) {
        if (window.utilities.isEnterKeycode(evt)) {
          addCommentsRest(dataSource);
        }
      };
    },
  };
}());
