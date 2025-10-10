var app = angular.module('blogApp', []);

app.controller('BlogController', ['$scope', '$http', function($scope, $http) {
  $scope.blogs = [];
  $scope.blogId = '';
  $scope.blog = null;
  $scope.error = null;

  // Fetch all blogs (default limit 10)
  $scope.fetchAllBlogs = function() {
    $http.get('https://restmancer.vercel.app/api/blogs?limit=10&field=id,title,author')
      .then(function(response) {
        $scope.blogs = response.data;
      }, function(err) {
        $scope.error = "Error fetching blogs.";
      });
  };

  // Fetch blog by ID
  $scope.fetchBlog = function() {
    if (!$scope.blogId) {
      $scope.error = "Please enter an ID";
      $scope.blog = null;
      return;
    }

    $http.get('https://restmancer.vercel.app/api/blogs/' + $scope.blogId)
      .then(function(response) {
        $scope.blog = response.data;
        $scope.error = null;
      }, function(err) {
        $scope.blog = null;
        $scope.error = "Blog not found or API error.";
      });
  };
}]);
