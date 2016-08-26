(function() {
    'use strict';
    app.controller('chartController', ['$rootScope', '$scope', 'loadJson', function($rootScope, $scope, loadJson) {

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
        $scope.customBChart = true;
        $scope.customSChart = true;
        $scope.customMap = false;


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

                        $rootScope.wayPoints = [{
                            location: {
                                lat: item.latitude,
                                lng: item.longitude
                            },
                            stopover: true
                        }];

                        if (item.HB === true) {
                            HbCount = HbCount + 1;
                        }
                        if (item.SC === true) {
                            ScCount = ScCount + 1;
                        }
                        if (item.RA === true) {
                            RaCount = RaCount + 1;
                        }
                    });

                    jsonStackedBarChartData.push({
                        "tripName": tripItem.name,
                        "HB": HbCount,
                        "RA": RaCount,
                        "SC": ScCount
                    });
                    item.sumBreak = HbCount;
                    item.sumAcc = RaCount;
                    item.sumTurn = ScCount;
                    item.total = item.sumBreak + item.sumAcc + item.sumTurn;
                });
                HbCount = 0;
                ScCount = 0;
                RaCount = 0;
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

        $scope.options = { width: 400, height: 500, 'bar': 'aaa' };
        $scope.hovered = function(d) {
            $scope.barValue = d;
            $scope.$apply();
        };
        $scope.barValue = 'None';

        $scope.showChart = function() {
            if ($scope.filterName == 'Trip') {
                $scope.filterFlag = 0;
                $scope.customBChart = false;
                $scope.customSChart = true;
            } else if ($scope.filterName == 'Driver') {
                $scope.filterFlag = 1;
                $scope.customBChart = true;
                $scope.customSChart = false;
            }
        };


        $scope.toggleChartAndMap = function() {
            $scope.customBChart = $scope.customBChart ? false : true;
            $scope.customSChart = $scope.customSChart ? false : true;
            $scope.customMap = $scope.customMap ? false : true;
        };

        // map object
        $scope.map = {
            control: {},
            center: {
                latitude: 8.568315,
                longitude: 76.875671
            },
            zoom: 11
        };

        // marker object
        $scope.marker = {
            center: {
                latitude: 8.568315,
                longitude: 76.875671
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
                if (status === google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                    /*directionsDisplay.setMap($scope.map.control.getGMap());
                     */
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
