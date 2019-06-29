//controller for inserting department
angular.module("adminApp")
    .controller('addDepartmentController', function ($scope, retrieveEmp,insertDept,$state,$mdDialog) {

        $scope.employees={};
        retrieveEmp.retrieveEmp().then(function (response) {
            $scope.employees.detail=response.plain();
            console.log($scope.employees.detail);
        },function () {
            console.log("error");
        })
        $scope.submit=function(){

        }
        $scope.department = {
            deptName: null,
            manager: null,
            status: 1
        }
        $scope.insertDept = function () {
            console.log($scope.department);


            insertDept.insertDept($scope.department).then(function (response) {
                console.log(response);
                console.log("Success");
                $scope.insertStatus.success.showAlert();

            }, function () {
                console.log("Failure");
            });

        }
        $scope.state = {
            currentState: $state.current.name
        }

        $scope.updateState = function () {
            $scope.state.currentState = $state.current.name;
        }


        $scope.insertStatus = {
            success: {
                showAlert: function () {
                    console.log("inside show alert");
                    // Appending dialog to document.body to cover sidenav in docs app
                    // Modal dialogs should fully cover application
                    // to prevent interaction outside of dialog
                    $mdDialog.show(
                        $mdDialog.alert()
                            .parent(angular.element(document.querySelector('#popupContainer')))
                            .clickOutsideToClose(true)
                            .title('Department Successfully Added.')
                            .ariaLabel('Alert Dialog Demo')
                            .ok('OK')
                            .targetEvent()
                    );
                    for (var key in $scope.department) {
                        $scope.department[key] = null;
                    }
                    $state.reload();
                }
            }
        }
    });

// controller to view and update department
angular.module("adminApp")
    .controller("viewDepartmentController", function ($scope, $state, $filter, NgTableParams, retrieveDepartment, retrieveEmp, updateDepartment, $mdDialog) {
        $scope.department = {};
        $scope.employees={};
        $scope.manager={};
        $scope.selectedDepartment={};

        $scope.jobs = [{title: ''}]
        $scope.addJob = function () {
            console.log($scope.jobs);
            $scope.jobs.push({title: ''})
        }

        retrieveEmp.retrieveEmp().then(function (response) {
            $scope.employees.detail=response.plain();
            console.log($scope.employees.detail);
        },function () {
            console.log("error");
        })

        retrieveDepartment.retrieveDepartment().then(function (response) {
            $scope.department.details = response.plain();
            console.log($scope.department.details);
            for (var i in $scope.department.details) {
                $scope.department.details[i].editable = false;
            }
            console.log($scope.department.details);
            console.log("Inside retrieve department service in controller");
            console.log($scope.department.details);
            var self = this;
            var data = $scope.department.details;
            console.log(data);
            $scope.tableParams = new NgTableParams({count: 10, page: 1}, {dataset: $scope.department.details})
        }, function () {
            console.log("failure");
        });

        $scope.check = function () {
            console.log($scope.department);
        }

        $scope.enableEdit = function (department) {
            department.editable = true;
            console.log(department.editable);

        }
        $scope.disableEdit = function (department) {
            department.editable = false;
            if($scope.manager.name==null){
                department.details={
                    id:department.manager
                }
            }else{
                department.details=$filter('filter')($scope.employees.detail,{fullName:$scope.manager.name})[0]

            }



            $scope.updateDepartmentDetails(department);
            console.log(department.details);
        }
        $scope.updateDepartmentDetails = function (department) {
            //make necessary changes here acc to ng-model
            $scope.toUpdateDepartment = {
                id: department.id,
                manager:department.details.id,
                deptName: department.department_name,
                status: department.status_id,
                deptStatus: department.departmentStatusName

            };
            console.log($scope.toUpdateDepartment);

            var confirm = $mdDialog.confirm()
                .title('Would you like to update the details?')
                .cancel('No')
                .ok('Yes')
                .targetEvent()

            $mdDialog.show(confirm).then(function () {
                updateDepartment.updateDepartment($scope.toUpdateDepartment).then(function (response) {
                    console.log(response);
                    $mdDialog.show(
                        $mdDialog.alert()
                            .parent(angular.element(document.querySelector('#popupContainer')))
                            .clickOutsideToClose(true)
                            .title('Department Details of '+$scope.toUpdateDepartment.deptName+" Updated Successfully")
                            .ok('OK')
                            .targetEvent()
                    );
                    $state.reload()
                }, function () {
                    console.log("Insert Unsuccesful");
                });
            }, function () {
                $scope.status = 'Not Updated';
            });
        }

        $scope.viewProfile = function (department) {
            $scope.selectedDepartment.name=department.name;
        }
    });