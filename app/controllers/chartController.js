(function(){
'use strict';
	app.controller('chartController',['$scope','loadJson',function($scope,loadJson){
		
		loadJson.getTripList().then(function(tripListData){
			
			$scope.tableData = [];
			$scope.trip = [];
			var sumBreak=0;
			var sumAcc=0;
			var sumTurn=0;
			var total=0;
			angular.forEach(tripListData.data, function(item){
				angular.forEach(item.trip, function(tripItem){
					sumBreak += tripItem.break;
					sumAcc += tripItem.acceleration;
					sumTurn += tripItem.turn;
					$scope.trip.push(tripItem.name);
				});
				item.sumBreak = sumBreak;
				item.sumAcc = sumAcc;
				item.sumTurn = sumTurn;
				item.total = sumBreak + sumAcc + sumTurn;
				sumBreak = 0;
				sumAcc=0;
				sumTurn=0;
				total=0;
				$scope.tableData.push(item);
			});
			$scope.data = $scope.trip;
		});

		$scope.options = {width: 600, height: 400, 'bar': 'aaa'};

        $scope.hovered = function(d){
        	$scope.barValue = d;
            $scope.$apply();
        };
        $scope.barValue = 'None';
	}]);
})();