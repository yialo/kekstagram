'use strict';

(function () {
  window.createBigPhoto = {};
  var ICON_RENDERING_TIMEOUT = 50;

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

  var loadButton = bigPhotoBody.querySelector('.social__comment-loadmore');
  var loadmoreActionMap = {'hide': 'add', 'show': 'remove'};
  var setLoadmoreElementsVisibility = function (action) {
    [loadButton, socialCommentsCount].forEach(function (el) {
      el.classList[loadmoreActionMap[action]]('hidden');
    });
  };

  var renderCommmentsSet = function (commentsData) {
    var tempContainer = document.createDocumentFragment();
    commentsData.forEach(function (it) {
      tempContainer.appendChild(createComment(it));
    });
    setTimeout(function () {
      commentsList.appendChild(tempContainer);
    }, ICON_RENDERING_TIMEOUT);
  };

  var loadmoreClickHandler = function () {
    renderCommentsRest();
  };
  var loadmoreEnterPressHandler = function (evt) {
    if (window.utilities.isEnterKeycode(evt)) {
      renderCommentsRest();
    }
  };

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

  var COMMENTS_LOADING_STEP = 5;
  var renderCommentsRest = function () {
    var commentsRestAmount = commentsRest.length;
    var commentsToRender;

    if (commentsRestAmount <= COMMENTS_LOADING_STEP) {
      setLoadmoreElementsVisibility('hide');
      commentsToRender = commentsRest;
      renderCommmentsSet(commentsToRender);
      commentsAmountToShow = commentsRestAmount;
    } else {
      setLoadmoreElementsVisibility('show');
      commentsToRender = commentsRest.splice(0, COMMENTS_LOADING_STEP);
      renderCommmentsSet(commentsToRender);
      commentsAmountToShow += COMMENTS_LOADING_STEP;
      setLoadedCommentsCount(commentsAmountToShow);
      if (!areLoadButtonListenersAdded) {
        window.createBigPhoto.manageLoadButtonListeners('add');
      }
    }
  };

  var commentsRest;
  var commentsAmountToShow;
  var areLoadButtonListenersAdded = false;
  window.createBigPhoto.create = function (photoData) {
    commentsRest = photoData.comments.slice();
    commentsAmountToShow = 0;
    removePreviousComments();
    setBigPhotoProps(photoData);
    renderCommentsRest();
  };
}());
