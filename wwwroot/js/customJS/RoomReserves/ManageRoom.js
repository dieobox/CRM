$(function () {


    // List Menus
    $.get("/RoomReserves/GetRoom", function (rs) {
        $("#ShowRoom").html('<img src="/img/Loading/Ajax-Loading.gif" width="100"> กำลังโหลด');
        setTimeout(function () {
            $("#ShowRoom").html(rs);
            Datatable();

            // Edit  Menus
            $("#ShowRoom").on("click", ".edit", function () {
                var RoomId = $(this).val();
                $.get("/RoomReserves/FormEditRoom", { "RoomId": RoomId }, function (ReturnForm) {
                    $("#ModalFormUpdate").html(ReturnForm);

                    $('#ButtonUpdate').modal("show");

                    //Validate Form
                    $('#FormEdit').bootstrapValidator();
                    $("#submit").click(function () {
                        $('#FormEdit').data("bootstrapValidator").validate();
                        if ($('#FormEdit').data("bootstrapValidator").isValid() == true) {
                            var Data = new FormData($("#FormEdit")[0]);
                            $.ajax(
                            {
                                type: "POST",
                                url: "/RoomReserves/Edit",
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
                                            window.location.href = "/RoomReserves/ManageRoom";
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
                                            window.location.href = "/RoomReserves/ManageRoom";
                                        }, 1000)
                                    }
                                }
                            })
                        }
                    })
                });
            });


            $("#ShowRoom").on("click", ".delete", function () {
                var RoomId = $(this).val();
                $.SmartMessageBox({
                    title: "คำเตือน!",
                    content: "ต้องการลบรายการนี้หรือไม่?",
                    buttons: '[ไม่][ใช่]'
                }, function (ButtonPressed) {
                    if (ButtonPressed == "ใช่") {
                        $.get("/RoomReserves/Delete", { "RoomId": RoomId }, function (response) {
                            if (response.valid == true) {
                                $.smallBox({
                                    title: response.message,
                                    content: "<i class='fa fa-clock-o'></i> <i>" + response.message + "</i>",
                                    color: "#296191", // red color code #FB0404
                                    iconSmall: "fa fa-thumbs-up bounce animated",
                                    timeout: 1000
                                });
                                setTimeout(function () {
                                    window.location.href = "/RoomReserves/ManageRoom";
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
                                    window.location.href = "/RoomReserves/ManageRoom";
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
    });

    //Add
    $("#add").click(function () {
        $.get("/RoomReserves/FormAddRoom", function (ReturnForm) {
            $("#ModalFormAdd").html(ReturnForm);
            $('#ButtonAdd').modal("show");

            //Validate Form
            $('#FormAdd').bootstrapValidator();
            $("#submit").click(function () {
                $('#FormAdd').data("bootstrapValidator").validate();
                if ($('#FormAdd').data("bootstrapValidator").isValid() == true) {
                    var Data = new FormData($("#FormAdd")[0]);
                    $.ajax(
                    {
                        type: "POST",
                        url: "/RoomReserves/Add",
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
                                    window.location.href = "/RoomReserves/ManageRoom";
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
                                    window.location.href = "/RoomReserves/ManageRoom";
                                }, 1000)
                            }
                        }
                    })
                }
            })
        });


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

        $('#ListRoom').dataTable({
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
                    responsiveHelper_dt_basic = new ResponsiveDatatablesHelper($('#ListRoom'), breakpointDefinition);
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
