$(function () {

    // Type Book
    $("#TypeCode").select2();
    $("#Year").select2();
    $("#Month").select2();
    $("#OrgFilter").select2();
    var CurrentType = $("#CurrentType").val();
    if (CurrentType == 1)
    {
        var $select = $('#TypeCode,#Year,#Month,#OrgFilter');
    }
    else
    {
        var $select = $('#Year,#Month,#OrgFilter');
    }
    
    
    $select.change(function () {
        // Get value 

        $(".select2-hidden-accessible").hide();


        var TypeCode = $("#TypeCode").val();
        var Year = $("#Year").val();
        var Month = $("#Month").val();
        var OrgFilter = $("#OrgFilter").val();
        $("#add").attr("data-value", OrgFilter);

        $.get("/Archives/GetOrganizationName", { "OrgCode": OrgFilter }, function (RS) {
            setTimeout(function () {
                $("#ShowOrgName").html(RS);
            }, 100)
        });

        $("#ShowArchives").html('<img src="/img/Loading/Ajax-Loading.gif" width="100"> กำลังโหลด');
        $.get("/Archives/GetsReceives", { "TypeCode": TypeCode, "Year": Year, "Month": Month, "OrgFilter": OrgFilter }, function (rs) {
            setTimeout(function () {
                $("#ShowArchives").html(rs);
                Datatable();
                pageSetUp();

                // VIEW 
                $("#Receives").on("click", ".ViewArchives", function () {
                    $("#ModalView").html('<img src="/img/Loading/Ajax-Loading.gif" width="100"> กำลังโหลด');
                    var Id = $(this).attr("data-value");
                    $.get("/Archives/ViewArchives", { "Id": Id }, function (rs) {
                        $("#ModalView").html(rs);
                        $("#ButtonView").modal("show");

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

                //$(".edit").attr("data-value", OrgFilter);
                // EDIT
                $("#Receives").on("click", ".edit", function () {
                    var Id = $(this).val();
                    $("#ModalEdit").html('<img src="/img/Loading/Ajax-Loading.gif" width="100"> กำลังโหลด');
                    //var Id = $(this).attr("data-value");
                    $.get("/Archives/ManageArchives", { "Id": Id, "OrgFilter": OrgFilter }, function (rs) {
                        $("#ModalEdit").html(rs);
                        $("#ButtonEdit").modal("show");


                        var OrgArchivesNumber = $("#OrgArchivesNumber").val();
                        var OrgCode = $("#OrgCode").val();

                        // ออกเลขหนังสือ
                        ArchiveNumber(Id, OrgCode, OrgArchivesNumber);

                        // ลงรับหนังสือ และ ดำเนินการต่อ
                        ReceiveArchive(Id, OrgCode);

                        // ดำเนินการต่อ
                        //ForwardArchive(Id, OrgCode);

                    })
                });

                // UPDATE
                $("#Receives").on("click", ".update", function () {
                    var Id = $(this).val();
                    $("#ModalEdit").html('<img src="/img/Loading/Ajax-Loading.gif" width="100"> กำลังโหลด');
                    //var Id = $(this).attr("data-value");
                    $.get("/Archives/FormEditExternalBook", { "Id": Id }, function (rs) {
                        $("#ModalEdit").html(rs);
                        $("#ButtonUpdate").modal("show");

                        $("#AccessLevel").select2();
                        $("#Expedition").select2();
                        $("#FinalStatus").select2();

                        $("#InDay").select2();
                        $("#InMonth").select2();
                        $("#InYear").select2();

                        $("#FormEditArchives").bootstrapValidator();
                        $("#FormEditArchives").on("click", "#submit", function () {
                            $('#FormEditArchives').data("bootstrapValidator").validate();
                            if ($('#FormEditArchives').data("bootstrapValidator").isValid() == true) {
                                var Data = new FormData($("#FormEditArchives")[0]);
                                $.ajax(
                                {
                                    type: "POST",
                                    url: "/Archives/EditExternalBook",
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
                                                window.location.href = "/Archives/Receives";
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
                                                window.location.href = "/Archives/Receives";
                                            }, 1000)
                                        }
                                    }
                                })
                            }
                        })
                    })
                });

            }, 100)
        });
        
    });
    $("#Month").val($("#Month").val()).change();
    
    //Auto Refreash
    setInterval(function () {
        $("#Month").val($("#Month").val()).change();
    }, 300000);
    

    // Add Archives
    $("#add").click(function () {
        $.get("/Archives/GetExternalBook", { "OrgFilter": $(this).attr("data-value") }, function (ReturnForm) {
            $("#ModalFormAdd").html(ReturnForm);
            $('#ButtonAdd').modal("show");
            $("#AccessLevel").select2();
            $("#Expedition").select2();
            $("#FinalStatus").select2();

            $("#InDay").select2();
            $("#InMonth").select2();
            $("#InYear").select2();

            var $change = $("#InMonth , #InYear");
            $change.change(function () {
                // alert($("#MonthofDoc").val()+"/////"+$("#YearofDoc").val());
                $.get("/TimeAttendance/GetDay", { "Month": $("#InMonth").val(), "Year": $("#InYear").val() }, function (rs) {
                    $("#InDay").empty();
                    $.each(rs, function (i, val) {
                        $("#InDay").append($("<option></option>").attr("value", val.value).text(val.text));
                        $('#InDay option[value="' + $("#DayofDocHidden").val() + '"]').attr("selected", "selected");
                    });
                    $("#InDay").select2();
                });
                $("#InDay").val($("#InDay").val()).change();
            });
            $("#InYear").val($("#InYear").val()).change();
            //Datepicker();

            $("#FormAddArchives").bootstrapValidator();
            $("#FormAddArchives").on("click", "#submit", function () {
                $('#FormAddArchives').data("bootstrapValidator").validate();
                if ($('#FormAddArchives').data("bootstrapValidator").isValid() == true) {
                    var Data = new FormData($("#FormAddArchives")[0]);
                    $.ajax(
                    {
                        type: "POST",
                        url: "/Archives/SaveExternalBook",
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
                                    window.location.href = "/Archives/Receives";
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
                                    window.location.href = "/Archives/Receives";
                                }, 1000)
                            }
                        }
                    })
                }
            })
        });
    });
});

