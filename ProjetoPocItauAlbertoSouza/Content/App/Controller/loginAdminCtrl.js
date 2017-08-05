angular.module('pocApp').controller('loginAdminCtrl', ['$scope', '$rootScope', 'usuarioService', function ($scope, $rootScope, usuarioService) {

    $scope.AdminLogado = false;

    $scope.Login = function () {
        var model = {
            Email: $scope.Email,
            Senha: $scope.Senha
        };
        usuarioService.Login(model, $scope.AdminEntrou);
    };

    $scope.AdminEntrou = function ($response) {

        if ($scope.AdminLogado == false) {
            var validado = true;
            var model = $response.data;
            var mensagem = "";
            if (model.Model) {
                validado = $response.data.Validado === true;
                model = $response.data.Model;
                mensagem = $response.data.Mensagem;
            }
            if (validado === true) {
                if (model.Administra === false)
                {
                    validado = false;
                    mensagem = "Usuario informado não é um administrador!";
                }
            }
            if (validado === true) {
                $scope.Id = model.Id;
                $scope.Nome = model.Nome;
                $scope.Senha = null;
                $scope.Email = null;
                $('.dropdown', document).click();
                $scope.AdminLogado = true;
                $rootScope.$broadcast("AdminEntrou", model);
            } else {
                var configHandler = {
                    TituloModal: "Autenticação",
                    MensagemModal: mensagem,
                    OK: function () {
                        $scope.AdminLogado = false;
                        $("#pocModal").modal('hide');
                    },
                    Tipo: "ALERT"
                };
                $rootScope.$broadcast("ShowModal", configHandler);
            }
        }
    };


    $scope.NovoCliente = function () {
        $('.dropdown', document).click();
        $('#registro-modal').modal('toggle');
    };

    IniciarController();

}]);