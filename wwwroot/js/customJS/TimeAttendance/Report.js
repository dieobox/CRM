$(function () {
    $("#Dday").select2();
    $("#Month").select2();
    $("#Year").select2();
    $("#MMonth").select2();
    $("#MYear").select2();
    $("#YYear").select2();
    $("#Quarter").select2();
    $("#BudgetYear").select2();
    $("#OrgId").select2();
    $("#PersonalId").select2();
    $(".select2-hidden-accessible").hide();

    var MMonth = $("#MMonth").val();
    var DDay = $("#Dday").val();
    var MYear = $("#MYear").val();
    var YYear = $("#YYear").val();
    var Quarter = $("#Quarter").val();
    var BudgetYear = $("#BudgetYear").val();
    var Date = $("input[name$='OptionDate']:checked").val();
    var PersonalId = $("#PersonalId").val();
    

    $("#AttendanceReport").html('<img src="/img/Loading/Ajax-Loading.gif" width="100"> กำลังโหลด');
    $.get("/TimeAttendance/AttendanceReport", { "Dday": $("#Dday").val(), "Month": $("#Month").val(), "Year": $("#Year").val(), "OptionDate": Date, "MMonth": MMonth, "MYear": MYear, "YYear": YYear, "Quarter": Quarter, "BudgetYear": BudgetYear, "PersonalId": PersonalId, "PersonalId": $("#CurrentPersonal").val(), "IsAdmin": $("#IsAdmin").val() }, function (rs) {
        $("#Month").change(function () {
            $.get("/TimeAttendance/GetDay", { "Month": $("#Month").val(), "Year": $("#Year").val() }, function (rs) {
                $("#Dday").empty();
                $.each(rs, function (i, val) {
                    $("#Dday").append($("<option></option>").attr("value", val.value).text(val.text));
                    //$("#Dday").append($("<option></option>").attr("value", val.value).text(val.text).attr("disabled", val.disabled));
                    $('#Dday option[value="' + $("#NDay").val() + '"]').attr("selected", "selected");
                });
                $("#Dday").select2();
            });
            $("#Dday").val($("#Dday").val()).change();
        });
        $("#Month").val($("#Month").val()).change();

     
        $("#Year").change(function () {
            $.get("/TimeAttendance/GetDay", { "Month": $("#Month").val(), "Year": $("#Year").val() }, function (rs) {
                $("#Dday").empty();
                $.each(rs, function (i, val) {
                    $("#Dday").append($("<option></option>").attr("value", val.value).text(val.text));
                   $('#Dday option[value="' + $("#NDay").val() + '"]').attr("selected", "selected");
                });
                $("#Dday").select2();
            });
            $("#Dday").val($("#Dday").val()).change();
        });
        $("#Year").val($("#Year").val()).change();


        $.get("/Organizations/GetOrgSelectListByOrgType", { "OrgType": 1 }, function (rs) {
            $("#OrgId").empty();
            $.each(rs, function (i, val) {
                $("#OrgId").append($("<option></option>").attr("value", val.value).text(val.text));
                $('#OrgId option[value="' + $("#CurrentOrg").val() + '"]').attr("selected", "selected");
            });
            $("#OrgId").select2();

            $("#OrgId").change(function () {
                $.get("/TimeAttendance/GetPersonalByOrgCode", { "OrgId": $(this).val() }, function (rs) {
                    $("#PersonalId").empty();
                    $.each(rs, function (i, val) {
                        $("#PersonalId").append($("<option></option>").attr("value", val.value).text(val.text));
                        $('#PersonalId option[value="' + $("#CurrentPersonal").val() + '"]').attr("selected", "selected");
                    });
                    $("#PersonalId").select2();
                })
                $("#PersonalId").val($("#PersonalId").val()).change();
            })
            $("#OrgId").val($("#OrgId").val()).change();
        })

        

        setTimeout(function () {
            $("#AttendanceReport").html(rs);
            Datatable();
            $("#ExportExcel").attr("href", "/TimeAttendance/ExportExcel?DDay=" + DDay + "&Month=" + Month + "&Year=" + Year + "&OptionDate=" + Date + "&MMonth=" + MMonth + "&MYear=" + MYear + "&YYear=" + YYear + "&Quarter=" + Quarter + "&BudgetYear=" + BudgetYear + "&PersonalId=" + $("#CurrentPersonal").val());
            $("#ExportPdf").attr("href", "/TimeAttendance/ExportPdf?DDay=" + DDay + "&Month=" + Month + "&Year=" + Year + "&OptionDate=" + Date + "&MMonth=" + MMonth + "&MYear=" + MYear + "&YYear=" + YYear + "&Quarter=" + Quarter + "&BudgetYear=" + BudgetYear + "&PersonalId=" + $("#CurrentPersonal").val());
        });
      
    });

    $("#Search").click(function () {
        var DDay = $("#Dday").val();
        var Month = $("#Month").val();
        var Year = $("#Year").val();
        var MMonth = $("#MMonth").val();
        var MYear = $("#MYear").val();
        var YYear = $("#YYear").val();
        var Date = $("input[name$='OptionDate']:checked").val();
        var BudgetYear = $("#BudgetYear").val();
        var Quarter = $("#Quarter").val();
        var PersonalId = $("#PersonalId").val();
        var IsAdmin = $("#IsAdmin").val();

        $("#AttendanceReport").html('<img src="/img/Loading/Ajax-Loading.gif" width="100"> กำลังโหลด');
        $.get("/TimeAttendance/AttendanceReport", { "DDay": DDay, "Month": Month, "Year": Year, "OptionDate": Date, "MMonth": MMonth, "MYear": MYear, "YYear": YYear, "BudgetYear": BudgetYear, "Quarter": Quarter, "PersonalId": PersonalId, "IsAdmin": IsAdmin }, function (rs) {
            $("#Month").change(function () {
                $.get("/TimeAttendance/GetDay", { "Month": $("#Month").val(), "Year": $("#Year").val() }, function (rs) {
                    $("#Dday").empty();
                    $.each(rs, function (i, val) {
                        $("#Dday").append($("<option></option>").attr("value", val.value).text(val.text));
                    });
                    $("#Dday").select2();
                });
            });
          

            $.get("/Organizations/GetOrgSelectListByOrgType", { "OrgType": 1 }, function (rs) {
                $.each(rs, function (i, val) {
                    $("#OrgId").append($("<option></option>").attr("value", val.value).text(val.text).attr("disabled", val.disabled));
                });
                $("#OrgId").select2();

                $("#OrgId").change(function () {
                    $.get("/TimeAttendance/GetPersonalByOrgCode", { "OrgId": $(this).val() }, function (rs) {
                        $("#PersonalId").empty();
                        $.each(rs, function (i, val) {
                            $("#PersonalId").append($("<option></option>").attr("value", val.value).text(val.text));
                        });
                        $("#PersonalId").select2();
                    })
                })
            })

            setTimeout(function () {
                $("#AttendanceReport").html(rs);
                Datatable();
            }, 200)
        });


        $("#ExportExcel").attr("href", "/TimeAttendance/ExportExcel?DDay=" + DDay + "&Month=" + Month + "&Year=" + Year + "&OptionDate=" + Date + "&MMonth=" + MMonth + "&MYear=" + MYear + "&YYear=" + YYear + "&Quarter=" + Quarter + "&BudgetYear=" + BudgetYear + "&PersonalId=" + PersonalId + "&IsAdmin=" + $("#IsAdmin").val());
        $("#ExportPdf").attr("href", "/TimeAttendance/ExportPdf?DDay=" + DDay + "&Month=" + Month + "&Year=" + Year + "&OptionDate=" + Date + "&MMonth=" + MMonth + "&MYear=" + MYear + "&YYear=" + YYear + "&Quarter=" + Quarter + "&BudgetYear=" + BudgetYear + "&PersonalId=" + PersonalId + "&IsAdmin=" + $("#IsAdmin").val());

    });


    // Add Exception Time
    $("#ExceptionTime").html('<img src="/img/Loading/Ajax-Loading.gif" width="100"> กำลังโหลด');
    $("#Add").click(function () {
        $.get("/TimeAttendance/ExceptionTime", function (ReturnForm) {
            setTimeout(function () {
                $("#ButtonAdd").modal();
                $("#ExceptionTime").html(ReturnForm);
                $("#StartDay").select2();
                $("#StartMonth").select2();
                $("#StartYear").select2();
                $("#STimeH").select2();
                $("#STimeM").select2();
                $("#ETimeH").select2();
                $("#ETimeM").select2();

                // Birst Day
                $("#StartMonth").change(function () {
                    $.get("/TimeAttendance/GetDay", { "Month": $("#StartMonth").val(), "Year": $("#StartYear").val() }, function (rs) {
                        $("#StartDay").empty();
                        $.each(rs, function (i, val) {
                            $("#StartDay").append($("<option></option>").attr("value", val.value).text(val.text));
                        });
                        $("#StartDay").select2();
                    });
                    $("#StartDay").val($("#StartDay").val()).change();
                });
                $("#StartMonth").val($("#StartMonth").val()).change();


                //Validate Form
                $('#FormAdd').bootstrapValidator();
                $("#ExceptionTime").on("click","#submit", function () {
                    $('#FormAdd').data("bootstrapValidator").validate();
                    if ($('#FormAdd').data("bootstrapValidator").isValid() == true) {
                        var Data = new FormData($("#FormAdd")[0]);
                        $.ajax(
                        {
                            type: "POST",
                            url: "/TimeAttendance/SaveExceptionTime",
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
                                        window.location.href = "/TimeAttendance/Index";
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
                });
            }, 100)
        })
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


    $('#ReportTime').dataTable({
        "lengthMenu": [[30, 40, 50, -1], [30, 40, 50, "All"]],
        "ordering": false,
        "sDom": "<'dt-toolbar'<'col-xs-12 col-sm-6'f><'col-sm-6 col-xs-12 hidden-xs'l>r>" +
            "t" +
            "<'dt-toolbar-footer'<'col-sm-6 col-xs-12 hidden-xs'i><'col-xs-12 col-sm-6'p>>",
        "autoWidth": true,
        "oLanguage": {
            "sSearch": '<span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span>'
        },
        "preDrawCallback": function () {
            if (!responsiveHelper_dt_basic) {
                responsiveHelper_dt_basic = new ResponsiveDatatablesHelper($('#ReportTime'), breakpointDefinition);
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