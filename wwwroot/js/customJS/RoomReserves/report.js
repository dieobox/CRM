$(function () {
    $("#Day").select2();
    $("#Month").select2();
    $("#Year").select2();
    $("#PerMonth").select2();
    $("#PerYear").select2();
    $("#BudgetYear").select2();

    var $select = $("#submit");
    $select.click(function () {
        $("#Reports").html('<img src="/img/Loading/Ajax-Loading.gif" width="100"> กำลังโหลด');
        $.get("/RoomReserves/GetReports", { "Filter": $("input[name=Filter]:checked").val(), "Day": $("#Day").val(), "Month": $("#Month").val(), "Year": $("#Year").val(), "PerMonth": $("#PerMonth").val(), "PerYear": $("#PerYear").val(), "BudgetYear": $("#BudgetYear").val() }, function (rs) {
            setTimeout(function () {
                $("#Reports").html(rs);
                InitDatatable();
            }, 300)
        });
    });
    $("#submit").val($("#FilterType").val()).click();

    // Export Excel
    $("#excel").click(function () {
        window.location.href = "/RoomReserves/ExportExcel?Filter=" + $("input[name=Filter]:checked").val() + "&Day=" + $("#Day").val() + "&Month=" + $("#Month").val() + "&Year=" + $("#Year").val() + "&PerMonth=" + $("#PerMonth").val() + "&PerYear=" + $("#PerYear").val() + "&BudgetYear=" + $("#BudgetYear").val();
    });

    // Export PDf
    $("#pdf").click(function () {
        var Url = "/RoomReserves/ExportPdf?Filter=" + $("input[name=Filter]:checked").val() + "&Day=" + $("#Day").val() + "&Month=" + $("#Month").val() + "&Year=" + $("#Year").val() + "&PerMonth=" + $("#PerMonth").val() + "&PerYear=" + $("#PerYear").val() + "&BudgetYear=" + $("#BudgetYear").val();
        window.open(Url, "_blank");
    });
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

    $('#tb-report').dataTable({
        lengthMenu: [
         [30, 40, 50, -1],
         ['30', '40', '50', 'ทั้งหมด']
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
            if (!responsiveHelper_dt_basic) {
                responsiveHelper_dt_basic = new ResponsiveDatatablesHelper($('#tb-report'), breakpointDefinition);
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

