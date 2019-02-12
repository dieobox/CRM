$(function () {
    // Add Menu
    $("#add").click(function () {
        $.get("/VehicleReserves/FormAddVehicleType", function (ReturnForm) {
            $("#ModalFormAdd").html(ReturnForm);
            $('#ButtonAdd').modal("show");

            //Validate Form
            $('#FormAddType').bootstrapValidator();
            $("#submit").click(function () {
                $('#FormAddType').data("bootstrapValidator").validate();
                if ($('#FormAddType').data("bootstrapValidator").isValid() == true) {
                    var Data = new FormData($("#FormAddType")[0]);
                    $.ajax(
                    {
                        type: "POST",
                        url: "/VehicleReserves/AddVehicleType",
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
                                    window.location.href = "/VehicleReserves/VehicleTypes";
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
                                    window.location.href = "/VehicleReserves/VehicleTypes";
                                }, 1000)
                            }
                        }
                    })
                }
            })
        });


    });

    // List Menus
    $.get("/VehicleReserves/GetVehicleTypes", function (rs) {
        $("#ShowTypes").html('<img src="/img/Loading/Ajax-Loading.gif" width="100"> กำลังโหลด');
        setTimeout(function () {
            $("#ShowTypes").html(rs);
            Datatable();

            // Edit  Menus
            $("#ShowTypes").on("click", ".edit", function () {
                var VehicleTypeId = $(this).val();
                $.get("/VehicleReserves/FormEditVehicleType", { "VehicleTypeId": VehicleTypeId }, function (ReturnForm) {
                    $("#ModalFormUpdate").html(ReturnForm);
                    $('#ButtonUpdate').modal("show");

                    //Validate Form
                    $('#FormEditType').bootstrapValidator();
                    $("#submit").click(function () {
                        $('#FormEditType').data("bootstrapValidator").validate();
                        if ($('#FormEditType').data("bootstrapValidator").isValid() == true) {
                            var Data = new FormData($("#FormEditType")[0]);
                            $.ajax(
                            {
                                type: "POST",
                                url: "/VehicleReserves/EditVehicleType",
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
                                            window.location.href = "/VehicleReserves/VehicleTypes";
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
                                            window.location.href = "/VehicleReserves/VehicleTypes";
                                        }, 1000)
                                    }
                                }
                            })
                        }
                    })
                });
            });

            // Delete Menus
            $("#ShowTypes").on("click", ".delete", function () {
                var VehicleTypeId = $(this).val();
                $.SmartMessageBox({
                    title: "คำเตือน!",
                    content: "ต้องการลบรายการนี้หรือไม่?",
                    buttons: '[ไม่][ใช่]'
                }, function (ButtonPressed) {
                    if (ButtonPressed == "ใช่") {
                        $.get("/VehicleReserves/DeleteVehicleType", { "VehicleTypeId": VehicleTypeId }, function (response) {
                            if (response.valid == true) {
                                $.smallBox({
                                    title: response.message,
                                    content: "<i class='fa fa-clock-o'></i> <i>" + response.message + "</i>",
                                    color: "#296191", // red color code #FB0404
                                    iconSmall: "fa fa-thumbs-up bounce animated",
                                    timeout: 1000
                                });
                                setTimeout(function () {
                                    window.location.href = "/VehicleReserves/VehicleTypes";
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
                                    window.location.href = "/VehicleReserves/VehicleTypes";
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

        $('#td_types').dataTable({
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
                    responsiveHelper_dt_basic = new ResponsiveDatatablesHelper($('#td_types'), breakpointDefinition);
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