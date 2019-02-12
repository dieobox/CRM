$(function () {

    $("#Month").select2();
    $("#Year").select2();

    var $select = $("#Month, #Year");
    $select.change(function () {

        $(".select2-hidden-accessible").hide();

        var Year = $("#Year").val();
        var Month = $("#Month").val();

        $.get("/Notice/Gets", {"Month": Month, "Year" : Year}, function (RS) {
            $("#SendLists").html('<img src="/img/Loading/Ajax-Loading.gif" width="100"> กำลังโหลด');
            setTimeout(function () {
                $("#SendLists").html(RS);
                DataTable();


                // View PDF File
                $("#SendLists").on("click", ".ViewPDF", function () {
                    $("#MomdalViewPDF").html('<img src="/img/Loading/Ajax-Loading.gif" width="100"> กำลังโหลด');
                    var Id = $(this).attr("data-value");
                    $.get("/Notice/ViewPDF", { "Id": Id }, function (Result) {
                        setTimeout(function () {
                            $("#MomdalViewPDF").html(Result);
                        }, 100)
                    })
                });


                // View Detail
                $("#SendLists").on("click", ".ViewDetail", function () {
                    $("#ShowDetail").html('<img src="/img/Loading/Ajax-Loading.gif" width="100"> กำลังโหลด');
                    var Id = $(this).attr("data-value");
                    $.get("/Notice/ViewDetail", { "ID": Id }, function (RS) {
                        setTimeout(function () {
                            $("#ShowDetail").html(RS);
                        }, 100)
                    })
                });

                // Edit
                $("#SendLists").on("click", ".edit", function () {
                    $("#FormEdit").html('<img src="/img/Loading/Ajax-Loading.gif" width="100"> กำลังโหลด');
                    var Id = $(this).val();
                    $.get("/Notice/FormEditNotice", { "Id": Id }, function (RS) {
                        setTimeout(function () {
                            $("#FormEdit").html(RS);
                            $("#OrgId2").select2();

                            $('#OrgId').multiselect({
                                enableClickableOptGroups: true,
                                enableFiltering: true,
                                maxHeight: 200,
                                numberDisplayed: 1
                            });

                            var value = $("input[name$='NoticeType']:checked").val();
                            if (value == "ALL") {
                                $("#OrgId").find('option:selected').removeAttr("selected");
                                $("#OrgId2").select2("val", "");
                                $("#IsOrg").hide();
                                $("#IsPerson").hide();
                            } else if (value == "Org") {
                                $("#OrgId2").select2("val", "");
                                $("#IsOrg").show();
                                $("#IsPerson").hide();
                            } else {
                                $("#OrgId").find('option:selected').removeAttr("selected");
                                $("#IsOrg").hide();
                                $("#IsPerson").show();
                            }

                            Datepicker();

                            // Type
                            $("input[name$='NoticeType']").change(function () {
                                var NoticeType = $(this).val();
                                if (NoticeType == "ALL") {
                                    $('#OrgId option:selected').each(function () {
                                        $(this).prop('selected', false);
                                    })
                                    $('#OrgId').multiselect('refresh');
                                    $("#OrgId2").select2("val", "");
                                    $("#IsOrg").hide();
                                    $("#IsPerson").hide();
                                } else if (NoticeType == "Org") {
                                    $("#OrgId2").select2("val", "");
                                    $("#IsOrg").show();
                                    $("#IsPerson").hide();
                                } else {
                                    $('#OrgId option:selected').each(function () {
                                        $(this).prop('selected', false);
                                    })
                                    $('#OrgId').multiselect('refresh');
                                    $("#IsOrg").hide();
                                    $("#IsPerson").show();
                                }
                            });

                            var initializeDuallistbox = $('#Users').bootstrapDualListbox({
                                nonSelectedListLabel: 'Non-selected',
                                selectedListLabel: 'Selected',
                                preserveSelectionOnMove: 'moved',
                                moveOnSelect: false,
                                nonSelectedFilter: ''
                            });

                            // Get ParentMenu
                            $("#OrgId2").click(function () {
                                $("#ShowPersonList").show();
                                var OrgId = $(this).val();
                                $.ajax(
                                   {
                                       type: "GET",
                                       url: "/Notice/GetSelectUsers?OrgId=" + OrgId,
                                       cache: false,
                                       success: function (results) {
                                           //$("#Users").empty();
                                           $.each(results, function (i, val) {
                                               //$("#Users").append($("<option></option>").attr("value", val.value).text(val.text));
                                               initializeDuallistbox.append($("<option></option>").attr("value", val.value).text(val.text));
                                               initializeDuallistbox.bootstrapDualListbox('refresh');
                                           });
                                       },
                                       error: function (response) {
                                           Notify('เกิดความผิดพลาด กรุณาตรวจสอบข้อมูล', 'top-right', '5000', 'danger', 'fa-desktop', true);
                                       }
                                   });
                            });

                            $("#ViewFiles").click(function () {
                                $("#ShowFiles").slideToggle("slow");
                            });

                            $("#ViewOrgs").click(function () {
                                $("#ShowOrgs").slideToggle("slow");
                            });

                            $("#ViewUsers").click(function () {
                                $("#ShowUsers").slideToggle("slow");
                            });

                            $('#FormEditNotice').bootstrapValidator();
                            $("#submit").click(function () {
                                $('#FormEditNotice').data("bootstrapValidator").validate();
                                if ($('#FormEditNotice').data("bootstrapValidator").isValid() == true) {
                                    var Data = new FormData($("#FormEditNotice")[0]);
                                    $.ajax(
                                    {
                                        type: "POST",
                                        url: "/Notice/EditNotice",
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
                                                    window.location.href = "/Notice/Index";
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
                                                    window.location.href = "/Notice/Index";
                                                }, 1000)
                                            }
                                        }
                                    });
                                }
                            });

                        }, 100)
                    })
                });


                // Del Notice
                $("#SendLists").on("click", ".delete", function (e) {
                    var Id = $(this).val();
                    $.SmartMessageBox({
                        title: "คำเตือน!",
                        content: "ต้องการลบรายการนี้หรือไม่?",
                        buttons: '[ไม่][ใช่]'
                    }, function (ButtonPressed) {
                        if (ButtonPressed == "ใช่") {
                            $.get("/Notice/Delete", { "Id": Id }, function (rs) {
                                if (rs.valid == true) {
                                    $.smallBox({
                                        title: rs.message,
                                        content: "<i class='fa fa-clock-o'></i> <i>2 seconds ago...</i>",
                                        color: "#296191", // red color code #FB0404
                                        iconSmall: "fa fa-thumbs-up bounce animated",
                                        timeout: 1000
                                    });
                                    setTimeout(function () {
                                        window.location.href = "/Notice/Index";
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
                                        window.location.href = "/Notice/Index";
                                    }, 1000)
                                }
                            })
                        }
                        if (ButtonPressed == "ไม่") {

                        }
                    });
                    e.preventDefault();
                });


            }, 100)
        });
    });
    $("#Year").val($("#Year").val()).change();
    

    // Form Add
    $("#add").click(function () {
        $("#MomdalFormAdd").html('<img src="/img/Loading/Ajax-Loading.gif" width="100"> กำลังโหลด');
        $.get("/Notice/FormAddNotice", function (rs) {
            setTimeout(function () {
                $("#MomdalFormAdd").html(rs);
                $("#OrgId2").select2();

                $('#OrgId').multiselect({
                    enableClickableOptGroups: true,
                    enableFiltering: true,
                    maxHeight: 200,
                    numberDisplayed: 1
                });

                // Type
                $("input[name$='NoticeType']").change(function () {
                    var NoticeType = $(this).val();
                    if (NoticeType == "ALL") {
                        $('#OrgId option:selected').each(function () {
                            $(this).prop('selected', false);
                        })
                        $('#OrgId').multiselect('refresh');
                        $("#OrgId2").select2("val", "");
                        $("#IsOrg").hide();
                        $("#IsPerson").hide();
                    } else if (NoticeType == "Org") {
                        $("#OrgId2").select2("val", "");
                        $("#IsOrg").show();
                        $("#IsPerson").hide();
                    } else {
                        $('#OrgId option:selected').each(function () {
                            $(this).prop('selected', false);
                        })
                        $('#OrgId').multiselect('refresh');
                        $("#IsOrg").hide();
                        $("#IsPerson").show();

                        var initializeDuallistbox = $('#Users').bootstrapDualListbox({
                            nonSelectedListLabel: 'Non-selected',
                            selectedListLabel: 'Selected',
                            preserveSelectionOnMove: 'moved',
                            moveOnSelect: false,
                            nonSelectedFilter: ''
                        });

                        // Get ParentMenu
                        $("#OrgId2").click(function () {
                            $("#ShowPersonList").show();
                            var OrgId = $(this).val();
                            $.ajax(
                               {
                                   type: "GET",
                                   url: "/Notice/GetSelectUsers?OrgId=" + OrgId,
                                   cache: false,
                                   success: function (results) {
                                       //initializeDuallistbox.empty();
                                       //$("#Users").find('option:selected').bootstrapDualListbox('refresh', true);
                                       $.each(results, function (i, val) {
                                           //$("#Users").append($("<option></option>").attr("value", val.value).text(val.text));
                                           initializeDuallistbox.append($("<option></option>").attr("value", val.value).text(val.text));
                                           initializeDuallistbox.bootstrapDualListbox('refresh');
                                       });
                                       //initializeDuallistbox.bootstrapDualListbox('destroy', true);
                                   },
                                   error: function (response) {
                                       Notify('เกิดความผิดพลาด กรุณาตรวจสอบข้อมูล', 'top-right', '5000', 'danger', 'fa-desktop', true);
                                   }
                               });
                        });
                    }
                });

                Datepicker();

                $('#FormAddNotice').bootstrapValidator();
                $("#submit").click(function () {
                    $('#FormAddNotice').data("bootstrapValidator").validate();
                    if ($('#FormAddNotice').data("bootstrapValidator").isValid() == true) {
                        var Data = new FormData($("#FormAddNotice")[0]);
                        $.ajax(
                        {
                            type: "POST",
                            url: "/Notice/AddNotice",
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
                                        window.location.href = "/Notice/Index";
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
                                        window.location.href = "/Notice/Index";
                                    }, 1000)
                                }
                            }
                        })
                    }
                });

            },100)
        });
    });
    
});

