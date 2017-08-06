angular.module('pocApp').factory('carrinhoService', ['$http', '$rootScope', function ($http, $rootScope) {
    var factory = {};

    factory.Incluir = function (model, successCallback, errorCallback) {

        var innerErrorCallback = $rootScope.defaulErrorCallback;
        if (errorCallback) {
            innerErrorCallback = errorCallback;
        }

        $http.post('/api/Carrinho/Incluir', model, $rootScope.ApiConfig).then(successCallback, innerErrorCallback);
    };

    factory.Excluir = function (model, successCallback, errorCallback) {
        var innerErrorCallback = $rootScope.defaulErrorCallback;
        if (errorCallback) {
            innerErrorCallback = errorCallback;
        }

        $http({
            url: '/api/Carrinho/Excluir',
            method: "DELETE",
            data: model,
            dataType: "json",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(successCallback, innerErrorCallback);
    };


    factory.Consultar = function (model, successCallback, errorCallback) {

        var innerErrorCallback = $rootScope.defaulErrorCallback;
        if (errorCallback) {
            innerErrorCallback = errorCallback;
        }
        $http({
            url: '/api/Carrinho',
            method: "POST",
            data: model,
            dataType: "json",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(successCallback, innerErrorCallback);
    };

    return factory;
}]);