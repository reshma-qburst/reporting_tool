(function(){
    'use strict';

    app.factory('AuthenticationService',
        ['$http', '$cookieStore', '$rootScope', '$timeout',
        function ($http, $cookieStore, $rootScope, $timeout) {
            var service = {};

            service.Login = function (username, password, callback) {
                 var response;

                $timeout(function () {
                    $http.post('app/json/userDetails.json',{username : username , password : password})
                    .success(function (response) {
                        for(var list in response){ 
                            if(username === response[list].username && password === response[list].password){
                               response = { 
                                success: username === response[list].username && password === response[list].password
                               };
                               if(response != null && !response.success) {
                                  response.message = 'Username or password is incorrect';
                               }
                               callback(response);
                            }
                        }
                    });
                }, 1000);
            };

            service.SetCredentials = function (username, password) {
                $rootScope.globals = {
                    currentUser: {
                        username: username
                    }
                };
                $cookieStore.put('globals', $rootScope.globals);
            };

            service.ClearCredentials = function () {
                $rootScope.globals = {};
                $cookieStore.remove('globals');
                $http.defaults.headers.common.Authorization = 'Basic ';
            };

            return service;
        }])
})();