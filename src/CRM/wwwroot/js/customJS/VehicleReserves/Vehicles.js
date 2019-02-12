$(function () {
    // Add Menu
    $("#filter").select2();

    $("#add").click(function () {
        $.get("/VehicleReserves/FormAddVehicle", function (ReturnForm) {
            $("#ModalFormAdd").html(ReturnForm);
            $('#ButtonAdd').modal("show");

            $("#VehicleType").select2();

            //Validate Form
            $('#FormAddVehicle').bootstrapValidator();
            $("#submit").click(function () {
                $('#FormAddVehicle').data("bootstrapValidator").validate();
                if ($('#FormAddVehicle').data("bootstrapValidator").isValid() == true) {
                    var Data = new FormData($("#FormAddVehicle")[0]);
                    $.ajax(
                    {
                        type: "POST",
                        url: "/VehicleReserves/AddVehicle",
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
                                    window.location.href = "/VehicleReserves/Vehicles";
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
                                    window.location.href = "/VehicleReserves/Vehicles";
                                }, 1000)
                            }
                        }
                    })
                }
            })
        });


    });

    // List Menus
    $("#filter").change(function () {
        $.get("/VehicleReserves/GetVehicles", { "VehicleTypeId": $(this).val() }, function (rs) {
            $("#ShowVehicles").html('<img src="/img/Loading/Ajax-Loading.gif" width="100"> กำลังโหลด');
            setTimeout(function () {
                $("#ShowVehicles").html(rs);
                Datatable();

                // Manage Sub Menu
                $("#ShowVehicles").on("click", ".detail", function () {
                    var VehicleId = $(this).val();
                    $.get("/VehicleReserves/DetailVehicle", { "VehicleId": VehicleId }, function (ReturnForm) {
                        $("#ModalDetail").html(ReturnForm);
                        $('#ButtonDetail').modal("show");
                    });
                });

                // Edit  Menus
                $("#ShowVehicles").on("click", ".edit", function () {
                    var VehicleId = $(this).val();
                    $.get("/VehicleReserves/FormEditVehicle", { "VehicleId": VehicleId }, function (ReturnForm) {
                        $("#ModalFormUpdate").html(ReturnForm);
                        $('#ButtonUpdate').modal("show");

                        $("#VehicleType").select2();

                        //Validate Form
                        $('#FormEditVehicle').bootstrapValidator();
                        $("#submit").click(function () {
                            $('#FormEditVehicle').data("bootstrapValidator").validate();
                            if ($('#FormEditVehicle').data("bootstrapValidator").isValid() == true) {
                                var Data = new FormData($("#FormEditVehicle")[0]);
                                $.ajax(
                                {
                                    type: "POST",
                                    url: "/VehicleReserves/EditVehicle",
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
                                                window.location.href = "/VehicleReserves/Vehicles";
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
                                                window.location.href = "/VehicleReserves/Vehicles";
                                            }, 1000)
                                        }
                                    }
                                })
                            }
                        })
                    });
                });

                // Delete Menus
                $("#ShowVehicles").on("click", ".delete", function () {
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

        $('#td_vehicles').dataTable({
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
                    responsiveHelper_dt_basic = new ResponsiveDatatablesHelper($('#td_vehicles'), breakpointDefinition);
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