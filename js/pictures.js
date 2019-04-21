'use strict';

/*
Генерация данных для описания фотографий
========================================
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
    } while (setOfNumbers.indexOf(numberForUrl) !== -1);

    setOfNumbers.push(numberForUrl);
    var urlGenerated = 'photos/' + numberForUrl + '.jpg';
    setOfUrls.push(urlGenerated);
  }

  return setOfUrls;
};

/*
Герератор объекта с данными для одной фотографии
*/

var urlsForPictures = generateSetOfUrls(AMOUNT_OF_PICTURES);

var generatePictureData = function (pictureNumber) {
  var pictureData = {};
  pictureData.url = urlsForPictures[pictureNumber];
  pictureData.likes = generateAmountOfLikes();
  pictureData.comments = generateComments();
  pictureData.description = generateDescription();

  return pictureData;
};

/*
Генератор массива с данными для всех фотографий
*/

var generatePicturesData = function () {
  var picturesDataSet = [];

  for (
    var picturesCounter = 0;
    picturesCounter < AMOUNT_OF_PICTURES;
    picturesCounter += 1
  ) {
    picturesDataSet.push(generatePictureData(picturesCounter));
  }

  return picturesDataSet;
};

/*
Создание DOM-элемента с фотографией на основе JS-объекта
========================================================
*/

var pictureBlockTemplate = document.querySelector('#picture')
  .content.querySelector('.picture__link');

var generatePictureBlock = function (pictureObject) {
  var generatedPictureBlock = pictureBlockTemplate.cloneNode(true);
  var pictureImageElement = generatedPictureBlock
    .querySelector('.picture__img');
  var pictureLikesAmountElement = generatedPictureBlock
    .querySelector('.picture__stat--likes');
  var pictureCommentsAmountElement = generatedPictureBlock
    .querySelector('.picture__stat--comments');

  pictureImageElement.src = pictureObject.url;
  pictureLikesAmountElement.textContent = pictureObject.likes;
  pictureCommentsAmountElement.textContent = pictureObject.comments.length;

  return generatedPictureBlock;
};

/*
Отрисовка созданных DOM-элементов с фотографиями
================================================
*/

var picturesData = generatePicturesData();
var picturesContainer = document.querySelector('.pictures');

var renderPictures = function () {
  var temporaryContainerForPictureBlocks = document.createDocumentFragment();

  for (
    var pictureBlockCounter = 0;
    pictureBlockCounter < picturesData.length;
    pictureBlockCounter += 1
  ) {
    var pictureBlock = generatePictureBlock(picturesData[pictureBlockCounter]);
    temporaryContainerForPictureBlocks.appendChild(pictureBlock);
  }

  picturesContainer.appendChild(temporaryContainerForPictureBlocks);
};

renderPictures();

/*
Блок big-picture
================
*/

/*
Создание комментария для блока big-picture
*/

var generateBigPictureComment = function (commentText) {
  var bigPictureCommentBlock = document.createElement('li');
  bigPictureCommentBlock.classList.add('social__comment');

  var bigPictureCommentImage = document.createElement('img');
  bigPictureCommentImage.classList.add('social__picture');

  var avatarNumber = selectRandomIntegerFromRange(6);
  bigPictureCommentImage.src = 'img/avatar-' + avatarNumber + '.svg';
  bigPictureCommentImage.alt = 'Аватар комментатора фотографии';
  bigPictureCommentImage.width = '35';
  bigPictureCommentImage.height = '35';
  bigPictureCommentBlock.appendChild(bigPictureCommentImage);

  var bigPictureCommentText = document.createElement('p');
  bigPictureCommentText.classList.add('social__text');
  bigPictureCommentText.textContent = commentText;
  bigPictureCommentBlock.appendChild(bigPictureCommentText);

  return bigPictureCommentBlock;
};

/*
Переменные для работы с блоком big-picture
*/

var bigPictureBlock = document.querySelector('.big-picture');
var bigPictureImage = bigPictureBlock
  .querySelector('.big-picture__img img');
var bigPictureSocialCaption = bigPictureBlock
  .querySelector('.social__caption');
var bigPictureLikesCount = bigPictureBlock
  .querySelector('.likes-count');
var bigPictureSocialCommentsCount = bigPictureBlock
  .querySelector('.social__comment-count');
var bigPictureCommentsCount = bigPictureSocialCommentsCount
  .querySelector('.comments-count');
var bigPictureCommentLoadingButton = bigPictureBlock
  .querySelector('.social__comment-loadmore');
