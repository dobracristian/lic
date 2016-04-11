angular.module('app').controller('SeminariiController', function($scope, Restangular){
    console.log('Salut!');
    Restangular.all('api/seminarii').getList().then(function(response) {
        $scope.seminarii = response.plain();
    })
})
