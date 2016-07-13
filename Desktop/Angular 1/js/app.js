var app = angular.module("product",['ui.router','app']);
app.config(function($stateProvider, $urlRouterProvider) {


    $urlRouterProvider.otherwise("/signIn");
    $stateProvider

        .state('signIn', {
            url: '/signIn',
            templateUrl: 'signIn.html',
            controller:'signInController'
        })
        .state('home', {
            url: '/home',
            templateUrl: 'home.html',
            controller:'homeController'
        })
        .state('product', {
            url: '/product/:id',
            templateUrl: 'productDetail.html',
            controller:'ProductDetailController'

        })


});

