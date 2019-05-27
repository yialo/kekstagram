'use strict';

// FIXME: найти ошибку!

(function () {
  window.smallPhotos = {currentElements: []};

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

  var container = document.querySelector('.pictures');
  var renderPhotos = function (renderingData) {
    while (container.querySelector('.picture__link')) {
      var photoEl = container.querySelector('.picture__link');
      container.removeChild(photoEl);
    }
    var temporaryContainer = document.createDocumentFragment();
    renderingData.forEach(function (dataItem) {
      var photo = createPhoto(dataItem);
      temporaryContainer.appendChild(photo);
      window.smallPhotos.currentElements.push(photo);
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

  var getPhotosCopy = function () {
    return initialData.slice();
  };
  var sortingFilterMap = {
    'popular': function () {
      return getPhotosCopy();
    },
    'new': function () {
      var NEW_PHOTOS_AMOUNT = 10;
      return window.utilities.getRandomItemsFromArray(
          initialData,
          NEW_PHOTOS_AMOUNT
      );
    },
    'discussed': function () {
      return getPhotosCopy().sort(function (left, right) {
        return (getCommentsAmount(right) - getCommentsAmount(left));
      });
    },
  };

  var filterClickDebounce = window.debounce.create(renderPhotos);
  var getSortFilterClickHandler = function (filter) {
    return function (evt) {
      currentPhotosData = sortingFilterMap[filter]();
      filterClickDebounce(currentPhotosData);
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

  var addIndexPropToArrayItems = function (arr) {
    arr.forEach(function (item, i) {
      item.index = i;
    });
    return arr;
  };

  var initialData = null;
  var currentPhotosData = [];
  var SORT_FILTERS = ['popular', 'new', 'discussed'];
  var successDownloadHandler = function (data) {
    initialData = addIndexPropToArrayItems(data);
    currentPhotosData = initialData.slice();
    renderPhotos(currentPhotosData);
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

  window.smallPhotos.getCurrentData = function () {
    return currentPhotosData;
  };
}());
