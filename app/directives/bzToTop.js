define('directives/bzToTop', [
    'app'
], function(app) {
    'use strict';

    app.directive('bzToTop', [function() {
        return {
            restrict: 'CA',
            scope: false,
            link: function(scope, element, attrs) {
                element.click(function() {
                    $('html, body').animate({ scrollTop: 0 }, 'slow');
                    return false;
                });

                $(window).scroll(function(){
                    if ($(this).scrollTop() > 100) {
                        element.fadeIn();
                    } else {
                        element.fadeOut();
                    }
                });
            }
        };
    }]);
});