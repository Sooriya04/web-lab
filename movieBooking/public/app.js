var app = angular.module('movieApp', []);
app.controller('movieController', function($scope, $http){
    var api_url = 'http://localhost:3000/api/booking';
     $scope.loading = false;
    $scope.bookings = [];
    $scope.newBooking = {};
    $scope.error = '';
    $scope.loadDetails = function(){
        $scope.loading = false;
        $http.get(api_url)
        .then((res)=>{
            $scope.bookings = res.data;
            $scope.loading = false;
            $scope.error = ''
        })
        .catch(err=>{
            console.log('error' + err)
            $scope.loading = false;
            $scope.error = `${err.statusText}`
        })
    }
    $scope.bookNow = function(){
        $scope.loading = true;
        $scope.error = '';
        $http.post(api_url, $scope.newBooking)
        .then((res)=>{
            $scope.newBooking = {};
            $scope.loading = false;
            $scope.error = ''
            $scope.loadDetails()
        })
        .catch((err)=>{
            console.error(err)
            $scope.loading = false;
            $scope.error = `Error while booking : ${err}`
        });
    } 
    $scope.loadDetails()
});