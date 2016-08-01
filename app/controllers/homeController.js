(function(){
'use strict';
	app.controller('homeController',['$scope','loadJson',function($scope,loadJson){
		loadJson.getTripList().then(function(tripListData){
			$scope.tripList = [];
			$scope.driverList = [];
			angular.forEach(tripListData.data, function(item){
				angular.forEach(item.trip, function(tripItem){
					$scope.tripList.push(tripItem);
				});
				$scope.driverList.push(item);
			});
		});
	}]);
})();