angular.module("adminApp", ['ui.router', 'customServices', 'ngMaterial', 'ngTable'])
angular.module("adminApp")
    .config(function ($stateProvider, $urlRouterProvider) {
        this.user = "admin";
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('addEmployee', {
                url: '/addEmployee',
                templateUrl: 'addEmployee.html',
                resolve: {
                    security: ['$q', function ($q) {
                        if (this.user != "admin") {
                            return $q.reject("Not Authorized User.");
                        }
                    }]
                },
                controller: 'addEmployeeController'
            })

            .state('addEmployee.generalDetails', {
                url: '/generalDetails',
                templateUrl: 'employeeGeneralDetails.html',
                controller: 'adminController'
            })

            .state('addEmployee.permanentAddress', {
                url: '/permanentAddress',
                templateUrl: 'EmployeePermanentAddress.html',
                controller: 'adminController'
            })

            .state('addEmployee.temporaryAddress', {
                url: '/temporaryAddress',
                templateUrl: 'EmployeeTemporaryAddress.html',
                controller: 'adminController'
            })

            .state('addEmployee.confirmation', {
                url: '/confirmation',
                templateUrl: 'addEmployeeConfirmation.html',
                controller: 'adminController'
            })

            .state('employeeFinder', {
                url: '/',
                templateUrl: 'employeeFinder.html',
                controller: 'searchController'
            })

            .state('interviewSchedule', {
                url: '/interviewSchedule',
                templateUrl: 'interviewSchedule.html',
                controller: 'addInterviewController'
            })

            .state('viewInterviewList', {
                url: '/viewInterviewList',
                templateUrl: 'viewInterviewList.html',
                controller: 'viewInterviewController'
            })

            .state('addDepartment', {
                url: '/addDepartment',
                templateUrl: 'addDepartment.html',
                controller: 'addDepartmentController'
            })

            .state('viewEmployee', {
            url: '/viewEmployee',
            abstract: true,
            controller: 'viewEmployeeController',
            controllerAs: 'vm'
            })

            .state('viewEmployee.list', {
            url: '/list',
            templateUrl: 'viewEmployeeList.html'
            })

            .state('viewEmployee.profile', {
            url: '/employeeProfile',
            templateUrl: 'viewEmployeeFullDetails.html'
            })

            .state('viewEmployee.addEmergencyContact', {
                url: '/emergencyContact',
                templateUrl: 'addEmergencyContact.html',
                // controller:'emergencyContactController'
            })

            .state('viewEmployee.viewQualificationList', {
                url: '/qualifications',
                templateUrl: 'viewQualificationList.html',
                controller: 'viewQualification',
                params:{
                    'id':null
                }
            })
            .state('viewDepartmentList', {
                url: '/viewDepartmentList',
                templateUrl: 'viewDepartmentList.html',
                controller: 'viewDepartmentController'
            })
});

// call method for checking invalid on confirmation tab in add employee
angular.module("adminApp")
    .run(function($transitions,$state,$rootScope){
        $transitions.onStart({to:'addEmployee.confirmation'}, function(trans){
            console.log("Inside Confirmation");
            $rootScope.checkInvalid();

        })

    })