describe('testing personController', function () {
  beforeEach(module('app'));

  var $controller;
  var $http;
  var $httpBackend;

  beforeEach(inject(function (_$controller_, _$http_, _$httpBackend_) {
    //The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
    $http = _$http_;
    $httpBackend = _$httpBackend_;

    var persons = [{
      firstName: 'FirstName1',
      lastName: 'LastName1',
      dateOfBirth: new Date()
    }, {
      firstName: 'FirstName2',
      lastName: 'LastName2',
      dateOfBirth: new Date()
    }];
    $httpBackend.when('GET', 'api/person').respond(persons);
  }));


  describe('use this to group tests', function () {
    it('should populate personList', function () {
      var controller = $controller('personController', { $http: $http });
      $httpBackend.flush();
      expect(controller.personList.length).toEqual(2);
    });
  });

});

