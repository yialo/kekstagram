'use strict';

(function () {
  window.smallPhotos = {};

  var photoBlockTemplate = document.querySelector('#picture')
    .content.querySelector('.picture__link');
  var getCommentsAmount = function (photo) {
    return photo.comments.length;
  };

  var createPhoto = function (photoData) {
    var photoBlock = photoBlockTemplate.cloneNode(true);
    photoBlock.photoIndex = photoData.index;
    var imageElement = photoBlock.querySelector('.picture__img');
    imageElement.src = photoData.url;
    var likesAmountElement = photoBlock
      .querySelector('.picture__stat--likes');
    likesAmountElement.textContent = photoData.likes;
    var commentsAmountElement = photoBlock
      .querySelector('.picture__stat--comments');
    commentsAmountElement.textContent = getCommentsAmount(photoData);
    photoBlock.addEventListener('click', window.showBigPhoto.clickHandler);
    return photoBlock;
  };

  var initialPhotosData;
  var sortedPhotosDataCreatorMap = {
    'popular': function () {
      return initialPhotosData;
    },
    'new': function () {
      var NEW_PHOTOS_AMOUNT = 10;
      return window.utilities.getRandomItemsFromArray(
          initialPhotosData,
          NEW_PHOTOS_AMOUNT
      );
    },
    'discussed': function () {
      return initialPhotosData.slice().sort(function (left, right) {
        return (getCommentsAmount(right) - getCommentsAmount(left));
      });
    },
  };

  var sortedPhotosData;
  var setSortedPhotosData = function (filterName) {
    sortedPhotosData = sortedPhotosDataCreatorMap[filterName]();
  };

  var container = document.querySelector('.pictures');
  var renderPhotos = function (filterName) {
    while (container.querySelector('.picture__link')) {
      var photoEl = container.querySelector('.picture__link');
      container.removeChild(photoEl);
    }
    window.smallPhotos.currentElements = [];
    var temporaryContainer = document.createDocumentFragment();
    setSortedPhotosData(filterName);
    sortedPhotosData.forEach(function (dataItem) {
      var photo = createPhoto(dataItem);
      window.smallPhotos.currentElements.push(photo);
      temporaryContainer.appendChild(photo);
    });
    container.appendChild(temporaryContainer);
  };

  var filtersBlock = document.querySelector('.img-filters');
  var showFilterControls = function () {
    filtersBlock.classList.remove('img-filters--inactive');
  };

  var filterButtons = filtersBlock.querySelectorAll('.img-filters__button');
  var changeFilterControlsStates = function (evt) {
    filterButtons.forEach(function (button) {
      if (evt.target === button) {
        button.classList.add('img-filters__button--active');
      } else {
        button.classList.remove('img-filters__button--active');
      }
    });
  };

  var filterClickDebounce = window.debounce.create(renderPhotos);
  var getSortFilterClickHandler = function (filterName) {
    return function (evt) {
      filterClickDebounce(filterName);
      changeFilterControlsStates(evt);
    };
  };

  var getFilterButton = function (filterName) {
    return filtersBlock.querySelector('#filter-' + filterName);
  };

  var addFilterButtonClickListener = function (filterName) {
    var button = getFilterButton(filterName);
    button.addEventListener('click', getSortFilterClickHandler(filterName));
  };

  var SORT_FILTERS = ['popular', 'new', 'discussed'];
  var successDownloadHandler = function (data) {
    initialPhotosData = window.utilities.addPropToArrayItems(data, 'index');
    renderPhotos('popular');
    showFilterControls();
    SORT_FILTERS.forEach(function (filter) {
      addFilterButtonClickListener(filter);
    });
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

  window.backend.download(successDownloadHandler, renderErrorMessage);

  window.smallPhotos.getInitialData = function () {
    return initialPhotosData;
  };
}());
