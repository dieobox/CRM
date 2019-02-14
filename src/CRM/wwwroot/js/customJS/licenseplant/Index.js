$(function () {
    $.get("/LicensePlantManagement/Gets", function (rs) {
        $("#jsonShow").html(rs);
        Datatable();

        $("#jsonShow").on("click", ".edit", function () {
            $.get("/LicensePlantManagement/FormEdit", { "LicensePlantId": $(this).val() }, function (rs) {
                $("#MomdalFormEdit").html(rs);
                $("#ButtonEdit").modal();

                //Validate Form
                $('#FormEdit').bootstrapValidator();
                $("#submit").click(function () {
                    $('#FormEdit').data("bootstrapValidator").validate();
                    if ($('#FormEdit').data("bootstrapValidator").isValid() == true) {
                        var Data = new FormData($("#FormEdit")[0]);
                        $.ajax(
                        {
                            type: "POST",
                            url: "/LicensePlantManagement/Edit",
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
                                        window.location.href = "/LicensePlantManagement/Index";
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
                                        window.location.href = "/LicensePlantManagement/Index";
                                    }, 1000)
                                }
                            }
                        });
                    }
                })
            });
        });


        $("#jsonShow").on("click", ".delete", function () {
            var Id = $(this).val();
            $.SmartMessageBox({
                title: "คำเตือน!",
                content: "ต้องการลบรายการนี้หรือไม่?",
                buttons: '[ไม่][ใช่]'
            }, function (ButtonPressed) {
                if (ButtonPressed == "ใช่") {
                    $.get("/LicensePlantManagement/Delete", { "LicensePlantId": Id }, function (Result) {
                        if (Result.valid == true) {
                            $.smallBox({
                                title: Result.message,
                                content: "<i class='fa fa-clock-o'></i> <i>" + Result.message + "</i>",
                                color: "#296191", // red color code #FB0404
                                iconSmall: "fa fa-thumbs-up bounce animated",
                                timeout: 1000
                            });
                            setTimeout(function () {
                                window.location.href = "/LicensePlantManagement/Index";
                            }, 2000)
                        } else {
                            $.smallBox({
                                title: Result.message,
                                content: "<i class='fa fa-clock-o'></i> <i>" + Result.message + "</i>",
                                color: "#FB0404", // red color code #FB0404
                                iconSmall: "fa fa-thumbs-up bounce animated",
                                timeout: 1000
                            });
                            setTimeout(function () {
                                window.location.href = "/LicensePlantManagement/Index";
                            }, 2000)
                        }
                    })
                }
                if (ButtonPressed == "ไม่") {

                }
            });
            e.preventDefault();

        });


    });


    $("#add").click(function () {
        $.get("/LicensePlantManagement/FormAdd", function (rs) {
            $("#MomdalFormAdd").html(rs);
            $("#ButtonAdd").modal();

            //Validate Form
            $('#FormAdd').bootstrapValidator();
            $("#submit").click(function () {
                $('#FormAdd').data("bootstrapValidator").validate();
                if ($('#FormAdd').data("bootstrapValidator").isValid() == true) {
                    var Data = new FormData($("#FormAdd")[0]);
                    $.ajax(
                    {
                        type: "POST",
                        url: "/LicensePlantManagement/Add",
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
                                    window.location.href = "/LicensePlantManagement/Index";
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
                                    window.location.href = "/LicensePlantManagement/Index";
                                }, 1000)
                            }
                        }
                    });
                }
            })
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


    $('#TableJson').dataTable({
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
                responsiveHelper_dt_basic = new ResponsiveDatatablesHelper($('#TableJson'), breakpointDefinition);
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