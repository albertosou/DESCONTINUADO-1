angular.module('pocApp', []).run(['$rootScope', function ($rootScope) {

    $rootScope.defaulErrorCallback = function ($err) {
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
}]).directive('addProduct', function ($compile) {
    return {
        restrict: 'EAC',
        transclude: true,
        scope: {
            infoMaxValue: '@infoMaxValue',
            model: '=ngModel'
        },
        //require: ['^^infoMaxValue', 'ngModel'],
        template:
            '<div class="input-group spinner">' +
            '    <input type="number" class="form-control" ng-model="model" ng-blur="consistir()" />' +
            '    <div class="input-group-btn-vertical">' +
            '        <button class="btn btn-default" type="button" ng-click="adicionar()" ng-disabled="model == infoMaxValue"><i class="fa fa-caret-up" ></i></button>' +
            '        <button class="btn btn-default" type="button" ng-click="subtrair()"  ng-disabled="model == 0"><i class="fa fa-caret-down" ></i></button>' +
            '    </div>' +
            '</div>',
        link: function (scope, element, attributes) {

            scope.$watch('ng-model', function (nVal, oVal) {
                if (nVal !== oVal) {
                    scope.$parent.$parent.CarrinhoModificado = true;
                }
            });

            if (scope.infoMaxValue === undefined) {
                scope.infoMaxValue = 999999999999;
            }

            scope.subtrair = function () {
                if (scope.model > 0)
                    scope.model--;
                if (scope.model === undefined)
                    scope.model = 0;
            };

            scope.adicionar = function () {
                if (scope.infoMaxValue !== undefined) {
                    if (scope.model < scope.infoMaxValue)
                        scope.model++;
                    if (scope.model === undefined)
                        scope.model = 1;
                }
            };

            scope.consistir = function () {
                if (scope.model > scope.infoMaxValue)
                    scope.model = scope.infoMaxValue;
                if (scope.model <= 0)
                    scope.model = 0;
                if (scope.model === undefined) {
                    scope.model = scope.infoMaxValue;
                }
            }
        }
    }
})