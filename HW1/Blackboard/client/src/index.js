var angular = require("angular");
var io = require("socket.io-client");

angular.module("myApp", []).controller("myController",
    function($scope) {
        var socket = io.connect('http://localhost:8080');
        socket.on('connect', function() {
            console.log("connect success");
            socket.on('update', function(data) {
                console.log("Get Data:" + data);
                $scope.content = data;
                $scope.$digest();
            });
        });

        $scope.onChange = function() {
            socket.emit('input', $scope.content);
        }
    });
