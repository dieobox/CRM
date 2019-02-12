$(function () {
    UpdatePosition();
    var MainOrg = $("#MainOrg").val();
    
    $("#loading").html('<img src="/img/Loading/Ajax-Loading.gif" width="100"> กำลังโหลด');
    $("#add").on("click", function () {
        $.get("/Organizations/FormAddOrgItem", { "MainOrg": MainOrg }, function (respond) {
            $("#ModalFormAdd").html(respond);
            $('#ButtonAdd').modal("show");
            
            //Validate Form
            $('#FormAddOrg').bootstrapValidator();
            $("#submit").click(function () {
                $('#FormAddOrg').data("bootstrapValidator").validate();
                if ($('#FormAddOrg').data("bootstrapValidator").isValid() == true) {
                    var Data = new FormData($("#FormAddOrg")[0]);
                    $.ajax(
                    {
                        type: "POST",
                        url: "/Organizations/AddOrgItem",
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
                                    window.location.href = "/Organizations/ManageOrgs?MainOrg=" + response.type;
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
                                    window.location.href = "/Organizations/ManageOrgs?MainOrg=" + response.type;
                                }, 1000)
                            }
                        }
                    })
                }
            })
        })
    });

    $("#delAll").on("click", function () {
        var OrgId = $(this).attr("data-OrgId");
        $.SmartMessageBox({
            title: "คำเตือน!",
            content: "ต้องการลบรายการนี้หรือไม่?",
            buttons: '[ไม่][ใช่]'
        }, function (ButtonPressed) {
            if (ButtonPressed == "ใช่") {
                $.get("/Organizations/DeleteAllOrg", { "MainOrg": OrgId }, function (respond) {
                    if (respond.valid == true) {
                        $.smallBox({
                            title: respond.message,
                            content: "<i class='fa fa-clock-o'></i> <i>" + respond.message + "</i>",
                            color: "#296191", // red color code #FB0404
                            iconSmall: "fa fa-thumbs-up bounce animated",
                            timeout: 2000
                        });
                        setTimeout(function () {
                            UpdatePosition();
                        }, 2000)
                    } else {
                        $.smallBox({
                            title: respond.message,
                            content: "<i class='fa fa-clock-o'></i> <i>" + respond.message + "</i>",
                            color: "#FB0404", // red color code #FB0404
                            iconSmall: "fa fa-thumbs-up bounce animated",
                            timeout: 2000
                        });
                        setTimeout(function () {
                            UpdatePosition();
                        }, 2000)
                    }
                })
            }
            if (ButtonPressed == "No") {

            }
        })
    });

});

