$(function () {

    var Id = $("#filter").val();
    var MenuId = $("#MenuId").val();
    //var RoleId = $("#RoleId").val();
    $("#filter").change(function () {
        var Id = $(this).val();
        // List Menus
        $.get("/Menus/GetMenuItemForManage", { "MenuId": MenuId, "RoleId": Id }, function (rs) {

            $("#ShowRoleMenu").html('<img src="/img/Loading/Ajax-Loading.gif" width="100"> กำลังโหลด');
            setTimeout(function () {
                $("#ShowRoleMenu").replaceWith(rs);
                Datatable();
                
                $("#Permissionform").on("change", "#checkAll", function () {
                    $("input:checkbox").prop('checked', $(this).prop("checked"));
                });
                            // Edit
                $("#Permissionform").on("click", "#submit", function () {
                    var RoleId = $("#RoleId").val();
                    var servicesCheckboxes = new Array();
                    $("input:checked").each(function () {
                        servicesCheckboxes.push($(this).val());
                    });
                    $.post("AddPermission", { "MenuItemId": servicesCheckboxes, "RoleId": RoleId, "MenuId": MenuId }, function (response) {
                        if (response.valid == true) {
                            $.smallBox({
                                title: response.message,
                                content: "<i class='fa fa-clock-o'></i> <i>" + response.message + "</i>",
                                color: "#296191", // red color code #FB0404
                                iconSmall: "fa fa-thumbs-up bounce animated",
                                timeout: 2000
                            });
                            setTimeout(function () {
                                window.location.href = "/Menus/ManageRoleMenu?MenuId=" + response.type;
                            }, 1000)
                        } else {
                            $.smallBox({
                                title: response.message,
                                content: "<i class='fa fa-clock-o'></i> <i>" + response.message + "</i>",
                                color: "#FB0404", // red color code #FB0404
                                iconSmall: "fa fa-thumbs-up bounce animated",
                                timeout: 2000
                            });
                            setTimeout(function () {
                                window.location.href = "/Menus/ManageRoleMenu?MenuId=" + response.type;
                            }, 1000)
                        }
                     })
                });
            }, 100)
        });
    });

    $("#filter").val(Id).change();
    $("#filter").select2();
    
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

        $('#td_rolemenu').dataTable({
            "ordering" :false,
            "lengthMenu": [[1000],["All"]],
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
                    responsiveHelper_dt_basic = new ResponsiveDatatablesHelper($('#td_rolemenu'), breakpointDefinition);
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