$(function () {

    $("#ShowConfigTime").html('<img src="/img/Loading/Ajax-Loading.gif" width="100"> กำลังโหลด');
    $.get("/TimeAttendance/ShowConficTime", {}, function (rs) {
        setTimeout(function () {
            $("#ShowConfigTime").html(rs);
            Datatable();

            // Edit  ConfigTime
            $("#ShowConfigTime").on("click", ".edit", function () {
                var ID = $(this).val();
                $.get("/TimeAttendance/FormEditConfigTime", { "ID": ID }, function (ReturnForm) {
                    $("#MomdalEdit").html(ReturnForm);
                    $('#ButtonEdit').modal("show");

                    //Validate Form
                    $('#FormEditConfig').bootstrapValidator();
                    $("#submit").click(function () {
                        $('#FormEditConfig').data("bootstrapValidator").validate();
                        if ($('#FormEditConfig').data("bootstrapValidator").isValid() == true) {
                            var Data = new FormData($("#FormEditConfig")[0]);
                            $.ajax(
                            {
                                type: "POST",
                                url: "/TimeAttendance/EditConfigTime",
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
                                            window.location.href = "/TimeAttendance/ConfigTime";
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
                                            window.location.href = "/TimeAttendance/ConfigTime";
                                        }, 1000)
                                    }
                                }
                            })
                        }
                    })
                });
            });


            $("#ShowConfigTime").on("click", ".delete", function () {
                var ID = $(this).val();
                $.SmartMessageBox({
                    title: "คำเตือน!",
                    content: "ต้องการลบรายการนี้หรือไม่?",
                    buttons: '[ไม่][ใช่]'
                }, function (ButtonPressed) {
                    if (ButtonPressed == "ใช่") {
                        $.get("/TimeAttendance/DeleteConfigTime", { "ID": ID }, function (response) {
                            if (response.valid == true) {
                                $.smallBox({
                                    title: response.message,
                                    content: "<i class='fa fa-clock-o'></i> <i>" + response.message + "</i>",
                                    color: "#296191", // red color code #FB0404
                                    iconSmall: "fa fa-thumbs-up bounce animated",
                                    timeout: 1000
                                });
                                setTimeout(function () {
                                    window.location.href = "/TimeAttendance/ConfigTime";
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
                                    window.location.href = "/TimeAttendance/ConfigTime";
                                }, 100)
                            }
                        })
                    }
                    if (ButtonPressed == "ไม่") {

                    }
                });
               // e.preventDefault();

            });



            
        }, 100);
    });

    // Add Archives
    $("#add").click(function () {
        $.get("/TimeAttendance/FormConfigTime", function (ReturnForm) {
            setTimeout(function () {
                $("#ModalFormAdd").html(ReturnForm);

                $("#FormAddConfig").bootstrapValidator();
                $("#FormAddConfig").on("click", "#submit", function () {
                    $('#FormAddConfig').data("bootstrapValidator").validate();
                    if ($('#FormAddConfig').data("bootstrapValidator").isValid() == true) {
                        var Data = new FormData($("#FormAddConfig")[0]);
                        $.ajax(
                        {
                            type: "POST",
                            url: "/TimeAttendance/AddConfigTime",
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
                                        window.location.href = "/TimeAttendance/ConfigTime";
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
                                        window.location.href = "/TimeAttendance/ConfigTime";
                                    }, 1000)
                                }
                            }
                        })
                    }
                })
            });

           
        });
    });
});

function Datatable() {
    var responsiveHelper_dt_basic = undefined;
    var responsiveHelper_datatable_fixed_column = undefined;
    var responsiveHelper_datatable_col_reorder = undefined;
    var responsiveHelper_datatable_tabletools = undefined;

    var breakpointDefinition = {
        tablet: 1024,
        phone: 480
    };


    $('#ListConfigs').dataTable({
        "lengthMenu": [[30, 40, 50, -1], [30, 40, 50, "All"]],
        "sDom": "<'dt-toolbar'<'col-xs-12 col-sm-6'f><'col-sm-6 col-xs-12 hidden-xs'l>r>" +
            "t" +
            "<'dt-toolbar-footer'<'col-sm-6 col-xs-12 hidden-xs'i><'col-xs-12 col-sm-6'p>>",
        "autoWidth": true,
        "oLanguage": {
            "sSearch": '<span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span>'
        },
        "preDrawCallback": function () {
            if (!responsiveHelper_dt_basic) {
                responsiveHelper_dt_basic = new ResponsiveDatatablesHelper($('#ListConfigs'), breakpointDefinition);
            }
        },
        "rowCallback": function (nRow) {
            responsiveHelper_dt_basic.createExpandIcon(nRow);
        },
        "drawCallback": function (oSettings) {
            responsiveHelper_dt_basic.respond();
        }
    });
}

    /* End App List */







