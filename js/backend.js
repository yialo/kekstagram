'use strict';

(function () {
  window.backend = {};
  var getUrl = function (path) {
    var URL_BASE = 'https://js.dump.academy/kekstagram';
    return URL_BASE + path;
  };

  var getXhr = function (timeout) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = timeout;
    return xhr;
  };

  window.backend.download = function (successHandler, errorHandler) {
    var url = getUrl('/data');
    var xhr = getXhr(10000);
    var errorMessage = '';
    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case 200:
          successHandler(xhr.response);
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
    xhr.open('GET', url);
    xhr.send();
  };

  window.backend.upload = function (dataToSend, successHandler, errorHandler) {
    var url = getUrl('');
    var xhr = getXhr(5000);
    xhr.addEventListener('load', function () {
      successHandler(xhr.response);
    });
    xhr.addEventListener('error', function () {
      errorHandler();
    });
    xhr.addEventListener('timeout', function () {
      errorHandler();
    });
    xhr.open('POST', url);
    xhr.send(dataToSend);
  };
}());
