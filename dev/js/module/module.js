/**
 * Created by friendA on 2017/4/27.
 */
/*模块：获取锚点，控制分页*/
(function (angular) {
    "use strict"
    var moive = angular.module("moivemodule", ["ngRoute", "detailModule", "moiveControllerModule", "httpServer", "active.module"]);
    moive.config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
        $routeProvider.otherwise({redirectTo: "/in_theaters/1"}); //让网页默认打开正在热映
    }]);

    /*公用的参数*/
    moive.constant('movieConstant', {
        movieUrl: "http://api.douban.com/v2/movie/",
        detailUrl: "http://api.douban.com/v2/movie/subject/"
    });

    /*电影搜索控制器*/
    moive.controller("searchController", ["$scope", "$route", function ($scope, $route) {
        $scope.searchText = "";
        $scope.search = function () {
            console.log($scope.searchText);
            $route.updateParams({title: "search", q: $scope.searchText}); //动态跟新地址栏
        }
    }]);
})(angular);
