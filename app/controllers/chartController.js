(function() {
    'use strict';
    app.controller('chartController', ['$scope', 'loadJson', function($scope, loadJson) {

        $scope.filterFlag = 1;
        $scope.filterOptions = ["Driver", "Trip"];

        loadJson.getTripList().then(function(tripListData) {

            $scope.tableData = [];
            $scope.trip = [];
            $scope.driver = [];
            var sumBreak = 0;
            var sumAcc = 0;
            var sumTurn = 0;
            var total = 0;
            var jsonVerticalBarChartData = [];
            var jsonStackedBarChartData = [];
            angular.forEach(tripListData.data, function(item) {
                angular.forEach(item.trip, function(tripItem) {
                    sumBreak += tripItem.break;
                    sumAcc += tripItem.acceleration;
                    sumTurn += tripItem.turn;
                    $scope.trip.push(tripItem.name);
                    jsonStackedBarChartData.push({
                        "tripName": tripItem.name,
                        "HB": sumBreak,
                        "RA": sumAcc,
                        "SC": sumTurn
                    });
                });
                item.sumBreak = sumBreak;
                item.sumAcc = sumAcc;
                item.sumTurn = sumTurn;
                item.total = sumBreak + sumAcc + sumTurn;
                sumBreak = 0;
                sumAcc = 0;
                sumTurn = 0;
                total = 0;
                $scope.tableData.push(item);
                $scope.driver.push(item.name);
                jsonVerticalBarChartData.push({
                    "name": item.name,
                    "score": item.total
                });
            });
            $scope.data = jsonVerticalBarChartData;
            $scope.barchart = jsonStackedBarChartData;

        });

        $scope.options = { width: 600, height: 400, 'bar': 'aaa' };
        //$scope.data = [1, 2, 3, 4];
        $scope.hovered = function(d) {
            $scope.barValue = d;
            $scope.$apply();
        };
        $scope.barValue = 'None';

        $scope.showChart = function() {
            if ($scope.filterName == 'Trip') {
                $scope.filterFlag = 0;
            } else if ($scope.filterName == 'Driver') {
                $scope.filterFlag = 1;
            }
        };

    }]);
})();
