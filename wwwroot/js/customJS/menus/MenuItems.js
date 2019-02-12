$(function () {
    UpdatePosition();
    var MenuId = $("#MenuId").val();
    
    $("#loading").html('<img src="/img/Loading/Ajax-Loading.gif" width="100"> กำลังโหลด');
    $("#add").on("click", function () {
        $.get("/Menus/FormAddMenuItem", { "MenuId": MenuId }, function (respond) {
            $("#ModalFormAdd").html(respond);
            $('#ButtonAdd').modal("show");
            $('.icp-auto').iconpicker();

            $("input[name$='MenuType']").change(function () {
                var MenuType = $(this).val();
                $("#ShowAll").show();
                if (MenuType == "true") {
                    $("#AddController").show();
                    $("#AddUrl").hide();
                } else {
                    $("#AddController").hide();
                    $("#AddUrl").show();
                }
            });
            
            
            //Validate Form
            $('#FormAddMenuItem').bootstrapValidator();
            $("#submit").click(function () {
                $('#FormAddMenuItem').data("bootstrapValidator").validate();
                if ($('#FormAddMenuItem').data("bootstrapValidator").isValid() == true) {
                    var Data = new FormData($("#FormAddMenuItem")[0]);
                    $.ajax(
                    {
                        type: "POST",
                        url: "/Menus/AddMenuItem",
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
                                    window.location.href = "/Menus/MenuItems?MenuId=" + response.type;
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
                                    window.location.href = "/Menus/MenuItems?MenuId=" + response.type;
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
                $.get("/Menus/DeleteAllMenuItem", { "OrgId": OrgId }, function (respond) {
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
    var MenuId = $("#MenuId").val();
    $.get("/Menus/GetMenuItems", { "MenuId": MenuId }, function (respond) {
        $("#ShowMenuItem").html(respond);
        $("#loading").hide();
        var updateOutput = function (e) {
            var list = e.length ? e : $(e.target), output = list.data('output');

            if (window.JSON) {

                $(".dd").change(function () {
                    $.ajax({
                        dataType: 'JSON',
                        type: 'POST',
                        url: "/Menus/UpdatePosition",
                        data: "Position=" + JSON.stringify(list.nestable('serialize')) + "&MenuId=" + MenuId,
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
                                    window.location.href = "/Menus/MenuItems?MenuId=" + response.type;
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
                                    window.location.href = "/Menus/MenuItems?MenuId=" + response.type;
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

        //Update structe
        $("#ShowMenuItem").on("click", ".edit", function () {
            var MenuItemId = $(this).val();
            $.get("/Menus/FormEditMenuItem", { "MenuItemId": MenuItemId }, function (respond) {
                $("#ModalFormUpdate").html(respond);
                $("#ButtonUpdate").modal("show");
                $('.icp-auto').iconpicker();

                //Get Value in radio button
                var value = $("input[name$='MenuType']:checked").val();
                if (value == "true") {
                    $("#AddController").show();
                    $("#AddUrl").hide();
                } else {
                    $("#AddController").hide();
                    $("#AddUrl").show();
                }

                $("input[name$='MenuType']").change(function () {
                    var MenuType = $(this).val();
                    if (MenuType == "true") {
                        $("#AddController").show();
                        $("#AddUrl").hide();
                    } else {
                        $("#AddController").hide();
                        $("#AddUrl").show();
                    }
                });

                $('#FormEditMenuItem').bootstrapValidator();
                $("#FormEditMenuItem").on("click", "#submit", function () {
                    $('#FormEditMenuItem').data("bootstrapValidator").validate();
                    if ($('#FormEditMenuItem').data("bootstrapValidator").isValid() == true) {
                        var Data = new FormData($("#FormEditMenuItem")[0]);

                        $.ajax(
                        {
                            type: "POST",
                            url: "/Menus/EditMenuItem",
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
                                        window.location.href = "/Menus/MenuItems?MenuId=" + response.type;
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
                                        window.location.href = "/Menus/MenuItems?MenuId=" + response.type;
                                    }, 2000)
                                }
                            }
                        })
                    }
                });
            })

        });

        // remove menu item
        $("#ShowMenuItem").on("click", ".delete", function () {
            var MenuItemId = $(this).val();
            $.SmartMessageBox({
                title: "คำเตือน!",
                content: "ต้องการลบรายการนี้หรือไม่?",
                buttons: '[ไม่][ใช่]'
            }, function (ButtonPressed) {
                if (ButtonPressed == "ใช่") {
                    $.get("/Menus/DeleteMenuItem", { "MenuItemId": MenuItemId }, function (respond) {
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