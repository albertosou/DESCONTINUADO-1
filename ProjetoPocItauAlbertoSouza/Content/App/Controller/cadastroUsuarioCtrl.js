angular.module('pocApp').controller('cadastroUsuarioCtrl', ['$scope', '$rootScope', 'usuarioService', function ($scope, $rootScope, usuarioService) {
    $scope.controllerName = "cadastroUsuarioCtrl";

    $scope.Cadastrar = function () {
        var model = {
            "Email": $scope.Email,
            "Senha": $scope.Senha,
            "Nome": $scope.Nome,
            "ConfirmaSenha": $scope.ConfirmaSenha
        };
        //$("#password_confirm").removeClass('custom-invalid');
        if (model.Senha === model.ConfirmaSenha) {
            usuarioService.Incluir(model, function ($response) {
                $('#registro-modal').modal('hide');
                $scope.Nome = "";
                $scope.Senha = "";
                $scope.Email = "";
                $scope.ConfirmaSenha = "";
                $rootScope.$broadcast("ClienteEntrou", $response);
            });
        }
        else {
            //$("#password_confirm").addClass('custom-invalid');
            $scope.ConfirmaSenha = "";
        }
    }

    IniciarController();
}]);