'use strict';

define(['app'], function (app) {

    var injectParams = ['$filter', '$window', '$scope', '$timeout', 'dataService', 'socket'];

    var PriceController = function ($filter, $window, $scope, $timeout, dataService, socket) {
        var vm = this;
        
        vm.shares;
        vm.filteredShares;
        vm.filteredCount;
        vm.shareNews = [];
        
        //paging
        vm.totalRecords = 0;
        vm.pageSize = 10;
        vm.currentPage = 1;

        vm.news = "...";

        init();

        vm.pageChanged = function (page) {
            vm.currentPage = page;
            getShares();
        };

        vm.searchTextChanged = function () {
            filterShares(vm.searchText);
        };

        function init() {
            getShares();
        };

        function filterShares(filterText) {
            $scope.animate = false;
            vm.filteredShares = $filter("nameCompanyFilter")(vm.shares, filterText);
            vm.filteredCount = vm.filteredShares.length;
        };

        function getShares() {
            $scope.animate = false;
            dataService.getShares(vm.currentPage - 1, vm.pageSize)
                .then(function (data) {
                    vm.totalRecords = data.totalRecords;
                    vm.shares = data.results;
                    filterShares('');
                }, function (error) {
                    $window.alert(error.message);
                });
        };
        
        vm.setOrder = function (orderby) {
            $scope.animate = false;
            if (orderby === vm.orderby) {
                vm.reverse = !vm.reverse;
            }
            vm.orderby = orderby;
        };
        
        socket.on('share update', function(shareUpdate){
            $scope.animate = true;
            
            if(vm.shareNews.length > 0)
                vm.shareNews.splice(0,1);
            
            $timeout(function () {
                var shareNews = {};
                shareNews.company = shareUpdate.company.Name;
                shareNews.price = shareUpdate.LastPrice;
                shareNews.gt = shareUpdate.LastPrice > shareUpdate.FirstPrice;
                shareNews.lt = shareUpdate.LastPrice < shareUpdate.FirstPrice;
                shareNews.time = new Date();
                vm.shareNews.push(shareNews);
            }, 1000);
            
            for (var i = 0; i < vm.filteredShares.length; i++) {
                var share = vm.filteredShares[i];
                if (share.StreamDate === shareUpdate.StreamDate &&
                    share.IdCode === shareUpdate.IdCode ) {
                        share.LastPrice = shareUpdate.LastPrice;
                        break;
                }
            }
            for (var i = 0; i < vm.shares.length; i++) {
                var share = vm.shares[i];
                if (share.StreamDate === shareUpdate.StreamDate &&
                    share.IdCode === shareUpdate.IdCode ) {
                        share.LastPrice = shareUpdate.LastPrice;
                        break;
                }
            }
        });
        
    };

    PriceController.$inject = injectParams;

    app.register.controller('PriceController', PriceController);

});