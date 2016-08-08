(function(){
'use strict';
	app.controller('chartController',['$scope','loadJson',function($scope,loadJson){
		
		loadJson.getTripList().then(function(tripListData){
			console.log(tripListData);
			$scope.tableData = [];
			$scope.tripData = [];
			angular.forEach(tripListData.data, function(item){
				$scope.tableData.push(item);
				angular.forEach(item.trip, function(tripItem){
					$scope.tripData.push(tripItem);
				});
			});
		});
	}]);
})();