angular.module('app').controller('SeriiController', function($scope, Restangular, $stateParams){
    console.log("Salut!", $stateParams.sc);
    $scope.filters ={
        sc: Number($stateParams.sc) || null,
        f: Number($stateParams.f) || null
    };

    Restangular.all('api/facultati').getList().then(function(response) {
        $scope.facultati = response.plain();
    });

    //Restangular.all('api/sectii').getList().then(function (response) {
    //    $scope.sectii = response.plain();
    //});

    $scope.$watch('filters.sc', loadSerii);

    function loadSerii() {
        Restangular.all('api/serii').getList({sc: $scope.filters.sc}).then(function (response) {
            $scope.serii = response.plain();
        });
    }
});