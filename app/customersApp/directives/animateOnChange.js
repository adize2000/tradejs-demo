'use strict';

define(['app'], function (app) {

    var injectParams = ['$animate', '$timeout'];

    var animateOnChangeDirective = function ($animate, $timeout) {

        var link = function (scope, elem, attr) {
            scope.$watch(attr.animateOnChange, function(nv,ov) {
                if (nv!==ov && scope.animate) {
                  var c = nv > ov?'change-up':'change';
                  $animate.addClass(elem,c).then(function() {
                    $timeout(function() {$animate.removeClass(elem,c);});
                  });
                }
            });  
        };

        return {
            restrict: 'A',
            link: link
        };
    };

    animateOnChangeDirective.$inject = injectParams;

    app.directive('animateOnChange', animateOnChangeDirective);

});