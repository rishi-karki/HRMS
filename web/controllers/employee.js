// Controller to perform employee related tasks

// Controller to add employee details
angular.module("adminApp")
    .controller("addEmployeeController", function ($scope, $stateParams, getAddress, $timeout, insertEmployee, $filter, $state, $mdDialog, $rootScope) {
        $state.go('addEmployee.generalDetails')
        $scope.permanentStatus = {id: 0, parent_id: -1};
        $scope.temporaryStatus = {id: 0, parent_id: -1};
        $scope.state = {
            getCurrentState: function () {
                return $state.current.name;
            }
        }

        $scope.flagInvalid = true;
        // $scope.employeeDetails={};
        $rootScope.checkInvalid = function () {
            console.log("flag=" + $scope.flagInvalid);
            console.log($scope.employeeDetails);
            if ($scope.employeeDetails != null) {
                var keys = Object.keys($scope.employeeDetails);
                console.log(keys);
                for (var i in $scope.employeeDetails) {
                    console.log(i);
                    console.log($scope.employeeDetails[i]);
                    if (i == "permanentZone") {

                    } else if (i == "permanentDistrict") {


                    } else if (i == "permanentVDC") {


                    } else if (i == "permanentTole") {


                    } else if (i == "temporaryZone") {


                    } else if (i == "temporaryDistrict") {


                    } else if (i == "temporaryVDC") {


                    } else if (i == "temporaryTole") {


                    } else {
                        if ($scope.employeeDetails[i] == null) {
                            $scope.flagInvalid = true;
                            return;
                        } else {
                            $scope.flagInvalid = false;
                        }
                    }
                }
            }
        }

        $scope.updateState = function () {
            $scope.state.currentState = $state.current.name;
        }

        $scope.toleDisable = true;
        $scope.currentDate = new Date();

        $scope.permanent = {
            tole: null,
            zone: null,
            district: null,
            vdc: null
        }
        $scope.temporary = {
            tole: null,
            zone: null,
            district: null,
            vdc: null
        }

        $scope.selectedPermanent = {
            zone: "",
            district: "",
            VDC: ""
        }
        $scope.selectedTemporary = {
            zone: "",
            district: "",
            VDC: ""
        }

        $scope.check = {
            temporaryEqualsPermanent: null
        }
        $scope.employeeDetails = {
            fname: null,
            lname: null,
            gender: null,
            dob: null,
            phNumber: null,
            email: null,
            bloodGroup: null,
            hireDate: null
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
                            .title('Details of ' + $scope.employeeDetails.fname + ' ' + $scope.employeeDetails.lname + ' Recorded Successfully')
                            .ok('Ok')
                            .targetEvent()
                    );
                    //Object.values($scope.employeeDetails)
                    for (var key in $scope.employeeDetails) {

                        $scope.employeeDetails[key] = null;
                    }
                    for (var key in $scope.selectedPermanent) {

                        $scope.selectedPermanent[key] = null;
                    }
                    for (var key in $scope.selectedTemporary) {

                        $scope.selectedTemporary[key] = null;
                    }
                    $scope.permanent.tole = null;
                    $scope.temporary.tole = null;
                    $state.go('addEmployee.generalDetails');
                }
            }

        }


        //To get zones in the drop down.
        getAddress.getAddress($scope.permanentStatus).then(function (response) {
            console.log($scope.permanentStatus);
            console.log("getZones ")
            console.log(response);
            $scope.permanent.zone = response;

        }, function () {
            console.log("failure");
        });


        //to get district only when zone is selected
        $scope.getPermanentDistrict = function () {
            $scope.permanent.vdc = null;
            $scope.permanent.tole = null;
            if ($scope.check.temporaryEqualsPermanent == true) {
                $scope.check.temporaryEqualsPermanent = false;
            }
            $scope.checkTemporaryEqualsPermanent();

            if ($scope.selectedPermanent.zone == null) {
                $scope.permanent.district = null;
                $scope.permanentStatus.parent_id = null;
                $scope.permanent.tole = null;
                return;
            }
            $scope.permanentStatus.parent_id = $scope.selectedPermanent.zone.id;
            console.log($scope.permanentStatus.parent_id);

            console.log($scope.permanentStatus);
            getAddress.getAddress($scope.permanentStatus).then(function (response) {
                console.log("getDistrict ");
                console.log(response);
                $scope.permanent.district = response;


            }, function () {
                console.log("failure");
            })

        }


        //to get vdc/municipality only when district is selected.
        $scope.getPermanentVDC = function () {
            console.log($scope.selectedPermanent.district);

            if ($scope.selectedPermanent.district == null) {
                //              $scope.permanentStatus.district_parent_id = null;
                $scope.permanent.vdc = null;
                return;
            }
            $scope.permanentStatus.parent_id = $scope.selectedPermanent.district.id;
            console.log($scope.permanentStatus);
            getAddress.getAddress($scope.permanentStatus).then(function (response) {
                console.log("getVDC ")
                console.log(response);
                $scope.permanent.vdc = response;


            }, function () {
                console.log("failure");
            })
        }


        //when temporary address equals to permanent address
        $scope.checkTemporaryEqualsPermanent = function () {
            if ($scope.check.temporaryEqualsPermanent == true) {
                $scope.selectedTemporary.zone = $scope.selectedPermanent.zone;
                console.log($scope.selectedPermanent.zone);
                $scope.selectedTemporary.district = $scope.selectedPermanent.district;

                console.log("checking selected temporary District");

                console.log($scope.selectedTemporary.district.value);
                $scope.selectedTemporary.VDC = $scope.selectedPermanent.VDC;
                $scope.temporary.tole = $scope.permanent.tole;
                console.log($scope.temporary.tole);
            } else {
                $scope.selectedTemporary.zone = null;
                $scope.selectedTemporary.district = null;
                $scope.selectedTemporary.VDC = null;
                $scope.temporary.tole = null;

            }
        }


        //to get temporary district only when zone is selected
        $scope.getTemporaryDistrict = function () {
            // console.log($scope.selectedZone.parent_id);


            $scope.temporaryStatus.parent_id = $scope.selectedTemporary.zone.id;
            console.log($scope.temporaryStatus.parent_id);

            console.log($scope.temporaryStatus);
            $scope.temporary.vdc = null;
            getAddress.getAddress($scope.temporaryStatus).then(function (response) {
                console.log("getDistrict ");
                console.log(response);
                $scope.temporary.district = response;

            }, function () {
                console.log("failure");
            });

        };

        //to get temporary  vdc/municipality only when district is selected.

        $scope.getTemporaryVDC = function () {
            console.log($scope.selectedTemporary.district);
            if ($scope.selectedTemporary.district == null) {
                //$scope.temporaryStatus.district_parent_id = null;
                $scope.temporary.vdc = null;
                return;
            }
            $scope.temporaryStatus.parent_id = $scope.selectedTemporary.district.id;
            console.log($scope.temporaryStatus);
            getAddress.getAddress($scope.temporaryStatus).then(function (response) {
                console.log("getVDC ")
                console.log(response);
                $scope.temporary.vdc = response;


            }, function () {
                console.log("failure");
            });

        };


        $scope.$watch('selectedTemporary.zone', function () {
            if ($scope.selectedTemporary.zone == null) {
                if ($scope.selectedTemporary.zone == null) {
                    $scope.temporary.district = null;
                    $scope.temporaryStatus.parent_id = null;

                }
            }
        });

        $scope.generalDetailsNext = function () {
            $state.go('addEmployee.permanentAddress');
        }
        $scope.permanentAddressPrevious = function () {
            $state.go('addEmployee.generalDetails');
        }
        $scope.permanentAddressNext = function () {
            $state.go('addEmployee.temporaryAddress');
        }
        $scope.temporaryAddressPrevious = function () {
            $state.go('addEmployee.permanentAddress');
        }
        $scope.temporaryAddressNext = function () {
            $state.go('addEmployee.confirmation');
        }
        $scope.confirmationPrevious = function () {
            $state.go('addEmployee.temporaryAddress');
        }


        $scope.addEmployee = function () {


            $scope.employeeDetails.permanentZone = $scope.selectedPermanent.zone;
            $scope.employeeDetails.permanentDistrict = $scope.selectedPermanent.district;
            $scope.employeeDetails.permanentVDC = $scope.selectedPermanent.VDC.id;
            $scope.employeeDetails.permanentTole = $scope.permanent.tole;
            $scope.employeeDetails.temporaryZone = $scope.selectedTemporary.zone;
            $scope.employeeDetails.temporaryDistrict = $scope.selectedTemporary.district;
            $scope.employeeDetails.temporaryVDC = $scope.selectedTemporary.VDC.id;
            $scope.employeeDetails.temporaryTole = $scope.temporary.tole;
            $scope.employeeDetails.dob = $filter('date')($scope.employeeDetails.dob, 'yyyy-MM-dd');
            $scope.employeeDetails.hireDate = $filter('date')($scope.employeeDetails.hireDate, 'yyyy-MM-dd');


            insertEmployee.insertEmployee($scope.employeeDetails).then(function (response) {
                console.log(response);
                console.log("Success");
                $scope.insertStatus.success.showAlert();

            }, function () {
                console.log("Failure");
            });
        }

    });

