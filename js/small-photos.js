'use strict';

(function () {
  var photoBlockTemplate = document.querySelector('#picture')
    .content.querySelector('.picture__link');

  var getCommentsAmount = function (photo) {
    return photo.comments.length;
  };

  var createPhoto = function (photoData) {
    var photoBlock = photoBlockTemplate.cloneNode(true);
    photoBlock.photoIndex = photoData.index;
    var imageElement = photoBlock.querySelector('.picture__img');
    var likesAmountElement = photoBlock
      .querySelector('.picture__stat--likes');
    var commentsAmountElement = photoBlock
      .querySelector('.picture__stat--comments');
    imageElement.src = photoData.url;
    likesAmountElement.textContent = photoData.likes;
    commentsAmountElement.textContent = getCommentsAmount(photoData);
    return photoBlock;
  };

  var container = document.querySelector('.pictures');
  var renderPhotos = function (photosData) {
    while (container.querySelector('.picture__link')) {
      var photoEl = container.querySelector('.picture__link');
      container.removeChild(photoEl);
    }
    var temporaryContainer = document.createDocumentFragment();
    photosData.forEach(function (photoData) {
      var photo = createPhoto(photoData);
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

  var sortingFilterMap = {
    'popular': function () {
      return window.backend.photos.slice();
    },
    'new': function () {
      var NEW_PHOTOS_AMOUNT = 10;
      return window.utilities.getRandomItemsFromArray(
          window.backend.photos,
          NEW_PHOTOS_AMOUNT
      );
    },
    'discussed': function () {
      var photos = window.backend.photos.slice();
      photos.sort(function (left, right) {
        return (getCommentsAmount(right) - getCommentsAmount(left));
      });
      return photos;
    },
  };

  var filterClickDebounce = window.debounce.create(renderPhotos);
  var getSortFilterClickHandler = function (filter) {
    return function (evt) {
      var data = sortingFilterMap[filter]();
      filterClickDebounce(data);
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
  var successDownloadHandler = function () {
    renderPhotos(window.backend.photos);
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
}());
