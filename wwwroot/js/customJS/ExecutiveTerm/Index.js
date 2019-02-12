$(function () {
    
    $("#PersonalId").select2();
    $("#Executivelist").html('<img src="/img/Loading/Ajax-Loading.gif" width="100"> กำลังโหลด');
    $.get("/ExecutiveTerm/Executivelist", { "Form": "Form" }, function (rs) {
        setTimeout(function () {
            $("#Executivelist").html(rs);
            Datatable();

            // Edit  Executivelist
            $("#Executivelist").on("click", ".edit", function () {
                var Id = $(this).val();
                $.get("/ExecutiveTerm/FormEdit", { "Id": Id }, function (ReturnForm) {
                    $("#MomdalEdit").html(ReturnForm);
                    $('#ButtonEdit').modal("show");

                    $("#STimeH").select2();
                    $("#STimeM").select2();
                    $("#ETimeH").select2();
                    $("#ETimeM").select2();

                    $.get("/Organizations/GetOrgSelectListByOrgType", { "OrgType": 1 }, function (rs) {
                        $("#OrgId").empty();
                        $.each(rs, function (i, val) {
                            $("#OrgId").append($("<option></option>").attr("value", val.value).text(val.text));
                            $('#OrgId option[value="' + $("#OrgSelect").val() + '"]').attr("selected", "selected");
                        });
                        $("#OrgId").select2();
                        $(".select2-hidden-accessible").hide();
                        $("#OrgId").change(function () {
                            $.get("/ExecutiveTerm/GetHeadPersonal", { "OrgId": $(this).val() }, function (rs) {
                                $("#PersonalId").empty();
                                $.each(rs, function (i, val) {
                                    $("#PersonalId").append($("<option></option>").attr("value", val.value).text(val.text));
                                    $('#PersonalId option[value="' + $("#PersonalIdSelect").val() + '"]').attr("selected", "selected");
                                });
                                $("#PersonalId").select2();
                                $(".select2-hidden-accessible").hide();
                            })
                            $("#PersonalId").val($("#PersonalId").val()).change();
                        })
                        $("#OrgId").val($("#OrgId").val()).change();
                    })


                    $("#Month").select2();
                    $("#Year").select2();

                    $("#Month").change(function () {
                        $.get("/TimeAttendance/GetDay", { "Month": $("#Month").val(), "Year": $("#Year").val() }, function (rs) {
                            $("#Dday").empty();
                            $.each(rs, function (i, val) {
                                $("#Dday").append($("<option></option>").attr("value", val.value).text(val.text));
                                $('#Dday option[value="' + $("#DaySelect").val() + '"]').attr("selected", "selected");
                            });
                            $("#Dday").select2();
                        });
                        $("#Dday").val($("#Dday").val()).change();
                    });
                    $("#Month").val($("#Month").val()).change();

                    $("#FMonth").select2();
                    $("#FYear").select2();

                    $("#FMonth").change(function () {
                        $.get("/TimeAttendance/GetDay", { "Month": $("#FMonth").val(), "Year": $("#FYear").val() }, function (rs) {
                            $("#Fday").empty();
                            $.each(rs, function (i, val) {
                                $("#Fday").append($("<option></option>").attr("value", val.value).text(val.text));
                                $('#Fday option[value="' + $("#FDaySelect").val() + '"]').attr("selected", "selected");
                            });
                            $("#Fday").select2();
                        });
                        $("#Fday").val($("#Fday").val()).change();
                    });
                    $("#FMonth").val($("#FMonth").val()).change();


                    $("#Period").select2();
                    $("#Period").change(function () {
                        var FullDay = $(this).val();
                        if (FullDay == 1) {
                            $("#HiddensPeriod").hide()
                        }
                        else {
                            $("#HiddensPeriod").show()
                        }
                    });
                    $("#Period").val($("#Period").val()).change();


                    //Validate Form
                    $('#FormEdit').bootstrapValidator();
                    $("#submit").click(function () {
                        $('#FormEdit').data("bootstrapValidator").validate();
                        if ($('#FormEdit').data("bootstrapValidator").isValid() == true) {
                            var Data = new FormData($("#FormEdit")[0]);
                            $.ajax(
                            {
                                type: "POST",
                                url: "/ExecutiveTerm/Edit",
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
                                            window.location.href = "/ExecutiveTerm/index";
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
                                            window.location.href = "/ExecutiveTerm/index";
                                        }, 1000)
                                    }
                                }
                            })
                        }
                    })
                });
            });

            // Reserve  Executivelist
            $("#Executivelist").on("click", ".Reserve", function () {
                var Id = $(this).val();
                $.get("/ExecutiveTerm/ReserveChat", { "Id": Id }, function (ReturnForm) {
                    $("#ModalFormReserve").html(ReturnForm);
                    $('#ButtonReserve').modal("show");

                    $.get("/ExecutiveTerm/ChatHistory", { "Id": Id }, function (rs) {
                        $("#ChatHistory").html(rs);
                    });


                    //Validate Form
                    $('#FormChat').bootstrapValidator();
                    $("#submit").click(function () {
                        var HistoryDetail = $("#HistoryDetail").val();
                        var Id = $("#Id").val();
                        $('#FormChat').data("bootstrapValidator").validate();
                        if ($('#FormChat').data("bootstrapValidator").isValid() == true) {
                            var Data = new FormData($("#FormChat")[0]);
                            $.ajax(
                            {
                                type: "POST",
                                url: "/ExecutiveTerm/Chat?HistoryDetail=" + HistoryDetail + "&Id=" + Id,
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
                                            window.location.href = "/ExecutiveTerm/index";
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
                                            window.location.href = "/ExecutiveTerm/index";
                                        }, 1000)
                                    }
                                }
                            })
                        }
                    })
                });
            });

            $("#Executivelist").on("click", ".delete", function () {
                var Id = $(this).val();
                $.SmartMessageBox({
                    title: "คำเตือน!",
                    content: "ต้องการลบรายการนี้หรือไม่?",
                    buttons: '[ไม่][ใช่]'
                }, function (ButtonPressed) {
                    if (ButtonPressed == "ใช่") {
                        $.get("/ExecutiveTerm/Delete", { "Id": Id }, function (response) {
                            if (response.valid == true) {
                                $.smallBox({
                                    title: response.message,
                                    content: "<i class='fa fa-clock-o'></i> <i>" + response.message + "</i>",
                                    color: "#296191", // red color code #FB0404
                                    iconSmall: "fa fa-thumbs-up bounce animated",
                                    timeout: 1000
                                });
                                setTimeout(function () {
                                    window.location.href = "/ExecutiveTerm/index";
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
                                    window.location.href = "/ExecutiveTerm/index";
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
    $("#ViewCalenda").click(function () {
        $.get("/ExecutiveTerm/ViewCalendar", function (rs) {
            $("#ModalViewCalenda").html(rs);
            $("#ButtonViewCalenda").modal('show');
            ReaderCalendar();
        });
    })

   

  
    $("#add").click(function () {
        $.get("/ExecutiveTerm/FormAdd", { "Form": "Form" }, function (ReturnForm) {
                setTimeout(function () {
                    $("#ModalFormAdd").html(ReturnForm);
                    $('#ButtonAdd').modal("show");

                    $("#STimeH").select2();
                    $("#STimeM").select2();
                    $("#ETimeH").select2();
                    $("#ETimeM").select2();

                    $("#Month").select2();
                    $("#Year").select2();

                    $("#PersonalId").select2();
                    $.get("/Organizations/GetOrgSelectListByOrgType", { "OrgType": 1 }, function (rs) {
                        $("#OrgId").empty();
                        $.each(rs, function (i, val) {
                            $("#OrgId").append($("<option></option>").attr("value", val.value).text(val.text));
                        });
                        $("#OrgId").select2();
                        $(".select2-hidden-accessible").hide();
                        $("#OrgId").change(function () {
                            $.get("/ExecutiveTerm/GetHeadPersonal", { "OrgId": $(this).val() }, function (rs) {
                                $("#PersonalId").empty();
                                $.each(rs, function (i, val) {
                                    $("#PersonalId").append($("<option></option>").attr("value", val.value).text(val.text));
                                });
                                $("#PersonalId").select2();
                                $(".select2-hidden-accessible").hide();
                            })
                            $("#PersonalId").val($("#PersonalId").val()).change();
                        })
                        $("#OrgId").val($("#OrgId").val()).change();
                    })


                    $("#Month").change(function () {
                        $.get("/TimeAttendance/GetDay", { "Month": $("#Month").val(), "Year": $("#Year").val() }, function (rs) {
                            $("#Dday").empty();
                            $.each(rs, function (i, val) {
                                $("#Dday").append($("<option></option>").attr("value", val.value).text(val.text));
                               // $('#Dday option[value="' + $("#NDay").val() + '"]').attr("selected", "selected");
                            });
                            $("#Dday").select2();
                        });
                        $("#Dday").val($("#Dday").val()).change();
                    });
                    $("#Month").val($("#Month").val()).change();

                    $("#FMonth").select2();
                    $("#FYear").select2();

                    $("#FMonth").change(function () {
                        $.get("/TimeAttendance/GetDay", { "Month": $("#FMonth").val(), "Year": $("#FYear").val() }, function (rs) {
                            $("#Fday").empty();
                            $.each(rs, function (i, val) {
                                $("#Fday").append($("<option></option>").attr("value", val.value).text(val.text));
                              //  $('#Fday option[value="' + $("#NDay").val() + '"]').attr("selected", "selected");
                            });
                            $("#Fday").select2();
                        });
                        $("#Fday").val($("#Fday").val()).change();
                    });
                    $("#FMonth").val($("#FMonth").val()).change();


                    $("#Period").select2();
                    $("#Period").change(function () {
                        var FullDay = $(this).val();
                        if (FullDay == 1) {
                            $("#HiddensPeriod").hide()
                        }
                        else {
                            $("#HiddensPeriod").show()
                        }
                    });
                    $("#Period").val($("#Period").val()).change();


                    $("#FormAdd").bootstrapValidator();
                    $("#FormAdd").on("click", "#submit", function () {
                        $('#FormAdd').data("bootstrapValidator").validate();
                        if ($('#FormAdd').data("bootstrapValidator").isValid() == true) {
                            var Data = new FormData($("#FormAdd")[0]);
                            $.ajax(
                            {
                                type: "POST",
                                url: "/ExecutiveTerm/Add",
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
                                            window.location.href = "/ExecutiveTerm/Index";
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
                                            window.location.href = "/ExecutiveTerm/Index";
                                        }, 1000)
                                    }
                                }
                            })
                        }
                    })
                });

           
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


    $('#ExecutiveList').dataTable({
        "lengthMenu": [[30, 40, 50, -1], [30, 40, 50, "All"]],
        "ordering": false,
        "sDom": "<'dt-toolbar'<'col-xs-12 col-sm-6'f><'col-sm-6 col-xs-12 hidden-xs'l>r>" +
            "t" +
            "<'dt-toolbar-footer'<'col-sm-6 col-xs-12 hidden-xs'i><'col-xs-12 col-sm-6'p>>",
        "autoWidth": true,
        "oLanguage": {
            "sSearch": '<span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span>'
        },
        "preDrawCallback": function () {
            if (!responsiveHelper_dt_basic) {
                responsiveHelper_dt_basic = new ResponsiveDatatablesHelper($('#ExecutiveList'), breakpointDefinition);
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