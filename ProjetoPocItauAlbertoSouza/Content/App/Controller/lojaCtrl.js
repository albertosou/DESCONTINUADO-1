angular.module('pocApp').controller('lojaCtrl', ['$scope', '$rootScope', 'produtoService', 'imagemService', function ($scope, $rootScope, produtoService, imagemService) {
    $scope.controllerName = "lojaCtrl";

    $scope.Pesquisar = function () {
        var model = { IdProduto: 0, IdUsuario: 0, Nome: $scope.TextoPesquisa };
        produtoService.Consultar(model, function ($data) {
            $scope.Produtos = $data.data;
        });
    };
    $scope.reverse = false;
    $scope.propertyName = 'Id';

    $scope.sortBy = function (property) {
        $scope.reverse = ($scope.propertyName === property) ? !$scope.reverse : false;
        $scope.propertyName = property;
    };

    $scope.AdicionarCarrinho = function (item) {
        $rootScope.$broadcast("AdicionarItemCarrinho", item);
    };
    $scope.Comprar = function (item) {
        $rootScope.$broadcast("Comprar", item);
    };

    $scope.AbrirCarrinho = function () {
        $rootScope.$broadcast("AbrirCarrinho", []);
    };

    //Evento 
    $scope.$on("AtualizarPesquisa", function ($event, $request) {
        $scope.Pesquisar();
    });

    $scope.$on("NovoCarrinho", function ($event, $dados) {
        if ($dados && $dados.length > 0) {
            var totalItens = 0;
            for (var it in $dados) {
                totalItens += parseInt($dados[it].Quantidade);
            }
            $scope.TotalItensCarrinho = '[' + totalItens + ']';
        } else {
            $scope.TotalItensCarrinho = '';
        }
    });

    IniciarController();
}]);