(function() {
    'use strict';
    app.controller('chartController', ['$scope', 'loadJson', function($scope, loadJson) {

        var sumBreak = 0;
        var sumAcc = 0;
        var sumTurn = 0;
        var total = 0;
        var jsonVerticalBarChartData = [];
        var jsonStackedBarChartData = [];
        var HbCount = 0;
        var RaCount = 0;
        var ScCount = 0;
        $scope.filterFlag = 1;
        $scope.filterOptions = ["Driver", "Trip"];
        $scope.orderByField = 'name';
        $scope.reverseSort = false;
        $scope.positions = [];
        $scope.mapFlag = 0;

        loadJson.getTripList().then(function(tripListData) {

            $scope.tableData = [];
            $scope.trip = [];
            $scope.driver = [];
            angular.forEach(tripListData.data, function(item) {
                angular.forEach(item.trip, function(tripItem) {

                    angular.forEach(tripItem.location, function(item) {

                        $scope.positions.push({
                            lat: item.latitude,
                            lng: item.longitude
                        });

                        if (item.HB === true) {
                            HbCount = HbCount + 1;
                        } else if (item.SC === true) {
                            ScCount = ScCount + 1;
                        } else if (item.RA === true) {
                            RaCount = RaCount + 1;
                        }
                    });
                    /*console.log(HbCount);
                     */
                    HbCount = 0;
                    ScCount = 0;
                    RaCount = 0;
                    /*sumBreak += tripItem.break;
sumAcc += tripItem.acceleration;
sumTurn += tripItem.turn;
$scope.trip.push(tripItem.name);*/
                    jsonStackedBarChartData.push({
                        "tripName": tripItem.name,
                        "HB": tripItem.break,
                        "RA": tripItem.acceleration,
                        "SC": tripItem.turn
                    });

                });
                item.sumBreak = HbCount;
                item.sumAcc = RaCount;
                item.sumTurn = ScCount;
                item.total = HbCount + RaCount + ScCount;
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

        $scope.toggleChartAndMap = function() {
            $scope.mapFlag = 1;
        };

        // map object
        $scope.map = {
            control: {},
            center: {
                latitude: 8.5241390,
                longitude: 76.9366380
            },
            zoom: 12
        };

        // marker object
        $scope.marker = {
            center: {
                latitude: 8.5241390,
                longitude: 76.9366380
            }
        }

        // instantiate google map objects for directions
        var directionsDisplay = new google.maps.DirectionsRenderer();
        var directionsService = new google.maps.DirectionsService();
        var geocoder = new google.maps.Geocoder();

        // directions object -- with defaults
        $scope.directions = {
            origin: "Trivandrum",
            destination: "Kazhakoottam",
            showList: false
        }


        // get directions using google maps api
        $scope.getDirections = function() {
            var request = {
                origin: $scope.directions.origin,
                destination: $scope.directions.destination,
                travelMode: google.maps.DirectionsTravelMode.DRIVING
            };

            directionsService.route(request, function(response, status) {
                console.log(response);
                if (status === google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                    directionsDisplay.setMap($scope.map.control.getGMap());
                    /*directionsDisplay.setPanel(document.getElementById('directionsList'));
                     */
                } else {
                    alert('Google route unsuccesfull!');
                }
            });
        };

        $scope.getDirections();
    }]);
})();
