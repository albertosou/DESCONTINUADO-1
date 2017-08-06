angular.module('pocApp').controller('loginLojaCtrl', ['$scope', '$rootScope', 'usuarioService', function ($scope, $rootScope, usuarioService) {


    $scope.controllerName = "loginLojaCtrl";
    $scope.UsuarioLogado = false;

    $scope.Login = function () {
        var model = {
            Email: $scope.Email,
            Senha: $scope.Senha
        };
        usuarioService.Login(model, $scope.ClienteEntrou);
    };

    $scope.ClienteEntrou = function ($response) {

        if ($scope.UsuarioLogado == false) {
            var validado = true;
            var model = $response.data;
            var mensagem = "";
            if (model.Model) {
                validado = $response.data.Validado === true;
                model = $response.data.Model;
                mensagem = $response.data.Mensagem;
            }
            if (validado === true) {
                $scope.IdUsuario = model.IdUsuario;
                $scope.Nome = model.Nome;
                $scope.Senha = null;
                $scope.Email = null;
                $('.dropdown', document).click();
                $scope.UsuarioLogado = true;
                $rootScope.$broadcast("ClienteEntrou", model);
            } else {
                var configHandler = {
                    TituloModal: "Autenticação",
                    MensagemModal: mensagem,
                    OK: function () {
                        $scope.UsuarioLogado = false;
                    },
                    Tipo: "ALERT"
                };
                $rootScope.$broadcast("ShowModal", configHandler);
            }
        }
    };

    $scope.Logoff = function ($event) {

        $('.dropdown', document).click();

        var configHandler = {
            TituloModal: "Deslogar da Loja",
            MensagemModal: "Tem certeza que deseja sair?",
            OK: function () {
                $scope.UsuarioLogado = false;
                $rootScope.$broadcast("ClienteSaiu", {});
                $("#pocModal").modal('hide');
            },
            Tipo: "CONFIRM"
        };

        $rootScope.$broadcast("ShowModal", configHandler);
    };

    $scope.NovoCliente = function () {
        $('.dropdown', document).click();
        $('#registro-modal').modal('toggle');
    };

    //Evento 
    $scope.$on("ClienteEntrou", function ($event, $request) {
        $scope.ClienteEntrou($request);
    });

    IniciarController();
}]);