function Datepicker() {
    $('#RegisterDate').datepicker({
        language: 'th-TH',
        defaultDate: new Date(),
        format: 'yyyy/mm/dd'
    });
}


function ArchiveNumber(Id, OrgCode, OrgArchivesNumber) {
    $.get("/Archives/AddNumberArchive", { "Id": Id, "OrgArchivesNumber": OrgArchivesNumber, "OrgCode": OrgCode }, function (rs) {
                $("#AddNumberArchive").html('<img src="/img/Loading/Ajax-Loading.gif" width="100"> กำลังโหลด');
                $("#AddNumberArchive").html(rs);
                pageSetUp();

                $('#AddNumber').click(function () {
                    if ($(this).is(':checked')) {
                        $("#ShowArchivesNumber").show();
                    } else {
                        $("#ShowArchivesNumber").hide();
                    }
                });

                $("#submit").click(function () {
                    //var Data = new FormData($("#AddNumberArchive")[0]);
                    $.SmartMessageBox({
                        title: "คำเตือน!",
                        content: "ต้องการออกเลขหนังสือหรือไม่?",
                        buttons: '[ไม่][ใช่]'
                    }, function (ButtonPressed) {
                        if (ButtonPressed == "ใช่") {
                            $.post("/Archives/DoAddNumberArchive", { "ArchiveId": $("#ArchiveId").val(), "ArchiveNumber": $("#ArchiveNumber").val(), "OrgCode": $("#OrgCode").val() }, function (response) {
                                if (response.valid == true) {
                                    $.smallBox({
                                        title: response.message,
                                        content: "<i class='fa fa-clock-o'></i> <i>" + response.message + "</i>",
                                        color: "#296191", // red color code #FB0404
                                        iconSmall: "fa fa-thumbs-up bounce animated",
                                        timeout: 2000
                                    });
                                    setTimeout(function () {
                                        ArchiveNumber(Id, OrgCode, OrgArchivesNumber);
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
                                        ArchiveNumber(Id, OrgCode, OrgArchivesNumber);
                                    }, 1000)
                                }
                            });
                        }
                        if (ButtonPressed == "ไม่") {

                        }
                    });
                    e.preventDefault();

                })
            });
}

