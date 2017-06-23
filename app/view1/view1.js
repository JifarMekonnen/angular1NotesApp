'use strict';

angular.module('myApp.view1', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'view1/view1.html',
            controller: 'View1Ctrl'
        });
    }])
    .controller("View1Ctrl", ['$scope', function ($scope) {
        console.log("working");
        $scope.notes = [];
        $scope.status = "all";

        $scope.add = function () {
            $scope.status = "all";
            $scope.notes.push({name: $scope.item, done: false});
            $scope.item="";
        }
        $scope.toggle = function (note) {
            $scope.notes[$scope.notes.indexOf(note)].done = !$scope.notes[$scope.notes.indexOf(note)].done;
        }
        $scope.done = function () {
            $scope.status = "done";
        }
        $scope.all = function () {
            $scope.status = "all";
        }
        $scope.undone = function () {
            $scope.status = "undone";
        }
        $scope.remove = function (note) {
            $scope.notes.splice(note,1);
        }
    }])
    .filter('filterByStatus', function () {

        return function (fullList, status) {
            var newArray = [];
            switch (status) {
                case 'all':
                    newArray = fullList;
                    break;
                case 'done':
                    fullList.forEach(function(item, index, array) {
                        if(item.done){
                            newArray.push(item);
                        }
                    });
                    break;
                case 'undone':
                    fullList.forEach(function(item, index, array) {
                        if(!item.done){
                            newArray.push(item);
                        }
                    });
                    break;
            }
            return newArray;
        };
    });