angular.module("adminApp")
    .controller("adminController", function () {

    })

//Controller to view employee details
angular.module("adminApp")
    .controller("viewEmployeeController", function ($scope, $state, NgTableParams, retrieveEmployee, retrieveRecentQualification, getEmergencyContact, updateEmployeeTable, $mdDialog, insertQualification, $filter) {
        $scope.selectedEmployee = {};
        $scope.employees = {};
        retrieveEmployee.retrieveEmployee().then(function (response) {
            $scope.employees.details = response.plain();
            console.log($scope.employees.details);
            for (var i in $scope.employees.details) {
                if ("email" in $scope.employees.details[i]) {
                    $scope.employees.details[i].editable = false;
                    console.log("here inside email found")
                } else {
                    console.log("error inside email search");
                }
            }
            console.log($scope.employees.details);
            console.log("Inside retrieve employee service in controller");
            console.log($scope.employees.details);
            var self = this;
            var data = $scope.employees.details;
            console.log(data);
            $scope.tableParams = new NgTableParams({count: 10, page: 1}, {dataset: $scope.employees.details})
            console.log($scope.tableParams);
        }, function () {
            console.log("failure");
        });

        $scope.check = function () {
            console.log($scope.employees);
        }

        $scope.enableEdit = function (employee) {
            employee.editable = true;
            console.log(employee.editable);

        }
        $scope.disableEdit = function (employee) {
            employee.editable = false;
            $scope.updateEmployeeDetails(employee);
            console.log(employee.editable);
        }
        $scope.showName = function (employee) {
            alert(employee.fname);
        }
        $scope.updateEmployeeDetails = function (employee) {
            $scope.toUpdateEmployee = {
                id: employee.id,
                fname: employee.fname,
                lname: employee.lname,
                phNumber: employee.phNumber,
                email: employee.email
            };
            var confirm = $mdDialog.confirm()
                .title('Would you like to update the details?')
                .cancel('No')
                .ok('Yes')
                .targetEvent()

            $mdDialog.show(confirm).then(function () {
                updateEmployeeTable.updateEmployee($scope.toUpdateEmployee).then(function (response) {
                    console.log(response);
                    $mdDialog.show(
                        $mdDialog.alert()
                            .parent(angular.element(document.querySelector('#popupContainer')))
                            .clickOutsideToClose(true)
                            .title('Employee Details of ' + $scope.toUpdateEmployee.fname + ' ' + $scope.toUpdateEmployee.lname + ' Updated Successfully')
                            .ok('OK')
                            .targetEvent()
                    );
                }, function () {
                    $state.reload()
                    console.log("Insert Unsuccesful");
                });

            }, function () {
                $state.reload()
                $scope.status = 'Not Updated';
            });
        }

        $scope.recentQuali=function(employeeId){
            $state.go('viewEmployee.viewQualificationList',{'id':employeeId});
        }

        $scope.viewProfile = function (employee) {
            $scope.selectedEmployee.id=employee.id;
            $scope.selectedEmployee.fname = employee.fname;
            $scope.selectedEmployee.lname = employee.lname;
            $scope.selectedEmployee.email = employee.email;
            $scope.selectedEmployee.phNumber = employee.phNumber;
            $scope.selectedEmployee.permanentAddress = employee.permanentAddress;
            $scope.selectedEmployee.tempAddress = employee.tempAddress;
            $scope.selectedEmployee.bloodGroup = employee.bloodGroup;
            $scope.selectedEmployee.dob = employee.dob;
            $scope.selectedEmployee.statusId = employee.statusId;
            $scope.selectedEmployee.positionId = employee.positionId;
            $scope.selectedEmployee.addressId = employee.addressId;
            $scope.selectedEmployee.workShiftId = employee.workShiftId;
            $scope.selectedEmployee.hireDate = employee.hireDate;
            $scope.selectedEmployee.gender = employee.gender;
            $scope.selectedEmployee.emergencyContactId = employee.emergencyContactId;
            $scope.selectedEmployee.status = {};
            $scope.selectedEmployee.position = {};
            $scope.selectedEmployee.workShift = {};
            $scope.selectedEmployee.address = {};
            $scope.selectedEmployee.emergencyContact = {};
            $scope.selectedEmployee.recentQualification={};

            getEmergencyContact.getEmergencyInfo($scope.selectedEmployee).then(function (response) {
                $scope.selectedEmployee.emergencyContact = response.plain();
                console.log($scope.selectedEmployee)
                console.log($scope.selectedEmployee.emergencyContact);
            }, function () {
                console.log("error");
            })

            retrieveRecentQualification.retrieveRecentQualification($scope.selectedEmployee).then(function (response){
                $scope.selectedEmployee.recentQualification=response.plain();
                console.log($scope.selectedEmployee.recentQualification);
            },function () {
                console.log("error");
            })

            $state.go('viewEmployee.profile');
        }


        $scope.addEmergencyContact = function (employee) {
            $scope.selectedEmployee.id = employee.id;
            $scope.selectedEmployee.fname = employee.fname;
            $scope.selectedEmployee.lname = employee.lname;
            $scope.relations = ["Father", "Mother", "Brother", "Sister", "Husband", "Wife", "Friend"];
            $state.go('viewEmployee.addEmergencyContact');
        }

        $scope.viewQualification=function(employee){
            $scope.selectedEmployee.id=employee.id;
            $state.go('viewEmployee.viewQualificationList',{'id':$scope.selectedEmployee.id});
        }

        $scope.course = [
            {name: "BBA", level: "Bachelors"},
            {name: "BBS", level: "Bachelors"},
            {name: "BIM", level: "Bachelors"},
            {name: "BSc.CsIT", level: "Bachelors"},
            {name: "BA", level: "Bachelors"},
            {name: "BBM", level: "Bachelors"},
            {name: "BIT", level: "Bachelors"},
            {name: "B.Sc.(Hons) Computing", level: "Bachelors"},
            {name: "MBA", level: "Masters"},
            {name: "MIT", level: "Masters"},
            {name: "MSc.CsIT", level: "Masters"},
            {name: "MBM", level: "Masters"},
            {name: "Science", level: "High School"},
            {name: "Management", level: "High School"},
            {name: "Humanities", level: "High School"}
        ];
        $scope.level = ["SLC", "High School", "Bachelors", "Masters"];
        $scope.university = ["Tribhuvan University", "Kathmandu University", "Pokhara University", "Purbanchal University", "HSEB"];

        $scope.qualificationData={
            level:null,
            course:null,
            university:null,
            grade:null,
            startDate:null,
            endDate:null,
            empId:null,
            empName:null
        }
        $scope.date={
        }
        $scope.insertQualification=function() {
            $scope.qualificationData.startDate=$filter('date')($scope.date.start, 'yyyy-MM-dd');
            $scope.qualificationData.endDate=$filter('date')($scope.date.end, 'yyyy-MM-dd');
            $scope.qualificationData.empId=$scope.selectedEmployee.id;
            $scope.qualificationData.empName=$scope.selectedEmployee.fname+' '+$scope.selectedEmployee.lname;

            insertQualification.insertQualification($scope.qualificationData).then(function (response) {
                console.log(response);
                $scope.insertStatus.success.showAlert();

            }, function () {
                console.log("Failure");
            });

            $scope.state = {
                currentState: $state.current.name
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
                                .title('Qualification of '+$scope.qualificationData.empName+' Added Successfully.')
                                .ariaLabel('Alert Dialog Demo')
                                .ok('OK')
                                .targetEvent()
                        );
                        for (var key in $scope.qualificationData) {
                            $scope.qualificationData[key] = null;
                        }
                        $scope.date.start=null;
                        $scope.date.end=null;
                    }
                }
            }
        }

    });