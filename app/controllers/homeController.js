(function(){
'use strict';
	app.controller('homeController',['$scope','loadJson','saveRating','$location','$rootScope',
		function($scope,loadJson,saveRating,$location,$rootScope){

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

				localStorage.setItem('trip', $scope.SelectedTrip);
				localStorage.setItem('driver', $scope.SelectedDriver);
				localStorage.setItem('brakeRate', $scope.ratingBreak[0].current);
				localStorage.setItem('accRate', $scope.ratingAcceleration[0].current);
				localStorage.setItem('turnRate',$scope.ratingTurn[0].current);
				localStorage.setItem('comments',$scope.comments);

				$scope.showChart = saveRating.saveActivity($scope.SelectedTrip,
					$scope.ratingBreak[0].current,$scope.ratingAcceleration[0].current,$scope.ratingTurn[0].current);
				console.log($scope.showChart);

				localStorage.setItem('chartData',$scope.showChart);
				alert("Your ratings have been saved!");
			}
			else{
				console.log("invalid");
			}
			$scope.comments = "";
		};

		$scope.options = {width: 600, height: 300, 'bar': 'aaa'};
        $scope.data = [1, 2, 3, 4];
        $scope.hovered = function(d){
        	$scope.barValue = d;
            $scope.$apply();
        };
        $scope.barValue = 'None';

        $rootScope.menuClass = function(page) {
		    var current = $location.path().substring(1);
		    return page === current ? "active" : "";
		 };
	}]);
})();