/**
 * Created by rujaldae on 7/6/17.
 */
angular.module("customServices",['restangular']);

angular.module("customServices")
    .factory("checkUser", function(Restangular,$q){
        var object= {};


        object.checkUsers = function(params){
            var def = $q.defer();
            console.log("Inside checkUSerFactory.");
            var users = Restangular.all('Servlet');
            users.customGET("",params).then(function(Servlet){
                console.log(Servlet);
                def.resolve(Servlet);


            },function(){
                def.reject("Failure");
                console.log("failure");
            })
            return def.promise;

        }
        return object;
});

angular.module("customServices")
    .factory("getAddress", function($q,Restangular){
        var object={};

        object.getAddress = function(status_id){
            console.log(status_id)
            var def= $q.defer();
            var address = Restangular.all('AddressServlet');
            address.customGET("",status_id).then(function(response){
                console.log(response);
                console.log("getaddress Service success");
                def.resolve(response);
            }, function(){
                def.reject("Failure");
                console.log("service failure");
            })
            return def.promise;
        };
        return object;


    });

angular.module("customServices")
    .factory("insertEmployee", function($q,Restangular){
        console.log("Here inside insertEmployee factory");
        var object={};
        object.insertEmployee = function(employeeDetails){
            var def = $q.defer();
            var employee = Restangular.all('InsertEmployeeData');
            employee.customPOST({},"",employeeDetails,{}).then(function(response){
                console.log(response);
                console.log("Success");
                def.resolve(response);
            },function(){
                console.log("Failure");
                def.reject("Connection Failure");
            });
            return def.promise;
        }
        return object;
    })

angular.module("customServices")
    .factory("retrieveEmployee", function ($q,Restangular) {
        var object={};
        object.retrieveEmployee=function(){
            var def = $q.defer();
            var employee = Restangular.all('RetrieveEmployee');
            employee.getList().then(function(response){
                console.log(response);
                def.resolve(response);
            }, function(){
                def.reject("Connection Failure");
            });
            return def.promise;
        }
        return object;
    })

// Service for interview
angular.module("customServices")
    .factory("insertInterview", function($q,Restangular){
        console.log("Here inside insertInterviewDetails factory");
        var object={};
        object.insertInterview = function(InterviewData){
            var def = $q.defer();
            var interview = Restangular.all('InsertInterviewDetails');
            interview.customPOST({},"",InterviewData,{}).then(function(response){
                console.log(response);
                console.log("Success");
                def.resolve(response);
            },function(){
                console.log("Failure");
                def.reject("Connection Failure");
            });
            return def.promise;
        }
        return object;
    })

// Service to update employee
angular.module("customServices")
    .factory("updateEmployeeTable", function($q,Restangular){
        var object = {};
        object.updateEmployee = function(employeeDetails){
            var def = $q.defer();
            var employee = Restangular.all('UpdateEmployeeTable');
            employee.customPOST({},"",employeeDetails,{}).then(function(response){
                def.resolve(response);
                console.log(response);
            }, function(){
                def.reject("Service failure");
            })
            return def.promise;
        }
        return object;
    });


// Service to obtain employee data
angular.module("customServices")
    .factory("retrieveEmployee", function ($q,Restangular) {
        var object={};
        object.retrieveEmployee=function(){
            var def = $q.defer();
            var employee = Restangular.all('RetrieveEmployee');
            employee.getList().then(function(response){
                console.log(response);
                def.resolve(response);
            }, function(){
                def.reject("Connection Failure");
            });
            return def.promise;
        }
        return object;
    })

// Service to update interview details
angular.module("customServices")
    .factory("updateInterview", function($q,Restangular){
        var object = {};
        object.updateInterview = function(interviewDetails){
            var def = $q.defer();
            var interview = Restangular.all('UpdateInterviewTable');
            interview.customPOST({},"",interviewDetails,{}).then(function(response){
                def.resolve(response);
                console.log(response);
            }, function(){
                def.reject("Service failure");
            })
            return def.promise;
        }
        return object;
    });

// Service to obtain interview details
angular.module("customServices")
    .factory("retrieveInterview", function ($q,Restangular) {
        var object={};
        object.retrieveInterview=function(){
            var def = $q.defer();
            var interview = Restangular.all('RetrieveInterview');
            interview.getList().then(function(response){
                console.log(response);
                def.resolve(response);
            }, function(){
                def.reject("Connection Failure");
            });
            return def.promise;
        }
        return object;
    })

