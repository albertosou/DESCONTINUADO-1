angular.module('pocApp').controller('produtoCtrl', ['$scope', '$rootScope', 'produtoService', 'imagemService', function ($scope, $rootScope, produtoService, imagemService) {
    $scope.controllerName = "produtoCtrl";
    $scope.IdProduto = 0;

    $scope.$on("AdminEntrou", function ($event, $request) {
        $scope.IdUsuario = $request.IdUsuario;
    });

    $scope.PesquisarImagem = function (model) {
        if (model) {
            //Quando paginação
            if (model.photo) {
                delete model.photo;
            }
            if (model.photos) {
                delete model.photos;
            }
            if (model.total) {
                delete model.total;
            }

        } else {
            model = { text: $scope.TextoPesquisa };
        }

        imagemService.Pesquisar(model, function ($data) {

            try {
                $('.slider-flickr').slick('unslick');
                $('.slider-flickr').html(null);
                $('body').off('beforeChange', '.slider-flickr');
                $('body').off('afterChange', '.slider-flickr');
                $('body').off('dblclick', '.slider-flickr');
            } catch (ex) {
                console.log(ex);
            }

            $.each($data.photo, function (index, value) {
                $('.slider-flickr').append('<div class="" ><img src="' + value.url + '" class=""/></div>');
            });

            var initialSlide = 0;
            if (model.navegacao === "r") {
                initialSlide = $data.photo.length - 1;
            }
            $scope.Url = $data.photo[initialSlide].url;

            $('.slider-flickr').slick({
                dots: true,
                infinite: true,
                speed: 500,
                fade: true,
                rtl: false,
                initialSlide: initialSlide,
                cssEase: 'linear'
            });

            $('body').on('afterChange', '.slider-flickr', function (slick, currentSlide) {
                $scope.Url = $("div.slick-slide.slick-current.slick-active img").prop('src');
                $scope.$apply();
            });

            $('body').on('dblclick', '.slider-flickr', function () {
                $('.slider-flickr').slick('unslick');
                $('.slider-flickr').html(null);
            });

            $('body').on('beforeChange', '.slider-flickr', function (event, slick, currentSlide, nextSlide) {

                if ((nextSlide + 1) < currentSlide) {
                    if (model.page < model.pages) {
                        console.log({ 'on': 'beforeChange:avançar', 'event___': event, 'slick___': model, 'currentSlide____': currentSlide, 'nextSlide____': nextSlide, 'scope____': $scope });
                        model.navegacao = "a";
                        model.page++;
                        $scope.PesquisarImagem(model);
                    }
                } else if (nextSlide > (currentSlide + 1)) {
                    if (model.page > 1) {
                        event.stopPropagation();
                        model.navegacao = "r";
                        console.log({ 'on': 'beforeChange:retroceder', 'event___': event, 'slick___': model, 'currentSlide____': currentSlide, 'nextSlide____': nextSlide, 'scope____': $scope });
                        model.page--;
                        $scope.PesquisarImagem(model);
                    }
                }
            });
        });
    };
    $scope.Atualizar = function () {
        $("#jqGrid").trigger('reloadGrid');
    };
    $scope.Novo = function () {

        try {
            $('.slider-flickr').slick('unslick');
        } catch (err) { }
        try {
            $('.slider-flickr').html(null);
        } catch (err) { }

        $scope.IdProduto = '';
        $scope.TextoPesquisa = '';
        $scope.Nome = '';
        $scope.Estoque = '';
        $scope.Valor = '';
        $scope.Descricao = '';
        $scope.Url = '';

        $("#registro-produto-modal").modal('show');
    };
    $scope.Editar = function () {

        try {
            $('.slider-flickr').slick('unslick');
        } catch (err) { }

        try {
            $('.slider-flickr').html(null);
        } catch (err) { }

        var data = $("#jqGrid").jqGrid('getRowData', $scope.IdProduto);

        $scope.TextoPesquisa = '';
        $scope.Nome = data.Nome;
        $scope.Estoque = parseInt(data.Estoque);
        $scope.Url = data.Url;
        $scope.Valor = parseFloat(data.Valor);
        $scope.Descricao = data.Descricao;

        $("#registro-produto-modal").modal('show');
    };
    $scope.Salvar = function () {

        var model = {
            IdProduto: $scope.IdProduto,
            IdUsuario: $scope.IdUsuario,
            Nome: $scope.Nome,
            Estoque: $scope.Estoque,
            Valor: $scope.Valor,
            Descricao: $scope.Descricao,
            Url: $scope.Url
        };

        if ($scope.IdProduto && parseInt($scope.IdProduto) !== 0) {
            produtoService.Alterar(model, function () {
                $("#jqGrid").trigger('reloadGrid');
                $(".modal-backdrop").remove();
                $("#pocModal").modal('hide');
            });
        } else {
            produtoService.Incluir(model, function () {
                $("#jqGrid").trigger('reloadGrid');
                $(".modal-backdrop").remove();
                $("#pocModal").modal('hide');
            });
        }

        $("#registro-produto-modal").modal('hide');
    };
    $scope.Excluir = function () {

        var configHandler = {
            TituloModal: "Confirmação de exclusão",
            MensagemModal: "Tem certeza que deseja excluir?",
            Sim: function () {
                $(".modal-backdrop").remove();
                $("#pocModal").modal('hide');
                var model = { IdProduto: $scope.IdProduto, IdUsuario: $scope.IdUsuario };
                produtoService.Excluir(model, function () {
                    $("#jqGrid").trigger('reloadGrid');
                });
            },
            Nao: function () { },
            Tipo: "CONFIRM"
        };

        $rootScope.$broadcast("ShowModal", configHandler);
    };
    $scope.Load = function () {

        if ($scope.jqGridBaseHtml) {
            $("#jqgrid_container").html(null);
            $("#jqgrid_container").html($scope.jqGridBaseHtml);
        } else {
            $scope.jqGridBaseHtml = $("#jqgrid_container").html();
        }

        var campo = '';
        if ($scope.Produto) {
            campo = '/' + $scope.Produto;
        }

        function formatterMap(cellvalue, options, rowObject) {
            $scope.gridData.push(rowObject);
            var code = ' ';
            code += '<a href="javascript:Editar_Item(' + rowObject.IdProduto + ')"><span class="glyphicon glyphicon-pencil"></span></a> ';
            code += '<a href="javascript:Excluir_Item(' + rowObject.IdProduto + ')"><span class="glyphicon glyphicon-trash"></span></a>';
            return code;
        }


        $("#jqGrid").jqGrid({
            url: 'api/Produto' + campo,
            mtype: "GET",
            beforeProcessing: function (data) {
                return data;
            },
            dataType: "json",
            autowidth: true,
            colNames: ["", "Nome", "Estoque", "Valor", "", "", "", ""],
            colModel: [
                { name: 'Id_Acoes', width: 35, formatter: formatterMap },
                { name: 'Nome', width: 150 },
                { name: 'Estoque', width: 150 },
                { name: 'Valor', width: 150 },
                { name: 'IdProduto', key: true, hidden: true, viewable: true },
                { name: 'Url', hidden: true, viewable: true },
                { name: 'Descricao', hidden: true, viewable: true },
                { name: 'Disponiveis', hidden: true, viewable: true }
            ],
            beforeRequest: function () { $scope.gridData = []; },
            gridComplete: function () {
                //$(document).data("gridData", $scope.gridData);
            },
            loadonce: true,
            height: 250,
            rowNum: 8,
            subGrid: true, // set the subGrid property to true to show expand buttons for each row
            subGridRowExpanded: showChildGrid, // javascript function that will take care of showing the child grid
            pager: "#jqGridPager"
        });

        function showChildGrid(parentRowID, parentRowKey) {
            var data = $("#jqGrid").jqGrid('getRowData', parentRowKey);

            $.ajax({
                url: "/BackEnd/Produto/" + parentRowKey,
                type: "GET",
                success: function (html) {
                    $("#" + parentRowID).append(html);
                }
            });
        }

        IniciarController();
    };
}]);