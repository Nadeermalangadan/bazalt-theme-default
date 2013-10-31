define('directives/bzAds', [
    'app',

    'directives/bzAdList'
], function(app) {
    'use strict';

    app.directive('bzAds', ['$timeout', function($timeout) {
        return {
            restrict: 'A',
            scope: false,
            template: '<div bz-ad-list class="ads-container ads-container-left"></div> \
                       <div bz-ad-list class="ads-container ads-container-right"></div>',
            link: function(scope, element, attrs) {

            }
        };
    }]);
});