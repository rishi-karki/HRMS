
angular.module('loginApp',['customServices']);

angular.module('loginApp')
    .controller('indexController', function($scope,$window,checkUser) {
        $scope.allUsers = {};

        $scope.submit = function() {
            var params = {uname: $scope.uname, pword: $scope.pword};

            checkUser.checkUsers(params).then(function (result) {
                console.log(result);
                $scope.allUsers.user = result;
                console.log($scope.allUsers.user.roleId);
                if ($scope.allUsers.user.roleId == 1) {
                    console.log("Role is admin");
                    $window.location.href = '../admin.html';
                } else {
                    $scope.incorrect = true;
                    console.log("role is user");
                }

            }, function () {
                console.log("error");
            });
            console.log($scope.allUsers.user);
        }
});







