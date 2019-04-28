'use strict';

(function () {
  var getRandomArrayIndex = function (targetArray) {
    return window.utilities.getRandomArrayIndex(targetArray);
  };

  var AMOUNT_OF_PHOTOS = 25;

  var COMMENT_SENTENCES = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
  ];

  var DESCRIPTION_SENTENCES = [
    'Тестим новую камеру!',
    'Затусили с друзьями на море',
    'Как же круто тут кормят',
    'Отдыхаем...',
    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    'Вот это тачка!',
  ];

  var getAmountOfLikes = function () {
    return (15 + Math.round(Math.random() * 185));
  };

  var getComments = function () {
    var comments = [];
    var firstSentenceIndex = getRandomArrayIndex(COMMENT_SENTENCES);
    var firstSentence = COMMENT_SENTENCES[firstSentenceIndex];
    comments.push(firstSentence);

    if (window.utilities.binaryTester()) {
      do {
        var secondSentenceIndex = getRandomArrayIndex(COMMENT_SENTENCES);
      } while (secondSentenceIndex === firstSentenceIndex);

      var secondSentence = COMMENT_SENTENCES[secondSentenceIndex];
      comments.push(secondSentence);
    }

    return comments;
  };

  var getDescription = function () {
    var description = window.utilities
      .getRandomArrayElement(DESCRIPTION_SENTENCES);
    return description;
  };

  var getUrlsSet = function () {
    var urlIndices = [];
    var urls = [];

    for (var i = 0; i < AMOUNT_OF_PHOTOS; i += 1) {
      do {
        var index = window.utilities
          .getRandomIntegerFromRange(AMOUNT_OF_PHOTOS);
      } while (urlIndices.indexOf(index) !== -1);

      urlIndices.push(index);
      var url = 'photos/' + index + '.jpg';
      urls.push(url);
    }

    return urls;
  };

  var urlsSet = getUrlsSet();

  var getPhotosData = function () {
    var photosData = [];

    for (var i = 0; i < AMOUNT_OF_PHOTOS; i += 1) {
      var photoData = {};
      photoData.url = urlsSet[i];
      photoData.likes = getAmountOfLikes();
      photoData.comments = getComments();
      photoData.description = getDescription();
      photosData.push(photoData);
    }

    return photosData;
  };

  window.smallPhotosData = {
    totalAmount: AMOUNT_OF_PHOTOS,
    urlSet: urlsSet,
    fullSet: getPhotosData(),
  };
}());
