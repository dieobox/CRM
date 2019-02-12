
$(function () {
    // Add App
    $("#add").click(function () {
        $.get("/Applications/FormAddApp", { "Form": "Form" }, function (ReturnForm) {
            $("#ModalFormAdd").html(ReturnForm);
            $('#ButtonAdd').modal("show");

            //Validate Form
            $('#FormAddApp').bootstrapValidator();
            $("#submit").click(function () {
                $('#FormAddApp').data("bootstrapValidator").validate();
                if ($('#FormAddApp').data("bootstrapValidator").isValid() == true) {
                    var Data = new FormData($("#FormAddApp")[0]);
                    $.ajax(
                    {
                        type: "POST",
                        url: "/Applications/AddApp",
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
                                    window.location.href = "/Applications/Index";
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
                                    window.location.href = "/Applications/Index";
                                }, 1000)
                            }
                        }
                    })
                }
            })
        });


    });

    // List App
    $.get("/Applications/GetApplications", { "form": "form" }, function (RS) {
        $("#ShowApps").html('<img src="/img/Loading/Ajax-Loading.gif" width="100"> กำลังโหลด');
        setTimeout(function () {

            $("#ShowApps").html(RS);
            //Load DataTable Bootstrap
            Datatable();

    // Edit  App
    $("#ShowApps").on("click", ".edit", function () {
        var AppId = $(this).val();
        $.get("/Applications/FormEditApp", { "AppId": AppId }, function (ReturnForm) {
            $("#ModalFormUpdate").html(ReturnForm);
            $('#ButtonUpdate').modal("show");

            //Validate Form
            $('#FormEditApp').bootstrapValidator();
            $("#submit").click(function () {
                $('#FormEditApp').data("bootstrapValidator").validate();
                if ($('#FormEditApp').data("bootstrapValidator").isValid() == true) {
                    var Data = new FormData($("#FormEditApp")[0]);
                    $.ajax(
                    {
                        type: "POST",
                        url: "/Applications/EditApp",
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
                                    window.location.href = "/Applications/Index";
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
                                    window.location.href = "/Applications/Index";
                                }, 1000)
                            }
                        }
                    })
                }
            })
        });
    });

            // Delete Menus
    $("#ShowApps").on("click", ".delete", function () {
        var AppId = $(this).val();
        $.SmartMessageBox({
            title: "คำเตือน!",
            content: "ต้องการลบรายการนี้หรือไม่?",
            buttons: '[ไม่][ใช่]'
        }, function (ButtonPressed) {
            if (ButtonPressed == "ใช่") {
                $.get("/Applications/DeleteApp", { "AppId": AppId }, function (response) {
                    if (response.valid == true) {
                        $.smallBox({
                            title: response.message,
                            content: "<i class='fa fa-clock-o'></i> <i>" + response.message + "</i>",
                            color: "#296191", // red color code #FB0404
                            iconSmall: "fa fa-thumbs-up bounce animated",
                            timeout: 1000
                        });
                        setTimeout(function () {
                            window.location.href = "/Applications/Index";
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
                            window.location.href = "/Applications/Index";
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
        /* App List using datatable ;*/
        var responsiveHelper_dt_basic = undefined;
        var responsiveHelper_datatable_fixed_column = undefined;
        var responsiveHelper_datatable_col_reorder = undefined;
        var responsiveHelper_datatable_tabletools = undefined;

        var breakpointDefinition = {
            tablet: 1024,
            phone: 480
        };

        $('#td_app').dataTable({
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
                    responsiveHelper_dt_basic = new ResponsiveDatatablesHelper($('#td_app'), breakpointDefinition);
                }
            },
            "rowCallback": function (nRow) {
                responsiveHelper_dt_basic.createExpandIcon(nRow);
            },
            "drawCallback": function (oSettings) {
                responsiveHelper_dt_basic.respond();
            }
        });
        /* End App List */
    }



});