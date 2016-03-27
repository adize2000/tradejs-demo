'use strict';

define(['app'], function (app) {

    var nameCompanyFilter = function () {

        return function (companies, filterValue) {
            if (!filterValue || !companies) return companies;

            var matches = [];
            filterValue = filterValue.toLowerCase();
            for (var i = 0; i < companies.length; i++) {
                var comp = companies[i];
                if(comp.company){
                	comp = comp.company;
                }
                if (comp.Symbol.toLowerCase().indexOf(filterValue) > -1 ||
                    comp.AbbreviatedName.toLowerCase().indexOf(filterValue) > -1 ||
                    comp.Name.toLowerCase().indexOf(filterValue) > -1) {

                    matches.push(companies[i]);
                }
            }
            return matches;
        };
    };

    app.filter('nameCompanyFilter', nameCompanyFilter);

});