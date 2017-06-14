/**
 * Created by friendA on 2017/5/2.
 */
(function(angular) {
    "use strict"
    var detailModule = angular.module("detailModule", ["ngRoute", "httpServer"]);
    detailModule.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider) {
        $routeProvider.when("/subject/:id", {
            templateUrl: "./js/detail/moivedetail.html",
            controller: "detailController"
        });
    }]);
    detailModule.controller("detailController", ["$scope", "$routeParams", "dataServer", "movieConstant", function($scope, $routeParams, dataServer, movieConstant) {
        var id = $routeParams.id;
        var url = movieConstant.detailUrl + id;
        /*电影内容*/
        $scope.title = "";
        $scope.original_title = "";
        $scope.aka = [];
        $scope.directors = [];
        $scope.casts = [];
        $scope.genres = [];
        $scope.countries = [];
        $scope.year = "";
        $scope.src = "";
        $scope.summary = "";
        dataServer.my_jsonp(url, {}, function(data) {
            console.log(data);
            $scope.title = data.title;
            $scope.original_title = data.original_title;
            $scope.aka = data.aka;
            $scope.directors = data.directors;
            $scope.casts = data.casts;
            $scope.genres = data.genres;
            $scope.countries = data.countries;
            $scope.year = data.year;
            $scope.src = data.images.large;
            $scope.summary = data.summary;
            $scope.$apply();
        })
    }]);
})(angular);
