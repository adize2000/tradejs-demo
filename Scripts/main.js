require.config({
    baseUrl: 'app',
    urlArgs: 'v=1.0'
});

require(
    [
        'customersApp/animations/listAnimations',
        'app',
        'customersApp/directives/wcUnique',
        'customersApp/directives/animateOnChange',
        'customersApp/services/routeResolver',
        'customersApp/services/config',
        'customersApp/services/customersBreezeService',
        'customersApp/services/authService',
        'customersApp/services/customersService',
        'customersApp/services/dataService',
        'customersApp/services/modalService',
        'customersApp/services/httpInterceptors',
        'customersApp/services/socket',
        'customersApp/filters/nameCityStateFilter',
        'customersApp/filters/nameProductFilter',
        'customersApp/filters/nameCompanyFilter',
        'customersApp/controllers/navbarController',
        'customersApp/controllers/orders/orderChildController',
    ],
    function () {
        angular.bootstrap(document, ['customersApp']);
    });
