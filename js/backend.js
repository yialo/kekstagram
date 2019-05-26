'use strict';

(function () {
  var addIndexPropToArrayItems = function (arr) {
    arr.forEach(function (item, i) {
      item.index = i;
    });
    return arr;
  };

  var TIMEOUT = 10000;
  window.backend = {};

  window.backend.download = function (successHandler, errorHandler) {
    var URL = 'https://js.dump.academy/kekstagram/data';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT;
    var errorMessage = '';
    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case 200:
          var response = xhr.response;
          window.backend.photos = addIndexPropToArrayItems(response);
          successHandler(response);
          break;
        case 404:
          errorMessage = 'Адрес не существует';
          break;
        default:
          errorMessage = 'Статус ответа: ' + xhr.status + ' ' + xhr.statusText;
      }
      if (errorMessage) {
        errorHandler(errorMessage);
      }
    });
    xhr.addEventListener('error', function () {
      errorHandler('Ошибка сетевого соединения');
    });
    xhr.addEventListener('timeout', function () {
      errorHandler('Данные не удалось получить в течение ' + (xhr.timeout / 1000) + ' секунд');
    });
    xhr.open('GET', URL);
    xhr.send();
  };
  window.backend.upload = function (dataToSend, successHandler, errorHandler) {
    var URL = 'https://js.dump.academy/kekstagram';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT;
    xhr.addEventListener('load', function () {
      successHandler(xhr.response);
    });
    xhr.addEventListener('error', function () {
      errorHandler();
    });
    xhr.addEventListener('timeout', function () {
      errorHandler();
    });
    xhr.open('POST', URL);
    xhr.send(dataToSend);
  };
}());