function UpdatePosition() {
    $("#loading").html('<img src="/img/Loading/Ajax-Loading.gif" width="100"> กำลังโหลด');
    var MainOrg = $("#MainOrg").val();
    $.get("/Organizations/GetManageOrgs", { "MainOrg": MainOrg }, function (respond) {
        $("#ShowOrgs").html(respond);
        $("#loading").hide();
        var updateOutput = function (e) {
            var list = e.length ? e : $(e.target), output = list.data('output');
            if (window.JSON) {
                $(".dd").change(function () {
                    $.ajax({
                        dataType: 'JSON',
                        type: 'POST',
                        url: "/Organizations/UpdatePosition",
                        data: "Position=" + JSON.stringify(list.nestable('serialize')) + "&MainOrgId=" + MainOrg,
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
                                    window.location.href = "/Organizations/ManageOrgs?MainOrg=" + response.type;
                                }, 200)
                            } else {
                                $.smallBox({
                                    title: response.message,
                                    content: "<i class='fa fa-clock-o'></i> <i>2 seconds ago...</i>",
                                    color: "#FB0404", // red color code #FB0404
                                    iconSmall: "fa fa-thumbs-up bounce animated",
                                    timeout: 2000
                                });
                                setTimeout(function () {
                                    window.location.href = "/Organizations/ManageOrgs?MainOrg=" + response.type;
                                }, 200)
                            }
                        }
                    });
                })


            } else {
                output.val('JSON browser support required for this demo.');
            }
        };

        // activate Nestable for list 3
        $('#nestable3').nestable({
            group: 1
        }).on('change', updateOutput);

        // output initial serialised data
        updateOutput($('#nestable3').data('output', $('#nestable3-output')));

        $('#nestable3-menu').on('click', function (e) {
            var target = $(e.target), action = target.data('action');
            if (action === 'expand-all') {
                $('.dd').nestable('expandAll');
            }
            if (action === 'collapse-all') {
                $('.dd').nestable('collapseAll');
            }
        });

        $("#ShowOrgs").on("click", ".view", function () {
            var OrgId = $(this).val();
            $.get("/Organizations/ViewUsers", { "OrgId": OrgId }, function (respond) {
                $("#ModalViewUsers").html(respond);
                $('#ButtonViewUsers').modal("show");

                ListUsers(OrgId, MainOrg);
            })
        });

        // Add users
        $("#ShowOrgs").on("click", ".addusers", function () {
            var OrgId = $(this).val();
            $.get("/Organizations/FormAddOrgUser", { "OrgId": OrgId, "MainOrg": MainOrg }, function (respond) {
                $("#ModalFormAddUsers").html(respond);
                $("#ButtonAddUsers").modal("show");
                DuallistBox();

                $('#FormAddOrgUser').bootstrapValidator();
                $("#FormAddOrgUser").on("click", "#submit", function () {
                    $('#FormAddOrgUser').data("bootstrapValidator").validate();
                    if ($('#FormAddOrgUser').data("bootstrapValidator").isValid() == true) {
                        var Data = new FormData($("#FormAddOrgUser")[0]);
                        $.ajax(
                        {
                            type: "POST",
                            url: "/Organizations/AddOrgUser",
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
                                        window.location.href = "/Organizations/ManageOrgs?MainOrg=" + response.type;
                                    }, 2000)
                                } else {
                                    $.smallBox({
                                        title: response.message,
                                        content: "<i class='fa fa-clock-o'></i> <i>" + response.message + "</i>",
                                        color: "#FB0404", // red color code #FB0404
                                        iconSmall: "fa fa-thumbs-up bounce animated",
                                        timeout: 2000
                                    });
                                    setTimeout(function () {
                                        window.location.href = "/Organizations/ManageOrgs?MainOrg=" + response.type;
                                    }, 2000)
                                }
                            }
                        })
                    }
                });
            })

        });

        //Update structe
        $("#ShowOrgs").on("click", ".edit", function () {
            var OrgId = $(this).val();
            $.get("/Organizations/FormEditOrgItem", { "OrgId": OrgId, "MainOrg": MainOrg }, function (respond) {
                $("#ModalFormUpdate").html(respond);
                $("#ButtonUpdate").modal("show");

                $('#FormEditOrg').bootstrapValidator();
                $("#FormEditOrg").on("click", "#submit", function () {
                    $('#FormEditOrg').data("bootstrapValidator").validate();
                    if ($('#FormEditOrg').data("bootstrapValidator").isValid() == true) {
                        var Data = new FormData($("#FormEditOrg")[0]);

                        $.ajax(
                        {
                            type: "POST",
                            url: "/Organizations/EditOrgItem",
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
                                        window.location.href = "/Organizations/ManageOrgs?MainOrg=" + response.type;
                                    }, 2000)
                                } else {
                                    $.smallBox({
                                        title: response.message,
                                        content: "<i class='fa fa-clock-o'></i> <i>" + response.message + "</i>",
                                        color: "#FB0404", // red color code #FB0404
                                        iconSmall: "fa fa-thumbs-up bounce animated",
                                        timeout: 2000
                                    });
                                    setTimeout(function () {
                                        window.location.href = "/Organizations/ManageOrgs?MainOrg=" + response.type;
                                    }, 2000)
                                }
                            }
                        })
                    }
                });
            })

        });

        // remove menu item
        $("#ShowOrgs").on("click", ".delete", function () {
            var OrgId = $(this).val();
            $.SmartMessageBox({
                title: "คำเตือน!",
                content: "ต้องการลบรายการนี้หรือไม่?",
                buttons: '[ไม่][ใช่]'
            }, function (ButtonPressed) {
                if (ButtonPressed == "ใช่") {
                    $.get("/Organizations/DeleteOrgItem", { "OrgId": OrgId, "MainOrg": MainOrg }, function (respond) {
                        if (respond.valid == true) {
                            $.smallBox({
                                title: respond.message,
                                content: "<i class='fa fa-clock-o'></i> <i>" + respond.message + "</i>",
                                color: "#296191", // red color code #FB0404
                                iconSmall: "fa fa-thumbs-up bounce animated",
                                timeout: 2000
                            });
                            setTimeout(function () {
                                UpdatePosition();
                            }, 2000)
                        } else {
                            $.smallBox({
                                title: respond.message,
                                content: "<i class='fa fa-clock-o'></i> <i>" + respond.message + "</i>",
                                color: "#FB0404", // red color code #FB0404
                                iconSmall: "fa fa-thumbs-up bounce animated",
                                timeout: 2000
                            });
                            setTimeout(function () {
                                UpdatePosition();
                            }, 2000)
                        }
                    })
                }
                if (ButtonPressed == "No") {

                }
            })

        });
        $('#nestable3').nestable();
    })
}

function DuallistBox()
{
    var initializeDuallistbox = $('#initializeDuallistbox').bootstrapDualListbox({
        nonSelectedListLabel: 'Non-selected',
        selectedListLabel: 'Selected',
        preserveSelectionOnMove: 'moved',
        moveOnSelect: false,
        nonSelectedFilter: ''
    });
}

function ListUsers(OrgId, MainOrg)
{
    $.get("/Organizations/ListUsers", { "OrgId": OrgId }, function (respond) {
        $("#ListUsers").html(respond);
        pageSetUp();
        $("#ListUsers").on("click", ".deluser", function () {
            var OrgUserId = $(this).val();
            $.SmartMessageBox({
                title: "คำเตือน!",
                content: "ต้องการลบรายการนี้หรือไม่?",
                buttons: '[ไม่][ใช่]'
            }, function (ButtonPressed) {
                if (ButtonPressed == "ใช่") {
                    $.get("/Organizations/DeleteOrgUser", { "OrgUserId": OrgUserId, "MainOrg": MainOrg }, function (respond) {
                        if (respond.valid == true) {
                            $.smallBox({
                                title: respond.message,
                                content: "<i class='fa fa-clock-o'></i> <i>" + respond.message + "</i>",
                                color: "#296191", // red color code #FB0404
                                iconSmall: "fa fa-thumbs-up bounce animated",
                                timeout: 2000
                            });
                            setTimeout(function () {
                                ListUsers(OrgId);
                            }, 2000)
                        } else {
                            $.smallBox({
                                title: respond.message,
                                content: "<i class='fa fa-clock-o'></i> <i>" + respond.message + "</i>",
                                color: "#FB0404", // red color code #FB0404
                                iconSmall: "fa fa-thumbs-up bounce animated",
                                timeout: 2000
                            });
                            setTimeout(function () {
                                ListUsers(OrgId);
                            }, 2000)
                        }
                    })
                }
                if (ButtonPressed == "No") {

                }
            })

        });
    })
    
}