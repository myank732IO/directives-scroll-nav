var app = angular.module('app',[]);
app.controller('signInController', signInController);

function signInController ($scope,$state) {
    $scope.email = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    $scope.user = {userName:"",password:""};

    $scope.signIn = function () {
        if($scope.user.userName != "" && $scope.user.password != "" ){
            $state.go('home');
        }
    }
}
