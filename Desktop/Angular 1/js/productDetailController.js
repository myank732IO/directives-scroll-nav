
angular.module('app').controller('ProductDetailController', ProductDetailController);

function ProductDetailController ($stateParams,$scope,$rootScope) {
console.log($stateParams,"$stateParams");

    $scope.product = $rootScope.dealList[$stateParams.id];
    console.log($scope.product)
}