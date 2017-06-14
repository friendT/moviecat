/**
 * Created by friendA on 2017/4/23.
 */
/*自定义跨域请求*/
(function (angular) {
    "use strict"
    var httpServer = angular.module("httpServer", []);
    httpServer.service("dataServer", ["$window", "$document", function ($window, $document) {
        this.my_jsonp = function (url, seletor, callback) {
            var num = Math.random().toString().replace(".", "");
            var callbackName = "my_jsonp_" + num;
            $window[callbackName] = callback;
            var link = url.indexOf("?") === -1 ? "?" : "&";
            for (var key in seletor) {
                link += key + "=" + seletor[key] + "&";
            }
            var URL = url + link + "callback=" + callbackName;
            var script = document.createElement("script");
            script.src = URL;
            $document[0].querySelector("body").appendChild(script);
        }
    }]);

})
(angular);

/*

 /!*这下面的为局部方法*!/
 (function (window, document) {
 "use strict"
 /!*jsonp跨域：
 *   <script src="https://api.douban.com/v2/movie/top250&callback=abc></script>"*!/
 // my_jsonp("https://api.douban.com/v2/movie/top250", {
 //     start: 3,
 //     count: 10
 // });
 "use strict"
 function my_jsonp(url, data, callback) {

 /!*设置回调函数的尾缀数*!/
 var fnNum = Math.random().toString().replace(".", "");
 var callbackName = "my_cb_" + fnNum;    //定义函数名
 window[callbackName] = callback;    //将函数名定义给回调函数
 var link = url.indexOf("?") == -1 ? "?" : "";   //判断URL中是否有“？”符号
 for (var key in data) {
 link += key + "=" + data[key] + "&";
 }
 var url = url + link + "&" + "callback=" + callbackName;
 var script = document.createElement("script");
 script.src = url;
 document.querySelector("body").appendChild(script);
 };

 window.my_jsonp = my_jsonp; //将my_jsonp定义为全局方法
 })(window, document)*/
