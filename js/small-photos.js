'use strict';

(function () {
  window.smallPhotos = {};
  var photoBlockTemplate = document.querySelector('#picture')
    .content.querySelector('.picture__link');

  var createPhoto = function (dataSource) {
    var photoBlock = photoBlockTemplate.cloneNode(true);
    photoBlock.photoIndex = dataSource.index;
    var imageElement = photoBlock.querySelector('.picture__img');
    var likesAmountElement = photoBlock
      .querySelector('.picture__stat--likes');
    var commentsAmountElement = photoBlock
      .querySelector('.picture__stat--comments');
    imageElement.src = dataSource.url;
    likesAmountElement.textContent = dataSource.likes;
    commentsAmountElement.textContent = dataSource.comments.length;
    return photoBlock;
  };

  var filtersBlock = document.querySelector('.img-filters');
  var showFilters = function () {
    filtersBlock.classList.remove('img-filters--inactive');
  };

  var filterButtons = filtersBlock.querySelectorAll('.img-filters__button');
  var changeFilterButtonState = function (evt) {
    filterButtons.forEach(function (button) {
      if (evt.target === button) {
        button.classList.add('img-filters__button--active');
      } else {
        button.classList.remove('img-filters__button--active');
      }
    });
  };

  var sortFilterMap = {
    'popular': function () {},
    'new': function () {},
    'discussed': function () {},
  };

  var getSortFilterClickHandler = function (filter) {
    return function (evt) {
      changeFilterButtonState(evt);
      sortFilterMap[filter]();
    };
  };

  var getFilterButton = function (filterName) {
    return filtersBlock.querySelector('#filter-' + filterName);
  };

  var renderPhotos = function (photosData) {
    var temporaryContainer = document.createDocumentFragment();
    photosData.forEach(function (photoData) {
      var photo = createPhoto(photoData);
      temporaryContainer.appendChild(photo);
    });
    var container = document.querySelector('.pictures');
    container.appendChild(temporaryContainer);
  };

  var SORT_FILTERS = ['popular', 'new', 'discussed'];
  var successDownloadHandler = function () {
    renderPhotos(window.backend.photos);
    showFilters();
    SORT_FILTERS.forEach(function (filter) {
      var button = getFilterButton(filter);
      button.addEventListener('click', getSortFilterClickHandler(filter));
    });
    window.showBigPhoto.addClickHandlers();
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
