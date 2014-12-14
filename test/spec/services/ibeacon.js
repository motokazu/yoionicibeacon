'use strict';

describe('Service: Ibeacon', function () {

  // load the service's module
  beforeEach(module('ionicApp'));

  // instantiate service
  var Ibeacon;
  beforeEach(inject(function (_Ibeacon_) {
    Ibeacon = _Ibeacon_;
  }));

  it('should do something', function () {
    expect(!!Ibeacon).toBe(true);
  });

});
