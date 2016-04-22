angular.module('app').controller('LoginController', function($scope, $state, $rootScope) {

    $scope.login = function(username) {
        if(username === 'admin') {
            window.role = 'admin';
            $state.go('admin.facultati');
        }
        else if(username === 'student') {
            window.role = 'student';
            $state.go('student');
        }
        else if(username === 'profesor') {
            window.role = 'profesor';
            $state.go('curs', {id: 1});
        }

        $rootScope.USER = {
            role:     window.role,
            username: username
        }
    }
});
