define('directives/bzAdList', [
    'app'
], function(app) {
    'use strict';

    app.directive('bzAdList', ['$timeout', function($timeout) {
        return {
            restrict: 'A',
            scope: true,
            template: '<div class="ads"> \
                    <div ng-repeat="ad in ads" class="ad"> \
                        <a href="">{{ ad.title }}</a> \
                        <p>{{ ad.text }}</p> \
                    </div> \
                </div>',
            link: function(scope, element, attrs) {
                scope.ads = [];
                var ads = [
                    {
                        title: 'Cool stuff',
                        text: 'Берите пока не остыло!'
                    }, {
                        title: 'Привет, это Саша!',
                        text: 'Звоните телочки +380 114 1212!'
                    }, {
                        title: 'MC Космос!',
                        text: 'Я крут!'
                    }, {
                        title: 'Статья о власти!',
                        text: 'Власть гавно, я круче'
                    }];

                scope.addAdd = function() {
                    scope.ads.push(ads.shift());

                    if (ads.length > 0) {
                        $timeout(scope.addAdd, 100);
                    }
                    if (ads.length == 0) {
                        $timeout(function() {
                            element.addClass('loaded');
                        }, 1000);
                    }
                };
                scope.addAdd();
            }
        };
    }]);
});