function ReceiveArchive(Id,OrgCode) {
    $.get("/Archives/ReceiveArchive", { "Id": Id, "OrgCode": OrgCode }, function (rs) {
        $("#ReceiveArchive").html('<img src="/img/Loading/Ajax-Loading.gif" width="100"> กำลังโหลด');
        $("#ReceiveArchive").html(rs);
        pageSetUp();
        
        $("#btsubmit").click(function () {
            //var Data = new FormData($("#AddNumberArchive")[0]);
            $.post("/Archives/DoReceiveArchive", { "ReceiveNumber": $("#ReceiveNumber").val(), "Comment": $("#Comment").val(), "LastId": $("#LastId").val(), "ReceiveByPCode": $("#ReceiveByPCode").val(), "BeforeLastId": $("#BeforeLastId").val() }, function (response) {
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
                        ReceiveArchive(Id, OrgCode);
                        $("#Month").val($("#Month").val()).change();
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
                        ReceiveArchive(Id, OrgCode);
                    }, 1000)
                }
            });

        })

        $("#btreply").click(function () {
            //var Data = new FormData($("#AddNumberArchive")[0]);
            $.SmartMessageBox({
                title: "คำเตือน!",
                content: "ต้องการปฏิเสธการรับหนังสือหรือไม่?",
                buttons: '[ไม่][ใช่]'
            }, function (ButtonPressed) {
                if (ButtonPressed == "ใช่") {
                    $.post("/Archives/ReplyArchive", { "Comment": $("#Comment").val(), "LastId": $("#LastId").val(), "ReceiveByPCode": $("#ReceiveByPCode").val(), "BeforeLastId": $("#BeforeLastId").val(), "FromOrgCode": $("#FromOrgCode").val(), "ToOrgCode": $("#ToOrgCode").val() }, function (response) {
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
                                window.location.href = "/Archives/Receives";
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
                                window.location.href = "/Archives/Receives";
                            }, 1000)
                        }
                    });
                 }
                    if (ButtonPressed == "ไม่") {

                    }
                 });
                 e.preventDefault();
        })
        
    });

    // ดำเนินการต่อ
    $.get("/Archives/ForwardArchive", { "Id": Id, "OrgCode": OrgCode }, function (rs) {
        $("#ForwardArchive").html('<img src="/img/Loading/Ajax-Loading.gif" width="100"> กำลังโหลด');
        $("#ForwardArchive").html(rs);
        
        pageSetUp();
        $("#ToOrgCode2").select2();
        $("#Command").select2();

        $('#ToOrg').multiselect({
            enableClickableOptGroups: true,
            enableFiltering: true,
            maxHeight: 200,
            numberDisplayed: 1
        });

        $('#IsCircle').click(function () {
            if ($(this).is(':checked')) {
                this.value = true;
                $("#ToOrgCode2").select2("val", "");
                $("#NoCircle").hide();
                $("#Circle").show();
            } else {
                this.value = false;
                $('#ToOrg option:selected').each(function () {
                    $(this).prop('selected', false);
                })
                $('#ToOrg').multiselect('refresh');
                $("#NoCircle").show();
                $("#Circle").hide();
            }
        });

        // Success
        $("#Success").click(function () {
            var Data = new FormData($("#FormForwardArchive")[0]);
            $.SmartMessageBox({
                title: "คำเตือน!",
                content: "ต้องการจัดเก็บหนังสือนี้หรือไม่?",
                buttons: '[ไม่][ใช่]'
            }, function (ButtonPressed) {
                if (ButtonPressed == "ใช่") {
                    $.ajax(
                    {
                        type: "POST",
                        url: "/Archives/SuccessArchive",
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
                                    window.location.href = "/Archives/Receives";
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
                                    window.location.href = "/Archives/Receives";
                                }, 1000)
                            }
                        }
                    })
                }
                if (ButtonPressed == "ไม่") {

                }
            });
            e.preventDefault();
            
        })

        // Forward
        $("#Forward").click(function () {
            //Validate Form
            $('#FormForwardArchive').bootstrapValidator();
            $('#FormForwardArchive').data("bootstrapValidator").validate();
            if ($('#FormForwardArchive').data("bootstrapValidator").isValid() == true) {
                var Data = new FormData($("#FormForwardArchive")[0]);
                $.SmartMessageBox({
                    title: "คำเตือน!",
                    content: "ต้องการดำเนินการต่อหรือไม่?",
                    buttons: '[ไม่][ใช่]'
                }, function (ButtonPressed) {
                    if (ButtonPressed == "ใช่") {
                        $.ajax(
                        {
                            type: "POST",
                            url: "/Archives/Doforward",
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
                                        window.location.href = "/Archives/Receives";
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
                                        window.location.href = "/Archives/Receives";
                                    }, 1000)
                                }
                            }
                        })
                    }
                    if (ButtonPressed == "ไม่") {

                    }
                });
                e.preventDefault();
                
            }
        })

    });
}


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

    $('#Receives').dataTable({
        lengthMenu: [
         [ 10, 30, 40, -1 ],
         ['10', '30', '40', 'ทั้งหมด']
        ],
        "order": [[ 6, 'desc' ],[2, 'desc']],
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
                responsiveHelper_dt_basic = new ResponsiveDatatablesHelper($('#Receives'), breakpointDefinition);
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