$(function () {

    LoadOther();

    //Auto Refreash
    setInterval(function () {
        $("#BudgetYear").val($("#BudgetYear").val()).change();
        LoadOther();
    }, 60000);

    $("#BudgetYear").select2();
    var $select = $("#BudgetYear");
    $select.change(function () {
        var BudgetYear = $("#BudgetYear").val();
        $("#ShowLeave").html('<img src="/img/Loading/Ajax-Loading.gif" width="100"> กำลังโหลด');
        $.get("/Leave/Gets", { "BudgetYear": BudgetYear }, function (rs) {
            $('#ShowLeave').html(rs);

            InitDatatable();

            // export excel
            $("#tb_LeaveContent").on("click", ".print", function () {
                window.location.href = "/Leave/PrintExcepFile?LeaveId=" + $(this).val();
            });

            // view
            $("#tb_LeaveContent").on("click", ".View", function () {
                var LeaveId = $(this).attr("data-val");
                $.get("/Leave/LeaveView", { "LeaveId": LeaveId }, function (rs) {
                    $("#MomdalView").html(rs);
                    $("#ButtonView").modal("show");

                    // Details
                    $.get("/Leave/GetDetails", { "LeaveId": LeaveId }, function (rs) {
                        $(".ShowDetails").html(rs);
                        InitDatatableViewDetails();

                        $("#refunds").click(function () {
                            if ($('.IsCancle').is(':checked') == true) {
                                $.get("/Leave/CheckReturnLeaveByLeaveId", { "LeaveId": $("#LeaveId").val() }, function (rs) {
                                    if (rs == false)
                                    {
                                        $.SmartMessageBox({
                                            title: "คำเตือน!",
                                            content: "ยืนยันการทำการงาน?",
                                            buttons: '[ไม่][ใช่]'
                                        }, function (ButtonPressed) {
                                            if (ButtonPressed == "ใช่") {
                                                var Data = new FormData($("#Formrefund")[0]);
                                                $.ajax(
                                                {
                                                    type: "POST",
                                                    url: "/Leave/LeaveReTurn",
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
                                                                window.location.href = "/Leave/Index";
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
                                                                //window.location.href = "/Leave/Index";
                                                                $("#submit").removeAttr("disabled")
                                                            }, 2000)
                                                        }
                                                    }
                                                })
                                            }
                                            if (ButtonPressed == "ไม่") {
                                                // something
                                            }
                                        });
                                    }
                                    else
                                    {
                                        $.smallBox({
                                            title: "ไม่สามารถทำรายการนี้ได้ เนื่องจากมีการทำรายการนี้แล้ว กรุณาตรวจสอบ",
                                            content: "<i class='fa fa-clock-o'></i> <i>กรุณาตรวจสอบ</i>",
                                            color: "#FB0404", // red color code #FB0404
                                            iconSmall: "fa fa-thumbs-up bounce animated",
                                            timeout: 2000
                                        });
                                    }
                                })
                            }
                            else
                            {
                                $.smallBox({
                                    title: "กรุณาเลือกวันที่",
                                    content: "<i class='fa fa-clock-o'></i> <i>กรุณาเลือกวันที่</i>",
                                    color: "#FB0404", // red color code #FB0404
                                    iconSmall: "fa fa-thumbs-up bounce animated",
                                    timeout: 2000
                                });
                            }
                        });
                    })

                    // Transaction
                    $.get("/Leave/GetTransactions", { "LeaveId": LeaveId }, function (rs) {
                        $(".ShowTransactions").html(rs);
                        pageSetUp();
                    });

                    // Files 
                    $.get("/Leave/GetFiles", { "LeaveId": LeaveId }, function (rs) {
                        $(".ShowFile").html(rs);
                        pageSetUp();
                    });
                })
            });

            // cancel
            $("#tb_LeaveContent").on("click", ".cancel", function () {
                var LeaveId = $(this).val();
                $.SmartMessageBox({
                    title: "คำเตือน!",
                    content: "ยืนยันการทำการงาน?",
                    buttons: '[ไม่][ใช่]'
                }, function (ButtonPressed) {
                    if (ButtonPressed == "ใช่") {

                        $.get("/Leave/LeaveCancel", { "LeaveId": LeaveId }, function (response) {
                            if (response.valid == true) {
                                $.smallBox({
                                    title: response.message,
                                    content: "<i class='fa fa-clock-o'></i> <i>2 seconds ago...</i>",
                                    color: "#296191", // red color code #FB0404
                                    iconSmall: "fa fa-thumbs-up bounce animated",
                                    timeout: 1000
                                });
                                setTimeout(function () {
                                    window.location.href = "/Leave/Index";
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
                                    window.location.href = "/Leave/Index";
                                }, 1000)
                            }
                        })
                    }
                    if (ButtonPressed == "ไม่") {
                        // something
                    }
                });
            });
        });
    });
    $("#BudgetYear").val($("#BudgetYear").val()).change();

    // add
    $("#add").click(function () {
        $.get("/Leave/FormAddLeave", function (rs) {
            $("#MomdalFormAdd").html(rs);
            $("#ButtonAdd").modal("show");

            $("#LeaveTypeId").select2();
            $(".select2-hidden-accessible").hide();
            $("#LeaveTypeId").on("change", function () {
                $(".select2-hidden-accessible").hide();
                $.get("/Leave/IsHalfDay", { "LeaveTypeId": $(this).val() }, function (rs) {
                    $("#StartIsHarb").empty();
                    $("#EndIsHarb").empty();
                    if (rs.result == true) {
                        if ($("#LeaveTypeId").val() == 4)
                        {
                            $("#StartIsHarb").append($("<option></option>").attr("value", 1).text("ทั้งวัน"));
                            $("#StartIsHarb").append($("<option></option>").attr("value", 3).text("ครึ่งวันบ่าย"));

                            $("#EndIsHarb").append($("<option></option>").attr("value", 1).text("ทั้งวัน"));
                            $("#EndIsHarb").append($("<option></option>").attr("value", 2).text("ครึ่งวันเช้า"));
                        }
                        else
                        {
                            //Start
                            $("#StartIsHarb").append($("<option></option>").attr("value", 1).text("ทั้งวัน"));
                            $("#StartIsHarb").append($("<option></option>").attr("value", 2).text("ครึ่งวันเช้า"));
                            $("#StartIsHarb").append($("<option></option>").attr("value", 3).text("ครึ่งวันบ่าย"));
                            // End
                            $("#EndIsHarb").append($("<option></option>").attr("value", 1).text("ทั้งวัน"));
                            $("#EndIsHarb").append($("<option></option>").attr("value", 2).text("ครึ่งวันเช้า"));
                            $("#EndIsHarb").append($("<option></option>").attr("value", 3).text("ครึ่งวันบ่าย"));
                        }
                    }
                    else
                    {
                        // Start
                        $("#StartIsHarb").append($("<option></option>").attr("value", 1).text("ทั้งวัน"));
                        //End
                        $("#EndIsHarb").append($("<option></option>").attr("value", 1).text("ทั้งวัน"));
                    }
                    $("#StartIsHarb").select2();
                    $("#EndIsHarb").select2();
                });

                if ($(this).val() == 4)
                {
                    $.get("/Leave/CheckCumulativeBalance", function (rs) {
                        $.smallBox({
                            title: "สิทธิ์ลาผักผ่อนคงเหลือของคุณคือ " + rs + " ครั้งต่อปีงบประมาณ",
                            content: "",
                            color: "#ff1a1a",
                            timeout: 2000,
                            icon: "fa fa-bell"
                        });
                    });
                }
            });

            $("#StartMonth").change(function () {
                $.get("/TimeAttendance/GetDay", { "Month": $("#StartMonth").val(), "Year": $("#StartYear").val() }, function (rs) {
                    $("#StartDay").empty();
                    $.each(rs, function (i, val) {
                        $("#StartDay").append($("<option></option>").attr("value", val.value).text(val.text).attr("disabled", val.disabled));
                    });
                    $("#StartDay").select2();
                });
                $("#StartDay").val($("#StartDay").val()).change();
            });
            $("#StartMonth").val($("#StartMonth").val()).change();

            $("#StartDay").select2();
            $("#StartMonth").select2();
            $("#StartYear").select2();
            $("#StartIsHarb").select2();

            $("input[type=radio][name=IsDay]").on("change", function () {
                if (this.value == "true") {
                    $("#lastDay").hide();
                    $("#EndMonth").change(function () {
                        $.get("/TimeAttendance/GetDay", { "Month": $("#EndMonth").val(), "Year": $("#EndYear").val() }, function (rs) {
                            $("#EndDay").empty();
                            $.each(rs, function (i, val) {
                                $("#EndDay").append($("<option></option>").attr("value", val.value).text(val.text).attr("disabled", val.disabled));
                            });
                            $("#EndDay").select2();
                        });
                        $("#EndDay").val($("#EndDay").val()).change();
                    });
                    $("#EndMonth").val($("#EndMonth").val()).change();

                    $("#EndDay").select2();
                    $("#EndMonth").select2();
                    $("#EndYear").select2();
                    $("#EndIsHarb").select2();
                }
                else
                {
                    $("#lastDay").show();
                    $("#EndMonth").change(function () {
                        $.get("/TimeAttendance/GetDay", { "Month": $("#EndMonth").val(), "Year": $("#EndYear").val() }, function (rs) {
                            $("#EndDay").empty();
                            $.each(rs, function (i, val) {
                                $("#EndDay").append($("<option></option>").attr("value", val.value).text(val.text).attr("disabled", val.disabled));
                            });
                            $("#EndDay").select2();
                        });
                        $("#EndDay").val($("#EndDay").val()).change();
                    });
                    $("#EndMonth").val($("#EndMonth").val()).change();

                    $("#EndDay").select2();
                    $("#EndMonth").select2();
                    $("#EndYear").select2();
                    $("#EndIsHarb").select2();
                }
            });
            
            $("#EndDay").select2();
            $("#EndMonth").select2();
            $("#EndYear").select2();
            $("#EndIsHarb").select2();

            //Validate Form
            $('#Form').bootstrapValidator();
            $("#submit").click(function () {
                $('#Form').data("bootstrapValidator").validate();
                if ($('#Form').data("bootstrapValidator").isValid() == true) {
                    var Data = new FormData($("#Form")[0]);
                    $.ajax(
                    {
                        type: "POST",
                        url: "/Leave/AddLeave",
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
                                    window.location.href = "/Leave/Index";
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
                                    //window.location.href = "/Leave/Index";
                                    $("#submit").removeAttr("disabled")
                                }, 5000)
                            }
                        }
                    })
                }
            })
        });
    });

    // report 
    $("#report").click(function () {
        $.get("/Leave/GetFormReportIndividual", function (rs) {
            $("#MomdalReport").html(rs);
            $("#ButtonReport").modal('show');

            $("#StartDay").select2();
            $("#StartMonth").select2();
            $("#StartYear").select2();
            $("#PerYear").select2();

            // excel report
            $("#excel").click(function () {
                // value
                var filter = $("input[name=filter]:checked").val();
                var Month = $("#StartMonth").val();
                var StartYear = $("#StartYear").val();
                var PerYear = $("#PerYear").val();
                window.location.href = "/Leave/ReportExcelIndividual?filter=" + filter + "&Month=" + Month + "&Year=" + StartYear + "&PerYear=" + PerYear;
            });

            // PDF Report
            $("#pdf").click(function () {
                // value
                var filter = $("input[name=filter]:checked").val();
                var Month = $("#StartMonth").val();
                var StartYear = $("#StartYear").val();
                var PerYear = $("#PerYear").val();

                var Url = "/Leave/ReportPDFIndividual?filter=" + filter + "&Month=" + Month + "&Year=" + StartYear + "&PerYear=" + PerYear;
                window.open(Url, "_blank"); 
            });
        })
    });
});


function LoadOther(){
    $.get("/Leave/GetLeaveStatic", { "Limit": 3, "View": "GetLeaveStatic" }, function (rs) {
        $("#ShowStatic").html(rs);

        $("#ShowStatic").on("click", "#Chart", function () {
            $.get("/Leave/GetLeaveStatic", { "Limit": 11, "View": "GetLeaveStaticAll" }, function (rs) {
                $("#MomdalChart").html(rs);
                $("#ButtonChart").modal("show");
            });            
        });
    });

    $.get("/Leave/GetChart", function (rs) {
        if ($('#Leavechart').length) {
            Morris.Bar({
                element: 'Leavechart',
                data:rs ,
                xkey: 'x',
                ykeys: ['y', 'z', 'a'],
                labels: ['สิทธิ์ต่อปี', 'ใช้ไป', 'คงเหลือ']
            });
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

    $('#tb_LeaveContent').dataTable({
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
            if (!responsiveHelper_dt_basic) {
                responsiveHelper_dt_basic = new ResponsiveDatatablesHelper($('#tb_LeaveContent'), breakpointDefinition);
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

   