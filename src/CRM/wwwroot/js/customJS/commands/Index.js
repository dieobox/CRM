$(function () {
    $.get("/CommandCenters/Gets", function (rs) {
        $("#HtmlRender").html(rs);
        DataTable();

        // edit
        $("#table").on("click", ".edit", function () {
            $.get("/CommandCenters/FormEdit", { "CommandId": $(this).val() }, function (rs) {
                $("#MomdalFormEdit").html(rs);
                $("#ButtonEdit").modal();

                $('#FormEdit').bootstrapValidator();
                $("#submit").click(function () {
                    $('#FormEdit').data("bootstrapValidator").validate();
                    if ($('#FormEdit').data("bootstrapValidator").isValid() == true) {
                        var Data = new FormData($("#FormEdit")[0]);
                        $.ajax(
                        {
                            type: "POST",
                            url: "/CommandCenters/Edit",
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
                                        window.location.href = "/CommandCenters/Index";
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
                                        window.location.href = "/CommandCenters/Index";
                                    }, 1000)
                                }
                            }
                        });
                    }
                });
            })
        });

        // del
        $("#table").on("click", ".delete", function () {
            var Id = $(this).val();
            $.SmartMessageBox({
                title: "คำเตือน!",
                content: "ต้องการลบรายการนี้หรือไม่?",
                buttons: '[ไม่][ใช่]'
            }, function (ButtonPressed) {
                if (ButtonPressed == "ใช่") {
                    $.get("/CommandCenters/Delete", { "CommandId": Id }, function (rs) {
                        if (rs.valid == true) {
                            $.smallBox({
                                title: rs.message,
                                content: "<i class='fa fa-clock-o'></i> <i>2 seconds ago...</i>",
                                color: "#296191", // red color code #FB0404
                                iconSmall: "fa fa-thumbs-up bounce animated",
                                timeout: 1000
                            });
                            setTimeout(function () {
                                window.location.href = "/CommandCenters/Index";
                            }, 1000)
                        } else {
                            $.smallBox({
                                title: rs.message,
                                content: "<i class='fa fa-clock-o'></i> <i>2 seconds ago...</i>",
                                color: "#FB0404", // red color code #FB0404
                                iconSmall: "fa fa-thumbs-up bounce animated",
                                timeout: 1000
                            });
                            setTimeout(function () {
                                window.location.href = "/CommandCenters/Index";
                            }, 1000)
                        }
                    })
                }
                if (ButtonPressed == "ไม่") {

                }
            });
            e.preventDefault();
        });

        // view 
        $("#table").on("click", ".View", function () {
            $.get("/CommandCenters/ViewFiles", { "CommandId": $(this).attr("data-value") }, function (rs) {
                $("#MomdalView").html(rs);
                $("#ButtonView").modal();
            })
        });
    });




    $("#add").click(function () {
        $.get("/CommandCenters/FormAdd", function (rs) {
            $("#MomdalFormAdd").html(rs);
            $("#ButtonAdd").modal();

            $('#FormAdd').bootstrapValidator();
            $("#submit").click(function () {
                $('#FormAdd').data("bootstrapValidator").validate();
                if ($('#FormAdd').data("bootstrapValidator").isValid() == true) {
                    var Data = new FormData($("#FormAdd")[0]);
                    $.ajax(
                    {
                        type: "POST",
                        url: "/CommandCenters/Add",
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
                                    window.location.href = "/CommandCenters/Index";
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
                                    window.location.href = "/CommandCenters/Index";
                                }, 1000)
                            }
                        }
                    });
                }
            });
        })
    });
});




function DataTable() {
    /* App List using datatable ;*/
    var responsiveHelper_dt_basic = undefined;
    var responsiveHelper_datatable_fixed_column = undefined;
    var responsiveHelper_datatable_col_reorder = undefined;
    var responsiveHelper_datatable_tabletools = undefined;

    var breakpointDefinition = {
        tablet: 1024,
        phone: 480
    };

    $('#table').dataTable({
        lengthMenu: [
         [10, 20, 30, -1],
         ['10', '20', '30', 'ทั้งหมด']
        ],
        "order": [[0, 'asc']],
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
                responsiveHelper_dt_basic = new ResponsiveDatatablesHelper($('#table'), breakpointDefinition);
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