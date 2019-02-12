
// v1.0 tns programmer
$(function () {
    $.get("/Leave/GetLeaveStatus", function (rs) {
        $("#ShowLeaverStatus").html(rs);

        Datatable();

        // Edit 
        $("#ShowLeaverStatus").on("click", ".edit", function () {
            $.get("/Leave/FormEditStatus", { "LeaveStatusId": $(this).val() }, function (ReturnForm) {
                $("#MomdalFormEdit").html(ReturnForm);
                $('#ButtonEdit').modal("show");

                //Validate Form
                $('#Form').bootstrapValidator();
                $("#submit").click(function () {
                    $('#Form').data("bootstrapValidator").validate();
                    if ($('#Form').data("bootstrapValidator").isValid() == true) {
                        var Data = new FormData($("#Form")[0]);
                        $.ajax(
                        {
                            type: "POST",
                            url: "/Leave/EditStatus",
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
                                        window.location.href = "/Leave/LeaveStatus";
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
                                        window.location.href = "/Leave/LeaveStatus";
                                    }, 1000)
                                }
                            }
                        })
                    }
                })
            });
        });

        //Delete
        $("#ShowLeaverStatus").on("click", ".delete", function () {
            var value = $(this).val();
            $.SmartMessageBox({
                title: "คำเตือน!",
                content: "ต้องการลบรายการนี้หรือไม่?",
                buttons: '[ไม่][ใช่]'
            }, function (ButtonPressed) {
                if (ButtonPressed == "ใช่") {
                    $.get("/Leave/DeleteStatus", { "LeaveStatusId": value }, function (response) {
                        if (response.valid == true) {
                            $.smallBox({
                                title: response.message,
                                content: "<i class='fa fa-clock-o'></i> <i>2 seconds ago...</i>",
                                color: "#296191", // red color code #FB0404
                                iconSmall: "fa fa-thumbs-up bounce animated",
                                timeout: 1000
                            });
                            setTimeout(function () {
                                window.location.href = "/Leave/LeaveStatus";
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
                                window.location.href = "/Leave/LeaveStatus";
                            }, 1000)
                        }
                    })
                }
                if (ButtonPressed == "ไม่") {

                }
            });
        });
    })

    // Add LeaveType
    $("#add").click(function () {
        $.get("/Leave/FormAddStatus", function (ReturnForm) {
            $("#MomdalFormAdd").html(ReturnForm);
            $('#ButtonAdd').modal("show");

            //Validate Form
            $('#Form').bootstrapValidator();
            $("#submit").click(function () {
                $('#Form').data("bootstrapValidator").validate();
                if ($('#Form').data("bootstrapValidator").isValid() == true) {
                    var Data = new FormData($("#Form")[0]);
                    $.ajax(
                    {
                        type: "POST",
                        url: "/Leave/AddStatus",
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
                                    window.location.href = "/Leave/LeaveStatus";
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
                                    window.location.href = "/Leave/LeaveStatus";
                                }, 1000)
                            }
                        }
                    })
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


    $('#tb_leavestatus').dataTable({
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
                responsiveHelper_dt_basic = new ResponsiveDatatablesHelper($('#tb_leavestatus'), breakpointDefinition);
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