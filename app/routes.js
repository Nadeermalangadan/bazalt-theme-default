define('routes', [
    'angular',
    'app'
], function (angular, app) {
    'use strict';

    app.filter('int', [function() {
        return function(value) {
            return parseInt(value);
        }
    }]);
    app.config(['$routeProvider', '$routeSegmentProvider', '$locationProvider', '$sceProvider', 'bzConfigProvider', '$httpProvider', 'bzLanguageProvider',
            function ($routeProvider, $routeSegmentProvider, $locationProvider, $sceProvider, bzConfigProvider, $httpProvider, bzLanguageProvider) {
                $locationProvider
                    .html5Mode(true)
                    .hashPrefix('!');
                bzConfigProvider.templatePrefix('');

                $routeSegmentProvider.options.autoLoadTemplates = true;

                $sceProvider.enabled(false);

                $httpProvider.responseInterceptors.push('loaderInterceptor');
                var spinnerFunction = function (data) {
                    return data;
                };
                $httpProvider.defaults.transformRequest.push(spinnerFunction);

                bzLanguageProvider.language('ru_RU');
            }])

        .run(['$routeSegment', '$rootScope', 'bzConfig', '$filter', 'bcPayments.Factories.Transaction',
            'bcUsers.Factories.Message', '$user',
            function($routeSegment, $rootScope, $config, $filter, TransactionResource, MessageResource, $user) {
            $rootScope.$routeSegment = $routeSegment;
            $rootScope.$config = $config;
            $rootScope.$filter = $filter;
            $rootScope.message = {};

            $rootScope.sendMessageToUser = function(mess) {
                var mes = new MessageResource(mess);
                mes.user_id = $user.data.id;
                $rootScope.sending_message = true;
                mes.$send(function() {
                    $rootScope.sending_message = false;
                    $rootScope.sended_message = true;
                    $user.$get();
                    //$('#sendMessage').modal('hide')
                });
            };
            $rootScope.$watch('$site.options.message_cost', function(value) {
                $rootScope.message_cost = parseInt(value);
            });

            $rootScope.payGift = function () {
                $('#payModal').modal();
            };

            $rootScope.doPay = function(amount) {
                $rootScope.paymentLoading = true;
                TransactionResource.get({'amount': amount}, function(data) {
                    angular.element(data.form).submit();
                }, function() {
                    $rootScope.paymentLoading = false;
                });
            };
            // for site
            $rootScope.banner = {
                categoryId: null
            };
        }])

        //register the interceptor as a service, intercepts ALL angular ajax http calls
        .factory('loaderInterceptor', ['$q', '$injector', '$rootScope', function ($q, $injector, $rootScope) {
            return function (promise) {
                var $http = $http || $injector.get('$http');
                $rootScope.polling = $http.pendingRequests.length === 0;
                return promise.then(function (response) {
                    $rootScope.polling = $http.pendingRequests.length !== 0;
                    return response;
                }, function (response) {
                    $rootScope.polling = $http.pendingRequests.length !== 0;
                    $rootScope.network_error = true;
                    return $q.reject(response);
                });
            };
        }]);
});