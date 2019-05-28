'use strict';

(function () {
  window.createBigPhoto = {lastShownPhotoIndex: null};
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

  var renderCommmentsSet = function (set) {
    var tempContainer = document.createDocumentFragment();
    set.forEach(function (it) {
      tempContainer.appendChild(createComment(it));
    });
    setTimeout(function () {
      commentsList.appendChild(tempContainer);
    }, ICON_RENDERING_TIMEOUT);
  };

  var loadButtonEventMaps = [
    {name: 'Click', action: 'click'},
    {name: 'EnterPress', action: 'keydown'},
  ];
  window.createBigPhoto.manageLoadButtonListeners = function (actionName) {
    loadButtonEventMaps.forEach(function (map) {
      loadButton[actionName + 'EventListener'](
          map.action,
          window.createBigPhoto['loadmore' + map.name + 'Handler']
      );
    });
  };

  var addCommentsRest = function (source) {
    renderCommmentsSet(source);
    window.createBigPhoto.manageLoadButtonListeners('remove');
    window.createBigPhoto.setLoadmoreHandlers(source);
  };

  var COMMENTS_LOADING_STEP = 5;
  window.createBigPhoto.create = function (dataSource) {
    removePreviousComments();
    setBigPhotoProps(dataSource);

    var commentsRest = dataSource.comments;
    var commentsRestAmount = commentsRest.length;
    var commentsToRender;
    var commentsAmountToShow;

    if (commentsRestAmount <= COMMENTS_LOADING_STEP) {
      setLoadmoreElementsVisibility('hide');
      commentsToRender = commentsRest;
      commentsAmountToShow = commentsRestAmount;
    } else {
      setLoadmoreElementsVisibility('show');
      commentsToRender = commentsRest.splice(0, COMMENTS_LOADING_STEP);
      commentsAmountToShow = COMMENTS_LOADING_STEP;
      this.setLoadmoreHandlers(commentsRest);
      window.createBigPhoto.manageLoadButtonListeners('add');
    }
    renderCommmentsSet(commentsToRender);
    setLoadedCommentsCount(commentsAmountToShow);

    this.lastShownPhotoIndex = dataSource.index;
  };

  window.createBigPhoto.loadmoreClickHandler = function () {
    return null;
  };
  window.createBigPhoto.loadmoreEnterPressHandler = function () {
    return null;
  };

  window.createBigPhoto.setLoadmoreHandlers = function (dataSource) {
    this.loadmoreClickHandler = function () {
      addCommentsRest(dataSource);
    };
    this.loadmoreEnterPressHandler = function (evt) {
      if (window.utilities.isEnterKeycode(evt)) {
        addCommentsRest(dataSource);
      }
    };
  };
}());
