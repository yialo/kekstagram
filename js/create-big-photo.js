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
    commentsList.appendChild(tempContainer);
  };

  var loadButtonEventMaps = [
    {name: 'Click', action: 'click'},
    {name: 'EnterPress', action: 'keydown'},
  ];
  var manageLoadButtonListeners = function (actionName) {
    loadButtonEventMaps.forEach(function (map) {
      loadButton[actionName + 'EventListener'](
          map.action,
          window.createBigPhoto['loadmore' + map.name + 'Handler']
      );
    });
  };

  var addCommentsRest = function (source) {
    renderCommmentsSet(source);
    manageLoadButtonListeners('remove');
  };

  var COMMENTS_LOADING_STEP = 5;
  window.createBigPhoto = {
    lastShownPhotoIndex: null,
    create: function (dataSource) {
      removePreviousComments();
      setBigPhotoProps(dataSource);

      var initialComments = dataSource.comments;
      var commentsAmount = initialComments.length;
      var commentsToRender;
      var commentsAmountToShow;

      if (commentsAmount <= COMMENTS_LOADING_STEP) {
        setLoadmoreElementsVisibility('hide');
        commentsToRender = initialComments;
        commentsAmountToShow = commentsAmount;
      } else {
        setLoadmoreElementsVisibility('show');
        var commentsRest = initialComments.slice();
        commentsToRender = commentsRest.splice(COMMENTS_LOADING_STEP);
        commentsAmountToShow = COMMENTS_LOADING_STEP;
        this.setLoadmoreClickHandler(commentsRest);
        loadButton.addEventListener('click', this.loadmoreClickHandler);
        this.setLoadmoreEnterPressHandler(commentsRest);
        loadButton.addEventListener('keydown', this.loadmoreEnterPressHandler);
      }
      renderCommmentsSet(commentsToRender);
      setLoadedCommentsCount(commentsAmountToShow);

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
