angular.module('app').controller('NavController', function($scope){
    $scope.items = [{
        label: 'Facultati',
        state: 'facultati'
    }, {
        label: 'Sectii',
        state: 'sectii'
    }, {
        label: 'Serii',
        state: 'serii'
    }, {
        label: 'Grupe',
        state: 'grupe'
    }, {
        label: 'Semigrupe',
        state: 'semigrupe'
    }, {
        label: 'Studenti',
        state: 'studenti'
    }, {
        label: 'Profesori',
        state: 'profesori'
    }, {
        label: 'Materii',
        state: 'materii'
    }, {
        label: 'Cursuri',
        state: 'cursuri'
    }, {
        label: 'Laboratoare',
        state: 'laboratoare'
    }, {
        label: 'Seminarii',
        state: 'seminarii'
    }];
});
