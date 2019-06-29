// Controller to do qualification related tasks

// controller to obtain qualification data of x employee
angular.module("adminApp")
    .controller("viewQualification", function ($scope,$rootScope, $state, $filter, NgTableParams, retrieveQualification, updateQualification, $mdDialog, $stateParams) {
        $scope.qualification = {};
        $rootScope.viewQualification={employee:{}};
        if($stateParams!=null) $rootScope.viewQualification.employee.id=$stateParams.id;
        retrieveQualification.retrieveQualification($rootScope.viewQualification.employee).then(function (response) {
            $state.go('viewEmployee.viewQualificationList');
            $scope.qualification.details = response.plain();
            console.log($scope.qualification.details);
            for (var i in $scope.qualification.details) {
                $scope.qualification.details[i].editable = false;
            }
            var self = this;
            var data = $scope.qualification.details;
            console.log(data);
            $scope.tableParams = new NgTableParams({count: 10, page: 1}, {dataset: $scope.qualification.details})
            console.log($scope.tableParams);
        }, function () {
            console.log("failure");
        });

        $scope.check = function () {
            console.log($scope.qualification);
        }

        $scope.enableEdit = function (qualification) {
            qualification.editable = true;
            console.log(qualification.editable);

        }
        $scope.disableEdit = function (qualification) {
            qualification.editable = false;
            $scope.updateQualificationDetails(qualification);
            console.log(qualification.editable);
        }
        $scope.updateQualificationDetails = function (qualification) {
            $scope.toUpdateQualification = {
                id:qualification.id,
                level: qualification.level,
                course: qualification.course,
                grade: qualification.grade,
                startDate: null,
                endDate: null,
                university: qualification.university,
                email: qualification.grade,
                empId:$rootScope.viewQualification.employee.id
            };
            $scope.toUpdateQualification.startDate = $filter('date')(qualification.startDate, 'yyyy-MM-dd');
            $scope.toUpdateQualification.endDate = $filter('date')(qualification.endDate, 'yyyy-MM-dd');

            var confirm = $mdDialog.confirm()
                .title('Would you like to update the details?')
                .cancel('No')
                .ok('Yes')
                .targetEvent()

            $mdDialog.show(confirm).then(function () {
                updateQualification.updateQualification($scope.toUpdateQualification).then(function (response) {
                    console.log(response);
                    $mdDialog.show(
                        $mdDialog.alert()
                            .parent(angular.element(document.querySelector('#popupContainer')))
                            .clickOutsideToClose(true)
                            .title('Qualification Details of Updated Successfully')
                            .ok('OK')
                            .targetEvent()
                    );
                    $state.reload()
                }, function () {
                    $state.reload()
                    console.log("Insert Unsuccesful");
                });
            }, function () {
                $state.reload()
                $scope.status = 'Not Updated';
            });
        }
    });
