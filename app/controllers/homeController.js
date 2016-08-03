(function(){
'use strict';
	app.controller('homeController',['$scope','loadJson',
		function($scope,loadJson){

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

		$scope.rating = 0;
	    $scope.ratings = [{
	        current: 1,
	        max: 5
	    }, {
	        current: 1,
	        max: 5
	    }, {
	        current: 1,
	        max: 5
	    }];

	    $scope.getSelectedRating = function (rating) {
	    }

	    $scope.saveRating = function(){		
			if($scope.driverRatingForm.$valid) {
				console.log("saved!");
			}
			else{
				console.log("invalid");
			}
		};

	}]);
})();