$(function () {
    // Add Menu
    $("#add").click(function () {
        $.get("/RoomReserves/FormAddReserve", function (ReturnForm) {
            $("#ModalFormAdd").html(ReturnForm);
            $('#ButtonAdd').modal("show");


            if ($("#Admin").val() == "ReservesRoomAdmin") {
                $.get("/Organizations/GetOrgSelectListByOrgType", { "OrgType": 1 }, function (rs) {
                    $("#ReserveUserOrgId").empty();
                    $.each(rs, function (i, val) {
                        $("#ReserveUserOrgId").append($("<option></option>").attr("value", val.value).text(val.text));
                    });
                    $("#ReserveUserOrgId").select2();

                    $("#ReserveUserOrgId").on("change", function () {
                        $.get("/VehicleReserves/GetUserByOrg", { "OrgId": $(this).val() }, function (rs) {
                            $("#ReserveUserId").empty();
                            $.each(rs, function (i, val) {
                                $("#ReserveUserId").append($("<option></option>").attr("value", val.value).text(val.text));
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
            $("#RoomId").select2();

            $("#SHour").select2();
            $("#SMin").select2();
            $("#EHour").select2();
            $("#EMin").select2();

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
                else if (Format === 2) {
                    $("#RType").hide();
                    $("#EveryWeek").hide();
                    $("#ShowSDate").show();
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
            $("#ReserveTypeId").val($("#ReserveTypeId").val()).change();
            

            $("#ReserveTypeId").select2();
            $("#ReserveTypeId").change(function () {
                var Type = $(this).val();
                if (Type == 7 || Type == 9 || Type == 10) {
                    $("#ShowSDate").show();
                    $("#ShowEDate").hide();
                    $("#STime").hide();
                    $("#ETime").hide();
                }
                else {
                    $("#ShowSDate").show();
                    $("#ShowEDate").show();
                    $("#STime").show();
                    $("#ETime").show();
                }
            });
            $("#ReserveTypeId").val($("#ReserveTypeId").val()).change();

            $("#SMonth").change(function () {
                $.get("/VehicleReserves/GetDay", { "Month": $("#SMonth").val(), "Year": $("#SYear").val() }, function (rs) {
                    $("#Sday").empty();
                    $.each(rs, function (i, val) {
                        $("#Sday").append($("<option></option>").attr("value", val.value).text(val.text));
                        $('#Sday option[value="' + $("#NowDay").val() + '"]').attr("selected", "selected");
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
                        $('#Eday option[value="' + $("#NowDay").val() + '"]').attr("selected", "selected");
                    });
                    $("#Eday").select2();
                });
                $("#Eday").val($("#Eday").val()).change();
            });
            $("#EMonth").val($("#EMonth").val()).change();

            //Validate Form
            $('#FormAddReserve').bootstrapValidator();
            $("#submit").click(function () {
                $('#FormAddReserve').data("bootstrapValidator").validate();
                if ($('#FormAddReserve').data("bootstrapValidator").isValid() == true) {
                    var Data = new FormData($("#FormAddReserve")[0]);
                    $.ajax(
                    {
                        type: "POST",
                        url: "/RoomReserves/AddReserve",
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
                                    window.location.href = "/RoomReserves/Index";
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
                                    window.location.href = "/RoomReserves/Index";
                                }, 1000)
                            }
                        }
                    })
                }
            })
        });
    });

    $("#ViewCalenda").click(function () {
        $.get("/RoomReserves/ViewCalendar", function (rs) {
            $("#ModalViewCalenda").html(rs);
            $("#ButtonViewCalenda").modal('show');
            ReaderCalendar();
        });
    })

    // List Menus
    $.get("/RoomReserves/GetReserves", function (rs) {
        $("#ShowReserves").html('<img src="/img/Loading/Ajax-Loading.gif" width="100"> กำลังโหลด');
        setTimeout(function () {
            $("#ShowReserves").html(rs);
            Datatable();

            $("#ShowReserves").on("click", ".detail", function () {
                var ReserveId = $(this).val();
                $.get("/RoomReserves/DetailReserve", { "ReserveId": ReserveId }, function (ReturnForm) {
                    $("#ModalDetail").html(ReturnForm);
                    $('#ButtonDetail').modal("show");
                });
            });

            // Edit  Menus
            $("#ShowReserves").on("click", ".edit", function () {
                var ReserveId = $(this).val();
                $.get("/RoomReserves/FormEditReserve", { "ReserveId": ReserveId }, function (ReturnForm) {
                    $("#ModalFormUpdate").html(ReturnForm);
                    $('#ButtonUpdate').modal("show");

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

                    $("#RoomId").select2();
                    $("#SHour").select2();
                    $("#SMin").select2();
                    $("#EHour").select2();
                    $("#EMin").select2();

                    $("#ReserveFormat").change(function () {
                        if ($(this).val() == 1) {
                            $("#RType").show();
                            $("#EveryWeek").hide();
                            $("#ShowEDate").hide();
                            $("#STime").hide();
                            $("#ETime").hide();
                            $(".NewDay").show();
                        }
                        else if ($(this).val() == 2) {
                            $("#RType").hide();
                            $("#EveryWeek").hide();
                            $("#ShowSDate").hide();
                            $("#ShowEDate").hide();
                            $("#STime").show();
                            $("#ETime").show();
                            $(".NewDay").show();
                        }
                        else {
                            $("#RType").hide();
                            $("#EveryWeek").show();
                            $(".NewDay").hide();
                            $("#STime").show();
                            $("#ETime").show();
                            $("#ShowEDate").hide();
                        }
                    });
                    $("#ReserveFormat").val($("#ReserveFormat").val()).change();
                    $("#ReserveFormat").select2();

                    $("#ReserveTypeId").change(function () {
                        var Type = $(this).val();
                        if (Type == 7 || Type == 9 || Type == 10) {
                            $("#ShowEDate").hide();
                            $("#STime").hide();
                            $("#ETime").hide();
                        }
                        else if (Type == 11) {
                            $("#ShowEDate").show();
                            $("#STime").show();
                            $("#ETime").show();
                        }
                        else if (Type == 12) {
                        //} else if (Type == 16) {
                        //    $("#RType").hide();
                        //    $("#EveryWeek").show();
                        //    $(".NewDay").hide();
                        //    $("#ShowEDate").hide();
                        //    $("#STime").show();
                        //    $("#ETime").show();
                        } else {
                            $("#RType").hide();
                            $("#EveryWeek").show();
                            $(".NewDay").hide();
                            $("#ShowEDate").hide();
                            $("#STime").show();
                            $("#ETime").show();
                        }
                    });
                    $("#ReserveTypeId").val($("#ReserveTypeId").val()).change();
                    $("#ReserveTypeId").select2();

                    //alert($("#OldFormat").val());
                    $("#OldFormat").change(function () {
                        var Format = $(this).val();
                        if (Format == 1) {
                            //$("#RType").show();
                            $("#EveryWeek").hide();
                            //$("#ShowSDate").show();
                            $("#ShowEDate").hide();
                            $("#STime").show();
                            $("#ETime").show();
                        }
                        else if (Format == 2) {
                            //$("#RType").hide();
                            //$("#EveryWeek").hide();
                            //$("#ShowSDate").hide();
                            //$("#ShowEDate").hide();
                            //$("#STime").show();
                            //$("#ShowAll").show();
                            //$("#ETime").show();
                        }
                        else {
                            //$("#RType").hide();
                            //$("#EveryWeek").show();
                            //$("#ShowSDate").hide();
                            //$("#ShowEDate").hide();
                            //$(".NewDay").hide();
                            //$("#STime").show();
                            //$("#ETime").show();
                        }
                    });
                    $("#OldFormat").val($("#OldFormat").val()).change();

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



                    //Validate Form
                    $('#FormEditReserve').bootstrapValidator();
                    $("#submit").click(function () {
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
                                            window.location.href = "/RoomReserves/Index";
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
                                            window.location.href = "/RoomReserves/Index";
                                        }, 1000)
                                    }
                                }
                            })
                        }
                    })
                });
            });

            // Cancel
            $("#ShowReserves").on("click", ".cancel", function () {
                var ReserveId = $(this).val();
                $.get("/RoomReserves/FormCancelReserve", { "ReserveId": ReserveId }, function (ReturnForm) {
                    $("#ModalDetail").html(ReturnForm);
                    $('#ButtonDetail').modal("show");

                    //Validate Form
                    $('#FormCancelReserve').bootstrapValidator();
                    $("#submit").click(function () {
                        $('#FormCancelReserve').data("bootstrapValidator").validate();
                        if ($('#FormCancelReserve').data("bootstrapValidator").isValid() == true) {
                            var Data = new FormData($("#FormCancelReserve")[0]);
                            $.SmartMessageBox({
                                title: "คำเตือน!",
                                content: "ต้องการยกเลิกรายการนี้หรือไม่?",
                                buttons: '[ไม่][ใช่]'
                            }, function (ButtonPressed) {
                                if (ButtonPressed == "ใช่") {
                                    $.ajax(
                                    {
                                        type: "POST",
                                        url: "/RoomReserves/CancelReserve",
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
                                                    window.location.href = "/RoomReserves/Index";
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
                                                    window.location.href = "/RoomReserves/Index";
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
            });

            // Delete Menus
            $("#ShowReserves").on("click", ".delete", function () {
                var ReserveId = $(this).val();
                $.SmartMessageBox({
                    title: "คำเตือน!",
                    content: "ต้องการลบรายการนี้หรือไม่?",
                    buttons: '[ไม่][ใช่]'
                }, function (ButtonPressed) {
                    if (ButtonPressed == "ใช่") {
                        $.get("/RoomReserves/DeleteReserve", { "ReserveId": ReserveId }, function (response) {
                            if (response.valid == true) {
                                $.smallBox({
                                    title: response.message,
                                    content: "<i class='fa fa-clock-o'></i> <i>" + response.message + "</i>",
                                    color: "#296191", // red color code #FB0404
                                    iconSmall: "fa fa-thumbs-up bounce animated",
                                    timeout: 3000
                                });
                                setTimeout(function () {
                                    window.location.href = "/RoomReserves/Index";
                                }, 3000)
                            } else {
                                $.smallBox({
                                    title: response.message,
                                    content: "<i class='fa fa-clock-o'></i> <i>" + response.message + "</i>",
                                    color: "#FB0404", // red color code #FB0404
                                    iconSmall: "fa fa-thumbs-up bounce animated",
                                    timeout: 3000
                                });
                                setTimeout(function () {
                                    window.location.href = "/RoomReserves/Index";
                                }, 3000)
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

function Datatable() {
    /* User List using datatable ;*/
    var responsiveHelper_dt_basic = undefined;
    var responsiveHelper_datatable_fixed_column = undefined;
    var responsiveHelper_datatable_col_reorder = undefined;
    var responsiveHelper_datatable_tabletools = undefined;

    var breakpointDefinition = {
        tablet: 1024,
        phone: 480
    };

    $('#td_reserves').dataTable({
        "lengthMenu": [[30, 40, 50, -1], [30, 40, 50, "All"]],
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
                responsiveHelper_dt_basic = new ResponsiveDatatablesHelper($('#td_reserves'), breakpointDefinition);
            }
        },
        "rowCallback": function (nRow) {
            responsiveHelper_dt_basic.createExpandIcon(nRow);
        },
        "drawCallback": function (oSettings) {
            responsiveHelper_dt_basic.respond();
        }
    });
    /* End User List */
}

