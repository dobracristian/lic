angular.module('app').controller('StudentController', function ($scope, Restangular, L) {
    console.log('Salut');
    loadCursuri();

    L.orarev($scope, 'orarZiOra');

    function loadCursuri() {
        Restangular.all('api/student/curs-lab-sem').getList().then(function(response) {
            $scope.cursuri = response.plain();
        });
    }

});