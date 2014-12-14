'use strict';

describe('Controller: BeaconstateCtrl', function () {

  // load the controller's module
  beforeEach(module('ionicApp'));

  var BeaconstateCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BeaconstateCtrl = $controller('BeaconstateCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
