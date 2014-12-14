'use strict';

/**
 * @ngdoc directive
 * @name ionicApp.directive:d3bar
 * @description
 * # d3bar
 */
angular.module('ionicApp')
  .directive('d3bar', function () {
	  return {
		  restrict: 'A',
		  link: function postLink(scope, element, attrs) {
			  scope.$watchCollection('beacon', function(data){
				  var val   = data.rssi;
				  var color = d3.scale.linear().domain([-90,-20]).range(['white','red']);
				  var d     = d3.select(element[0]);
				  console.log('call d3bar, ' + val + ', ' + color(val));
				  d.data([val])
				  .transition()
				  .style('background', color(val));
			  });
		  }
	  };
  });
