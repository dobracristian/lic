angular.module('app').controller('LogoutController', function($rootScope, $state, $http) {

        $http.post('/api/logout').then(function () {
            $rootScope.USER = {
                tip: ''
            };
                $state.go('login');
        });

});