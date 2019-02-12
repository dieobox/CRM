$(function () {

    CallFunction();

    $("#PersonalCode").select2();
    $.get("/Leave/GetAssignMenagement", function (rs) {
        $("#ListAssign").html(rs);

        $("#ListAssign").on("click", ".delete", function () {
            var Id = $(this).val();
            $.SmartMessageBox({
                title: "คำเตือน!",
                content: "ต้องการลบรายการนี้หรือไม่?",
                buttons: '[ไม่][ใช่]'
            }, function (ButtonPressed) {
                if (ButtonPressed == "ใช่") {
                    $.get("/Leave/DeleteAssign", { "Id": Id }, function (response) {
                        if (response.valid == true) {
                            $.smallBox({
                                title: response.message,
                                content: "<i class='fa fa-clock-o'></i> <i>" + response.message + "</i>",
                                color: "#296191", // red color code #FB0404
                                iconSmall: "fa fa-thumbs-up bounce animated",
                                timeout: 2000
                            });
                            setTimeout(function () {
                                window.location.href = "/Leave/Approve";
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
                                $("#submit").removeAttr("disabled")
                            }, 5000)
                        }
                    })
                }
                if (ButtonPressed == "ไม่") {

                }
            });
        });
    });

    //Validate Form
    $('#AssignForm').bootstrapValidator();
    $("#submit").click(function () {
        $('#AssignForm').data("bootstrapValidator").validate();
        if ($('#AssignForm').data("bootstrapValidator").isValid() == true) {
            var Data = new FormData($("#AssignForm")[0]);
            $.ajax(
            {
                type: "POST",
                url: "/Leave/Assign",
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
                            window.location.href = "/Leave/Approve";
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
                            $("#submit").removeAttr("disabled")
                        }, 5000)
                    }
                }
            })
        }
    });

    //Auto Refreash
    setInterval(function () {
        CallFunction();
    }, 60000);
});



function InitDatatable() {
    /* App List using datatable ;*/
    var responsiveHelper_dt_basic = undefined;
    var responsiveHelper_datatable_fixed_column = undefined;
    var responsiveHelper_datatable_col_reorder = undefined;
    var responsiveHelper_datatable_tabletools = undefined;

    var breakpointDefinition = {
        tablet: 1024,
        phone: 480
    };

    $('#tb_LeaveApprove').dataTable({
        lengthMenu: [
         [10, 30, 40, -1],
         ['10', '30', '40', 'ทั้งหมด']
        ],
        "order": [[0, 'desc']],
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
                responsiveHelper_dt_basic = new ResponsiveDatatablesHelper($('#tb_LeaveApprove'), breakpointDefinition);
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

function InitDatatableViewDetails() {
    /* App List using datatable ;*/
    var responsiveHelper_dt_basic = undefined;
    var responsiveHelper_datatable_fixed_column = undefined;
    var responsiveHelper_datatable_col_reorder = undefined;
    var responsiveHelper_datatable_tabletools = undefined;

    var breakpointDefinition = {
        tablet: 1024,
        phone: 480
    };

    $('#tb_detail').dataTable({
        lengthMenu: [
         [5, 10, 15, -1],
         ['5', '10', '15', 'ทั้งหมด']
        ],
        "order": [[1, 'asc']],
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
                responsiveHelper_dt_basic = new ResponsiveDatatablesHelper($('#tb_detail'), breakpointDefinition);
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

function CallFunction() {
    $("#ShowApprove").html('<img src="/img/Loading/Ajax-Loading.gif" width="100"> กำลังโหลด');
    $.get("/Leave/GetApprove", function (rs) {
        $("#ShowApprove").html(rs);

        InitDatatable();

        // Views
        $("#ShowApprove").on("click", ".View", function () {
            var LeaveId = $(this).attr("data-val");
            var PersonalCode = $(this).attr("data-personalcode");
            $.get("/Leave/LeaveView", { "LeaveId": LeaveId }, function (rs) {
                $("#MomdalView").html(rs);
                $("#ButtonView").modal("show");

                // Details
                $.get("/Leave/GetDetailsAdmin", { "LeaveId": LeaveId }, function (rs) {
                    $(".ShowDetails").html('<img src="/img/Loading/Ajax-Loading.gif" width="100"> กำลังโหลด');
                    $(".ShowDetails").html(rs);
                    InitDatatableViewDetails();
                })

                // Transaction
                $.get("/Leave/GetTransactions", { "LeaveId": LeaveId }, function (rs) {
                    $(".ShowTransactions").html('<img src="/img/Loading/Ajax-Loading.gif" width="100"> กำลังโหลด');
                    $(".ShowTransactions").html(rs);
                    pageSetUp();
                })

                // Files 
                $.get("/Leave/GetFiles", { "LeaveId": LeaveId }, function (rs) {
                    $(".ShowFile").html('<img src="/img/Loading/Ajax-Loading.gif" width="100"> กำลังโหลด');
                    $(".ShowFile").html(rs);
                    pageSetUp();
                });

                //Static
                $.get("/Leave/GetLeaveStaticByPersonalCode", { "PersonalCode": PersonalCode }, function (rs) {
                    $(".LeaveStatic").html('<img src="/img/Loading/Ajax-Loading.gif" width="100"> กำลังโหลด');
                    $(".LeaveStatic").html(rs);
                });
            })
        });

        // Approve
        $("#ShowApprove").on("click", ".Approve", function () {
            var TransactionId = $(this).val();
            $.get("/Leave/FormApprove", { "TransactionId": TransactionId }, function (rs) {
                $("#MomdalFormApprove").html(rs);
                $("#ButtonApprove").modal();

                //Validate Form
                $('#Form').bootstrapValidator();
                $(".submit").click(function () {
                    var Status = $(this).attr("data-status");
                    $("#Status").val(Status);

                    $('#Form').data("bootstrapValidator").validate();
                    if ($('#Form').data("bootstrapValidator").isValid() == true) {
                        $.SmartMessageBox({
                            title: "คำเตือน!",
                            content: "ยืนยันการทำรายการ?",
                            buttons: '[ไม่][ใช่]'
                        }, function (ButtonPressed) {
                            if (ButtonPressed == "ใช่") {

                                var Data = new FormData($("#Form")[0]);
                                $.ajax(
                                {
                                    type: "POST",
                                    url: "/Leave/Approved",
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
                                                window.location.href = "/Leave/Approve";
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
                                                window.location.href = "/Leave/Approve";
                                            }, 1000)
                                        }
                                    }
                                })
                            }
                            if (ButtonPressed == "ไม่") {

                            }
                        });
                    }
                })
            });
        });

        //ViewException
        $("#ShowApprove").on("click", ".ViewException", function () {
            $.get("/Leave/GetException", { "LeaveId": $(this).attr("data-val") }, function (rs) {
                $("#MomdalExceptionDetail").html(rs);
                $("#ButtonExcep").modal("show");
            })
        });


    });
}