'use strict';

/**
 * @ngdoc service
 * @name ionicApp.Ibeacon
 * @description
 * # Ibeacon
 * Service in the ionicApp.
 */
angular.module('ionicApp')
.service('Ibeacon', function ($q) {
    // AngularJS will instantiate a singleton by calling "new" on this function
	var uuid = 'AD4E161D-50BA-40CF-9A4B-8E5E9DB02416';
	var identifier = 'beaconOnTheMacBooksShelf';
	var major = 1;
	var minor = 2;
	
	this.beaconInfo = {
		'uuid': uuid,
		'identifier': identifier,
		'major':major,
		'minor':minor,
		'proximity':'unknown',
		'accuracy':0,
		'rssi':0
	};
	var callbackWhenReady;
	this.ready = function(cbfn){
		callbackWhenReady = cbfn;
	};
	var beaconRegion;
	this.init = function(){
		beaconRegion = new cordova.plugins.locationManager.BeaconRegion(identifier, uuid, major, minor);
		cordova.plugins.locationManager.requestWhenInUseAuthorization();
		
		if(callbackWhenReady && callbackWhenReady instanceof Function) {
			callbackWhenReady();
		}
	};
	this.delegate = function(){
		// beacon delegate
		var delegate = new cordova.plugins.locationManager.Delegate();
		return delegate;
	};
	this.setDelegate = function(d){
		cordova.plugins.locationManager.setDelegate(d);
	};
	  
	this.start = function(){
		var deferred = $q.defer();
		if(beaconRegion){
			cordova.plugins.locationManager.startRangingBeaconsInRegion(beaconRegion)
			.fail(function(e){
				console.error(e);
				deferred.reject(e);
			})
			.done(function(){
				console.log('Start monitoring beacon.');
				deferred.resolve('Start monitoring beacon.');
			});
		} else {
			deferred.reject('beacon is not initalized.');
		}
		return deferred.promise;
	};
	this.stop = function(){
		var deferred = $q.defer();
		if(beaconRegion){
			return cordova.plugins.locationManager.stopRangingBeaconsInRegion(beaconRegion)
			.fail(function(e){
				console.error(e);
				deferred.reject(e);
			})
			.done(function(){
				console.log('Stop monitoring beacon.');
				deferred.resolve('Stop monitoring beacon.');
			});
		} else {
			deferred.reject('beacon is not initalized.');
		}
		return deferred.promise;
	};
});