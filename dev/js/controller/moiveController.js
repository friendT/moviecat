/**
 * Created by friendA on 2017/4/27.
 */
(function(angular) {
    "use strict"
    var mController = angular.module("moiveControllerModule", ["ngRoute", "httpServer"]);

    mController.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider) {
        $routeProvider.when("/:title/:page", {
            templateUrl: "moiveList",
            controller: "moiveController"
        });
        $locationProvider.hashPrefix("");
    }]);

    mController.controller("moiveController", ["$scope", "$location", "$routeParams", "dataServer", "$route", "movieConstant", function($scope, $location, $routeParams, dataServer, $route, movieConstant) {
        var titleUrl = $routeParams.title;
        // console.log($routeParams);
        var page = parseInt($routeParams.page); //当前页数
        var url = movieConstant.movieUrl + titleUrl;
        var countNum = 5; //每页显示的个数
        var startNum = (page - 1) * countNum; //从第几个开始
        $scope.page = page;
        $scope.totalNum = 0; //总数
        $scope.moives = [];
        $scope.title = "";
        $scope.totalPages = 0; //总页数
        dataServer.my_jsonp(url, { start: startNum, count: countNum, q: $routeParams.q }, function(data) {
            $scope.totalNum = data.total;
            $scope.moives = data.subjects;
            $scope.title = data.title;
            $scope.totalPages = Math.ceil(data.total / countNum);
            $scope.$apply();
        });
        /*下一页*/
        $scope.next = function() {
                if (page < $scope.totalPages) {
                    page += 1;
                    $route.updateParams({ page: page });
                }
            }
            /*上一页*/
        $scope.prev = function() {
            if (page > 1) {
                page -= 1;
                $route.updateParams({ page: page });
            }
        }

        this.titleName = titleUrl;

    }]);
})(angular);
