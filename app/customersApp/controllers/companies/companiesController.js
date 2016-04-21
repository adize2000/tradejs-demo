'use strict';

define(['app'], function (app) {

    var injectParams = ['$filter', '$window', 'dataService'];

    var CompaniesController = function ($filter, $window, dataService) {
        var vm = this;

        vm.companies;
        vm.filteredCompanies;
        vm.filteredCount;

        //paging
        vm.totalRecords = 0;
        vm.pageSize = 10;
        vm.currentPage = 1;

        init();

        vm.pageChanged = function (page) {
            vm.currentPage = page;
            getCompanies();
        };

        vm.searchTextChanged = function () {
            filterCompanies(vm.searchText);
        };

        function init() {
            //createWatches();
            getCompanies();
        }

        //function createWatches() {
        //    //Watch searchText value and pass it and the customers to nameCityStateFilter
        //    //Doing this instead of adding the filter to ng-repeat allows it to only be run once (rather than twice)
        //    //while also accessing the filtered count via vm.filteredCount above

        //    //Better to handle this using ng-change on <input>. See searchTextChanged() function.
        //    $scope.$watch("searchText", function (filterText) {
        //        filterCustomersProducts(filterText);
        //    });
        //}

        function filterCompanies(filterText) {
            vm.filteredCompanies = $filter("nameCompanyFilter")(vm.companies, filterText);
            vm.filteredCount = vm.filteredCompanies.length;
        }

        function getCompanies() {
            dataService.getCompanies(vm.currentPage - 1, vm.pageSize)
                .then(function (data) {
                    vm.totalRecords = data.totalRecords;
                    vm.companies = data.results;
                    filterCompanies('');
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

    };

    CompaniesController.$inject = injectParams;

    app.register.controller('CompaniesController', CompaniesController);

});