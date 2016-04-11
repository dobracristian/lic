angular.module('app').controller('GrupeController', function($scope, Restangular, $stateParams){
    console.log('Salut!', $stateParams.ser);
    $scope.filters = {
        ser: Number($stateParams.ser) || null
    };

    Restangular.all('api/facultati').getList().then(function (response) {
        $scope.facultati = response.plain();
    });

    //Restangular.all('api/sectii').getList().then(function (response) {
    //    $scope.sectii = response.plain();
    //});

    $scope.$watch('filters.ser', loadGrupe);

    function loadGrupe() {
        Restangular.all('api/grupe').getList({ser: $scope.filters.ser}).then(function(response) {
            $scope.grupe = response.plain();
        });
    }

});
