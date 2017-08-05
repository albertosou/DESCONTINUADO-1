angular.module('pocApp').factory('produtoService', ['$http', '$rootScope', function ($http, $rootScope) {
    var factory = {};

    factory.Excluir = function (model, successCallback, errorCallback) {
        var innerErrorCallback = $rootScope.defaulErrorCallback;
        if (errorCallback) {
            innerErrorCallback = errorCallback;
        }
        $http.post('/api/Produto/Login', model, $rootScope.ApiConfig).then(successCallback, innerErrorCallback);
    };

    factory.Incluir = function (model, successCallback, errorCallback) {
        var innerErrorCallback = $rootScope.defaulErrorCallback;
        if (errorCallback) {
            innerErrorCallback = errorCallback;
        }
        $http.post('/api/Produto/Incluir', model, $rootScope.ApiConfig).then(successCallback, innerErrorCallback);
    };

    factory.Alterar = function (model, successCallback, errorCallback) {
        var innerErrorCallback = $rootScope.defaulErrorCallback;
        if (errorCallback) {
            innerErrorCallback = errorCallback;
        }
        $http.put('/api/Produto/Alterar', model, $rootScope.ApiConfig).then(successCallback, innerErrorCallback);
    };

    factory.Excluir = function (model, successCallback, errorCallback) {
        var innerErrorCallback = $rootScope.defaulErrorCallback;
        if (errorCallback) {
            innerErrorCallback = errorCallback;
        }
       
        $http({
            url: '/api/Produto/Excluir',
            method: "DELETE",
            data: model,
            dataType: "json",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(successCallback, innerErrorCallback);
      
    };
    return factory;
}]);