(function(){
'use-strict';
app.config(['$routeProvider', function ($routeProvider) {
	    $routeProvider
	        .when('/login', {
	            controller: 'authenticationController',
	            templateUrl: 'partials/content.html'
	        })
	        .when('/', {
	            controller: 'homeController',
	            templateUrl: 'partials/home.html'
	        })
	        .otherwise({ redirectTo: '/login' });
	}])
})();

app.run(['$rootScope', '$location', '$cookieStore', '$http',
    function ($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        $rootScope.loggedinuser = $cookieStore.get('userName') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' +
                                                    $rootScope.globals.currentUser.authdata;
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
                $location.path('/login');
            }
        });
    }]);