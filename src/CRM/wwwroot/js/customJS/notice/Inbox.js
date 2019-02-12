$(function () {

    $("#Month").select2();
    $("#Year").select2();

    var $select = $("#Month, #Year");
    $select.change(function () {

        $(".select2-hidden-accessible").hide();

        var Year = $("#Year").val();
        var Month = $("#Month").val();

        $.get("/Notice/GetsInbox", { "Year": Year, "Month": Month }, function (RS) {
            $("#Inbox").html('<img src="/img/Loading/Ajax-Loading.gif" width="100"> กำลังโหลด');
            setTimeout(function () {
                $("#Inbox").html(RS);
                DataTable();


                // View PDF File
                $("#Inbox").on("click",".ViewPDF",function () {
                    $("#MomdalViewPDF").html('<img src="/img/Loading/Ajax-Loading.gif" width="100"> กำลังโหลด');
                    var Id = $(this).attr("data-value");
                    $.get("/Notice/ViewPDF", { "Id": Id }, function (Result) {
                        setTimeout(function () {
                            $("#MomdalViewPDF").html(Result);
                        }, 100)
                    })
                });


                // View Detail
                $("#Inbox").on("click",".ViewDetail",function () {
                    $("#ShowDetail").html('<img src="/img/Loading/Ajax-Loading.gif" width="100"> กำลังโหลด');
                    var Id = $(this).attr("data-value");
                    $.get("/Notice/ViewDetail", { "ID": Id }, function (RS) {
                        setTimeout(function () {
                            $("#ShowDetail").html(RS);
                        }, 100)
                    })
                });

            }, 100)
        });
    });
    $("#Month").val($("#Month").val()).change();


    //Auto Refreash
    setInterval(function () {
         $("#Month").val($("#Month").val()).change();
    }, 60000);
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

    $('#InboxTable').dataTable({
        lengthMenu: [
         [10, 20, 30, -1],
         ['10', '20', '30', 'ทั้งหมด']
        ],
        "order": [[ 5, 'desc' ]],
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
                responsiveHelper_dt_basic = new ResponsiveDatatablesHelper($('#InboxTable'), breakpointDefinition);
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