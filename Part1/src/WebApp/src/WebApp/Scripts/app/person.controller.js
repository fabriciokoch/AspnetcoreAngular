(function () {
  'use strict';

  angular
      .module('app')
      .controller('personController', personController);

  personController.$inject = ['$http'];

  function personController($http) {
    var vm = this;
    vm.personList = {};

    vm.getPersonList = function () {
      $http.get('api/person').then(function successCallback(response) {
        vm.personList = response.data;
      }, function errorCallback(response) {
        vm.personList = {};
      });
    };

    vm.getPersonList();
  }

})();
