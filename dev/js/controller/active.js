/**
 * Created by friendA on 2017/4/29.
 */
(function (angular) {
    "use strict"
    angular.module("active.module", [])
        .directive("activeFocus", ["$location", function ($location) {
            return {
                restrict: "A",  //限制返回一个类型：A:attribute   E:element   C:class  M:comment
                link: function ($scope, iElm, iAttr, Controller) {
                    $scope.$location = $location;
                    $scope.$watch("$location.path()", function () {
                        var a_href = iElm.children("a").attr("href");
                        var a_path = a_href.replace(/#(\/\w+\/\d)/, "$1");      //#/in_theaters/1
                        if ($location.path() === a_path) {
                            // console.log(path);
                            // console.log(iElm);
                            iElm.parent().children("li").children("a").removeClass("active");
                            iElm.children("a").addClass("active");
                        }
                        console.log("1111");
                    });


                    /*   iElm.on("click",function () {

                     iElm.children("a").addClass("active");
                     })*/
                }
            };
        }])
})(angular);