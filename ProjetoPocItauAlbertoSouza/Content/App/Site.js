function IniciarController() {
    RecarregaValidacoes();
    SetHoverDropdown();
    TratarEstilos();
    TrataEventoLoja();
}
function TrataEventoLoja() {
    $('#ver_list').click(function (event) {
        event.preventDefault();
        $('#products .item').addClass('list-group-item');
        $('.custom-product-list-partial').addClass('col-md-6');
        $('.custom-product-list-partial').removeClass('col-md-12');
    });
    $('#ver_grid').click(function (event) {
        event.preventDefault();
        $('#products .item').removeClass('list-group-item');
        $('#products .item').addClass('grid-group-item');
        $('.custom-product-list-partial').addClass('col-md-12');
        $('.custom-product-list-partial').removeClass('col-md-6');
    });

};
function AnimacaoCarrinho(sender) {
    var options = { to: "#carrinho", className: "ui-effects-transfer" };
    $(sender).parents('.thumbnail').effect('transfer', options, 700);
}
    
function TratarEstilos() {

    $.jgrid.no_legacy_api = true;
    $.jgrid.defaults.width = 780;
    $.jgrid.defaults.responsive = true;
    $.jgrid.defaults.styleUI = 'Bootstrap';

    $.extend($.jgrid.defaults, {
        ajaxGridOptions: {
            contentType: 'application/json;',
            type: "GET",
            cache: false,
            beforeSend: function () {
                $(".loading").show();
            }
        },
        serializeGridData: function (postData) {
            return JSON.stringify(postData);
        },
        datatype: 'json',
        gridComplete: function () {
            $(".loading").hide();
        }
    });

}

//function Carrinho() {
//    $('.modal-carrinho').modal('toggle');
//}

function Do_ChangeAndClick(i, v, a) {
    $(i).val(v);
    $(i).trigger('change');
    $(a).click();
}

function Excluir_Item(id) {
    $('#produtoCtrl_IdProduto').val(id);
    $('#produtoCtrl_IdProduto').trigger('change');
    $('#produtoCtrl_Excluir').click();
}

function Editar_Item(id) {
    $('#produtoCtrl_IdProduto').val(id);
    $('#produtoCtrl_IdProduto').trigger('change');
    $('#produtoCtrl_Editar').click();
}

function RecarregaValidacoes() {

    $('#form-carrinho').validate({
        onkeyup: false,
        focusCleanup: true
    });



    //jQuery.validator.setDefaults({
    //    debug: true,
    //    success: "valid"
    //});
    //$("#cadastro-usuario").validate({
    //    rules: {
    //        password: "*",
    //        password_confirm: {
    //            equalTo: "#password"

    //        }
    //    }
    //});
}

function SetHoverDropdown() {
    //$(".dropdown").hover(
    //    function () {
    //        $('.dropdown-menu', this).stop(true, true).fadeIn("fast");
    //        $(this).toggleClass('open');
    //    },
    //    function () {
    //        $('.dropdown-menu', this).stop(true, true).fadeOut("fast");
    //        $(this).toggleClass('open');
    //    });
}
