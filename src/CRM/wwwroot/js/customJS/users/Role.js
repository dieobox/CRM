$(function () { 

    // List Roles
    $.get("/UsersManagement/GetRoles", function (returnTable) {
        $("#showRole").html('<img src="/img/Loading/Ajax-Loading.gif" width="100"> กำลังโหลด');
        setTimeout(function () {

            $("#showRole").html(returnTable);

            Datatable();

            // Edit Role
            $("#showRole").on("click", ".edit", function () {
                var value = $(this).val();
                $.get("/UsersManagement/FormEditRole", { "RoleId": value }, function (returnForm) {
                    $("#MomdalFormEditRole").html(returnForm);
                    $("#ButtonEditRole").modal("show");

                    //Validate Form
                    $('#FormEditRole').bootstrapValidator();
                    $("#submit").click(function () {
                        $('#FormEditRole').data("bootstrapValidator").validate();
                        if ($('#FormEditRole').data("bootstrapValidator").isValid() == true) {
                            var Data = new FormData($("#FormEditRole")[0]);
                            $.ajax(
                            {
                                type: "POST",
                                url: "/UsersManagement/EditRole",
                                contentType: false,
                                processData: false,
                                data: Data,
                                success: function (response) {
                                    if (response.valid == true) {
                                        $.smallBox({
                                            title: response.message,
                                            content: "<i class='fa fa-clock-o'></i> <i>" + response.message + "</i>",
                                            color: "#296191", // red color code #FB0404
                                            iconSmall: "fa fa-thumbs-up bounce animated",
                                            timeout: 2000
                                        });
                                        setTimeout(function () {
                                            window.location.href = "/UsersManagement/Roles";
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
                                            window.location.href = "/UsersManagement/Roles";
                                        }, 1000)
                                    }
                                }
                            })
                        }
                    })

                })
            })

            // Delete Role
            $("#showRole").on("click", ".delete", function () {
                var value = $(this).val();
                $.SmartMessageBox({
                    title: "คำเตือน!",
                    content: "ต้องการลบรายการนี้หรือไม่?",
                    buttons: '[ไม่][ใช้]'
                }, function (ButtonPressed) {
                    if (ButtonPressed == "ใช้") {
                        $.get("/UsersManagement/DeleteRole", { "RoleId": value }, function (response) {
                            if (response.valid == true) {
                                $.smallBox({
                                    title: response.message,
                                    content: "<i class='fa fa-clock-o'></i> <i>2 seconds ago...</i>",
                                    color: "#296191", // red color code #FB0404
                                    iconSmall: "fa fa-thumbs-up bounce animated",
                                    timeout: 1000
                                });
                                setTimeout(function () {
                                    window.location.href = "/UsersManagement/Roles";
                                }, 1000)
                            } else {
                                $.smallBox({
                                    title: response.message,
                                    content: "<i class='fa fa-clock-o'></i> <i>2 seconds ago...</i>",
                                    color: "#FB0404", // red color code #FB0404
                                    iconSmall: "fa fa-thumbs-up bounce animated",
                                    timeout: 1000
                                });
                                setTimeout(function () {
                                    window.location.href = "/UsersManagement/Roles";
                                }, 1000)
                            }
                        })
                    }
                    if (ButtonPressed == "ไม่") {

                    }
                });
                e.preventDefault();


            })

        }, 100)
        
    });



    // Ad Role 
    $("#addRole").click(function (ReturnForm) {
        $.get("/UsersManagement/FormAddRole", function (ReturnForm) {
            $("#MomdalFormAddRole").html(ReturnForm);
            $('#ButtonAddRole').modal("show");

            //Validate Form
            $('#FormAddRole').bootstrapValidator();
            $("#submit").click(function () {
                $('#FormAddRole').data("bootstrapValidator").validate();
                if ($('#FormAddRole').data("bootstrapValidator").isValid() == true) {
                    var Data = new FormData($("#FormAddRole")[0]);
                    $.ajax(
                    {
                        type: "POST",
                        url: "/UsersManagement/AddRole",
                        contentType: false,
                        processData: false,
                        data: Data,
                        success: function (response) {
                            if (response.valid == true) {
                                $.smallBox({
                                    title: response.message,
                                    content: "<i class='fa fa-clock-o'></i> <i>" + response.message + "</i>",
                                    color: "#296191", // red color code #FB0404
                                    iconSmall: "fa fa-thumbs-up bounce animated",
                                    timeout: 2000
                                });
                                setTimeout(function () {
                                    window.location.href = "/UsersManagement/Roles";
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
                                    window.location.href = "/UsersManagement/Roles";
                                }, 1000)
                            }
                        }
                    })
                }
            })
        })
    });
});
// DataTables Version 1.10.6
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

    $('#tb_role').dataTable({
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
                responsiveHelper_dt_basic = new ResponsiveDatatablesHelper($('#tb_role'), breakpointDefinition);
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