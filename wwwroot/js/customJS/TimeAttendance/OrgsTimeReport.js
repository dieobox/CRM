$(function () {
  
    $("#MMonth").select2();
    $("#MYear").select2();
    $("#YYear").select2();
    $("#Quarter").select2();
    $("#BudgetYear").select2();
    $("#OrgId").select2();


    var MMonth = $("#MMonth").val();
    var MYear = $("#MYear").val();
    var YYear = $("#YYear").val();
    var Date = $("input[name$='OptionDate']:checked").val();
    var OrgId = $("#OrgId").val();

    $("#OrgTimeReport").html('<img src="/img/Loading/Ajax-Loading.gif" width="100"> กำลังโหลด');
    $.get("/TimeAttendance/OrgAttendanceReport", { "OptionDate": Date, "MMonth": MMonth, "MYear": MYear, "YYear": YYear, "OrgId": $("#CurrentOrg").val() }, function (rs) {
        setTimeout(function () {

            $("#OrgTimeReport").html(rs);

            Datatable();

            $("#ExportExcel").attr("href", "/TimeAttendance/ExportExcelOrg?OptionDate=" + Date + "&MMonth=" + MMonth + "&MYear=" + MYear + "&YYear=" + YYear + "&OrgId=" + $("#CurrentOrg").val());
            $("#ExportPdf").attr("href", "/TimeAttendance/ExportPdfOrg?OptionDate=" + Date + "&MMonth=" + MMonth + "&MYear=" + MYear + "&YYear=" + YYear + "&OrgId=" + $("#CurrentOrg").val());
        });


        $("#Month").change(function () {
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
        });
    });

    $("#Search").click(function () {
        var MMonth = $("#MMonth").val();
        var MYear = $("#MYear").val();
        var YYear = $("#YYear").val();
        var Date = $("input[name$='OptionDate']:checked").val();
        var OrgId = $("#OrgId").val();


        $("#OrgTimeReport").html('<img src="/img/Loading/Ajax-Loading.gif" width="100"> กำลังโหลด');
        $.get("/TimeAttendance/OrgAttendanceReport", { "OptionDate": Date, "MMonth": MMonth, "MYear": MYear, "YYear": YYear, "OrgId": OrgId }, function (rs) {
            setTimeout(function () {

                $("#OrgTimeReport").html(rs);

                Datatable();

                $("#Month").change(function () {
                    $.get("/TimeAttendance/GetDay", { "Month": $("#Month").val(), "Year": $("#Year").val() }, function (rs) {
                        $("#Dday").empty();
                        $.each(rs, function (i, val) {
                            $("#Dday").append($("<option></option>").attr("value", val.value).text(val.text));
                        });
                        $("#Dday").select2();
                        $('#Dday option[value="' + $("#NDay").val() + '"]').attr("selected", "selected");
                    });
                });

                $.get("/Organizations/GetOrgSelectListByOrgType", { "OrgType": 1 }, function (rs) {
                    $.each(rs, function (i, val) {
                        $("#OrgId").append($("<option></option>").attr("value", val.value).text(val.text));
                    });
                    $("#OrgId").select2();
                });

                $("#ExportExcel").attr("href", "/TimeAttendance/ExportExcelOrg?OptionDate=" + Date + "&MMonth=" + MMonth + "&MYear=" + MYear + "&YYear=" + YYear + "&OrgId=" + OrgId);
                $("#ExportPdf").attr("href", "/TimeAttendance/ExportPdfOrg?OptionDate=" + Date + "&MMonth=" + MMonth + "&MYear=" + MYear + "&YYear=" + YYear + "&OrgId=" + OrgId);
            }, 200)
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


    $('#ReportTimeOrg').dataTable({
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
                responsiveHelper_dt_basic = new ResponsiveDatatablesHelper($('#ReportTimeOrg'), breakpointDefinition);
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