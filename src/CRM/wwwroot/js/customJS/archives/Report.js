$(function () {
    $("#TypeCode").select2();
    $("#Month").select2();
    $("#Year").select2();
    $("#OrgCode").select2();

    $select = $('#TypeCode,#Year,#Month,#OrgCode');
    $select.change(function () {
        $(".select2-hidden-accessible").hide();

        $("#ShowArchivesReport").html('<img src="/img/Loading/Ajax-Loading.gif" width="100"> กำลังโหลด');
        $.get("/ArchivesReport/Gets", { "TypeCode": $("#TypeCode").val(), "Month": $("#Month").val(), "Year": $("#Year").val(), "OrgCode": $("#OrgCode").val() }, function (rs) {
            setTimeout(function () {
                $("#ShowArchivesReport").html(rs);
                Datatable();

                
                // VIEW 
                $("#ShowArchivesReport").on("click", ".ViewArchives", function () {
                    var Id = $(this).attr("data-value");
                    $("#MomdalView").html('<img src="/img/Loading/Ajax-Loading.gif" width="100"> กำลังโหลด');
                    $.get("/Archives/ViewArchives", { "Id": Id }, function (rs) {
                        $("#MomdalView").html(rs);
                        $("#ButtonView").modal('show');
                        
                        // รายละเอียดการรับหนังสือ
                        $.get("/Archives/ViewArchivesDetails", { "Id": Id }, function (rs) {
                            $("#ViewArchivesDetails").html('<img src="/img/Loading/Ajax-Loading.gif" width="100"> กำลังโหลด');
                            $("#ViewArchivesDetails").html(rs);
                            pageSetUp();
                        });

                        // เส้นทางของรับหนังสือ
                        $.get("/Archives/ViewRountTransection", { "Id": Id }, function (rs) {
                            $("#RountingTransection").html('<img src="/img/Loading/Ajax-Loading.gif" width="100"> กำลังโหลด');
                            $("#RountingTransection").html(rs);
                            pageSetUp();
                        });

                        // Get Document
                        $.get("/Archives/GetFileDocument", { "Id": Id }, function (rs) {
                            $("#ViewFile").html('<img src="/img/Loading/Ajax-Loading.gif" width="100"> กำลังโหลด');
                            $("#ViewFile").html(rs);
                            pageSetUp();
                        });

                    })
                });


            }, 100)
        })
    });
    $("#Year").val($("#Year").val()).change();


    //Export Excel 
    $("#ExportExcel").click(function () {
        var Type = $("#TypeCode").val();

        //หนังสือรับภายนอก
        if (Type == "01") {
            window.location.href = "/ArchivesReport/ReceivesExternalReport?TypeCode=" + $("#TypeCode").val() + "&Month=" + $("#Month").val() + "&Year=" + $("#Year").val() + "&OrgCode=" + $("#OrgCode").val();

        }

        //หนังสือรับภายใน
        if (Type == "02") {
            $("#loadingExcel").modal("hide");
            window.location.href = "/ArchivesReport/ReceivesInternalReport?TypeCode=" + "04" + "&Month=" + $("#Month").val() + "&Year=" + $("#Year").val() + "&OrgCode=" + $("#OrgCode").val();
        }

        //หนังสือส่งภายนอก
        if (Type == "03") {
            $("#loadingExcel").modal("hide");
            window.location.href = "/ArchivesReport/SendExternalReport?TypeCode=" + $("#TypeCode").val() + "&Month=" + $("#Month").val() + "&Year=" + $("#Year").val() + "&OrgCode=" + $("#OrgCode").val();

        }

        //หนังสือส่งภายใน
        if (Type == "04") {
            $("#loadingExcel").modal("hide");
            window.location.href = "/ArchivesReport/SendInternalReport?TypeCode=" + $("#TypeCode").val() + "&Month=" + $("#Month").val() + "&Year=" + $("#Year").val() + "&OrgCode=" + $("#OrgCode").val();

        }

    });
});






// Datatable 
function Datatable() {
    /* App List using datatable ;*/
    var responsiveHelper_dt_basic = undefined;
    var responsiveHelper_datatable_fixed_column = undefined;
    var responsiveHelper_datatable_col_reorder = undefined;
    var responsiveHelper_datatable_tabletools = undefined;

    var breakpointDefinition = {
        tablet: 1024,
        phone: 480
    };


    $('#Report').dataTable({
        lengthMenu: [
         [10, 20, 30, -1],
         ['10', '20', '30', 'ทั้งหมด']
        ],
        //"order": [[6, 'desc'],[2, 'desc']],
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
                responsiveHelper_dt_basic = new ResponsiveDatatablesHelper($('#Report'), breakpointDefinition);
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