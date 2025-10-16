<!DOCTYPE html>
<html lang="en" ng-app="chatApp">
<head>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular.min.js"></script>
  <script src="/socket.io/socket.io.js"></script>
</head>
<body ng-controller="ChatCtrl">

  <h2>AngularJS Real-Time Chat</h2>
  <div style="border:1px solid #ccc; height:200px; overflow:auto;">
    <p ng-repeat="msg in messages track by $index">{{msg}}</p>
  </div>

  <input type="text" ng-model="message" placeholder="Type a message">
  <button ng-click="send()">Send</button>

  <script>
    angular.module('chatApp', [])
      .controller('ChatCtrl', function($scope) {
        const socket = io();

        $scope.messages = [];

        // Receive messages
        socket.on('chatMessage', function(msg) {
          $scope.$apply(() => {
            $scope.messages.push(msg);
          });
        });

        // Send message
        $scope.send = function() {
          if ($scope.message.trim() !== "") {
            socket.emit('chatMessage', $scope.message);
            $scope.message = "";
          }
        };
      });
  </script>

</body>
</html>