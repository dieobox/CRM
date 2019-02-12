$(function () {

    // Add Archives
    $("#add").click(function () {
        var OrgCode = $(this).attr("data-value");
            $.get("/Archives/FormAddArchive?ArchiveType", { "OrgCode": OrgCode }, function (ReturnForm) {
                $('#ArchiveType').val("04").change();
                $("#ModalFormAdd").html(ReturnForm);
                $('#ButtonAdd').modal("show");
                $("#ArchiveType").select2();
                $("#AccessLevel").select2();
                $("#Expedition").select2();
                $("#CmdCode").select2();
                $("#FinalStatus").select2();
                $("#DestinationOrgCode").select2();
                $("#ExternalCmdCode").select2();
                $("#Prefix").select2();
                $("#DayofDoc").select2();
                $("#MonthofDoc").select2();
                $("#YearofDoc").select2();

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



                var $select = $('#ArchiveType,#ArchiveOrgCode');
                $select.change(function () {
                    var ArchiveType = $("#ArchiveType").val();
                    var OrgCode = $("#ArchiveOrgCode").val();
                    $.get("/Archives/GetRunNumber", { "ArchiveType": ArchiveType, "OrgCode": OrgCode }, function (rs) {
                        $(".ArchiveNumber").attr("value", rs).text(rs);
                        
                    })
                });
                $('#ArchiveType').val($("#ArchiveType").val()).change();

                Datepicker();
                $('#ArchiveOrgCodes').val($("#FirstOrg").val()).change();
                $("#Prefix").change(GetArchiveNumber);
                GetArchiveNumber();

                $('#DestinationOrg').multiselect({
                    enableClickableOptGroups: true,
                    enableFiltering: true,
                    maxHeight: 200,
                    numberDisplayed: 1
                });

                //เปลี่ยน DDL ส่งถึง ให้เป็น DDL ส่งถึงหลายๆ หน่วยงาน
                $('#IsCirculation').click(function () {
                    if ($(this).is(':checked')) {
                        this.value = true;
                        $("#DestinationOrg").find('option:selected').removeAttr("selected");
                        $("#DestOrg").hide();
                        $("#DestOrgCir").show();
                        $(".IsNomal").hide();
                        $(".IsCir").show();
                    } else {
                        this.value = false;
                        $('#DestinationOrg option:selected').each(function () {
                            $(this).prop('selected', false);
                        })
                        $('#DestinationOrg').multiselect('refresh');
                        $("#DestinationOrgCode").select2("val", "");
                        $("#DestOrg").show();
                        $("#DestOrgCir").hide();
                        $(".IsNomal").show();
                        $(".IsCir").hide();
                    }
                });

                //Hide Show หนังสือส่งภายนอก
                $('#ArchiveType').click(function () {
                    if (this.value == '03') {
                        $("#Externalform").show();
                    } else {
                        $("#ExternalOrgName").val("");
                        $("#Externalform").hide();
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
                $("#ArchiveType").click(function () {
                    var TypeCode = $(this).val();
                    var FirstOrg = $("#FirstOrg").val();
                    $('#IssueArchive').prop('checked', false);
                    $('#IssueArchiveNumber').prop('checked', false);
                    $("#ShowArchivenum").hide();
                    $("#ShowArchive").hide();
                    $("#txt").show();
                    $("#txt1").show();
                    if (FirstOrg == 1 && TypeCode != "03") {
                        $("#VshowArchivenum").show();
                        $("#VNumberArchives").hide();
                        $('#IssueArchive').click(function () {
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
                        // 6 คือ สลก OrgCode
                    } else if (TypeCode == "03" && FirstOrg == 1) {
                        $("#VNumberArchives").show();
                        $("#VshowArchivenum").hide();
                        $('#IssueArchiveNumber').click(function () {
                            if ($(this).is(':checked')) {
                                this.value = 1;
                                $("#ShowArchive").show();
                                $("#txt").hide();
                            } else {
                                this.value = 0;
                                $("#ShowArchive").hide();
                                $("#txt").show();
                            }
                        });
                    } else if (TypeCode == "03" || TypeCode == "04" && FirstOrg != 1) {
                        $("#VshowArchivenum").show();
                        $("#VNumberArchives").hide();
                        $('#IssueArchive').click(function () {
                            if ($(this).is(':checked')) {
                                this.value = 1;
                                $("#ShowArchivenum").show();
                                $("#txt").hide();
                            } else {
                                this.value = 0;
                                $("#ShowArchivenum").hide();
                                $("#txt").show();
                            }
                        });
                    }
                });


                // active scanner 
                $("#ModalFormAdd").on("click", "#activescanner", function () {
                    var HasTrue =  scanner.scan(displayImagesOnPage, scanRequest);
                });

                $("#FormAddArchives").bootstrapValidator();
                $("#FormAddArchives").on("click", "#submit", function () {
                    $('#FormAddArchives').data("bootstrapValidator").validate();
                    if ($('#FormAddArchives').data("bootstrapValidator").isValid() == true) {
                        var Data = new FormData($("#FormAddArchives")[0]);
                        $.ajax(
                        {
                            type: "POST",
                            url: "/Archives/AddArchive",
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
                        })
                    }
                })
            });
        });
});

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

function displayImagesOnPage(successful, mesg, response) {

    if (!successful) { // On error
        console.error('Failed: ' + mesg);
        return;
    }

    if (successful && mesg != null && mesg.toLowerCase().indexOf('user cancel') >= 0) { // User cancelled.
        console.info('User cancelled');
        return;
    }

    var scannedImages = scanner.getScannedImages(response, true, false);

    for (var i = 0;  (scannedImages instanceof Array) && i < scannedImages.length; i++) {
        var scannedImage = scannedImages[i];
        var ImageURL = scannedImage.src;
        var elementImg = scanner.createDomElementFromModel({
            'name': 'iframe',
            'attributes': {
                'class': 'scanned',
                'src': scannedImage.src,
                'width' : 100
            }
        });

        (document.getElementById('fileScan') ? document.getElementById('fileScan') : document.body).appendChild(elementImg);

        var block = ImageURL.split(";");
        var contentType = block[0].split(":")[1]; 
        var realData = block[1].split(",")[1]; 
        var blob = b64toBlob(realData, contentType);

        var form = document.getElementById("FormAddArchives");
        var formDataToUpload = new FormData(form);
        formDataToUpload.append("AttachFile", blob);

        $.ajax({
            url: "/Archives/UploadBlob",
            data: formDataToUpload,
            type: "POST",
            contentType: false,
            processData: false,
            success: function (response) {
                
            }
        });
    }
}

var scanRequest = {
    "use_asprise_dialog": true, // Whether to use Asprise Scanning Dialog
    "show_scanner_ui": false, // Whether scanner UI should be shown
    "twain_cap_setting": { // Optional scanning settings
        "ICAP_PIXELTYPE": "TWPT_RGB" // Color
    },
    "output_settings": [{
        "type": "return-base64",
        "format": "PDF"
    }]
};

function b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = b64Data;
    var byteArrays = [];
    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
}

function response(e) {
    var urlCreator = window.URL || window.webkitURL;
    var imageUrl = urlCreator.createObjectURL(this.response);
    document.querySelector("#image").src = imageUrl;
}