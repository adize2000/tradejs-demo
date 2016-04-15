'use strict';

define(['app'], function (app) {

    var injectParams = ['$filter', '$window', 'dataService', 'socket'];

    var PriceController = function ($filter, $window, dataService, socket) {
        var vm = this;
        //var socket = io();
        
        vm.shares;
        vm.filteredShares;
        vm.filteredCount;

        //paging
        vm.totalRecords = 0;
        vm.pageSize = 10;
        vm.currentPage = 1;

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
        }

        function filterShares(filterText) {
            vm.filteredShares = $filter("nameCompanyFilter")(vm.shares, filterText);
            vm.filteredCount = vm.filteredShares.length;
        }

        function getShares() {
            dataService.getShares(vm.currentPage - 1, vm.pageSize)
                .then(function (data) {
                    vm.totalRecords = data.totalRecords;
                    vm.shares = data.results;
                    filterShares('');
                }, function (error) {
                    $window.alert(error.message);
                });
        }
        
        vm.setOrder = function (orderby) {
            if (orderby === vm.orderby) {
                vm.reverse = !vm.reverse;
            }
            vm.orderby = orderby;
        }
        
        socket.on('share update', function(shareUpdate){
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