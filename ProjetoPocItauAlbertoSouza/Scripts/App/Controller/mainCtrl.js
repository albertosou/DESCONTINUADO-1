angular.module('pocApp').controller('mainCtrl', ['$scope', function ($scope) {

    $scope.controllerName = "mainCtrl";
    $scope.Config = {
        OK: function () { console.log("Sem Ação"); },
        TituloModal: "TODO: Titulo da Janela",
        MensagemModal: "TODO: Mensagem da Janela",
        Tipo: "ALERTA" //"SUCESSO,ERRO"
    };

    $scope.$on("ShowModal", function ($event, $configHandler) {
        $scope.Config = $configHandler;
        $scope.showModal();
    });

    $scope.showModal = function () {
        $("#pocModal").modal();
    };

}]);