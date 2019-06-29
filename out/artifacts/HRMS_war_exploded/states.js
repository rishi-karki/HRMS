/**
 * Created by rujaldae on 6/27/17.
 */
angular.module("adminApp",['ui.router']);

angular.module("adminApp")
    .controller("myController", function($scope,$stateParams){
        $scope.selectedPermanentZone = true;
        $scope.selectedPermanentDistrict = true;
        $scope.selectedTemporaryZone = true;
        $scope.selectedTemporaryDistrict = true;
        //$scope.$watchGroup(['permanentZone','permanentDistrict'], function(newValue, oldValue) {
        //    if(newValue!=oldValue) {
        //        $scope.selectedPermanentZone = ($scope.permanentZone == null);
        //        $scope.selectedPermanentDistrict = ($scope.permanentDistrict == null);
        //        console.log($scope.selectedPermanentZone);
        //        console.log($scope.selectedPermanentDistrict);
        //    }
        //});
      ///  $scope.permanentZone='';
        $scope.updateDisablePermanentDistrict = function(permanentZone){
            console.log("Inside update disables\n"+ permanentZone);
            $scope.selectedPermanentZone = (permanentZone == "");
         //   $scope.permanentDistrict = "";
            console.log($scope.permanentDistrict);
            $scope.selectedPermanentDistrict= true;

            console.log($scope.selectedPermanentZone);


        }
        $scope.updateDisablePermanentTole = function(permanentDistrict){
            console.log("Inside update disables\n"+ permanentDistrict);
            $scope.selectedPermanentDistrict = (permanentDistrict == "");
            console.log(permanentDistrict);
            console.log($scope.selectedPermanentDistrict);



        }
        $scope.updateDisableTemporaryDistrict = function(temporaryZone){
            console.log("Inside update disables\n"+ temporaryZone);
            $scope.selectedTemporaryZone = (temporaryZone == "");
            console.log($scope.selectedTemporaryZone);


        }
        $scope.updateDisableTemporaryTole = function(temporaryDistrict){
            console.log("Inside update disables\n"+ temporaryDistrict);
            $scope.selectedTemporaryDistrict = (temporaryDistrict == "");
            console.log($scope.selectedTemporaryDistrict);
        }
        var check =$stateParams;
        console.log(check);




        //console.log($scope.permanentZone);

    })

angular.module("adminApp")
    .config(function($stateProvider,$urlRouterProvider){
        this.user="admin";
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('addEmployee',{
                url:'/addEmployee',
                templateUrl:'addEmployee.html',
                resolve:{
                    security:['$q', function($q){
                        if(this.user!="admin"){
                            return $q.reject("Not Authorized User.");
                        }
                    }]
                }

            });
    });

