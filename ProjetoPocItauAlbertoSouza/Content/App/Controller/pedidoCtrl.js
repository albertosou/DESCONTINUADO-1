angular.module('pocApp').controller('pedidoCtrl', ['$scope', '$rootScope', 'produtoService', 'pedidoService', function ($scope, $rootScope, produtoService, pedidoService) {
    $scope.controllerName = "pedidoCtrl";
    $scope.IdUsuario = 0;
    $scope.Transacoes = [];

    $scope.Init = function () {
        pedidoService.Consultar({ IdUsuario: $scope.IdUsuario }, function ($data4123414) {
            //Soluçao para agrupamento de objetos
            var gp = $.map($data4123414.data, function (v) {
                return { IdPedido: v.IdPedido, Status: v.Status, Legenda: v.IdPedido + ' @ ' + v.Status + ' (' + v.ValorTransacao + ') ', ValorTransacao: v.ValorTransacao, Carrinho: [v] };
            });
            $scope.Transacoes = [];
            for (var index in gp) {
                var tr;
                if (tr = $scope.Transacoes.find(function (c) { return c.IdPedido === gp[index].IdPedido; })) {
                    tr.Carrinho.push(gp[index].Carrinho[0]);
                } else {
                    $scope.Transacoes.push(gp[index]);
                }
            }
        });
    }

    $scope.AtualizarStatus = function ($data14123617) {
        pedidoService.Atualizar({ IdPedido: $data14123617.IdPedido, Status: $data14123617.Status }, function ($data4123414) {
            $scope.Init();
        });
    };

    $scope.FormataMoeda = function (v) {
        if (v === 0) {
            return "R$ 0,00";
        } else {
            var str = new String(v);
            return 'R$' + str.split('.')[0] + ',' + str.split('.')[1].substr(0, 2);
        }
    };

    $rootScope.$on("ClienteEntrou", function ($event, $dados) {
        if ($dados.IdUsuario) {
            $scope.IdUsuario = $dados.IdUsuario;
        } else if ($dados.data.IdUsuario) {
            $scope.IdUsuario = $dados.data.IdUsuario;
        }
        if ($scope.IdUsuario) {
            $scope.Init();
        }
    });
    IniciarController();
}]);