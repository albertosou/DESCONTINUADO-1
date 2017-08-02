angular.module('pocApp').controller('loginLojaCtrl', ['$scope', '$rootScope', 'usuarioService', function ($scope, $rootScope, usuarioService) {

    $scope.controllerName = "loginLojaCtrl";
    $scope.nomeUsuario = "Alberto";
    $scope.nomeUsuarioDeslogado = "Entrar";
    $scope.usuarioLogado = false;
    $scope.Login = function () {
        var model = {
            email: $scope.email,
            senha: $scope.senha
        };
        usuarioService.Login(model, function ($result) {
            console.log($result);

            $scope.senha = null;
            $scope.email = null;


            $('.dropdown', document).click();
            $scope.usuarioLogado = true;

        }, function (ex) {
            console.log(ex);
        });
    };
    $scope.Logoff = function ($event) {

        $('.dropdown', document).click();

        var configHandler = {
            TituloModal: "Deslogar da Loja",
            MensagemModal: "Tem certeza que deseja sair?",
            OK: function () {
                $scope.usuarioLogado = false;
            },

            Tipo: "CONFIRM"
        };

        $rootScope.$broadcast("ShowModal", configHandler);
    };

    $scope.NovoCliente = function () {
        $('.dropdown', document).click();
        $("#registro-modal").modal();
    };

    SetHoverDropdown();
}]);