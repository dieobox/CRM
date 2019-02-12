$(function () {

    $("#filter").select2();
    

    $("#filter").change(function () {
        $.get("/RoomReserves/ReservesApporveList", { "ReserveStatusId": $(this).val() }, function (rs) {
            $("#Approvelist").html('<img src="/img/Loading/Ajax-Loading.gif" width="100"> กำลังโหลด');
            setTimeout(function () {
                $("#Approvelist").html(rs);
                Datatable();

                $("#Approvelist").on("click", ".detail", function () {
                    var ReserveId = $(this).val();
                    $.get("/RoomReserves/DetailReserve", { "ReserveId": ReserveId }, function (ReturnForm) {
                        $("#ModalFormReserve").html(ReturnForm);
                        $('#ButtonReserve').modal("show");
                    });
                });

                //// Reserve  Executivelist
                $("#Approvelist").on("click", ".Reserve", function () {
                    var Id = $(this).val();
                    $.get("/RoomReserves/FormApprove", { "Id": Id }, function (ReturnForm) {
                        $("#ModalFormReserve").html(ReturnForm);
                        $('#ButtonReserve').modal("show");

                        if ($("#Admin").val() == "Administrator") {
                            $.get("/Organizations/GetOrgSelectListByOrgType", { "OrgType": 1 }, function (rs) {
                                $("#ReserveUserOrgId").empty();
                                $.each(rs, function (i, val) {
                                    $("#ReserveUserOrgId").append($("<option></option>").attr("value", val.value).text(val.text));
                                    $('#ReserveUserOrgId option[value="' + $("#OldOrgId").val() + '"]').attr("selected", "selected");
                                });
                                $("#ReserveUserOrgId").select2();

                                $("#ReserveUserOrgId").on("change", function () {
                                    $.get("/VehicleReserves/GetUserByOrg", { "OrgId": $(this).val() }, function (rs) {
                                        $("#ReserveUserId").empty();
                                        $.each(rs, function (i, val) {
                                            $("#ReserveUserId").append($("<option></option>").attr("value", val.value).text(val.text));
                                            $('#ReserveUserId option[value="' + $("#OldUserId").val() + '"]').attr("selected", "selected");
                                        });
                                        $(".select2-hidden-accessible").hide();
                                        $("#ReserveUserId").select2();
                                    });
                                });
                                $("#ReserveUserOrgId").val($("#ReserveUserOrgId").val()).change();
                            });
                        }

                        $("#Sday").select2();
                        $("#SMonth").select2();
                        $("#SYear").select2();
                        $("#Eday").select2();
                        $("#EMonth").select2();
                        $("#EYear").select2();

                        //alert($("#OldFormat").val());
                        $("#OldFormat").change(function () {
                            var Format = $(this).val();
                            if (Format == 1) {
                                $("#RType").show();
                                $("#EveryWeek").hide();
                                $("#ShowSDate").show();
                                $("#ShowEDate").hide();
                                $("#STime").hide();
                                $("#ETime").hide();
                            }
                            else if (Format == 2) {
                                $("#RType").hide();
                                $("#EveryWeek").hide();
                                $("#ShowSDate").hide();
                                $("#ShowEDate").hide();
                                $("#STime").show();
                                $("#ETime").show();
                            }
                            else {
                                $("#RType").hide();
                                $("#EveryWeek").show();
                                $("#ShowSDate").hide();
                                $("#ShowEDate").hide();
                                $("#STime").show();
                                $("#ETime").show();
                            }
                        });
                        $("#OldFormat").val($("#OldFormat").val()).change();

                        $("#ReserveFormat").select2();
                        $("#ReserveFormat").change(function () {
                            var Format = $(this).val();
                            if (Format == 1) {
                                $("#RType").show();
                                $("#EveryWeek").hide();
                                $("#ShowSDate").show();
                                $("#ShowEDate").hide();
                                $("#STime").hide();
                                $("#ETime").hide();
                            }
                            else if (Format == 2) {
                                $("#RType").hide();
                                $("#EveryWeek").hide();
                                $("#ShowSDate").hide();
                                $("#ShowEDate").hide();
                                $("#STime").show();
                                $("#ETime").show();
                            }
                            else {
                                $("#RType").hide();
                                $("#EveryWeek").show();
                                $("#ShowSDate").hide();
                                $("#ShowEDate").hide();
                                $("#STime").show();
                                $("#ETime").show();
                            }
                        });

                        $("#ReserveTypeId").change(function () {
                            var Type = $(this).val();
                            if (Type == 7 || Type == 9 || Type == 10) {
                                $("#ShowEDate").hide();
                                $("#STime").hide();
                                $("#ETime").hide();
                            }
                            else if (Type == 11) {
                                //$("#ShowEDate").show();
                                //$("#STime").show();
                                //$("#ETime").show();
                            }
                            else if (Type == 12) {
                                $("#ShowEDate").hide();
                            } else {
                                //$("#RType").show();
                                $("#EveryWeek").show();
                                $("#ShowSDate").hide();
                                $("#ShowEDate").hide();
                                //$("#STime").show();
                                //$("#ETime").show();
                            }
                        });
                        $("#ReserveTypeId").val($("#ReserveTypeId").val()).change();
                        $("#ReserveTypeId").select2();

                        $("#SMonth").change(function () {
                            $.get("/VehicleReserves/GetDay", { "Month": $("#SMonth").val(), "Year": $("#SYear").val() }, function (rs) {
                                $("#Sday").empty();
                                $.each(rs, function (i, val) {
                                    $("#Sday").append($("<option></option>").attr("value", val.value).text(val.text));
                                    $('#Sday option[value="' + $("#StartDay").val() + '"]').attr("selected", "selected");
                                });
                                $("#Sday").select2();
                            });
                            $("#Sday").val($("#Sday").val()).change();
                        });
                        $("#SMonth").val($("#SMonth").val()).change();


                        $("#EMonth").change(function () {
                            $.get("/VehicleReserves/GetDay", { "Month": $("#EMonth").val(), "Year": $("#EYear").val() }, function (rs) {
                                $("#Eday").empty();
                                $.each(rs, function (i, val) {
                                    $("#Eday").append($("<option></option>").attr("value", val.value).text(val.text));
                                    $('#Eday option[value="' + $("#EndDay").val() + '"]').attr("selected", "selected");
                                });
                                $("#Eday").select2();
                            });
                            $("#Eday").val($("#Eday").val()).change();
                        });
                        $("#EMonth").val($("#EMonth").val()).change();

                        $('#FormEditReserve').bootstrapValidator();


                        $("#Edit").click(function () {
                            $('#FormEditReserve').data("bootstrapValidator").validate();
                            if ($('#FormEditReserve').data("bootstrapValidator").isValid() == true) {
                                var Data = new FormData($("#FormEditReserve")[0]);
                                $.ajax(
                                {
                                    type: "POST",
                                    url: "/RoomReserves/EditReserve",
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
                                             window.location.href = "/RoomReserves/ReservesApporve";
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
                                                //window.location.href = "/RoomReserves/ReservesApporve";
                                            }, 1000)
                                        }
                                    }
                                })
                            }
                        });
                        $("#Room").select2();
                        $("#Opt").select2();

                        $(".select2-hidden-accessible").hide();

                        $("#Opt").change(function () {
                            var Opt = $("#Opt").val();
                            if (Opt == 1) {
                                $("#ChooseRoom").show();
                                $("#Cancel").hide();
                            } else {
                                $("#ChooseRoom").hide();
                                $("#Cancel").show();
                            }
                        })
                        $("#Opt").val($("#Opt").val()).change();

                        $.get("/RoomReserves/GetSelectListRoom", { "OldRoom": $("#OldRoom").val(), "ReservePassenger": $("#ReservePassenger").val(), "StartDate": $("#ReserveStartdate").val(), "EndDate": $("#ReserveStartdate").val(), "Format": $("#Format").val() }, function (rs) {
                            $("#Room").empty();
                            $.each(rs, function (i, val) {
                                $("#Room").append($("<option></option>").attr("value", val.value).text(val.text));
                                $('#Room option[value="' + $("#OldRoom").val() + '"]').attr("selected", "selected");
                            });
                            $("#Room").select2();
                            $(".select2-hidden-accessible").hide();
                        });



                        //Validate Form
                        $('#FormApprove').bootstrapValidator();
                        $("#submit").click(function () {
                            var Opt = $("#Opt").val();
                            //var HistoryDetail = $("#HistoryDetail").val();
                            var Id = $("#RoomType").val();
                            $('#FormApprove').data("bootstrapValidator").validate();
                            if ($('#FormApprove').data("bootstrapValidator").isValid() == true) {
                                var Data = new FormData($("#FormApprove")[0]);
                                $.ajax(
                                {
                                    type: "POST",
                                    url: "/RoomReserves/Approve",
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
                                                window.location.href = "/RoomReserves/ReservesApporve";
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
                                                //window.location.href = "/RoomReserves/ReservesApporve";
                                            }, 1000)
                                        }
                                    }
                                })
                            }
                        })
                    });
                });


            });

        });


    });
    $("#filter").val($("#filter").val()).change();

    $("#Approvelist").on("click", ".End", function () {
        var Id = $(this).val();
        $.SmartMessageBox({
            title: "คำเตือน!",
            content: "ต้องการลบรายการนี้หรือไม่?",
            buttons: '[ไม่][ใช่]'
        }, function (ButtonPressed) {
            if (ButtonPressed == "ใช่") {
                $.get("/RoomReserves/FinishRoom", { "Id": Id }, function (response) {
                    if (response.valid == true) {
                        $.smallBox({
                            title: response.message,
                            content: "<i class='fa fa-clock-o'></i> <i>" + response.message + "</i>",
                            color: "#296191", // red color code #FB0404
                            iconSmall: "fa fa-thumbs-up bounce animated",
                            timeout: 1000
                        });
                        setTimeout(function () {
                            window.location.href = "/RoomReserves/ReservesApporve";
                        }, 100)
                    } else {
                        $.smallBox({
                            title: response.message,
                            content: "<i class='fa fa-clock-o'></i> <i>" + response.message + "</i>",
                            color: "#FB0404", // red color code #FB0404
                            iconSmall: "fa fa-thumbs-up bounce animated",
                            timeout: 1000
                        });
                        setTimeout(function () {
                            window.location.href = "/RoomReserves/ReservesApporve";
                        }, 100)
                    }
                })
            }
            if (ButtonPressed == "ไม่") {

            }
        });
        // e.preventDefault();

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


    $('#List').dataTable({
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
                responsiveHelper_dt_basic = new ResponsiveDatatablesHelper($('#List'), breakpointDefinition);
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