var bigPictureSocialCommentsList = bigPictureBlock
  .querySelector('.social__comments');

while (bigPictureSocialCommentsList.firstChild) {
  bigPictureSocialCommentsList
    .removeChild(bigPictureSocialCommentsList.firstChild);
}

/*
Добавление данных в блок big-picture
*/

var addDataToBigPicture = function (pictureDataObject) {
  var bigPictureCommentsContainer = document.createDocumentFragment();

  bigPictureImage.src = pictureDataObject.url;
  bigPictureLikesCount.textContent = pictureDataObject.likes;
  bigPictureCommentsCount.textContent = pictureDataObject.comments.length;
  bigPictureSocialCaption.textContent = pictureDataObject.description;

  for (
    var commentCounter = 0;
    commentCounter < pictureDataObject.comments.length;
    commentCounter += 1
  ) {
    bigPictureCommentsContainer.appendChild(
        generateBigPictureComment(pictureDataObject.comments[commentCounter])
    );
  }

  bigPictureSocialCommentsList.appendChild(bigPictureCommentsContainer);
};

/*
Функция для показа большого изображения
*/

var showBigPicture = function (targetPicture) {
  addDataToBigPicture(targetPicture);
  bigPictureSocialCommentsCount.classList.add('visually-hidden');
  bigPictureCommentLoadingButton.classList.add('visually-hidden');
  bigPictureBlock.classList.remove('hidden');
};

// showBigPicture(picturesData[0]);


/*
Показ полноэкранных изображений
===============================
*/

var imageLinks = picturesContainer.querySelectorAll('.picture__link');

var imageLinkClickHander = function (evt) {
  evt.preventDefault();
  var targetPicture = evt.target.querySelector('.picture_img');
};

// for (var i = 0; i < imageLinks.length; i += 1) {
//   imageLinks[i].addEventListener('click', )
// }

/*
Работа формы обработки изображения
==================================
*/

/*
Открытие/закрытие формы
*/

var KEYDOWN_ESC = 27;

var uploadForm = document.querySelector('#upload-select-image');
var uploadFileInput = uploadForm.querySelector('#upload-file');
var uploadCancel = uploadForm.querySelector('#upload-cancel');
var uploadOverlay = uploadForm.querySelector('.img-upload__overlay');

var showPopup = function () {
  uploadOverlay.classList.remove('hidden');
  uploadCancel.addEventListener('click', popupClickCloseHandler);
  document.addEventListener('keydown', popupEscPressHandler);
  uploadFileInput.removeEventListener('change', popupClickOpenHandler);
};

var hidePopup = function () {
  uploadOverlay.classList.add('hidden');
  uploadFileInput.value = null;
  uploadCancel.removeEventListener('click', popupClickCloseHandler);
  document.removeEventListener('keydown', popupEscPressHandler);
  uploadFileInput.addEventListener('change', popupClickOpenHandler);
};

var popupEscPressHandler = function (evt) {
  if (evt.keyCode === KEYDOWN_ESC) {
    evt.preventDefault();
    hidePopup();
  }
};

var popupClickOpenHandler = function () {
  showPopup();
};

var popupClickCloseHandler = function () {
  hidePopup();
};

uploadFileInput.addEventListener('change', showPopup);

/*
Изменение размера изображения
*/

var resizeControlInput = uploadForm.querySelector('.resize__control--value');
var resizeControlMinus = uploadForm.querySelector('.resize__control--minus');
var resizeControlPlus = uploadForm.querySelector('.resize__control--plus');
var imageUploadPreviewWrapper = uploadForm
  .querySelector('.img-upload__preview');

var RESIZE_STEP = 25;
var SIZE_RANGE = {min: 25, max: 100};

var getResizeValue = function () {
  var resizeValueString = resizeControlInput.value;
  return +resizeValueString.slice(0, -1);
};

var setResizeValue = function (valueString) {
  resizeControlInput.value = valueString + '%';
};

var setScaleValue = function (value) {
  var scaleValue = (value === 100 ? 'none' : 'scale(0.' + value + ')');
  return scaleValue;
};

var resizeControlMinusClickHandler = function () {
  var currentResizeValue = getResizeValue();
  if (currentResizeValue > SIZE_RANGE.min && currentResizeValue <= SIZE_RANGE.max) {
    currentResizeValue -= RESIZE_STEP;
  }
  setResizeValue(currentResizeValue);
  imageUploadPreviewWrapper
    .style.transform = setScaleValue(currentResizeValue);
};

