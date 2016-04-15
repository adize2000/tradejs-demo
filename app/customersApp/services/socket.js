'use strict';

define(['app'], function (app) {

    var injectParams = ['$rootScope'];
    
    var socketFactory = function ($rootScope) {
        var socket = io.connect(),
            factory = {};
    
        factory.on = function (eventName, callback) {
            socket.on(eventName, function () {  
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            });
        };
        
        factory.emit = function (eventName, data, callback) {
            socket.emit(eventName, data, function () {
            var args = arguments;
            $rootScope.$apply(function () {
                    if (callback) {
                      callback.apply(socket, args);
                    }
                });
            });
        };
        
        return factory;
    };

    socketFactory.$inject = injectParams;

    app.factory('socket', socketFactory);

});
    
    