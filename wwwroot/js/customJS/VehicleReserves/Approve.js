$(function () {
    // Add Menu
    $("#filter").select2();

    // List Menus
    $("#filter").change(function () {
        $.get("/VehicleReserves/GetApproveReserves", { "ReserveStatusId": $(this).val() }, function (rs) {
            $("#ShowApproves").html('<img src="/img/Loading/Ajax-Loading.gif" width="100"> กำลังโหลด');
            setTimeout(function () {
                $("#ShowApproves").html(rs);
                Datatable();

                // Edit  Menus
                $("#ShowApproves").on("click", ".edit", function () {
                    var ReserveId = $(this).val();
                    $.get("/VehicleReserves/FormApproveReserve", { "ReserveId": ReserveId }, function (ReturnForm) {
                        $("#ModalFormUpdate").html(ReturnForm);
                        $('#ButtonUpdate').modal("show");

                        $("#VehicleType").select2();
                        $(".select2-hidden-accessible").hide();
                        $("#VehicleType").change(function () {
                            $.get("/VehicleReserves/GetSelectListVehicles", { "VehicleTypeId": $("#VehicleType").val(), "OldVehicle": $("#OldVehicle").val(), "Passenger": $("#Passenger").val() }, function (rs) {
                                $("#VehicleId").empty();
                                $.each(rs, function (i, val) {
                                    $("#VehicleId").append($("<option></option>").attr("value", val.value).text(val.text));
                                    $('#VehicleId option[value="' + $("#OldVehicle").val() + '"]').attr("selected", "selected");
                                });
                                $("#VehicleId").select2();
                                $(".select2-hidden-accessible").hide();
                            });
                            $("#VehicleId").val($("#VehicleId").val()).change();
                        });
                        $("#VehicleType").val($("#VehicleType").val()).change();

                        $("#cancel").click(function () {
                            $("#Approve").hide();
                            $("#GButton").hide();
                            $("#IsCancelForm").show();

                            //Validate Form
                            $('#IsCancelForm').bootstrapValidator();
                            $("#ConfirmCancel").click(function () {
                                $('#IsCancelForm').data("bootstrapValidator").validate();
                                if ($('#IsCancelForm').data("bootstrapValidator").isValid() == true) {
                                    var Data = new FormData($("#IsCancelForm")[0]);
                                    $.SmartMessageBox({
                                        title: "คำเตือน!",
                                        content: "ต้องการยกเลิกรายการนี้หรือไม่?",
                                        buttons: '[ไม่][ใช่]'
                                    }, function (ButtonPressed) {
                                        if (ButtonPressed == "ใช่") {
                                            $.get("/VehicleReserves/CancelApproveReserve", { "ReserveId": $("#ReserveId").val(), "CommentCancel": $("#CommentCancel").val() }, function (response) {
                                                if (response.valid == true) {
                                                    $.smallBox({
                                                        title: response.message,
                                                        content: "<i class='fa fa-clock-o'></i> <i>" + response.message + "</i>",
                                                        color: "#296191", // red color code #FB0404
                                                        iconSmall: "fa fa-thumbs-up bounce animated",
                                                        timeout: 2000
                                                    });
                                                    setTimeout(function () {
                                                        window.location.href = "/VehicleReserves/ApproveReserves";
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
                                                        window.location.href = "/VehicleReserves/ApproveReserves";
                                                    }, 100)
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

                     

                        //Validate Form
                        $('#ApproveReserve').bootstrapValidator();
                        $("#submit").click(function () {
                            $('#ApproveReserve').data("bootstrapValidator").validate();
                            if ($('#ApproveReserve').data("bootstrapValidator").isValid() == true) {
                                var Data = new FormData($("#ApproveReserve")[0]);
                                $.ajax(
                                {
                                    type: "POST",
                                    url: "/VehicleReserves/SaveApproveReserve",
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
                                                window.location.href = "/VehicleReserves/ApproveReserves";
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
                                                window.location.href = "/VehicleReserves/ApproveReserves";
                                            }, 1000)
                                        }
                                    }
                                })
                            }
                        })

                        // Cancel Approve
                        $("#ApproveCancel").click(function () {
                            $.SmartMessageBox({
                                title: "คำเตือน!",
                                content: "ต้องการยกเลิกรายการนี้หรือไม่?",
                                buttons: '[ไม่][ใช่]'
                            }, function (ButtonPressed) {
                                if (ButtonPressed == "ใช่") {
                                    $.get("/VehicleReserves/SaveCancelReserve", { "ReserveId": $("#ReserveId").val() }, function (response) {
                                        if (response.valid == true) {
                                            $.smallBox({
                                                title: response.message,
                                                content: "<i class='fa fa-clock-o'></i> <i>" + response.message + "</i>",
                                                color: "#296191", // red color code #FB0404
                                                iconSmall: "fa fa-thumbs-up bounce animated",
                                                timeout: 2000
                                            });
                                            setTimeout(function () {
                                                window.location.href = "/VehicleReserves/ApproveReserves";
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
                                                window.location.href = "/VehicleReserves/ApproveReserves";
                                            }, 100)
                                        }
                                    })
                                }
                                if (ButtonPressed == "ไม่") {

                                }
                            });
                            e.preventDefault();
                        })

                    });
                });

                $("#ShowApproves").on("click", ".update", function () {
                    var ReserveId = $(this).val();
                    $.get("/VehicleReserves/UpdateMile", { "ReserveId": ReserveId }, function (ReturnForm) {
                        $("#ModalDetail").html(ReturnForm);
                        $('#ButtonDetail').modal("show");

                        //Validate Form
                        $('#UpdateMile').bootstrapValidator();
                        $("#submit").click(function () {
                            $('#UpdateMile').data("bootstrapValidator").validate();
                            if ($('#UpdateMile').data("bootstrapValidator").isValid() == true) {
                                var Data = new FormData($("#UpdateMile")[0]);
                                $.ajax(
                                {
                                    type: "POST",
                                    url: "/VehicleReserves/SaveUpdateMile",
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
                                                window.location.href = "/VehicleReserves/ApproveReserves";
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
                                                window.location.href = "/VehicleReserves/ApproveReserves";
                                            }, 1000)
                                        }
                                    }
                                })
                            }
                        })
                    });
                });

                // Delete Menus
                $("#ShowApproves").on("click", ".delete", function () {
                    var VehicleId = $(this).val();
                    $.SmartMessageBox({
                        title: "คำเตือน!",
                        content: "ต้องการลบรายการนี้หรือไม่?",
                        buttons: '[ไม่][ใช่]'
                    }, function (ButtonPressed) {
                        if (ButtonPressed == "ใช่") {
                            $.get("/VehicleReserves/DeleteVehicle", { "VehicleId": VehicleId }, function (response) {
                                if (response.valid == true) {
                                    $.smallBox({
                                        title: response.message,
                                        content: "<i class='fa fa-clock-o'></i> <i>" + response.message + "</i>",
                                        color: "#296191", // red color code #FB0404
                                        iconSmall: "fa fa-thumbs-up bounce animated",
                                        timeout: 1000
                                    });
                                    setTimeout(function () {
                                        window.location.href = "/VehicleReserves/Vehicles";
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
                                        window.location.href = "/VehicleReserves/Vehicles";
                                    }, 100)
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
    $("#filter").val($("#filter").val()).change();

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



});