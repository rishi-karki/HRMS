
// angular.module("adminApp")
//     .controller('addDepartmentController', function ($scope) {
//         $scope.date = new Date();
//         $scope.bankbranch = ["Gongabu", "Chhetrapati", "Bansbari", "Thapathali", "Lainchowr", "Hattisar", "Putalisadak", "Chandol", "Chabahil", "Thamel", "Kamalpokhari", "Kalopoul", "Samkhusi", "Dhapashi", "Baneshowr", "Battisputali", "New Road", "Bagbazzar", "Chakrapath", "Maharajgunj", "Kalanki", "Basundhara", "Pepsicola", "Naya Baneshowr", "Shantinagar", "Subidhanagar", "Machhapokari", "Lazimpat", "Galkopakha", "Baniyatar", "Panipokhari", "Sundhara", "Tripureshowr", "Pulchowk", "Maitighar", "Jawlakhel", "Stadobato", "Tinkune", "Sukedhara", "Dhobighat", "Dhumbarahi", "Kalimati", "Kuleshowr", "Dhobichowr", "Paknajol", "Banasthali", "Chamati", "Swayambhu", "Sitapaila"];
//         $scope.date = new Date();
//     });

angular.module("adminApp")
    .controller('searchController', function ($scope) {
        var request = new XMLHttpRequest();
        $scope.searchInfo = function () {
            var name = document.searchform.name.value;
            var url = "check.jsp?val=" + name;
            try {
                request.onreadystatechange = function () {
                    if (request.readyState == 4) {
                        var val = request.responseText;
                        document.getElementById('mylocation').innerHTML = val;
                    }
                }
                request.open("GET", url, true);
                request.send();
            } catch (e) {
                alert("Unable to connect to server");
            }
        }
    });