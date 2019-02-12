$(function () {
    // Type Book
    $("#TypeCode").select2();
    $("#Year").select2();
    $("#Month").select2();
    $("#OrgFilter").select2();

    
   
   
    var $select = $('#TypeCode,#Year,#Month,#OrgFilter');
    $select.change(function () {
        $(".select2-hidden-accessible").hide();
        // Get value 
        var TypeCode = $("#TypeCode").val();
        var Year = $("#Year").val();
        var Month = $("#Month").val();
        var OrgCode = $("#OrgFilter").val();


        $.get("/Archives/GetOrganizationName", { "OrgCode": OrgCode }, function (RS) {
            setTimeout(function () {
                $("#ShowOrgName").html(RS);
            }, 100)
        });
        
        $("#add").attr("data-value", OrgCode);
        
        $("#ShowArchives").html('<img src="/img/Loading/Ajax-Loading.gif" width="100"> กำลังโหลด');
        $.get("/Archives/GetsSend", { "TypeCode": TypeCode, "Year": Year, "Month": Month, "OrgCode": OrgCode }, function (rs) {
            setTimeout(function () {
                $("#ShowArchives").html(rs);
                Datatable();
                pageSetUp();
                //$(".edit").attr("data-value", OrgCode);
                // VIEW 
                $("#Sends").on("click", ".ViewArchives", function () {
                    $("#MomdalView").html('<img src="/img/Loading/Ajax-Loading.gif" width="100"> กำลังโหลด');
                    var Id = $(this).attr("data-value");
                    $.get("/Archives/ViewArchives", { "Id": Id }, function (rs) {
                        $("#MomdalView").html(rs);
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

                // EDIT
                $("#Sends").on("click", ".edit", function () {
                //  alert(OrgCode);
                    $("#MomdalView").html('<img src="/img/Loading/Ajax-Loading.gif" width="100"> กำลังโหลด');
                    $.get("/Archives/FormEditArchives", { "ArchivesId": $(this).val(),"OrgCode": OrgCode}, function (rs) {
                        
                        $('#ArchiveType').val("04").change();
                       

                        $("#MomdalEdit").html(rs);
                        $("#ExternalCmdCodes").select2();
                        $("#ArchiveTypes").select2();
                        $("#AccessLevels").select2();
                        $("#Expeditions").select2();
                        $("#CmdCodes").select2();
                        $("#FinalStatuses").select2();
                        $("#DestinationOrgCode").select2();
                        $(".Prefix").select2();

                        $("#DayofDoc").select2();
                        $("#MonthofDoc").select2();
                        $("#YearofDoc").select2();
                       // $("#TypeCodes").select2();
                        Datepicker();
                        
                        $('#ArchiveOrgCodes').val($("#FirstOrg").val()).change();
                        $("#Prefix").change(GetArchiveNumber);
                        GetArchiveNumber();

                        var OldNumber = $("#OldNumber").val();

                        var $select = $('#ArchiveTypes,#ArchiveOrgCode');
                        
                        $select.change(function () {
                            var ArchiveType = $("#ArchiveTypes").val();
                            var OrgCode = $("#ArchiveOrgCode").val();
                            var ArchiveId = $("#ArchiveId").val();

                            $.get("/Archives/GetRunNumber", { "ArchiveType": ArchiveType, "OrgCode": OrgCode, "ArchiveId": ArchiveId }, function (rs) {
                                $(".ArchiveNumber").attr("value", rs).text(rs);
                            })
                        });
                        $('#ArchiveType').val($("#ArchiveType").val()).change();

                        var $change = $("#MonthofDoc , #YearofDoc");
                        $change.change(function () {
                            // alert($("#MonthofDoc").val()+"/////"+$("#YearofDoc").val());
                            $.get("/TimeAttendance/GetDay", { "Month": $("#MonthofDoc").val(), "Year": $("#YearofDoc").val() }, function (rs) {
                                $("#DayofDoc").empty();
                                $.each(rs, function (i, val) {
                                    $("#DayofDoc").append($("<option></option>").attr("value", val.value).text(val.text));
                                    $('#DayofDoc option[value="' + $("#DayofDocHidden").val() + '"]').attr("selected", "selected");
                                });
                                $("#DayofDoc").select2();
                            });
                            $("#DayofDoc").val($("#DayofDoc").val()).change();
                        });
                        $("#YearofDoc").val($("#YearofDoc").val()).change();


                        //Hide Show การออกเลขหนังสือ
                        $('.IssueArchive').click(function () {
                            if ($(this).is(':checked')) {
                                this.value = 1;
                                $("#ShowArchivenum").show();
                                $("#txt1").hide();
                            } else {
                                this.value = 0;
                                $("#ShowArchivenum").hide();
                                $("#txt1").show();
                            }
                        });

                        //Archives Number
                        $("#ArchiveTypes").change(function () {
                            var TypeCode = $(this).val();
                            var FirstOrg = $("#FirstOrg").val();
                            $('.IssueArchive').prop('checked', false);
                            $('.IssueArchiveNumber').prop('checked', false);
                            $(".ShowArchivenum").hide();
                            $(".ShowArchive").hide();
                            $(".txt").show();
                            $(".txt1").show();
                            if (FirstOrg == 1 && TypeCode != "03") {
                                $(".VshowArchivenum").show();
                                $(".VNumberArchives").hide();
                                $('.IssueArchive').click(function () {
                                    if ($(this).is(':checked')) {
                                        this.value = 1;
                                        $(".ShowArchivenum").show();
                                        $(".txt1").hide();
                                    } else {
                                        this.value = 0;
                                        $(".ShowArchivenum").hide();
                                        $(".txt1").show();
                                    }
                                });
                                // 6 คือ สลก OrgCode ของเก่าเป็น 1 คือ สค
                            } else if (TypeCode == "03" && FirstOrg == 1) {
                                $(".VNumberArchives").show();
                                $(".VshowArchivenum").hide();
                                $('.IssueArchiveNumber').click(function () {
                                    if ($(this).is(':checked')) {
                                        this.value = 1;
                                        $(".ShowArchive").show();
                                        $(".txt").hide();
                                    } else {
                                        this.value = 0;
                                        $(".ShowArchive").hide();
                                        $(".txt").show();
                                    }
                                });
                            } else if (TypeCode == "03" || TypeCode == "04" && FirstOrg != 1) {
                                $(".VshowArchivenum").show();
                                $(".VNumberArchives").hide();
                                $('.IssueArchive').click(function () {
                                    if ($(this).is(':checked')) {
                                        this.value = 1;
                                        $(".ShowArchivenum").show();
                                        $(".txt1").hide();
                                    } else {
                                        this.value = 0;
                                        $(".ShowArchivenum").hide();
                                        $(".txt1").show();
                                    }
                                });
                            }
                        });
                        $("#ArchiveTypes").val($("#ArchiveTypes").val()).change();
                      
                        $('#DestinationOrg').multiselect({
                            enableClickableOptGroups: true,
                            enableFiltering: true,
                            maxHeight: 200,
                            numberDisplayed: 1
                        });

                        $('#IsCirculation').change(function () {
                            if ($(this).is(':checked')) {
                                $("#DestinationOrg").find('option:selected').removeAttr("selected");
                                this.value = true;
                                $("#DestOrg").hide();
                                $("#DestOrgCir").show();
                                $(".IsNomal").hide();
                                $(".IsCir").show();
                            } else {
                                $("#DestinationOrgCode").select2("val", "");
                                this.value = false;
                                $('#DestinationOrg option:selected').each(function () {
                                    $(this).prop('selected', false);
                                })
                                $('#DestinationOrg').multiselect('refresh');
                                $("#DestOrg").show();
                                $("#DestOrgCir").hide();
                                $(".IsNomal").show();
                                $(".IsCir").hide();
                            }
                        });
                        $("#IsCirculation").val($("#IsCirculation").val()).change();

                        $("#ViewOrgs").click(function () {
                            $("#ShowOrgs").slideToggle("slow");
                        });


                        //Hide Show หนังสือส่งภายนอก
                        $('#ArchiveTypes').click(function () {
                            if (this.value == '03') {
                                $(".Externalforms").show();
                            } else {
                              //  $("#ExternalOrgName").val();
                                $(".Externalforms").hide();

                            }
                        });

                        $('#IsSendNow').click(function () {
                            if ($(this).is(':checked')) {
                                this.value = true;
                                $("#DestOrg").show();
                                $("#IsCircu").show();
                            } else {
                                this.value = false;
                                $("#DestOrg").hide();
                                $("#IsCircu").hide();
                            }
                        });
                        
                        $('#FormEditArchives').bootstrapValidator();
                        $("#submit").click(function () {
                            $('#FormEditArchives').data("bootstrapValidator").validate();
                            if ($('#FormEditArchives').data("bootstrapValidator").isValid() == true) {
                                var Data = new FormData($("#FormEditArchives")[0]);
                                $.ajax(
                                {
                                    type: "POST",
                                    url: "/Archives/EditArchives",
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
                                                window.location.href = "/Archives/Sends";
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
                                                window.location.href = "/Archives/Sends";
                                            }, 1000)
                                        }
                                    }
                                });
                            }
                        });
                    });
                });
               
                // DELETE
                $("#Sends").on("click", ".delete", function (e) {
                    var Id = $(this).val();
                    $.SmartMessageBox({
                        title: "คำเตือน!",
                        content: "ต้องการลบรายการนี้หรือไม่?",
                        buttons: '[ไม่][ใช่]'
                    }, function (ButtonPressed) {
                        if (ButtonPressed == "ใช่") {
                            $.get("/Archives/DeleteArchives", { "Id": Id }, function (rs) {
                                if (rs.valid == true) {
                                    $.smallBox({
                                        title: rs.message,
                                        content: "<i class='fa fa-clock-o'></i> <i>2 seconds ago...</i>",
                                        color: "#296191", // red color code #FB0404
                                        iconSmall: "fa fa-thumbs-up bounce animated",
                                        timeout: 1000
                                    });
                                    setTimeout(function () {
                                        window.location.href = "/Archives/Sends";
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
                                        window.location.href = "/Archives/Sends";
                                    }, 1000)
                                }
                            })
                        }
                        if (ButtonPressed == "ไม่") {

                        }
                    });
                    e.preventDefault();
                });

            })
        });
    });
    $("#OrgFilter").val($("#OrgFilter").val()).change();


    //Auto Refreash
    setInterval(function () {
        $("#OrgFilter").val($("#OrgFilter").val()).change();
    }, 60000);
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

    $('#Sends').dataTable({
        lengthMenu: [
         [ 10, 20, 30, -1 ],
         ['10', '20', '30', 'ทั้งหมด']
        ],
        "order": [[ 5, 'desc' ],[1, 'desc']],
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
                responsiveHelper_dt_basic = new ResponsiveDatatablesHelper($('#Sends'), breakpointDefinition);
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

function Datepicker() {
    $('#RegisterDate').datepicker({
        language:'th-TH',
        defaultDate: new Date(),
        format: 'yyyy/mm/dd'
    });
}

function GetArchiveNumber() {
    var OrgCode = $("#Prefix").val();
    $.ajax(
         {
             type: "GET",
             url: "/Archives/GetArchivesNumber?OrgCode=" + OrgCode,
             cache: false,
             success: function (results) {
                 $("#ArchiveOrg").val(results);
             },
             error: function (response) {
                 Notify('เกิดความผิดพลาด กรุณาตรวจสอบข้อมูล', 'top-right', '5000', 'danger', 'fa-desktop', true);
             }
         });
}