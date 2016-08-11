(function() {
    'use strict';

    app.factory('AuthenticationService', ['$http', '$cookieStore', '$rootScope', '$timeout',
        function($http, $cookieStore, $rootScope, $timeout) {
            var service = {};

            service.Login = function(username, password, callback) {
                var response = false;
                $timeout(function() {
                    $http.get('app/json/userDetails.json', { username: username, password: password })
                        .success(function(response) {
                            for (var list in response) {
                                if (response[list].username === username && password === response[list].password) {
                                    response = {
                                        success: username === response[list].username && password === response[list].password
                                    };
                                    callback(response);
                                }
                            }
                            if (!response.success) {
                                response.message = 'Username or password is incorrect';
                            }

                            callback(response);
                        });
                }, 1000);
            };

            service.SetCredentials = function(username, password) {
                $rootScope.globals = {
                    currentUser: {
                        username: username
                    }
                };
                $rootScope.loggedinuser = username;
                $rootScope.ifLoggedIn = true;
                $cookieStore.put('globals', $rootScope.globals);
                $cookieStore.put('userName', username);
            };

            service.ClearCredentials = function() {
                $rootScope.globals = {};
                $cookieStore.remove('globals');
                $cookieStore.remove('userName');
                $rootScope.ifLoggedIn = false;
                $http.defaults.headers.common.Authorization = 'Basic ';
            };
            return service;
        }
    ])
})();
