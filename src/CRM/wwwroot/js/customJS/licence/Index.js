$(function () {
    $.get("/Licensemanagement/Gets", { "CustomerId": $("#CustomerId").val() }, function (rs) {
        $("#jsonShow").html(rs);
        Datatable();

        $("#jsonShow").on("click", ".edit", function () {
            $.get("/Licensemanagement/FormEdit", { "LicenseId": $(this).val() }, function (rs) {
                $("#MomdalFormEdit").html(rs);
                $("#ButtonEdit").modal();


                $("#LicensePlan").select2();

                // Start Date
                $("#StartDay").select2();
                $("#StartMonth").select2();
                $("#StartYear").select2();
                $("#StartMonth").change(function () {
                    $.get("/LicenseManagement/GetDay", { "Month": $("#StartMonth").val(), "Year": $("#StartYear").val() }, function (rs) {
                        $("#StartDay").empty();
                        $.each(rs, function (i, val) {
                            $("#StartDay").append($("<option></option>").attr("value", val.value).text(val.text).attr("disabled", val.disabled));
                        });
                        $('#StartDay option[value="' + $(".StartDay").val() + '"]').attr("selected", "selected");
                        $("#StartDay").select2();
                    });
                    $("#StartDay").val($("#StartDay").val()).change();
                });
                $("#StartMonth").val($("#StartMonth").val()).change();

                // Expire date
                $("#ExDay").select2();
                $("#ExMonth").select2();
                $("#ExYear").select2();
                $("#ExMonth").change(function () {
                    $.get("/LicenseManagement/GetDay", { "Month": $("#ExMonth").val(), "Year": $("#ExYear").val() }, function (rs) {
                        $("#ExDay").empty();
                        $.each(rs, function (i, val) {
                            $("#ExDay").append($("<option></option>").attr("value", val.value).text(val.text).attr("disabled", val.disabled));
                        });
                        $('#ExDay option[value="' + $(".ExDay").val() + '"]').attr("selected", "selected");
                        $("#ExDay").select2();
                    });
                    $("#ExDay").val($("#ExDay").val()).change();
                });
                $("#ExMonth").val($("#ExMonth").val()).change();

                //Validate Form
                $('#FormEdit').bootstrapValidator();
                $("#submit").click(function () {
                    $('#FormEdit').data("bootstrapValidator").validate();
                    if ($('#FormEdit').data("bootstrapValidator").isValid() == true) {
                        var Data = new FormData($("#FormEdit")[0]);
                        $.ajax(
                        {
                            type: "POST",
                            url: "/LicenseManagement/Edit",
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
                                        window.location.href = "/LicenseManagement/Index?CustomerId=" + $("#CustomerId").val();
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
                                        window.location.href = "/LicenseManagement/Index?CustomerId=" + $("#CustomerId").val();
                                    }, 1000)
                                }
                            }
                        });
                    }
                })
            });
        });
    });



    // add 
    $("#add").click(function () {
        $.get("/LicenseManagement/FormAdd", { "CustomerId": $("#CustomerId").val() }, function (rs) {
            $("#MomdalFormAdd").html(rs);
            $("#ButtonAdd").modal();

            $("#LicensePlan").select2();

            // Start Date
            $("#StartDay").select2();
            $("#StartMonth").select2();
            $("#StartYear").select2();
            $("#StartMonth").change(function () {
                $.get("/LicenseManagement/GetDay", { "Month": $("#StartMonth").val(), "Year": $("#StartYear").val() }, function (rs) {
                    $("#StartDay").empty();
                    $.each(rs, function (i, val) {
                        $("#StartDay").append($("<option></option>").attr("value", val.value).text(val.text).attr("disabled", val.disabled));
                    });
                    $("#StartDay").select2();
                });
                $("#StartDay").val($("#StartDay").val()).change();
            });
            $("#StartMonth").val($("#StartMonth").val()).change();

            // Expire date
            $("#ExDay").select2();
            $("#ExMonth").select2();
            $("#ExYear").select2();
            $("#ExMonth").change(function () {
                $.get("/LicenseManagement/GetDay", { "Month": $("#ExMonth").val(), "Year": $("#ExYear").val() }, function (rs) {
                    $("#ExDay").empty();
                    $.each(rs, function (i, val) {
                        $("#ExDay").append($("<option></option>").attr("value", val.value).text(val.text).attr("disabled", val.disabled));
                    });
                    $("#ExDay").select2();
                });
                $("#ExDay").val($("#ExDay").val()).change();
            });
            $("#ExMonth").val($("#ExMonth").val()).change();

            //Validate Form
            $('#FormAdd').bootstrapValidator();
            $("#submit").click(function () {
                $('#FormAdd').data("bootstrapValidator").validate();
                if ($('#FormAdd').data("bootstrapValidator").isValid() == true) {
                    var Data = new FormData($("#FormAdd")[0]);
                    $.ajax(
                    {
                        type: "POST",
                        url: "/LicenseManagement/Add",
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
                                    window.location.href = "/LicenseManagement/Index?CustomerId=" + $("#CustomerId").val();
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
                                    window.location.href = "/LicenseManagement/Index?CustomerId=" + $("#CustomerId").val();
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


    $('#TableJson').dataTable({
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
                responsiveHelper_dt_basic = new ResponsiveDatatablesHelper($('#TableJson'), breakpointDefinition);
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
