define('controllers/BannerCtrl', [
    'app'
], function(app) {
    'use strict';

    app.controller('BannerCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
        $rootScope.$watch('banner', function(banner) {
            console.info(banner);

        }, true)
    }]);

});