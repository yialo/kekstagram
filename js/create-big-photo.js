'use strict';

(function () {
  window.createBigPhoto = {};
  var createCommentIcon = function (data) {
    var commentIcon = document.createElement('img');
    commentIcon.classList.add('social__picture', 'hidden');
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
    return commentParagraph;
  };

  var createComment = function (commentData) {
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
  var bigPhotoImage = bigPhotoBody.querySelector('.big-picture__img img');
  var socialCaption = bigPhotoBody.querySelector('.social__caption');
  var likesCount = bigPhotoBody.querySelector('.likes-count');
  var setBigPhotoProps = function (data) {
    bigPhotoImage.src = data.url;
    likesCount.textContent = data.likes;
    commentsCount.textContent = data.comments.length;
    socialCaption.textContent = data.description;
  };

  var commentsList = bigPhotoBody.querySelector('.social__comments');
  var removePreviousComments = function () {
    while (commentsList.firstChild) {
      commentsList.removeChild(commentsList.firstChild);
    }
  };

  var socialCommentsCount = bigPhotoBody
  .querySelector('.social__comment-count');
  var setLoadedCommentsCount = function (value) {
    var initialText = socialCommentsCount.firstChild.textContent;
    var newText = initialText.replace(/^\d+/, value);
    socialCommentsCount.firstChild.textContent = newText;
  };

  var renderCommmentsSet = function (commentsData) {
    var tempContainer = document.createDocumentFragment();
    commentsData.forEach(function (it) {
      tempContainer.appendChild(createComment(it));
    });
    commentsList.appendChild(tempContainer);
  };

  var loadmoreClickHandler = function () {
    renderCommentsRest();
  };
  var loadmoreEnterPressHandler = function (evt) {
    if (window.utilities.isEnterKeycode(evt)) {
      renderCommentsRest();
    }
  };

  var loadButton = bigPhotoBody.querySelector('.social__comment-loadmore');
  window.createBigPhoto.manageLoadButtonListeners = function (actionName) {
    loadButton[actionName + 'EventListener'](
        'click',
        loadmoreClickHandler
    );
    loadButton[actionName + 'EventListener'](
        'keydown',
        loadmoreEnterPressHandler
    );
  };

  var commentsRest;
  var commentsAmountToShow;
  var isFirstPhotoOpening;
  var COMMENTS_LOADING_STEP = 5;
  var renderCommentsRest = function () {
    var commentsRestAmount = commentsRest.length;
    var commentsToRender;

    if (commentsRestAmount <= COMMENTS_LOADING_STEP) {
      loadButton.classList.add('hidden');
      commentsToRender = commentsRest;
      renderCommmentsSet(commentsToRender);
      commentsAmountToShow += commentsRestAmount;
    } else {
      commentsToRender = commentsRest.splice(0, COMMENTS_LOADING_STEP);
      renderCommmentsSet(commentsToRender);
      commentsAmountToShow += COMMENTS_LOADING_STEP;
      if (isFirstPhotoOpening) {
        loadButton.classList.remove('hidden');
        window.createBigPhoto.manageLoadButtonListeners('add');
        isFirstPhotoOpening = false;
      }
    }
    setLoadedCommentsCount(commentsAmountToShow);
  };

  var setInitialSpecialValues = function (source) {
    commentsRest = source.comments.slice();
    commentsAmountToShow = 0;
    isFirstPhotoOpening = true;
  };

  window.createBigPhoto.create = function (photoData) {
    setInitialSpecialValues(photoData);
    removePreviousComments();
    setBigPhotoProps(photoData);
    renderCommentsRest();
  };
}());
