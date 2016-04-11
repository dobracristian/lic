angular.module('app').controller('SemigrupeController', function($scope, Restangular, $stateParams){
    console.log('Salut!', $stateParams.gr);

    Restangular.all('api/semigrupe').getList({gr: $stateParams.gr}).then(function(response) {
       // console.log('Semigrupe:', response.plain());
        $scope.semigrupe = response.plain();
    })
})