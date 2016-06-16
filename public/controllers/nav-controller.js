angular.module('app').controller('NavController', function($scope){

    var adminItems = [{
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
    }, {
        label: 'Logout',
        state: 'logout'
    }];

    var studItems = [{
        label: 'Orar',
        state: 'student'
    }, {
        label: 'Logout',
        state: 'logout'
    }];

    var profItems = [{
        label: 'Orar',
        state: 'profesor'
    }, {
        label: 'Logout',
        state: 'logout'
    }];

    var guestItems = [{
        label: 'Login',
        state: 'login'
    }];

    $scope.menuItems = {
        stud: studItems,
        prof: profItems,
        admin: adminItems,
        '': guestItems
    };
});
