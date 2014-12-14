'use strict';

describe('Directive: d3bar', function () {

  // load the directive's module
  beforeEach(module('ionicApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<d3bar></d3bar>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the d3bar directive');
  }));
});
