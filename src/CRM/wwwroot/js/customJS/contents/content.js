$(function () {

    $("#ContentTypeId").select2();

    $("#Contents").html('<img src="/img/Loading/Ajax-Loading.gif" width="100"> กำลังโหลด');
    var $select = $("#ContentTypeId");
    $select.change(function () {
        $.get("/ContentManagement/GetContents", { "ContentTypeId": $("#ContentTypeId").val() }, function (rs) {
            setTimeout(function () {
                $("#Contents").html(rs);
                InitDatatable();

                // edit
                $("#tb_Contents").on("click", ".edit", function () {
                    var ID = $(this).val();
                    var Url = '/ContentManagement/FormEditContent';
                    window.location.href = Url + '/?ContentId=' + ID;
                    $("#ContentTypeId").select2();
                   
                    ////Validate Form
                    //$('#FormEdit').bootstrapValidator();
                    //$("#submit").click(function () {
                    //    $('#FormEdit').data("bootstrapValidator").validate();
                    //    if ($('#FormEdit').data("bootstrapValidator").isValid() == true) {
                    //        $("#Html").val(CKEDITOR.instances.HtmlEditor.getData());
                    //        var Data = new FormData($("#FormEdit")[0]);
                    //        $.ajax(
                    //        {
                    //            type: "POST",
                    //            url: "/ContentManagement/EditContent",
                    //            contentType: false,
                    //            processData: false,
                    //            data: Data,
                    //            success: function (response) {
                    //                if (response.valid == true) {
                    //                    $.smallBox({
                    //                        title: response.message,
                    //                        content: "<i class='fa fa-clock-o'></i> <i>" + response.message + "</i>",
                    //                        color: "#296191", // red color code #FB0404
                    //                        iconSmall: "fa fa-thumbs-up bounce animated",
                    //                        timeout: 2000
                    //                    });
                    //                    setTimeout(function () {
                    //                        window.location.href = "/ContentManagement/Index";
                    //                    }, 1000)
                    //                } else {
                    //                    $.smallBox({
                    //                        title: response.message,
                    //                        content: "<i class='fa fa-clock-o'></i> <i>" + response.message + "</i>",
                    //                        color: "#FB0404", // red color code #FB0404
                    //                        iconSmall: "fa fa-thumbs-up bounce animated",
                    //                        timeout: 2000
                    //                    });
                    //                    setTimeout(function () {
                    //                        $("#submit").removeAttr("disabled")
                    //                    }, 5000)
                    //                }
                    //            }
                    //        })
                    //    }
                    //});
                });
             

                // delete
                $("#tb_Contents").on("click", ".delete", function (e) {
                    var ContentId = $(this).val();
                    $.SmartMessageBox({
                        title: "คำเตือน!",
                        content: "ต้องการลบรายการนี้หรือไม่?",
                        buttons: '[ไม่][ใช่]'
                    }, function (ButtonPressed) {
                        if (ButtonPressed == "ใช่") {
                            $.get("/ContentManagement/DeleteContent", { "ContentId": ContentId }, function (response) {
                                if (response.valid == true) {
                                    $.smallBox({
                                        title: response.message,
                                        content: "<i class='fa fa-clock-o'></i> <i>" + response.message + "</i>",
                                        color: "#296191", // red color code #FB0404
                                        iconSmall: "fa fa-thumbs-up bounce animated",
                                        timeout: 2000
                                    });
                                    setTimeout(function () {
                                        window.location.href = "/ContentManagement/Index";
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
                            })
                        }
                        if (ButtonPressed == "ไม่") {

                        }
                    });
                    e.preventDefault();
                });

            }, 300)
        });
    });
   
    $("#ContentTypeId").val($("#ContentTypeId").val()).change();
    
    // Add
    $("#add").click(function () {
        $("#ContentTypeId").select2();
        $.get("/ContentManagement/FormAddContent", function (rs) {
            $("#MomdalFormAdd").html(rs);
            $("#ButtonAdd").modal("show");

            //CKEDITOR
            CKEDITOR.replace('HtmlEditor', {
                height: '500px',
                startupFocus: true,
                filebrowserImageBrowseUrl: '/uploads/contents/',
                filebrowserImageUploadUrl: '/ContentManagement/CkUpload',
               
            });
          
            //Validate Form
            $('#FormAdd').bootstrapValidator();
            $("#submit").click(function () {
                $('#FormAdd').data("bootstrapValidator").validate();
                if ($('#FormAdd').data("bootstrapValidator").isValid() == true) {
                    $("#Html").val(CKEDITOR.instances.HtmlEditor.getData());
                    var Data = new FormData($("#FormAdd")[0]);
                    $.ajax(
                    {
                        type: "POST",
                        url: "/ContentManagement/AddContent",
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
                                    window.location.href = "/ContentManagement/Index";
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
        })
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

    $('#tb_Contents').dataTable({
        lengthMenu: [
         [10, 30, 40, -1],
         ['10', '30', '40', 'ทั้งหมด']
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
                responsiveHelper_dt_basic = new ResponsiveDatatablesHelper($('#tb_Contents'), breakpointDefinition);
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