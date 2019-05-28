'use strict';

(function () {
  var createCommentIcon = function (data) {
    var commentIcon = document.createElement('img');
    commentIcon.classList.add('social__picture');
    commentIcon.src = data.avatar;
    commentIcon.alt = data.name;
    commentIcon.width = '35';
    commentIcon.height = '35';
    return commentIcon;
  };

  var createCommentParagraph = function (data) {
    var commentParagraph = document.createElement('p');
    commentParagraph.classList.add('social__text');
    commentParagraph.textContent = data.message;
  };

  var createCommentElement = function (commentData) {
    var commentBlock = document.createElement('li');
    commentBlock.classList.add('social__comment');
    var commentIcon = createCommentIcon(commentData);
    commentBlock.appendChild(commentIcon);
    var commentParagraph = createCommentParagraph(commentData);
    commentBlock.appendChild(commentParagraph);
    return commentBlock;
  };

  var bigPhotoBody = document.querySelector('.big-picture__preview');
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
    loadButton.removeEventListener(
        'click',
        window.createBigPhoto.loadmoreClickHandler
    );
    loadButton.removeEventListener(
        'keydown',
        window.createBigPhoto.loadmoreEnterPressHandler
    );
  };

  var bigPhotoImage = bigPhotoBody.querySelector('.big-picture__img img');
  var socialCaption = bigPhotoBody.querySelector('.social__caption');
  var likesCount = bigPhotoBody.querySelector('.likes-count');

  var setBigPhotoProps = function (data) {
    bigPhotoImage.src = data.url;
    likesCount.textContent = data.likes;
    commentsCount.textContent = data.comments.length;
    socialCaption.textContent = data.description;
  };

  var removeOldComments = function () {
    while (commentsList.firstChild) {
      commentsList.removeChild(commentsList.firstChild);
    }
  };

  window.createBigPhoto = {
    lastShownPhotoIndex: null,
    create: function (dataSource) {
      removeOldComments();
      setBigPhotoProps(dataSource);

      var commentsToRender = dataSource.comments.length;
      if (dataSource.comments.length <= 5) {
        loadButton.classList.add('hidden');
        socialCommentsCount.classList.add('hidden');
      } else {
        this.setLoadmoreClickHandler(dataSource);
        loadButton.addEventListener('click', this.loadmoreClickHandler);
        this.setLoadmoreEnterPressHandler(dataSource);
        loadButton.addEventListener('keydown', this.loadmoreEnterPressHandler);
        loadButton.classList.remove('hidden');
        socialCommentsCount.classList.remove('hidden');
        commentsToRender = 5;
      }

      var commentsContainer = document.createDocumentFragment();
      for (var i = 0; i < commentsToRender; i += 1) {
        commentsContainer
          .appendChild(createCommentElement(dataSource.comments[i]));
      }
      commentsList.appendChild(commentsContainer);
      this.lastShownPhotoIndex = dataSource.index;
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