function Datepicker() {
    $('#NoticeDate').datepicker({
        language: 'th-TH',
        defaultDate: new Date(),
        format: 'yyyy/mm/dd'
    });
}

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

    $('#Notice-list').dataTable({
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
                responsiveHelper_dt_basic = new ResponsiveDatatablesHelper($('#Notice-list'), breakpointDefinition);
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


//function EditNotices(){
//    $("#SendLists").on("click", ".edit", function () {
//        alert($(this).val());
//        $("#MomdalView").html('<img src="/img/Loading/Ajax-Loading.gif" width="100"> กำลังโหลด');
//        $.get("/Notice/FormEditNotice", { "NoticeId" : $(this).val()} ,function (rs) {


//            $('#FormEditNotice').bootstrapValidator();
//            $("#submit").click(function () {
//                $('#FormEditNotice').data("bootstrapValidator").validate();
//                if ($('#FormEditNotice').data("bootstrapValidator").isValid() == true) {
//                    var Data = new FormData($("#FormEditNotice")[0]);
//                    $.ajax(
//                    {
//                        type: "POST",
//                        url: "/Notice/EditNotice",
//                        contentType: false,
//                        processData: false,
//                        data: Data,
//                        success: function (response) {
//                            if (response.valid == true) {
//                                $.smallBox({
//                                    title: response.message,
//                                    content: "<i class='fa fa-clock-o'></i> <i>" + response.message + "</i>",
//                                    color: "#296191", // red color code #FB0404
//                                    iconSmall: "fa fa-thumbs-up bounce animated",
//                                    timeout: 2000
//                                });
//                                setTimeout(function () {
//                                    window.location.href = "/Notice/Index";
//                                }, 1000)
//                            } else {
//                                $.smallBox({
//                                    title: response.message,
//                                    content: "<i class='fa fa-clock-o'></i> <i>" + response.message + "</i>",
//                                    color: "#FB0404", // red color code #FB0404
//                                    iconSmall: "fa fa-thumbs-up bounce animated",
//                                    timeout: 2000
//                                });
//                                setTimeout(function () {
//                                    window.location.href = "/Notice/Index";
//                                }, 1000)
//                            }
//                        }
//                    });
//                }
//            });
//        });
//    });
//}