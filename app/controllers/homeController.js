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
	    $scope.ratingBreak = [{
	        current: 1,
	        max: 5
	    }];

	    $scope.ratingAcceleration = [{
	    	current:1,
	    	max:5
	    }];

	   	$scope.ratingTurn = [{
	    	current:1,
	    	max:5
	    }];

	    $scope.getSelectedBreakRating = function (rating) {};

	    $scope.getSelectedAccelerationRating = function (rating) {};

	    $scope.getSelectedTurnRating = function (rating) {};

	    $scope.saveRating = function(){
			if($scope.driverRatingForm.$valid) {
				console.log($scope.SelectedTrip);
				console.log($scope.SelectedDriver);
				localStorage.setItem('trip', $scope.SelectedTrip);
				localStorage.setItem('driver', $scope.SelectedDriver);

				console.log("saved!");
			}
			else{
				console.log("invalid");
			}
		};

		

	}]);
})();