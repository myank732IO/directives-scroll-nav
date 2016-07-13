angular.module('app').controller('homeController', homeController);

function homeController ($scope,$rootScope,$state) {

    $rootScope.dealList = [
        {
            "inkColor":"blue",
            "name":"BIC Round Stic Xtra Life Ball Pen,Medium Point(1.0MM),Blue ,12-Count",
            "price":"41.25",
            "rating":"445",
            "expectedDelivery":"Get it by Thursday",
            "penImage":"img/bicCristal.jpg"
        },
        {
            "inkColor":"black",
            "name":"Fisher Space Telescoping pen(TLP)",
            "price":"125.00",
            "rating":"900",
            "expectedDelivery":"Get it by sunday",
            "penImage":"img/reynolds.jpg"
        }

    ];

    $scope.productDetails = function(index){
        $state.go('product',{"id":index});
    }


}