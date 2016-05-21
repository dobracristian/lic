angular.module('app').controller('NavController', function($scope){
    $scope.items = [{
        label: 'Ani',
        state:'admin.ani'
    }, {
        label: 'Facultati',
        state: 'admin.facultati'
    }, {
        label: 'Sectii',
        state: 'admin.sectii'
    }, {
        label: 'Serii',
        state: 'admin.serii'
    }, {
        label: 'Grupe',
        state: 'admin.grupe'
    }, {
        label: 'Semigrupe',
        state: 'admin.semigrupe'
    }, {
        label: 'Studenti',
        state: 'admin.studenti'
    }, {
        label: 'Profesori',
        state: 'admin.profesori'
    }, {
        label: 'Materii',
        state: 'admin.materii'
    }, {
        label: 'Cursuri',
        state: 'admin.cursuri'
    }, {
        label: 'Laboratoare',
        state: 'admin.laboratoare'
    }, {
        label: 'Seminarii',
        state: 'admin.seminarii'
    }, {
        label: 'Orar',
        state: 'admin.orar'
    }];
});
