var app = angular.module('baseApp', []);


app.controller('mainController', [
    "$scope",
    "getBrands",
    "getModel",
    function(
        $scope,
        getBrands,
        getModel
    ) {

        $scope.currentPageBrand = 0;
        $scope.pageSizeBrand = 10;

        $scope.currentPageModel = 0;
        $scope.pageSizeModel = 10;
        
        $scope.brands_json = [];
        $scope.model_json = [];

        $scope.active = 0;
        $scope.loadingBrand = false;
        $scope.loadingModel = false;
        $scope.showModel = false;

        $scope.numberOfPagesBrand = function() {
            return Math.ceil($scope.brands_json.length/$scope.pageSizeBrand);                
        }
        $scope.numberOfPagesModel = function() {
            return Math.ceil($scope.model_json.length/$scope.pageSizeModel);                
        }
        
        $scope.getBrands = function() {
            $scope.loadingBrand = true;
            var brands = getBrands.getData();
            brands.then(function(result) {
                $scope.brands_json = result;
                $scope.loadingBrand = false;
            });
        };
        $scope.getBrands();

        $scope.getModel = function(id) {
            $scope.loadingModel = true;
            $scope.showModel = true;
            $scope.active = id;

            var model = getModel.getData(id);
            model.then(function(result) {
                $scope.currentPageModel = 0;
                $scope.pageSizeModel = 10;
                $scope.model_json = result.modelos;
                $scope.loadingModel = false;
            });
        }
    }
]);

app.filter('startFromBrand', function() {
    return function(input, start) {
        start = +start;
        return input.slice(start);
    }
});


app.filter('startFromModel', function() {
    return function(input, start) {
        start = +start;
        return input.slice(start);
    }
});