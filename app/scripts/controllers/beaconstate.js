'use strict';

/**
 * @ngdoc function
 * @name ionicApp.controller:BeaconstateCtrl
 * @description
 * # BeaconstateCtrl
 * Controller of the ionic
 */
angular.module('ionicApp', [])
  .controller('BeaconstateCtrl', function ($scope, $ionicPlatform, Ibeacon) {

	  var logToDom = function(message) {
		  var e = document.getElementById('message');
		  e.innerHTML = message;
	  };
	  logToDom('start location setting');
	  
	  $scope.beacon = Ibeacon.beaconInfo;
	  
	  logToDom('wait beacon ready');
	  Ibeacon.ready(function(){
		  // beacon delegate
		  var delegate = Ibeacon.delegate();
		  delegate.didDetermineStateForRegion = function (pluginResult) {
			  console.log('[DOM] didDetermineStateForRegion: ' + JSON.stringify(pluginResult));
		  };
		  delegate.didStartMonitoringForRegion = function (pluginResult) {
			  console.log('didStartMonitoringForRegion:' + JSON.stringify(pluginResult));
		  };
		  delegate.didRangeBeaconsInRegion = function (pluginResult) {
			  console.log('[DOM] didRangeBeaconsInRegion: ' + JSON.stringify(pluginResult));
			  
			  if(pluginResult.beacons && pluginResult.beacons.length > 0) {
				  var beacon = pluginResult.beacons[0];
				  console.log('beacon received: ' + JSON.stringify(beacon));
				  // {"major":1,"minor":2,"uuid":"AD4E161D-50BA-40CF-9A4B-8E5E9DB02416","accuracy":0.27,"rssi":-48,"proximity":"ProximityNear"}
				  //
				  $scope.beacon.proximity = beacon.proximity;
				  $scope.beacon.accuracy  = beacon.accuracy;
				  $scope.beacon.rssi      = beacon.rssi;
				  
				  $scope.$apply();
			  }
		  };
		  Ibeacon.setDelegate(delegate);
		  
		  // start beacon
		  Ibeacon.start().then(function(msg){
			  logToDom(msg);
		  }, function(e){
			  logToDom('Failed. ' + e);
		  });
		  
	  });
  });
