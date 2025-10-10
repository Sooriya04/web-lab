const app = angular.module('curdApp', []);

app.controller('bodyController', function($scope, $http){
    const api_url = '/api/emp';
    $scope.errorMsg = '';

    function loadEmployees() {
        $http.get(api_url).then(
            res => $scope.emps = res.data,
            err => $scope.errorMsg = 'Error loading employees!'
        );
    }
    loadEmployees();

    $scope.addEmp = function() {
        $scope.errorMsg = '';
        $http.post(api_url, $scope.newEmp).then(
            () => {
                $scope.newEmp = {};
                loadEmployees();
            },
            err => $scope.errorMsg = 'Error adding employee!'
        );
    }

    $scope.updateEmp = function(emp) {
        $scope.errorMsg = '';
        $http.put(`${api_url}/${emp._id}`, emp).then(
            () => loadEmployees(),
            err => $scope.errorMsg = 'Error updating employee!'
        );
    }

    $scope.deleteEmp = function(id) {
        $scope.errorMsg = '';
        $http.delete(`${api_url}/${id}`).then(
            () => loadEmployees(),
            err => $scope.errorMsg = 'Error deleting employee!'
        );
    }
});
