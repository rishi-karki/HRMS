// This is a controller to perform interview related tasks

// Controller to insert interview
angular.module("adminApp")
    .controller("addInterviewController", function ($scope, $stateParams, $timeout, insertInterview, $filter, $state, $mdDialog) {
        $scope.interviewData = {
            interviewee: null,
            interviewer: null,
            date: null,
            time: null,
            purpose: null,
            email: null,
            phone: null
        }

        $scope.insertInterview = function () {
            console.log("INSERTED");
            $scope.interviewData.date = $filter('date')($scope.date, 'yyyy-MM-dd');
            $scope.interviewData.time = $filter('date')($scope.time, 'HH:mm');

            insertInterview.insertInterview($scope.interviewData).then(function (response) {
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
                            .title('Interview Schedule Successfully Added.')
                            .textContent('Remember, Interview Date is ' + $filter('date')($scope.date, 'MMM d yyyy, EEEE') + ' ' + $filter('date')($scope.time, 'HH:mm a'))
                            .ariaLabel('Alert Dialog Demo')
                            .ok('OK')
                            .targetEvent()
                    );
                    for (var key in $scope.interviewData) {
                        $scope.interviewData[key] = null;
                    }
                    $scope.date = null;
                    $scope.time = null;
                    $state.reload()
                }
            }
        }
    });

// controller to view interview details
angular.module("adminApp")
    .controller("viewInterviewController", function ($scope, $state, $filter, NgTableParams, retrieveInterview, updateInterview, $mdDialog) {
        $scope.interview = {};
        retrieveInterview.retrieveInterview().then(function (response) {
            $scope.interview.details = response.plain();
            console.log($scope.interview.details);
            for (var i in $scope.interview.details) {
                $scope.interview.details[i].editable = false;
            }
            console.log($scope.interview.details);
            console.log("Inside retrieve interview service in controller");
            console.log($scope.interview.details);
            var self = this;
            var data = $scope.interview.details;
            console.log(data);
            $scope.tableParams = new NgTableParams({count: 10, page: 1}, {dataset: $scope.interview.details})
            console.log($scope.tableParams);
        }, function () {
            console.log("failure");
        });

        $scope.check = function () {
            console.log($scope.interview);
        }

        $scope.enableEdit = function (interview) {
            interview.editable = true;
            console.log(interview.editable);

        }
        $scope.disableEdit = function (interview) {
            interview.editable = false;
            $scope.updateInterviewDetails(interview);
            console.log(interview.editable);
        }
        $scope.updateInterviewDetails = function (interview) {
            $scope.toUpdateInterview = {
                id: interview.id,
                iname: interview.intervieweeName,
                name: interview.interviewerName,
                date: null,
                time: null,
                purpose: interview.purpose,
                email: interview.email,
                phone: interview.phone,
                status: interview.status
            };
            $scope.toUpdateInterview.date = $filter('date')(interview.date, 'yyyy-MM-dd');
            $scope.toUpdateInterview.time = $filter('date')(interview.time, 'HH:mm');
            var confirm = $mdDialog.confirm()
                .title('Would you like to update the details?')
                .cancel('No')
                .ok('Yes')
                .targetEvent()

            $mdDialog.show(confirm).then(function () {
                updateInterview.updateInterview($scope.toUpdateInterview).then(function (response) {
                    console.log(response);
                    $mdDialog.show(
                        $mdDialog.alert()
                            .parent(angular.element(document.querySelector('#popupContainer')))
                            .clickOutsideToClose(true)
                            .title('Interview Details of ' + $scope.toUpdateInterview.iname + " Updated Successfully")
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