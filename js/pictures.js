'use strict';

var AMOUNT_OF_URLS = 25;

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

var generateComment = function () {
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

/* Выбор случайного числа из диапазонане "не более N" */

var selectRandomIntegerFromRange = function (maxNumber) {
  var randomIntegerFromRange = Math.floor(Math.random() * maxNumber) + 1;
  return randomIntegerFromRange;
};

/*
Генератор адресов изображений
*/

var generateSetOfUrls = function () {
  var setOfNumbers = [];
  var setOfUrls = [];

  for (
    var amountOfUrlsGenerated = 0;
    amountOfUrlsGenerated < AMOUNT_OF_URLS;
    amountOfUrlsGenerated += 1
  ) {
    do {
      var numberForUrl = selectRandomIntegerFromRange(AMOUNT_OF_URLS);
    } while (checkValueExistenceInArray(numberForUrl, setOfNumbers));

    setOfNumbers.push(numberForUrl);
    var urlGenerated = 'photos/' + numberForUrl + '.jpg';
    setOfUrls.push(urlGenerated);
  }

  return setOfUrls;
};
