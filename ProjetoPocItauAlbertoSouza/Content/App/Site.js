function IniciarController() {
    RecarregaValidacoes();
    SetHoverDropdown();
    TratarEstilos();
}

function TratarEstilos() {
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
        //,
        //jsonReader: {
        //    root: function (obj) { return obj.d.rows; },
        //    page: function (obj) { return obj.d.page; },
        //    total: function (obj) { return obj.d.total; },
        //    records: function (obj) { return obj.d.rows.length; },
        //    repeatitems: false
        //}
    });

}

function Excluir_Carrinho(id) {
    $('#produtoCtrl_IdProduto').val(id);
    $('#produtoCtrl_IdProduto').trigger('change');
    $('#produtoCtrl_Excluir').click();
}

function Editar_Carrinho(id) {
    $('#produtoCtrl_IdProduto').val(id);
    $('#produtoCtrl_IdProduto').trigger('change');
    $('#produtoCtrl_Editar').click();
}

function RecarregaValidacoes() {
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
