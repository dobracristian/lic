angular.module('app').controller('StudentController', function ($scope, Restangular) {
    console.log('Salut');
    loadCursuri();

    function loadCursuri() {
        Restangular.all('api/student/curs-lab-sem').getList().then(function(response) {
            $scope.cursuri = response.plain();
        });
    }

});