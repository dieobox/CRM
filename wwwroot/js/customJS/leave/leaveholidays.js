
// v1.0 tns programmer
$(function () {
    $("#Filteryear").select2();
    $.select = $("#Filteryear");
    $.select.change(function () {
        $("#ShowHoliday").html('<img src="/img/Loading/Ajax-Loading.gif" width="100"> กำลังโหลด');
        $.get("/Leave/GetHoliDays", { "Year": $(this).val() }, function (rs) {
            $("#ShowHoliday").html(rs);
            Datatable();

            // Edit 
            $("#ShowHoliday").on("click", ".edit", function () {
                $.get("/Leave/FormEditHoliday", { "LeaveHoliDayId": $(this).val() }, function (ReturnForm) {
                    $("#MomdalFormEdit").html(ReturnForm);
                    $('#ButtonEdit').modal("show");


                    $("#day").select2();
                    $("#month").select2();
                    $("#year").select2();


                    //Validate Form
                    $('#FormEdit').bootstrapValidator();
                    $("#submit").click(function () {
                        $('#FormEdit').data("bootstrapValidator").validate();
                        if ($('#FormEdit').data("bootstrapValidator").isValid() == true) {
                            var Data = new FormData($("#FormEdit")[0]);
                            $.ajax(
                            {
                                type: "POST",
                                url: "/Leave/EditHoliday",
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
                                            window.location.href = "/Leave/Holidays";
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
                                            window.location.href = "/Leave/Holidays";
                                        }, 1000)
                                    }
                                }
                            })
                        }
                    })
                });
            });

            //Delete
            $("#ShowHoliday").on("click", ".delete", function () {
                var value = $(this).val();
                $.SmartMessageBox({
                    title: "คำเตือน!",
                    content: "ต้องการลบรายการนี้หรือไม่?",
                    buttons: '[ไม่][ใช่]'
                }, function (ButtonPressed) {
                    if (ButtonPressed == "ใช่") {
                        $.get("/Leave/DeleteHoliday", { "LeaveHoliDayId": value }, function (response) {
                            if (response.valid == true) {
                                $.smallBox({
                                    title: response.message,
                                    content: "<i class='fa fa-clock-o'></i> <i>2 seconds ago...</i>",
                                    color: "#296191", // red color code #FB0404
                                    iconSmall: "fa fa-thumbs-up bounce animated",
                                    timeout: 1000
                                });
                                setTimeout(function () {
                                    window.location.href = "/Leave/Holidays";
                                }, 1000)
                            } else {
                                $.smallBox({
                                    title: response.message,
                                    content: "<i class='fa fa-clock-o'></i> <i>2 seconds ago...</i>",
                                    color: "#FB0404", // red color code #FB0404
                                    iconSmall: "fa fa-thumbs-up bounce animated",
                                    timeout: 1000
                                });
                                setTimeout(function () {
                                    window.location.href = "/Leave/Holidays";
                                }, 1000)
                            }
                        })
                    }
                    if (ButtonPressed == "ไม่") {

                    }
                });
            });
        })
    });
    $("#Filteryear").val($("#Filteryear").val()).change();
    

    // Add LeaveType
    $("#add").click(function () {
        $.get("/Leave/FormAddHoliday", function (ReturnForm) {
            $("#MomdalFormAdd").html(ReturnForm);
            $('#ButtonAdd').modal("show");

            $("#day").select2();
            $("#month").select2();
            $("#year").select2();

            //Validate Form
            $('#FormAdd').bootstrapValidator();
            $("#submit").click(function () {
                $('#FormAdd').data("bootstrapValidator").validate();
                if ($('#FormAdd').data("bootstrapValidator").isValid() == true) {
                    var Data = new FormData($("#FormAdd")[0]);
                    $.ajax(
                    {
                        type: "POST",
                        url: "/Leave/AddHoliday",
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
                                    window.location.href = "/Leave/Holidays";
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
                                    window.location.href = "/Leave/Holidays";
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
    var responsiveHelper_dt_basic = undefined;
    var responsiveHelper_datatable_fixed_column = undefined;
    var responsiveHelper_datatable_col_reorder = undefined;
    var responsiveHelper_datatable_tabletools = undefined;

    var breakpointDefinition = {
        tablet: 1024,
        phone: 480
    };


    $('#td_leaveholiday').dataTable({
        "lengthMenu": [[30, 40, 50, -1], [30, 40, 50, "All"]],
        "sDom": "<'dt-toolbar'<'col-xs-12 col-sm-6'f><'col-sm-6 col-xs-12 hidden-xs'l>r>" +
            "t" +
            "<'dt-toolbar-footer'<'col-sm-6 col-xs-12 hidden-xs'i><'col-xs-12 col-sm-6'p>>",
        "autoWidth": true,
        "oLanguage": {
            "sSearch": '<span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span>'
        },
        "preDrawCallback": function () {
            if (!responsiveHelper_dt_basic) {
                responsiveHelper_dt_basic = new ResponsiveDatatablesHelper($('#td_leaveholiday'), breakpointDefinition);
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