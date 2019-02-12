$(function () {
    // Add Menu
    $("#add").click(function () {
        $.get("/Menus/FormAddMenu", { "GetForm": "GetForm" }, function (ReturnForm) {
            $("#MomdalFormAdd").html(ReturnForm);
            $('#ButtonAdd').modal("show");

            //Validate Form
            $('#FormAddMenu').bootstrapValidator();
            $("#submit").click(function () {
                $('#FormAddMenu').data("bootstrapValidator").validate();
                if ($('#FormAddMenu').data("bootstrapValidator").isValid() == true) {
                    var Data = new FormData($("#FormAddMenu")[0]);
                    $.ajax(
                    {
                        type: "POST",
                        url: "/Menus/AddMenu",
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
                                    window.location.href = "/Menus/Index";
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
                                    window.location.href = "/Menus/Index";
                                }, 1000)
                            }
                        }
                    })
                }
            })
        });


    });

    // List Menus
    $.get("/Menus/GetMenus", { "Menus": "Menus" }, function (rs) {
        $("#ShowMenus").html('<img src="/img/Loading/Ajax-Loading.gif" width="100"> กำลังโหลด');
        setTimeout(function () {
            $("#ShowMenus").html(rs);
            Datatable();

            // Manage Sub Menu
            $("#ShowMenus").on("click", ".manage", function () {
                var MenuId = $(this).val();
                window.location.href = "/Menus/MenuItems?MenuId=" + MenuId;
            });

            // Edit  Menus
            $("#ShowMenus").on("click", ".edit", function () {
                var MenuId = $(this).val();
                $.get("/Menus/FormEditMenu", { "MenuId": MenuId }, function (ReturnForm) {
                    $("#MomdalFormUpdate").html(ReturnForm);
                    $('#ButtonUpdate').modal("show");

                    //Validate Form
                    $('#FormEditMenu').bootstrapValidator();
                    $("#submit").click(function () {
                        $('#FormEditMenu').data("bootstrapValidator").validate();
                        if ($('#FormEditMenu').data("bootstrapValidator").isValid() == true) {
                            var Data = new FormData($("#FormEditMenu")[0]);
                            $.ajax(
                            {
                                type: "POST",
                                url: "/Menus/EditMenu",
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
                                            window.location.href = "/Menus/Index";
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
                                            window.location.href = "/Menus/Index";
                                        }, 1000)
                                    }
                                }
                            })
                        }
                    })
                });
            });

            // Delete Menus
            $("#ShowMenus").on("click", ".delete", function () {
                var MenuId = $(this).val();
                $.SmartMessageBox({
                    title: "คำเตือน!",
                    content: "ต้องการลบรายการนี้หรือไม่?",
                    buttons: '[ไม่][ใช่]'
                }, function (ButtonPressed) {
                    if (ButtonPressed == "ใช่") {
                        $.get("/Menus/DeleteMenu", { "MenuId": MenuId }, function (response) {
                            if (response.valid == true) {
                                $.smallBox({
                                    title: response.message,
                                    content: "<i class='fa fa-clock-o'></i> <i>" + response.message + "</i>",
                                    color: "#296191", // red color code #FB0404
                                    iconSmall: "fa fa-thumbs-up bounce animated",
                                    timeout: 1000
                                });
                                setTimeout(function () {
                                    window.location.href = "/Menus/Index";
                                }, 100)
                            } else {
                                $.smallBox({
                                    title: response.message,
                                    content: "<i class='fa fa-clock-o'></i> <i>" + response.message + "</i>",
                                    color: "#FB0404", // red color code #FB0404
                                    iconSmall: "fa fa-thumbs-up bounce animated",
                                    timeout: 1000
                                });
                                setTimeout(function () {
                                    window.location.href = "/Menus/Index";
                                }, 100)
                            }
                        })
                    }
                    if (ButtonPressed == "ไม่") {

                    }
                });
                e.preventDefault();

            });

        }, 100)
    });


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