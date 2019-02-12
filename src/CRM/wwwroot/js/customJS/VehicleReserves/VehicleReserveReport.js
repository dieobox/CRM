$(function () {
    $("#Dday").select2();
    $("#Month").select2();
    $("#Year").select2();
    $("#MMonth").select2();
    $("#MYear").select2();
    $("#YYear").select2();
    $("#BudgetYear").select2();
    $("#VehicleType").select2();
    $(".select2-hidden-accessible").hide();

    var ReportType = $("input[name$='ReportType']:checked").val();
    var DDay = $("#Dday").val();
    var Month = $("#Month").val();
    var Year = $("#Year").val();
    var MMonth = $("#MMonth").val();
    var MYear = $("#MYear").val();
    var YYear = $("#YYear").val();
    var BudgetYear = $("#BudgetYear").val();
    var VehicleType = $("#VehicleType").val();

    $("#VehicleReserveReport").html('<img src="/img/Loading/Ajax-Loading.gif" width="100"> กำลังโหลด');
    $.get("/VehicleReserves/GetVehicleReserveReport", { "Dday": DDay, "Month": Month, "Year": Year, "ReportType": ReportType, "MMonth": MMonth, "MYear": MYear, "BudgetYear": BudgetYear, "VehicleType": VehicleType }, function (rs) {
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



        setTimeout(function () {
            $("#VehicleReserveReport").html(rs);
            Datatable();
            $("#ExportExcel").attr("href", "/VehicleReserves/ExportExcelReserveReport?Dday=" + DDay + "&Month=" + Month + "&Year=" + Year + "&ReportType=" + ReportType + "&MMonth=" + MMonth + "&MYear=" + MYear + "&BudgetYear=" + BudgetYear);
            $("#ExportPdf").attr("href", "/VehicleReserves/ExportPdfReserveReport?Dday=" + DDay + "&Month=" + Month + "&Year=" + Year + "&ReportType=" + ReportType + "&MMonth=" + MMonth + "&MYear=" + MYear + "&BudgetYear=" + BudgetYear);
        });

    });

    $("#Search").click(function () {
        var ReportType = $("input[name$='ReportType']:checked").val();
        var DDay = $("#Dday").val();
        var Month = $("#Month").val();
        var Year = $("#Year").val();
        var MMonth = $("#MMonth").val();
        var MYear = $("#MYear").val();
        var BudgetYear = $("#BudgetYear").val();
        var VehicleType = $("#VehicleType").val();

        $("#VehicleReserveReport").html('<img src="/img/Loading/Ajax-Loading.gif" width="100"> กำลังโหลด');
        $.get("/VehicleReserves/GetVehicleReserveReport", { "Dday": DDay, "Month": Month, "Year": Year, "ReportType": ReportType, "MMonth": MMonth, "MYear": MYear, "BudgetYear": BudgetYear, "VehicleType": VehicleType }, function (rs) {
            $("#Month").change(function () {
                $.get("/TimeAttendance/GetDay", { "Month": $("#Month").val(), "Year": $("#Year").val() }, function (rs) {
                    $("#Dday").empty();
                    $.each(rs, function (i, val) {
                        $("#Dday").append($("<option></option>").attr("value", val.value).text(val.text));
                    });
                    $("#Dday").select2();
                });
            });



            setTimeout(function () {
                $("#VehicleReserveReport").html(rs);
                Datatable();
                $("#ExportExcel").attr("href", "/VehicleReserves/ExportExcelReserveReport?Dday=" + DDay + "&Month=" + Month + "&Year=" + Year + "&ReportType=" + ReportType + "&MMonth=" + MMonth + "&MYear=" + MYear + "&BudgetYear=" + BudgetYear);
                $("#ExportPdf").attr("href", "/VehicleReserves/ExportPdfReserveReport?Dday=" + DDay + "&Month=" + Month + "&Year=" + Year + "&ReportType=" + ReportType + "&MMonth=" + MMonth + "&MYear=" + MYear + "&BudgetYear=" + BudgetYear);
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


    $('#VehicleReserve').dataTable({
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
                responsiveHelper_dt_basic = new ResponsiveDatatablesHelper($('#VehicleReserve'), breakpointDefinition);
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