//Service to insert department
angular.module("customServices")
    .factory("insertDept", function ($q,Restangular) {
        var object={};
        object.insertDept=function(department){
            var def = $q.defer();
            var dept = Restangular.all('InsertDepartment');
            dept.customPOST({},"",department,{}).then(function(response){
                console.log(response);
                def.resolve(response);
            }, function(){
                def.reject("Connection Failure");
            });
            return def.promise;
        }
        return object;
    })

// Service to update department details
angular.module("customServices")
    .factory("updateDepartment", function($q,Restangular){
        var object = {};
        object.updateDepartment = function(departmentDetails){
            var def = $q.defer();
            var department = Restangular.all('UpdateDepartmentTable');
            department.customPOST({},"",departmentDetails,{}).then(function(response){
                def.resolve(response);
                console.log(response);
            }, function(){
                def.reject("Service failure");
                console.log("Service Failure")
            })
            return def.promise;
        }
        return object;
    });

// Service to retrieve employee data and put on dropdown in department adding
angular.module("customServices")
    .factory("retrieveEmp", function ($q,Restangular) {
        var object={};
        object.retrieveEmp=function(){
            var def = $q.defer();
            var employee = Restangular.all('RetrieveEmp');
            employee.getList().then(function(response){
                console.log(response);
                def.resolve(response);
            }, function(){
                def.reject("Connection Failure");
            });
            return def.promise;
        }
        return object;
    })

// Service to retrieve employee data and put on dropdown in department adding
angular.module("customServices")
    .factory("retrieveEmp", function ($q,Restangular) {
        var object={};
        object.retrieveEmp=function(){
            var def = $q.defer();
            var employee = Restangular.all('RetrieveEmp');
            employee.getList().then(function(response){
                console.log(response);
                def.resolve(response);
            }, function(){
                def.reject("Connection Failure");
            });
            return def.promise;
        }
        return object;
    })

// Service to obtain department details
angular.module("customServices")
    .factory("retrieveDepartment", function ($q,Restangular) {
        var object={};
        object.retrieveDepartment=function(){
            var def = $q.defer();
            var department = Restangular.all('RetrieveDepartment');
            department.getList().then(function(response){
                console.log(response);
                def.resolve(response);
            }, function(){
                def.reject("Connection Failure");
            });
            return def.promise;
        }
        return object;
    })

// Service to view emergency contact in full profile
angular.module("customServices")
    .factory("getEmergencyContact", function($q, Restangular){
        var object={};
        object.getEmergencyInfo = function(emergency_id){
            var def = $q.defer();
            var emergencyContact = Restangular.all('RetrieveEmergencyContactInfo');
            emergencyContact.customGET("",emergency_id).then(function(response){
                def.resolve(response);
            }, function () {
                def.reject("Connection Failure");
            })
            return def.promise;
        }
        return object;
    })

// Service to view recent qualification in full profile
angular.module("customServices")
    .factory("retrieveRecentQualification", function($q, Restangular){
        var object={};
        object.retrieveRecentQualification = function(id){
            var def = $q.defer();
            var recentQualification = Restangular.all('RetrieveRecentQualification');
            recentQualification.customGET("",id).then(function(response){
                console.log(response);
                def.resolve(response);
            }, function () {
                def.reject("Connection Failure");
            })
            return def.promise;
        }
        return object;
    })

// Service to insert qualification
angular.module("customServices")
    .factory("insertQualification", function ($q,Restangular) {
        var object={};
        object.insertQualification=function(department){
            var def = $q.defer();
            var qualification = Restangular.all('InsertQualification');
            qualification.customPOST({},"",department,{}).then(function(response){
                console.log(response);
                def.resolve(response);
            }, function(){
                def.reject("Connection Failure");
            });
            return def.promise;
        }
        return object;
    })

// Service to retrieve qualification
angular.module("customServices")
    .factory("retrieveQualification", function ($q,Restangular) {
        var object={};
        object.retrieveQualification=function(employee){
            var def = $q.defer();
            var qualification = Restangular.all('RetrieveQualification');
            qualification.customPOST({},"",employee,{}).then(function(response){
                console.log(response);
                def.resolve(response);
            }, function(){
                def.reject("Connection Failure");
            });
            return def.promise;
        }
        return object;
    })

// Service to update qualification details
angular.module("customServices")
    .factory("updateQualification", function($q,Restangular){
        var object = {};
        object.updateQualification = function(qualification){ console.log("INSIDE SERVICE UPDATE");
            var def = $q.defer();
            var qualificationUpdate = Restangular.all('UpdateQualificationTable');
            qualificationUpdate.customPOST({},"",qualification,{}).then(function(response){
                def.resolve(response);
                console.log(response);
            }, function(){
                def.reject("Service failure");
            })
            return def.promise;
        }
        return object;
    });