angular.module('pocApp').controller('carroLojaCtrl', ['$scope', '$rootScope', 'produtoService', 'carrinhoService', 'pedidoService', function ($scope, $rootScope, produtoService, carrinhoService, pedidoService) {
    $scope.controllerName = "carroLojaCtrl";
    $scope.CarrinhoModificado = false;
    $scope.Carrinho = [];
    $scope.IdCarrinho = 0;
    $scope.IdUsuario = 0;
    $scope.Chave = null;

    $scope.ConcluirPedido = function () {

        var configHandler = {
            TituloModal: "Confirmação de conclusão",
            MensagemModal: "Tem certeza que concluir seu pedido?",
            Sim: function () {
                $(".modal-backdrop").remove();
                $("#pocModal").modal('hide');
                var model = { IdCarrinho: $scope.IdCarrinho, IdUsuario: $scope.IdUsuario };
                pedidoService.Concluir(model, function () {
                    $scope.Carrinho = [];
                    $scope.IdCarrinho = 0;
                    $scope.Chave = null;
                    $rootScope.$broadcast("AtualizarPesquisa");
                    $rootScope.$broadcast("NovoCarrinho", []);
                    $('.modal-carrinho').modal('toggle');
                });
            },
            Nao: function () { },
            Tipo: "CONFIRM"
        };

        $rootScope.$broadcast("ShowModal", configHandler);
    }

    $scope.AbrirCarrinho = function Carrinho() {

        var model = { IdCarrinho: $scope.IdCarrinho, IdUsuario: $scope.IdUsuario, Chave: $scope.Chave };

        carrinhoService.Consultar(model, function (data) {
            $scope.Carrinho = data.data;

            if ($scope.Carrinho.length > 0) {
                $scope.IdCarrinho = data.data[0].IdCarrinho;
                $scope.IdUsuario = data.data[0].IdUsuario;
                $scope.Chave = data.data[0].Chave;
            } else {
                $scope.Chave = '';
                $scope.IdCarrinho = 0;
            }

            $scope.CarrinhoModificado = false;
            //$scope.$apply();
            $rootScope.$broadcast("NovoCarrinho", data.data);
        });

        $('.modal-carrinho').modal('show');
    };

    $scope.ValorTotal = function () {
        
        if ($scope.Carrinho.length === 0) {
            return "R$ 0,00";
        } else {
            var ttl = 0.0000000001;
            $.map($scope.Carrinho, function (pr) {
                ttl += pr.Quantidade * pr.Valor;
            });
            if ($scope.CarrinhoModificado == false) {
                var str = new String(ttl);
                return 'R$' + str.split('.')[0]+','+str.split('.')[1].substr(0, 2);
            } else {
                return "Pendente! Recalcular.";
            }
        }

    }

    $scope.AtualizarCarrinho = function () {

        if ($scope.CarrinhoModificado === true) {

            var model = { IdCarrinho: $scope.IdCarrinho, IdUsuario: $scope.IdUsuario, Chave: $scope.Chave };
            var modelList = $.map($scope.Carrinho, function (el) { return { IdUsuario: $scope.IdUsuario, Chave: '', IdProduto: el.IdProduto, Quantidade: el.Quantidade }; });
            $scope.IdCarrinho = 0;
            $scope.Carrinho = [];

            //Remove todo carrinho anterior
            carrinhoService.Excluir(model, function ($data41325431) { 
                carrinhoService.Incluir(modelList, function ($data23214532) {
                    $scope.Carrinho = $data23214532.data;

                    if ($scope.Carrinho.length > 0) {
                        $scope.IdCarrinho = $data23214532.data[0].IdCarrinho;
                        $scope.IdUsuario = $data23214532.data[0].IdUsuario;
                        $scope.Chave = $data23214532.data[0].Chave;
                    } else {
                        $scope.IdCarrinho = 0;
                        $scope.Chave = "";
                    }

                    $scope.CarrinhoModificado = false;
                    //$scope.$apply();
                    $rootScope.$broadcast("NovoCarrinho", $data23214532.data);
                    $rootScope.$broadcast("AtualizarPesquisa");
                });
            });
        } else {
            var model = { IdCarrinho: $scope.IdCarrinho, IdUsuario: $scope.IdUsuario, Chave: $scope.Chave };

            carrinhoService.Consultar(model, function ($data53425322) {
                $scope.Carrinho = $data53425322.data;
                $scope.IdCarrinho = $data53425322.data[0].IdCarrinho;
                $scope.IdUsuario = $data53425322.data[0].IdUsuario;
                $scope.Chave = $data53425322.data[0].Chave;
                $scope.CarrinhoModificado = false;
                //$scope.$apply();
                $rootScope.$broadcast("NovoCarrinho", $data53425322.data);
            });
        }
    };

    $scope.errorCallback = function ($err) {

        $rootScope.$broadcast("AtualizarPesquisa", $err);

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

    //Eventos do controller
    $scope.$on("Comprar", function ($event, $dados) {

        produtoService.Consultar({ IdProduto: $dados.IdProduto }, function ($dado2) {
            if ($dado2.data[0].Disponiveis >= 1) {
                var model = { IdProduto: $dado2.data[0].IdProduto, Chave: $scope.Chave, IdUsuario: $scope.IdUsuario, Quantidade: 1 };
                carrinhoService.Incluir([model], function ($dado37876452) {
                    $scope.Carrinho = $dado37876452.data;
                    $scope.IdCarrinho = $dado37876452.data[0].IdCarrinho;
                    $scope.IdUsuario = $dado37876452.data[0].IdUsuario;
                    $scope.Chave = $dado37876452.data[0].Chave;
                    $scope.CarrinhoModificado = false;
                    //$scope.$apply();
                    $rootScope.$broadcast("NovoCarrinho", $dado37876452.data);
                    $('.modal-carrinho').modal('show');
                });
            }
        });
    });

    //Eventos do controller
    $scope.$on("AdicionarItemCarrinho", function ($event, $dados) {

        $scope.AdicionarItemCarrinho($dados)

    });

    $scope.AdicionarItemCarrinho = function ($dados) {
        produtoService.Consultar({ IdProduto: $dados.IdProduto }, function ($dado9655232) {
            if ($dado9655232.data[0].Disponiveis >= 1) {
                var model = { IdProduto: $dado9655232.data[0].IdProduto, Chave: $scope.Chave, IdUsuario: $scope.IdUsuario, Quantidade: 1 };

                carrinhoService.Incluir([model], function ($dado06383563) {
                    $scope.Carrinho = $dado06383563.data;
                    $scope.IdCarrinho = $dado06383563.data[0].IdCarrinho;
                    $scope.IdUsuario = $dado06383563.data[0].IdUsuario;
                    $scope.Chave = $dado06383563.data[0].Chave;
                    $scope.CarrinhoModificado = false;
                    //$scope.$apply();
                    $rootScope.$broadcast("NovoCarrinho", $dado06383563.data);
                });
            } else {
                $rootScope.$broadcast("AtualizarPesquisa");
            }
        });
    };

    $scope.Remover = function ($dados) {

        var model = { IdProduto: $dados.IdProduto, IdCarrinho: $scope.IdCarrinho, Chave: $scope.Chave, IdUsuario: $scope.IdUsuario };

        carrinhoService.Excluir(model, function ($dado4256202) {
            $scope.Carrinho = $dado4256202.data;
            if ($scope.Carrinho.length > 0) {
                $scope.IdCarrinho = $dado4256202.data[0].IdCarrinho;
                $scope.IdUsuario = $dado4256202.data[0].IdUsuario;
                $scope.Chave = $dado4256202.data[0].Chave;
            } else {
                $scope.IdCarrinho = 0;
                $scope.Chave = "";
            }
            $scope.CarrinhoModificado = false;
            //$scope.$apply();
            $rootScope.$broadcast("NovoCarrinho", $dado4256202.data);
            $rootScope.$broadcast("AtualizarPesquisa");
        });

    };

    //Eventos do controller
    $scope.$on("ClienteEntrou", function ($event, $dados) {

        if ($dados.IdUsuario) {
            $scope.usuario = $dados.IdUsuario;
        } else if ($dados.data.IdUsuario) {
            $scope.usuario = $dados.data.IdUsuario;
        }
        if ($scope.usuario) {
            if ($scope.IdUsuario === $scope.usuario) {
                console.log("Cliente já logado");
            }
            else if ($scope.Carrinho.length > 0) {
                var model = { IdCarrinho: $scope.IdCarrinho, IdUsuario: $scope.IdUsuario, Chave: $scope.Chave };
                var modelList = $.map($scope.Carrinho, function (el) { return { IdUsuario: $scope.usuario, Chave: '', IdProduto: el.IdProduto, Quantidade: el.Quantidade }; });

                $dados.IdUsuario = $scope.usuario;
                delete $scope.usuario;
                $scope.IdCarrinho = 0;
                $scope.Carrinho = [];

                //Remove todo carrinho anterior
                carrinhoService.Excluir(model, function ($data41325431) {
                    carrinhoService.Incluir(modelList, function ($data23214532) {
                        $scope.Carrinho = $data23214532.data;

                        if ($scope.Carrinho.length > 0) {
                            $scope.IdCarrinho = $data23214532.data[0].IdCarrinho;
                            $scope.IdUsuario = $data23214532.data[0].IdUsuario;
                            $scope.Chave = $data23214532.data[0].Chave;
                        } else {
                            $scope.IdCarrinho = 0;
                            $scope.Chave = "";
                        }

                        $scope.CarrinhoModificado = false;
                        //$scope.$apply();
                        $rootScope.$broadcast("NovoCarrinho", $data23214532.data);
                        $rootScope.$broadcast("AtualizarPesquisa");
                    });
                });

            } else {
                var model = { IdCarrinho: $scope.IdCarrinho, IdUsuario: $scope.usuario, Chave: $scope.Chave };

                delete $scope.usuario;

                carrinhoService.Consultar(model, function ($data6581432) {
                    $scope.Carrinho = $data6581432.data;
                    if ($scope.Carrinho.length > 0) {
                        $scope.IdCarrinho = $data6581432.data[0].IdCarrinho;
                        $scope.IdUsuario = $data6581432.data[0].IdUsuario;
                        $scope.Chave = $data6581432.data[0].Chave;
                    } else {
                        $scope.IdCarrinho = 0;
                        $scope.Chave = "";
                    }
                    $rootScope.$broadcast("NovoCarrinho", $data6581432.data);
                    $rootScope.$broadcast("AtualizarPesquisa");
                    $scope.CarrinhoModificado = false;
                });
            }
        }

        $scope.CarrinhoModificado = false;
        //$scope.$apply();
    });

    //Eventos do controller
    $scope.$on("AbrirCarrinho", function ($event, $dados) {
        $scope.CarrinhoModificado = false;
        $scope.AbrirCarrinho();
        //$scope.$apply();
    });

    IniciarController();
}]);