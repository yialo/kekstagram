'use strict';

/*
Генерация данных для описания фотографий
----------------------------------------
*/

var AMOUNT_OF_PICTURES = 25;

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

/*
Бинарный генератор случайных чисел: 0 или 1
*/

var binaryTester = function () {
  return Math.round(Math.random());
};

/*
Выбор случайного индекса из данного массива
*/

var selectRandomIndexOfArray = function (targetArray) {
  var randomElementNumber = Math.floor(Math.random() * targetArray.length);
  return randomElementNumber;
};

/*
Выбор случайного элемента из данного массива
*/

var selectRandomElementOfArray = function (targetArray) {
  var randomIndexOfArray = selectRandomIndexOfArray(targetArray);
  var randomElementOfArray = targetArray[randomIndexOfArray];
  return randomElementOfArray;
};

/*
Генератор количества лайков
*/

var generateAmountOfLikes = function () {
  var randomAmountOfLikes = 15 + Math.round(Math.random() * 185);
  return randomAmountOfLikes;
};

/*
Генератор контента блока comment
*/

var generateComments = function () {
  var generatedComment = [];

  var firstSentenceIndex = selectRandomIndexOfArray(COMMENT_SENTENCES);
  var firstSentenceForComment = COMMENT_SENTENCES[firstSentenceIndex];
  generatedComment.push(firstSentenceForComment);

  if (binaryTester() === 0) {
    do {
      var secondSentenceIndex = selectRandomIndexOfArray(COMMENT_SENTENCES);
    } while (secondSentenceIndex === firstSentenceIndex);

    var secondSentenceForComment = COMMENT_SENTENCES[secondSentenceIndex];
    generatedComment.push(secondSentenceForComment);
  }

  return generatedComment;
};

/*
Генератор контента блока desctiption
*/

var generateDescription = function () {
  var generatedDescription = selectRandomElementOfArray(DESCRIPTION_SENTENCES);
  return generatedDescription;
};

/*
Проверка на наличие элемента в массиве
*/

var checkValueExistenceInArray = function (testingValue, testingArray) {
  var testAnswer = false;

  for (
    var testingCounter = 0;
    testingCounter < testingArray.length;
    testingCounter += 1
  ) {
    if (testingArray[testingCounter] === testingValue) {
      testAnswer = true;
      break;
    }
  }

  return testAnswer;
};

/* Выбор случайного целого числа из диапазона от 1 до maxNumber */

var selectRandomIntegerFromRange = function (maxNumber) {
  var randomIntegerFromRange = Math.floor(Math.random() * maxNumber) + 1;
  return randomIntegerFromRange;
};

/*
Генератор адресов изображений
*/

var generateSetOfUrls = function (totalAmountOfUrls) {
  var setOfNumbers = [];
  var setOfUrls = [];

  for (
    var urlGeneratorCounter = 0;
    urlGeneratorCounter < totalAmountOfUrls;
    urlGeneratorCounter += 1
  ) {
    do {
      var numberForUrl = selectRandomIntegerFromRange(totalAmountOfUrls);
    } while (checkValueExistenceInArray(numberForUrl, setOfNumbers));

    setOfNumbers.push(numberForUrl);
    var urlGenerated = 'photos/' + numberForUrl + '.jpg';
    setOfUrls.push(urlGenerated);
  }

  return setOfUrls;
};

var urlsForPictures = generateSetOfUrls(AMOUNT_OF_PICTURES);

/*
Герератор объекта с данными для одной фотографии
*/

var generatePictureData = function (pictureNumber) {
  var pictureData = {};
  pictureData.url = urlsForPictures[pictureNumber];
  pictureData.likes = generateAmountOfLikes();
  pictureData.comments = generateComments();
  pictureData.description = generateDescription();

  return pictureData;
};

/*
Создание массива с данными для всех фотографий
*/

var picturesData = [];

for (
  var picturesCounter = 0;
  picturesCounter < AMOUNT_OF_PICTURES;
  picturesCounter += 1
) {
  picturesData.push(generatePictureData(picturesCounter));
}

/*
Создание DOM-элемента с фотографией на основе JS-объекта
========================================================
*/

var pictureBlockTemplate = document.querySelector('#picture-template')
  .content.querySelector('.picture');

var generatePictureBlock = function (pictureObject) {
  var generatedPictureBlock = pictureBlockTemplate.cloneNode(true);
  var pictureImageElement = generatedPictureBlock.querySelector('img');
  var pictureLikesAmountElement = generatedPictureBlock
    .querySelector('.picture-likes');
  var pictureCommentsAmountElement = generatedPictureBlock
    .querySelector('.picture-comments');

  pictureImageElement.src = pictureObject.url;
  pictureLikesAmountElement.textContent = pictureObject.likes;
  pictureCommentsAmountElement.textContent = pictureObject.comments.length;

  return generatedPictureBlock;
};

/*
Отрисовка созданных DOM-элементов с фотографиями
================================================
*/

var temporaryContainerForPictureBlocks = document.createDocumentFragment();

for (
  var pictureBlockCounter = 0;
  pictureBlockCounter < picturesData.length;
  pictureBlockCounter += 1
) {
  var pictureBlock = generatePictureBlock(picturesData[pictureBlockCounter]);
  temporaryContainerForPictureBlocks.appendChild(pictureBlock);
}

var picturesContainer = document.querySelector('.pictures');
picturesContainer.appendChild(temporaryContainerForPictureBlocks);
