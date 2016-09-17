(function () {
  'use strict';

  angular
      .module('app')
      .config(config);

  config.$inject = ['$routeProvider', '$locationProvider'];

  function config($routeProvider, $locationProvider) {
    $routeProvider
          .when('/', {
            templateUrl: 'app/person.html',
            controller: 'personController',
            controllerAs: 'vm'
          })
  }
})();