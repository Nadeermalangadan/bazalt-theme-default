define('directives/bzMonster', [
    'app', 'directives/monster/world'
], function(app, monster) {
    'use strict';

    app.directive('bzMonster', ['$timeout', function($timeout) {
        return {
            restrict: 'A',
            scope: false,
            link: function(scope, element, attrs) {
                var isInit = false;
                element.click(function() {
                    if (isInit) return;
                    var m = new monster(element);
                    m.init();
                    isInit = true;
                    return false;
                });
            }
        };
    }]);
});