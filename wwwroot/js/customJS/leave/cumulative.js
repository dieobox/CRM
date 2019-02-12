// v1.0 tns programmer
$(function () {
    $.get("/Organizations/GetOrgSelectListByOrgType", { "OrgType": 1 }, function (rs) {
        $("#OrgId").empty();
        $.each(rs, function (i, val) {
            $("#OrgId").append($("<option></option>").attr("value", val.value).text(val.text));
        });
        $("#OrgId").select2();
        $('#OrgId option[value="' + $(".OrgId").val() + '"]').attr("selected", "selected");

        $.select = $("#OrgId");
        $.select.change(function () {
            $("#ShowCumulative").html('<img src="/img/Loading/Ajax-Loading.gif" width="100"> กำลังโหลด');
            $.get("/Leave/GetCumulative", { "LeaveOrgId": $(this).val() }, function (rs) {
                $("#ShowCumulative").html(rs);
                Datatable();

                // Edit 
                $("#ShowCumulative").on("click", ".edit", function () {
                    $.get("/Leave/FormEditCumulative", { "PersonalCode": $(this).val()}, function (ReturnForm) {
                        $("#MomdalFormEdit").html(ReturnForm);
                        $('#ButtonEdit').modal("show");

                        //Validate Form
                        $('#Form').bootstrapValidator();
                        $("#submit").click(function () {
                            $('#Form').data("bootstrapValidator").validate();
                            if ($('#Form').data("bootstrapValidator").isValid() == true) {
                                var Data = new FormData($("#Form")[0]);
                                $.ajax(
                                {
                                    type: "POST",
                                    url: "/Leave/EditCumulative",
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
                                                window.location.href = "/Leave/Cumulative?LeaveOrgId=" + $("#OrgId").val();
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
                                                window.location.href = "/Leave/Cumulative?LeaveOrgId=" + $("#OrgId").val();
                                            }, 1000)
                                        }
                                    }
                                })
                            }
                        })
                    });
                });

            })
        });
        $("#OrgId").val($("#OrgId").val()).change();
    });
    

    $("#Import").click(function () {
        $.get("/Leave/FormImportExcel", function (rs) {
            $("#MomdalFormImport").html(rs);
            $("#ButtonImport").modal('show');

            //Validate Form
            $('#FormImport').bootstrapValidator();
            $("#submit").click(function () {
                $("#loading").html('<img src="/img/Loading/Ajax-Loading.gif" width="100"> กำลังโหลด');
                $('#FormImport').data("bootstrapValidator").validate();
                if ($('#FormImport').data("bootstrapValidator").isValid() == true) {
                    var Data = new FormData($("#FormImport")[0]);
                    $.ajax(
                    {
                        type: "POST",
                        url: "/Leave/ImportExcel",
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
                                    window.location.href = "/Leave/Cumulative";
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
                                    window.location.href = "/Leave/Cumulative";
                                }, 1000)
                            }
                        }
                    })
                }
            })
        });
    });

    $("#updateData").click(function () {
        $.SmartMessageBox({
            title: "คำเตือน!",
            content: "ยืนยังการทำรายการ?",
            buttons: '[ไม่][ใช่]'
        }, function (ButtonPressed) {
            if (ButtonPressed == "ใช่") {
                $.get("/Leave/LoadingLeaveCalculator", function (rs) {
                    $("#MomdalFormUpdate").html(rs);
                    $("#ButtonUpdate").modal("show");

                    $.get("/Leave/LeaveCalculator", { "Key": "5f709657-93f1-4165-b3a4-64ae463a02b8", "BudgetYear": 2562 }, function (rs) {
                        if (rs.valid == true) {
                            $.smallBox({
                                title: rs.message,
                                content: "<i class='fa fa-clock-o'></i> <i>" + rs.message + "</i>",
                                color: "#296191", // red color code #FB0404
                                iconSmall: "fa fa-thumbs-up bounce animated",
                                timeout: 2000
                            });
                            setTimeout(function () {
                                window.location.href = "/Leave/Cumulative";
                            }, 1000)
                        } else {
                            $.smallBox({
                                title: rs.message,
                                content: "<i class='fa fa-clock-o'></i> <i>" + rs.message + "</i>",
                                color: "#FB0404", // red color code #FB0404
                                iconSmall: "fa fa-thumbs-up bounce animated",
                                timeout: 2000
                            });
                            setTimeout(function () {
                                window.location.href = "/Leave/Cumulative";
                            }, 1000)
                        }
                    })
                })
            }
            if (ButtonPressed == "ไม่") {

            }
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


    $('#tb_Cumulative').dataTable({
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
                responsiveHelper_dt_basic = new ResponsiveDatatablesHelper($('#tb_Cumulative'), breakpointDefinition);
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