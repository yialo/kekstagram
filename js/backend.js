'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram/data';

  window.backend = {
    download: function (successHandler, errorHandler) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.timeout = 5000;
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
        errorHandler('Данные не удалось получить в течение ' + xhr.timeout / 1000 + ' секунд');
      });

      xhr.open('GET', URL);
      xhr.send();
    },
    // upload: function (successHandler, errorHandler) {

    // },
  };
}());
