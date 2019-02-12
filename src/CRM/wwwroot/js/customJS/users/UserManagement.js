$(function () {
    pageSetUp();
    $.get("/UsersManagement/Gets", function (RS) {
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

                    // Data User Role
                    $.get("/UsersManagement/GetUserRoles", { "UserId": value }, function (returnUserRole) {
                        $("#showuserRole").html(returnUserRole);

                        $("#RoleId").select2();

                        $("#showuserRole").on("click", "#addUserRole", function (e) {
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

                        $("#showuserRole").on("click", ".delete", function (e) {
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
    
    $("#type").val($("#type").val()).change();

    // Add User
    $("#add").click(function () {
        $.get("/UsersManagement/FormAddUser", { "GetForm": "GetForm" }, function (ReturnForm) {
            $("#MomdalFormAdd").html(ReturnForm);
            $('#ButtonAdd').modal("show");

            $("#Type").select2();

            //Validate Form
            $('#FormAddUser').bootstrapValidator();
            $("#submit").click(function () {
                $('#FormAddUser').data("bootstrapValidator").validate();
                if ($('#FormAddUser').data("bootstrapValidator").isValid() == true) {
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

