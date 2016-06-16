angular.module('app').controller('LoginController', function($scope, $state, $rootScope, $http) {

    $scope.login = function(user) {

        $http.post('/api/login',{username: $scope.username, parola: $scope.parola}).then(function (response) {
            if(response.data) {
                var user = response.data;
                $rootScope.USER = user;

                switch (user.tip) {
                    case 'admin':
                        $state.go('admin.facultati');
                        break;
                    case 'prof':
                        $state.go('profesor');
                        break;
                    case 'stud':
                        $state.go('student');
                        break;
                }
            } else {
                $scope.badLogin = true;
            }

        });


    }
});
