angular.module("rss2json", []);

angular.module("rss2json").controller("AppController", function($http) {
    var vm = this;
    vm.hasResult = false;
    vm.clearResult = clearResult;
    vm.getResult = getResult;
    vm.result = "";

    function clearResult() {
        vm.hasResult = false;
    }

    function getResult(rssEndpoint) {
        $http({
            method: 'POST',
            url: '/api/rss2json',
            data: { rssEndpoint: rssEndpoint }
        }).then(function successCallback(response) {
            vm.result = response.data;
            vm.hasResult = true;
        }, function errorCallback(response) {
            vm.result = response.data;
            vm.hasResult = true;
        });
    }
});