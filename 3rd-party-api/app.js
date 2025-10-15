var app = angular.module('apiApp', []);

app.controller('MainController', function($scope, $http) {

    $scope.users = [];

    $scope.fetchUsers = function() {
        $http.get('https://jsonplaceholder.typicode.com/users')
        .then(function(response) {
            $scope.users = response.data;
        })
        .catch(function(error) {
            console.error('Error fetching data:', error);
            alert('Failed to fetch data from API');
        });
    };

});
