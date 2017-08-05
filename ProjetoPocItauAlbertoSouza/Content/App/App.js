angular.module('pocApp', []).run(['$rootScope', function ($rootScope) {

    $rootScope.defaulErrorCallback = function ($err)
    {
        $('.dropdown', document).click();

        var TituloModal = "Erro interno";
        var MensagemModal = "Erro inesperado";
        var Tipo = "ERROR";

        if ($err["statusText"]) {
            TituloModal = $err["statusText"];
            if ($err.data["ExceptionMessage"]) {
                //Potencial erro no core
                MensagemModal = $err.data["ExceptionMessage"];
            } else if ($err.data["Message"]) {
                //Potencial erro mapeado em badRequest
                MensagemModal = $err.data["Message"];
            }
        }
        var configHandler = {
            TituloModal: TituloModal,
            MensagemModal: MensagemModal,
            OK: function () {
                $(".modal-backdrop").remove();
                $("#pocModal").modal('hide');
            },
            Tipo: Tipo
        };
        $rootScope.$broadcast("ShowModal", configHandler);
    };
}])