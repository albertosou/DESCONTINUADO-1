angular.module('pocApp').factory('usuarioService', ['$http', '$rootScope', function ($http, $rootScope) {
    var factory = {};

    factory.Login = function (model, successCallback, errorCallback)
    {
        var innerErrorCallback = $rootScope.defaulErrorCallback;
        if (errorCallback) {
            innerErrorCallback = errorCallback;
        }
        $http.post('/api/Usuario', model, $rootScope.ApiConfig).then(successCallback, innerErrorCallback);
    };

    return factory;
}]);