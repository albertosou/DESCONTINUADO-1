angular.module('pocApp').controller('mainCtrl', ['$scope', function ($scope) {

    $scope.controllerName = "mainCtrl";
    $scope.Config = {
        OK: function () {
            console.log("Sem Ação");
            $("#pocModal").modal('hide');
            },
        TituloModal: "TODO: Titulo da Janela",
        MensagemModal: "TODO: Mensagem da Janela",
        Tipo: "ALERTA" //"SUCESSO,ERRO"
    };


    $scope.showModal = function () {
        $("#pocModal").modal('show');
    };

    //Eventos do controller
    $scope.$on("ShowModal", function ($event, $configHandler) {
        $scope.Config = $configHandler;
        $scope.showModal();
    });

    IniciarController();

}]);