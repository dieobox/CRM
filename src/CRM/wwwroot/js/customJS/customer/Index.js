$(function () {
    $.get("/CustomerManagement/Gets", function (Result) {
        $("#JsonShow").html(Result);
        Datatable();

        $("#JsonShow").on("click", ".edit", function () {
            var Id = $(this).val();
            $.get("/CustomerManagement/FormEdit", { "CustomerId": Id }, function (Result) {
                $("#MomdalFormEdit").html(Result);
                $("#ButtonEdit").modal();

                //Validate Form
                $('#FormEdit').bootstrapValidator();
                $("#submit").click(function () {
                    $('#FormEdit').data("bootstrapValidator").validate();
                    if ($('#FormEdit').data("bootstrapValidator").isValid() == true) {
                        var Data = new FormData($("#FormEdit")[0]);
                        $.ajax(
                        {
                            type: "POST",
                            url: "/CustomerManagement/Edit",
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
                                        window.location.href = "/CustomerManagement/Index";
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
                                        window.location.href = "/CustomerManagement/Index";
                                    }, 1000)
                                }
                            }
                        });
                    }
                })
            });
        });

        $("#JsonShow").on("click", ".delete", function () {
            var Id = $(this).val();
            $.SmartMessageBox({
            title: "คำเตือน!",
             content: "ต้องการลบรายการนี้หรือไม่?",
                buttons: '[ไม่][ใช่]'
            }, function (ButtonPressed) {
                if (ButtonPressed == "ใช่") {
                    $.get("/CustomerManagement/DeleteCustomer", { "CustomerId": Id }, function (Result) {
                        if (Result.valid == true) {
                            $.smallBox({
                                title: Result.message,
                                content: "<i class='fa fa-clock-o'></i> <i>" + Result.message + "</i>",
                                color: "#296191", // red color code #FB0404
                                iconSmall: "fa fa-thumbs-up bounce animated",
                                timeout: 1000
                            });
                            setTimeout(function () {
                                window.location.href = "/CustomerManagement/Index";
                            }, 100)
                        } else {
                            $.smallBox({
                                title: Result.message,
                                content: "<i class='fa fa-clock-o'></i> <i>" + Result.message + "</i>",
                                color: "#FB0404", // red color code #FB0404
                                iconSmall: "fa fa-thumbs-up bounce animated",
                                timeout: 1000
                            });
                            setTimeout(function () {
                                window.location.href = "/CustomerManagement/Index";
                            }, 100)
                        }
                    })
                }
                if (ButtonPressed == "ไม่") {

                }
            });
            e.preventDefault();

        });

        $("#license").on("click", function () {
            var CustomerId = $("input[name=Choose]:checked").val();
            if (CustomerId == null)
            {
                $.smallBox({
                    title: "กรุณาเลือกบริษัท",
                    content: "<i class='fa fa-clock-o'></i> กรุณาเลือกบริษัท<i></i>",
                    color: "#FB0404",
                    iconSmall: "fa fa-thumbs-up bounce animated",
                    timeout: 9000
                });
                
                return false;
            }
            else {
                window.location.href = "/licenseManagement/Index?CustomerId=" + CustomerId;
            } 
        });

        $("#comment").on("click", function () {
            var CustomerId = $("input[name=Choose]:checked").val();
            if (CustomerId == null) {
                $.smallBox({
                    title: "กรุณาเลือกบริษัท",
                    content: "<i class='fa fa-clock-o'></i> กรุณาเลือกบริษัท<i></i>",
                    color: "#FB0404",
                    iconSmall: "fa fa-thumbs-up bounce animated",
                    timeout: 9000
                });

                return false;
            }
            else
            {
                window.location.href = "/Comment/Index?CustomerId=" + CustomerId;
            } 
        });

    });

    $("#add").click(function () {
        $.get("/CustomerManagement/FormAdd", function (Result) {
            $("#MomdalFormAdd").html(Result);
            $("#ButtonAdd").modal();

            //Validate Form
            $('#FormAdd').bootstrapValidator();
            $("#submit").click(function () {
                $('#FormAdd').data("bootstrapValidator").validate();
                if ($('#FormAdd').data("bootstrapValidator").isValid() == true) {
                    var Data = new FormData($("#FormAdd")[0]);
                    $.ajax(
                    {
                        type: "POST",
                        url: "/CustomerManagement/Add",
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
                                    window.location.href = "/CustomerManagement/Index";
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
                                    window.location.href = "/CustomerManagement/Index";
                                }, 1000)
                            }
                        }
                    });
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


    $('#Jsontable').dataTable({
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
                responsiveHelper_dt_basic = new ResponsiveDatatablesHelper($('#Jsontable'), breakpointDefinition);
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
