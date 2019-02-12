$(function () {

    // List Menus
    $.get("/Menus/GetMenuForManage", { "Menus": "Menus" }, function (rs) {
        $("#ShowMenus").html('<img src="/img/Loading/Ajax-Loading.gif" width="100"> กำลังโหลด');
        setTimeout(function () {
            $("#ShowMenus").html(rs);
            Datatable();

            // Manage Sub Menu
            $("#ShowMenus").on("click", ".manage", function () {
                var MenuId = $(this).val();
                window.location.href = "/Menus/ManageRoleMenu?MenuId=" + MenuId;
            });

        }, 100)
    });



    //$.get("/UsersManagement/Get", { "UserId": "4be80ba6-e8f7-445f-b9c4-3ae5cfaaf5f5" }, function (RS) {
    //    $("#Json").html(RS);
    //})









    function Datatable() {
        /* User List using datatable ;*/
        var responsiveHelper_dt_basic = undefined;
        var responsiveHelper_datatable_fixed_column = undefined;
        var responsiveHelper_datatable_col_reorder = undefined;
        var responsiveHelper_datatable_tabletools = undefined;

        var breakpointDefinition = {
            tablet: 1024,
            phone: 480
        };

        $('#td_menus').dataTable({
            "sDom": "<'dt-toolbar'<'col-xs-12 col-sm-6'f><'col-sm-6 col-xs-12 hidden-xs'l>r>" +
                "t" +
                "<'dt-toolbar-footer'<'col-sm-6 col-xs-12 hidden-xs'i><'col-xs-12 col-sm-6'p>>",
            "autoWidth": true,
            "oLanguage": {
                "sSearch": '<span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span>'
            },
            "preDrawCallback": function () {
                // Initialize the responsive datatables helper once.
                if (!responsiveHelper_dt_basic) {
                    responsiveHelper_dt_basic = new ResponsiveDatatablesHelper($('#td_menus'), breakpointDefinition);
                }
            },
            "rowCallback": function (nRow) {
                responsiveHelper_dt_basic.createExpandIcon(nRow);
            },
            "drawCallback": function (oSettings) {
                responsiveHelper_dt_basic.respond();
            }
        });
        /* End User List */
    }
    


});