var resizeControlPlusClickHandler = function () {
  var currentResizeValue = getResizeValue();
  if (currentResizeValue >= SIZE_RANGE.min && currentResizeValue < SIZE_RANGE.max) {
    currentResizeValue += RESIZE_STEP;
  }
  setResizeValue(currentResizeValue);
  imageUploadPreviewWrapper
    .style.transform = setScaleValue(currentResizeValue);
};

resizeControlMinus.addEventListener('click', function () {
  resizeControlMinusClickHandler();
});

resizeControlPlus.addEventListener('click', function () {
  resizeControlPlusClickHandler();
});

/*
Наложение эффекта на изображение
*/

var scale = uploadForm.querySelector('.scale');
var scaleInput = scale.querySelector('.scale__value');
var scaleLine = scale.querySelector('.scale__line');
var scalePin = scaleLine.querySelector('.scale__pin');

var effectNone = uploadForm.querySelector('#effect-none');
var effectChrome = uploadForm.querySelector('#effect-chrome');
var effectSepia = uploadForm.querySelector('#effect-sepia');
var effectMarvin = uploadForm.querySelector('#effect-marvin');
var effectPhobos = uploadForm.querySelector('#effect-phobos');
var effectHeat = uploadForm.querySelector('#effect-heat');
var imagePreview = imageUploadPreviewWrapper.querySelector('img');

var effects = [
  {name: 'chrome', element: effectChrome},
  {name: 'sepia', element: effectSepia},
  {name: 'marvin', element: effectMarvin},
  {name: 'phobos', element: effectPhobos},
  {name: 'heat', element: effectHeat},
];

var hideScale = function () {
  scale.classList.add('hidden');
};

var showScale = function () {
  scale.classList.remove('hidden');
};

var getEffectClassname = function (effect) {
  var effectClassname = 'effects__preview--' + effect;
  return effectClassname;
};

var checkEffectPresence = function (effect) {
  var isEffectApplied = imagePreview.classList
    .contains(getEffectClassname(effect));
  return isEffectApplied;
};

var removeEffects = function () {
  imagePreview.removeAttribute('style');
  imagePreview.removeAttribute('class');
};

var addEffect = function (effect) {
  if (!checkEffectPresence(effect)) {
    removeEffects();
    imagePreview.classList.add(getEffectClassname(effect));
    scaleInput.value = 100;
    showScale();
  }
};

var addEffectElementClickListener = function (effectName, effectElement) {
  effectElement.addEventListener('click', function () {
    addEffect(effectName);
  });
};

effectNone.addEventListener('click', function () {
  removeEffects();
  hideScale();
});

for (
  var effectCounter = 0;
  effectCounter < effects.length;
  effectCounter += 1
) {
  addEffectElementClickListener(
      effects[effectCounter].name,
      effects[effectCounter].element
  );
}

var getEffectDepthFromScale = function () {
  var scaleLineLeft = scaleLine.getBoundingClientRect().left;
  var scaleLineWidth = scaleLine.offsetWidth;
  var scalePinLeft = scalePin.getBoundingClientRect().left;
  var scalePinWidth = scalePin.offsetWidth;
  var scalePinCenterX = scalePinLeft + scalePinWidth / 2;
  var scalePinShift = scalePinCenterX - scaleLineLeft;
  var relativeShift = scalePinShift / scaleLineWidth;
  var relativeShiftPercentage = Math.round(relativeShift * 100) / 100;
  return relativeShiftPercentage;
};

var scalePinMouseupHandler = function () {
  var effectDepth = getEffectDepthFromScale();
  scaleInput.value = 100 * effectDepth;

  if (checkEffectPresence('chrome')) {
    imagePreview.style.filter = 'grayscale(' + effectDepth + ')';
  } else if (checkEffectPresence('sepia')) {
    imagePreview.style.filter = 'sepia(' + effectDepth + ')';
  } else if (checkEffectPresence('marvin')) {
    imagePreview.style.filter = 'invert(' + 100 * effectDepth + '%)';
  } else if (checkEffectPresence('phobos')) {
    var blurValue = 3 * effectDepth;
    imagePreview.style.filter = 'blur(' + blurValue + 'px)';
  } else if (checkEffectPresence('heat')) {
    var brightnessValue = 1 + 2 * effectDepth;
    imagePreview.style.filter = 'brightness(' + brightnessValue + ')';
  }
};

scalePin.addEventListener('mouseup', function () {
  scalePinMouseupHandler();
});
