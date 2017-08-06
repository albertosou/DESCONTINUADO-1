angular.module('pocApp').factory('pedidoService', ['$http', '$rootScope', function ($http, $rootScope) {
    var factory = {};

    factory.Concluir = function (model, successCallback, errorCallback) {

        var innerErrorCallback = $rootScope.defaulErrorCallback;
        if (errorCallback) {
            innerErrorCallback = errorCallback;
        }

        $http.post('/api/Pedido/Concluir', model, $rootScope.ApiConfig).then(successCallback, innerErrorCallback);
    };

    factory.Atualizar = function (model, successCallback, errorCallback) {
        var innerErrorCallback = $rootScope.defaulErrorCallback;
        if (errorCallback) {
            innerErrorCallback = errorCallback;
        }

        $http.put('/api/Pedido/Atualizar', model, $rootScope.ApiConfig).then(successCallback, innerErrorCallback);
    };

    factory.Consultar = function (model, successCallback, errorCallback) {

        var innerErrorCallback = $rootScope.defaulErrorCallback;
        if (errorCallback) {
            innerErrorCallback = errorCallback;
        }
        $http({
            url: '/api/Pedido',
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