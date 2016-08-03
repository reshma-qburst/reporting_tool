(function() {
 'use strict';
	app.factory('loadJson',['$http',function($http){
		return {
			getTripList : function(){
				var tripList = $http.get('app/json/driverTrip.json').then(function (tripData) {
					return tripData;
				});
				return tripList;
			}
		}
	}]);
})();