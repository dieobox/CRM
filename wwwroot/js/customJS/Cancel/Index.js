$(function () {
    // Type Book
    $("#OrgCode").select2();
    $("#TypeCode").select2();
    $("#Year").select2();
    $("#Month").select2();

    var $select = $('#TypeCode,#Year,#Month,#OrgCode');
    $select.change(function () {
        // Get value 
        var OrgCode = $("#OrgCode").val();
        var TypeCode = $("#TypeCode").val();
        var Year = $("#Year").val();
        var Month = $("#Month").val();

        $("#ShowArchivesCancel").html('<img src="/img/Loading/Ajax-Loading.gif" width="100"> กำลังโหลด');
        $.get("/CancelArchives/Gets", { "OrgCode": OrgCode, "TypeCode": TypeCode, "Year": Year, "Month": Month }, function (rs) {
            setTimeout(function () {
                $("#ShowArchivesCancel").html(rs);
                Datatable();

                // Restore
                $("#ShowArchivesCancel").on("click",".edit",function () {
                    $("#ModalEdit").html('<img src="/img/Loading/Ajax-Loading.gif" width="100"> กำลังโหลด');
                    var Id = $(this).val();
                    $.get("/CancelArchives/FormRestoreArchive", { "Id": Id }, function (Result) {
                        setTimeout(function () {
                            $("#ModalEdit").html(Result);

                            $("#submit").click(function () {
                                $.SmartMessageBox({
                                    title: "คำเตือน!",
                                    content: "ต้องการใช้งานหนังสือนี้หรือไม่?",
                                    buttons: '[ไม่][ใช่]'
                                }, function (ButtonPressed) {
                                    if (ButtonPressed == "ใช่") {
                                        $.post("/CancelArchives/RestoreArchive", { "ArchiveId": $("#ArchiveId").val() }, function (response) {
                                            //alert(response);
                                            if (response.valid == true) {
                                                $.smallBox({
                                                    title: response.message,
                                                    content: "<i class='fa fa-clock-o'></i> <i>" + response.message + "</i>",
                                                    color: "#296191", // red color code #FB0404
                                                    iconSmall: "fa fa-thumbs-up bounce animated",
                                                    timeout: 2000
                                                });
                                                setTimeout(function () {
                                                    window.location.href = "/CancelArchives/Index";
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
                                                    window.location.href = "/CancelArchives/Index";
                                                }, 1000)
                                            }
                                        });
                                    }
                                    if (ButtonPressed == "ไม่") {

                                    }
                                });
                                e.preventDefault();
                            });
                        }, 100)
                    })
                });

                // DELETE
                $("#ShowArchivesCancel").on("click", ".delete", function () {
                    var Id = $(this).val();
                    $.SmartMessageBox({
                        title: "คำเตือน!",
                        content: "ต้องการลบรายการนี้หรือไม่?",
                        buttons: '[ไม่][ใช่]'
                    }, function (ButtonPressed) {
                        if (ButtonPressed == "ใช่") {
                            $.get("/CancelArchives/Delete", { "Id": Id }, function (rs) {
                                if (rs.valid == true) {
                                    $.smallBox({
                                        title: rs.message,
                                        content: "<i class='fa fa-clock-o'></i> <i>2 seconds ago...</i>",
                                        color: "#296191", // red color code #FB0404
                                        iconSmall: "fa fa-thumbs-up bounce animated",
                                        timeout: 1000
                                    });
                                    setTimeout(function () {
                                        window.location.href = "/CancelArchives/Index";
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
                                        window.location.href = "/CancelArchives/Index";
                                    }, 1000)
                                }
                            })
                        }
                        if (ButtonPressed == "ไม่") {
                            // Somthing
                        }
                    });
                    e.preventDefault();
                });

            })
        });
    });
    $("#OrgCode").val($("#OrgCode").val()).change();
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

    $('#Cancel').dataTable({
        lengthMenu: [
         [10, 20, 30, -1],
         ['10', '20', '30', 'ทั้งหมด']
        ],
        "order": [[5, 'desc']],
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
                responsiveHelper_dt_basic = new ResponsiveDatatablesHelper($('#Cancel'), breakpointDefinition);
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