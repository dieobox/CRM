$(function () {
    pageSetUp();
    $("#type").select2();
    // load structure
    var $select = $("#type");
    $select.change(function () {
        $.get("/UsersManagement/Gets",{"Type" : $(this).val()} ,function (RS) {
            $("#ShowUsers").html('<img src="/img/Loading/Ajax-Loading.gif" width="100"> กำลังโหลด');
            setTimeout(function () {
                $("#ShowUsers").html(RS);
                Datatable();

                // Edit  User
                $("#ShowUsers").on("click", ".edit", function () {
                    var value = $(this).val();
                    // Data User
                    $.get("/UsersManagement/FormEditUser", { "UserId": value }, function (ReturnForm) {
                        $("#MomdalFormEdit").html(ReturnForm);
                        $('#ButtonEdit').modal("show");

                        $(".IsOrgHead").select2();
                        // Data User Role
                        $.get("/UsersManagement/GetUserRoles", { "UserId": value }, function (returnUserRole) {
                            $("#showuserRole").html(returnUserRole);

                            $("#RoleId").select2();

                            $("#showuserRole").on("click", "#addUserRole", function () {
                                $("#showRoles").show();
                                $("#AddUserRole").on("click", function () {
                                    var UserId = $("#UserId").val();
                                    var RoleId = $("#RoleId").val();
                                    $.get("/UsersManagement/AddUSerRole", { "UserId": UserId, "RoleId": RoleId }, function (response) {
                                        if (response.valid == true) {
                                            $.smallBox({
                                                title: response.message,
                                                content: "<i class='fa fa-clock-o'></i> <i>" + response.message + "</i>",
                                                color: "#296191", // red color code #FB0404
                                                iconSmall: "fa fa-thumbs-up bounce animated",
                                                timeout: 2000
                                            });
                                            setTimeout(function () {
                                                window.location.href = "/UsersManagement/Index";
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
                                                window.location.href = "/UsersManagement/Index";
                                            }, 1000)
                                        }
                                    })
                                });
                            });

                            $("#showuserRole").on("click", ".delete", function () {
                                var UserId = $(this).val();
                                var RoleId = $(this).attr("data-RoleId");

                                $.SmartMessageBox({
                                    title: "คำเตือน!",
                                    content: "ต้องการลบรายการนี้หรือไม่?",
                                    buttons: '[ไม่][ใช่]'
                                }, function (ButtonPressed) {
                                    if (ButtonPressed == "ใช่") {
                                        $.get("/UsersManagement/DeleteUserRole", { "UserId": value, "RoleId": RoleId }, function (response) {
                                            if (response.valid == true) {
                                                $.smallBox({
                                                    title: response.message,
                                                    content: "<i class='fa fa-clock-o'></i> <i>2 seconds ago...</i>",
                                                    color: "#296191", // red color code #FB0404
                                                    iconSmall: "fa fa-thumbs-up bounce animated",
                                                    timeout: 1000
                                                });
                                                setTimeout(function () {
                                                    window.location.href = "/UsersManagement/Index";
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
                                                    window.location.href = "/UsersManagement/Index";
                                                }, 1000)
                                            }
                                        })
                                    }
                                    if (ButtonPressed == "ไม่") {

                                    }
                                });
                                e.preventDefault();
                            });
                        })

                        $("#ShowPicture").hide();
                        $("#ViewImage").click(function () {
                            $("#ShowPicture").slideToggle("slow");
                        });

                        var UserName = $("#UserName").val();
                        if (UserName == "administrator") {
                            $("#submit").attr("disabled", "disabled");
                        }

                        $("#Type").select2();
                        $("#PersonalName").select2();
                        $("#day1").select2();
                        $("#day2").select2();
                        $("#day3").select2();

                        $("#month1").select2();
                        $("#month2").select2();
                        $("#month3").select2();

                        $("#year1").select2();
                        $("#year2").select2();
                        $("#year3").select2();


                        // Birst Day
                        $("#month1").change(function () {
                            $.get("/TimeAttendance/GetDay", { "Month": $("#month1").val(), "Year": $("#year1").val() }, function (rs) {
                                $("#day1").empty();
                                $.each(rs, function (i, val) {
                                    $("#day1").append($("<option></option>").attr("value", val.value).text(val.text));
                                });
                                $('#day1 option[value="' + $("#d1").val() + '"]').attr("selected", "selected");
                                $("#day1").select2();
                            });
                            $("#day1").val($("#day1").val()).change();
                        });
                        $("#month1").val($("#month1").val()).change();

                        // Start Day
                        $("#month2").change(function () {
                            $.get("/TimeAttendance/GetDay", { "Month": $("#month2").val(), "Year": $("#year2").val() }, function (rs) {
                                $("#day2").empty();
                                $.each(rs, function (i, val) {
                                    $("#day2").append($("<option></option>").attr("value", val.value).text(val.text));
                                });
                                $('#day2 option[value="' + $("#d2").val() + '"]').attr("selected", "selected");
                                $("#day2").select2();
                            });
                            $("#day2").val($("#day2").val()).change();
                        });
                        $("#month2").val($("#month2").val()).change();

                        // End Day
                        $("#month3").change(function () {
                            $.get("/TimeAttendance/GetDay", { "Month": $("#month3").val(), "Year": $("#year3").val() }, function (rs) {
                                $("#day3").empty();
                                $.each(rs, function (i, val) {
                                    $("#day3").append($("<option></option>").attr("value", val.value).text(val.text));
                                });
                                $('#day3 option[value="' + $("#d3").val() + '"]').attr("selected", "selected");
                                $("#day3").select2();
                            });
                            $("#day3").val($("#day3").val()).change();
                        });
                        $("#month3").val($("#month3").val()).change();

                        $("#OrgCode").select2();
                        $("#IsOrgHead").select2();

                        $("#Type").on("change", function () {
                            if ($(this).val() <= 3) {
                                //$("#type1").show();
                                //$("#type2").show();
                                $.get("/UsersManagement/GetPersonalCode", { "Type": $(this).val() }, function (rs) {
                                    $("#PersonalName").empty();
                                    $.each(rs, function (i, val) {
                                        $("#PersonalName").append($("<option></option>").attr("value", val.value).text(val.text));
                                    });
                                    $('#PersonalName option[value="' + $(".PersonalName").val() + '"]').attr("selected", "selected");
                                    $("#PersonalName").select2();
                                })
                            }
                            else {
                                //$("#type1").show();
                                //$("#type2").show();
                            }
                        });
                        $("#Type").val($("#Type").val()).change();

                        // Org select list
                        $.get("/Organizations/GetOrgSelectListByOrgType", { "OrgType": 1 }, function (rs) {
                            $("#OrgCode").empty();
                            $.each(rs, function (i, val) {
                                $("#OrgCode").append($("<option></option>").attr("value", val.value).text(val.text));
                            });
                            $('#OrgCode option[value="' + $(".OrgCode").val() + '"]').attr("selected", "selected");
                            $("#OrgCode").select2();

                        });

                        //Validate Form
                        $('#FormEditUser').bootstrapValidator();
                        $("#submit").click(function () {
                            $('#FormEditUser').data("bootstrapValidator").validate();
                            if ($('#FormEditUser').data("bootstrapValidator").isValid() == true) {
                                var Data = new FormData($("#FormEditUser")[0]);
                                $.ajax(
                                {
                                    type: "POST",
                                    url: "/UsersManagement/EditUser",
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
                                                window.location.href = "/UsersManagement/Index";
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
                                                window.location.href = "/UsersManagement/Index";
                                            }, 1000)
                                        }
                                    }
                                })
                            }
                        })
                    })
                });

                // Delete User
                $("#ShowUsers").on("click", ".delete", function () {
                    var value = $(this).val();
                    $.SmartMessageBox({
                        title: "คำเตือน!",
                        content: "ต้องการลบรายการนี้หรือไม่?",
                        buttons: '[ไม่][ใช่]'
                    }, function (ButtonPressed) {
                        if (ButtonPressed == "ใช่") {
                            $.get("/UsersManagement/DeleteUser", { "Userid": value }, function (response) {
                                if (response.valid == true) {
                                    $.smallBox({
                                        title: response.message,
                                        content: "<i class='fa fa-clock-o'></i> <i>2 seconds ago...</i>",
                                        color: "#296191", // red color code #FB0404
                                        iconSmall: "fa fa-thumbs-up bounce animated",
                                        timeout: 1000
                                    });
                                    setTimeout(function () {
                                        window.location.href = "/UsersManagement/Index";
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
                                        window.location.href = "/UsersManagement/Index";
                                    }, 1000)
                                }
                            })
                        }
                        if (ButtonPressed == "ไม่") {

                        }
                    });
                });

            }, 100)
        });
    });
    
    $("#type").val($("#type").val()).change();

    // Add User
    $("#add").click(function () {
        $.get("/UsersManagement/FormAddUser", { "GetForm": "GetForm" }, function (ReturnForm) {
            $("#MomdalFormAdd").html(ReturnForm);
            $('#ButtonAdd').modal("show");

            $("#Type").select2();
            $("#PersonalName").select2();

            $("#day1").select2();
            $("#day2").select2();
            $("#day3").select2();

            $("#month1").select2();
            $("#month2").select2();
            $("#month3").select2();

            $("#year1").select2();
            $("#year2").select2();
            $("#year3").select2();

            // Birst Day
            $("#month1").change(function () {
                $.get("/TimeAttendance/GetDay", { "Month": $("#month1").val(), "Year": $("#year1").val() }, function (rs) {
                    $("#day1").empty();
                    $.each(rs, function (i, val) {
                        $("#day1").append($("<option></option>").attr("value", val.value).text(val.text));
                    });
                    $("#day1").select2();
                });
                $("#day1").val($("#day1").val()).change();
            });
            $("#month1").val($("#month1").val()).change();

            // Start Day
            $("#month2").change(function () {
                $.get("/TimeAttendance/GetDay", { "Month": $("#month2").val(), "Year": $("#year2").val() }, function (rs) {
                    $("#day2").empty();
                    $.each(rs, function (i, val) {
                        $("#day2").append($("<option></option>").attr("value", val.value).text(val.text));
                    });
                    $("#day2").select2();
                });
                $("#day2").val($("#day2").val()).change();
            });
            $("#month2").val($("#month2").val()).change();

            // End Day
            $("#month3").change(function () {
                $.get("/TimeAttendance/GetDay", { "Month": $("#month3").val(), "Year": $("#year3").val() }, function (rs) {
                    $("#day3").empty();
                    $.each(rs, function (i, val) {
                        $("#day3").append($("<option></option>").attr("value", val.value).text(val.text));
                    });
                    $("#day3").select2();
                });
                $("#day3").val($("#day3").val()).change();
            });
            $("#month3").val($("#month3").val()).change();

            $("#OrgCode").select2();
            $(".IsOrgHead").select2();

            $("#ButtonAdd").on("change", "#Type", function () {
                if ($(this).val() <= 3) {
                    $.get("/UsersManagement/GetPersonalCode", { "Type": $(this).val() }, function (rs) {
                        $("#PersonalName").empty();
                        $.each(rs, function (i, val) {
                            $("#PersonalName").append($("<option></option>").attr("value", val.value).text(val.text));
                        });
                        $("#PersonalName").select2();
                        $("#PersonalName").attr("disabled", false);
                    });
                }
                else
                {
                }

            });

            // Org select list
            $.get("/Organizations/GetOrgSelectListByOrgType", { "OrgType": 1 }, function (rs) {
                $("#OrgCode").empty();
                $.each(rs, function (i, val) {
                    $("#OrgCode").append($("<option></option>").attr("value", val.value).text(val.text));
                });
                $("#OrgCode").select2();
            });

            //Validate Form
            $('#FormAddUser').bootstrapValidator();
            $("#submit").click(function () {
                $('#FormAddUser').data("bootstrapValidator").validate();
                if ($('#FormAddUser').data("bootstrapValidator").isValid() == true) {
                    $.get("/UsersManagement/CheckIdCard", { "IDCard": $("#PersonalCode").val() }, function (rs) {
                        if (rs.valid == false) {
                            $.smallBox({
                                title: rs.message,
                                content: "<i class='fa fa-clock-o'></i> <i>" + rs.message + "</i>",
                                color: "#FB0404", // red color code #FB0404
                                iconSmall: "fa fa-thumbs-up bounce animated",
                                timeout: 4000
                            });
                        }
                        else {
                            var Data = new FormData($("#FormAddUser")[0]);
                            $.ajax(
                            {
                                type: "POST",
                                url: "/UsersManagement/AddUser",
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
                                            window.location.href = "/UsersManagement/Index";
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
                                            window.location.href = "/UsersManagement/Index";
                                        }, 1000)
                                    }
                                }
                            })
                        }
                    })
                }
                

               
            })
        });
    });

    // SyncUser 
    $("#Import").click(function () {
        $.get("/UsersManagement/FormImportExcel", function (rs) {
            $("#MomdalFormImport").html(rs);
            $("#ButtonImport").modal('show');

            //Validate Form
            $('#FormImportExcel').bootstrapValidator();
            $("#submit").click(function () {
                $("#loading").html('<img src="/img/Loading/Ajax-Loading.gif" width="50"> กำลังโหลด');
                $('#FormImportExcel').data("bootstrapValidator").validate();
                if ($('#FormImportExcel').data("bootstrapValidator").isValid() == true) {
                    var Data = new FormData($("#FormImportExcel")[0]);
                    $.ajax(
                    {
                        type: "POST",
                        url: "/UsersManagement/ImportUser",
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
                                    window.location.href = "/UsersManagement/Index";
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
                                    window.location.href = "/UsersManagement/Index";
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


    $('#td_users').dataTable({
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
                responsiveHelper_dt_basic = new ResponsiveDatatablesHelper($('#td_users'), breakpointDefinition);
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

