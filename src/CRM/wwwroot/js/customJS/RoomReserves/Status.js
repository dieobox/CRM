$(function () {
    // Add Menu
    $("#add").click(function () {
        $.get("/RoomReserves/FormAddReservesStatus", function (ReturnForm) {
            $("#ModalFormAdd").html(ReturnForm);
            $('#ButtonAdd').modal("show");

            //Validate Form
            $('#FormAddStatus').bootstrapValidator();
            $("#submit").click(function () {
                $('#FormAddStatus').data("bootstrapValidator").validate();
                if ($('#FormAddStatus').data("bootstrapValidator").isValid() == true) {
                    var Data = new FormData($("#FormAddStatus")[0]);
                    $.ajax(
                    {
                        type: "POST",
                        url: "/RoomReserves/AddReservesStatus",
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
                                    window.location.href = "/RoomReserves/ReservesStatus";
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
                                    window.location.href = "/RoomReserves/ReservesStatus";
                                }, 1000)
                            }
                        }
                    })
                }
            })
        });


    });

    // List Menus
    $.get("/RoomReserves/GetReservesStatus", function (rs) {
        $("#ShowStatus").html('<img src="/img/Loading/Ajax-Loading.gif" width="100"> กำลังโหลด');
        setTimeout(function () {
            $("#ShowStatus").html(rs);
            Datatable();

            // Edit  Menus
            $("#ShowStatus").on("click", ".edit", function () {
                var ReserveStatusId = $(this).val();
                $.get("/RoomReserves/FormEditReservesStatus", { "ReserveStatusId": ReserveStatusId }, function (ReturnForm) {
                    $("#ModalFormUpdate").html(ReturnForm);
                    $('#ButtonUpdate').modal("show");

                    //Validate Form
                    $('#FormEditStatus').bootstrapValidator();
                    $("#submit").click(function () {
                        $('#FormEditStatus').data("bootstrapValidator").validate();
                        if ($('#FormEditStatus').data("bootstrapValidator").isValid() == true) {
                            var Data = new FormData($("#FormEditStatus")[0]);
                            $.ajax(
                            {
                                type: "POST",
                                url: "/RoomReserves/EditReserveStatus",
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
                                            window.location.href = "/RoomReserves/ReservesStatus";
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
                                            window.location.href = "/RoomReserves/ReservesStatus";
                                        }, 1000)
                                    }
                                }
                            })
                        }
                    })
                });
            });

            // Delete Menus
            $("#ShowStatus").on("click", ".delete", function () {
                var ReserveStatusId = $(this).val();
                $.SmartMessageBox({
                    title: "คำเตือน!",
                    content: "ต้องการลบรายการนี้หรือไม่?",
                    buttons: '[ไม่][ใช่]'
                }, function (ButtonPressed) {
                    if (ButtonPressed == "ใช่") {
                        $.get("/RoomReserves/DeleteReserveStatus", { "ReserveStatusId": ReserveStatusId }, function (response) {
                            if (response.valid == true) {
                                $.smallBox({
                                    title: response.message,
                                    content: "<i class='fa fa-clock-o'></i> <i>" + response.message + "</i>",
                                    color: "#296191", // red color code #FB0404
                                    iconSmall: "fa fa-thumbs-up bounce animated",
                                    timeout: 1000
                                });
                                setTimeout(function () {
                                    window.location.href = "/RoomReserves/ReservesStatus";
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
                                    window.location.href = "/RoomReserves/ReservesStatus";
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