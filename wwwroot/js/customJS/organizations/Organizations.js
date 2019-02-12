$(function () {
    // Add Menu
    $("#add").click(function () {
        $.get("/Organizations/FormAddOrg", { "GetForm": "GetForm" }, function (ReturnForm) {
            $("#ModalFormAdd").html(ReturnForm);
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
                        url: "/Organizations/AddOrg",
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
                                    window.location.href = "/Organizations/Index";
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
                                    window.location.href = "/Organizations/Index";
                                }, 1000)
                            }
                        }
                    })
                }
            })
        });


    });

    // List Orgs
    $.get("/Organizations/GetOrgs", { "Orgs": "Orgs" }, function (rs) {
        $("#ShowOrgs").html('<img src="/img/Loading/Ajax-Loading.gif" width="100"> กำลังโหลด');
        setTimeout(function () {
            $("#ShowOrgs").html(rs);
            Datatable();

            // Manage Orgs
            $("#ShowOrgs").on("click", ".manage", function () {
                var OrgId = $(this).val();
                window.location.href = "/Organizations/ManageOrgs?MainOrg=" + OrgId;
            });

            // Edit  Orgs
            $("#ShowOrgs").on("click", ".edit", function () {
                var OrgId = $(this).val();
                $.get("/Organizations/FormEditOrg", { "OrgId": OrgId }, function (ReturnForm) {
                    $("#ModalFormUpdate").html(ReturnForm);
                    $('#ButtonUpdate').modal("show");

                    //Validate Form
                    $('#FormEditOrg').bootstrapValidator();
                    $("#submit").click(function () {
                        $('#FormEditOrg').data("bootstrapValidator").validate();
                        if ($('#FormEditOrg').data("bootstrapValidator").isValid() == true) {
                            var Data = new FormData($("#FormEditOrg")[0]);
                            $.ajax(
                            {
                                type: "POST",
                                url: "/Organizations/EditOrg",
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
                                            window.location.href = "/Organizations/Index";
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
                                            window.location.href = "/Organizations/Index";
                                        }, 1000)
                                    }
                                }
                            })
                        }
                    })
                });
            });

            // Delete Orgs
            $("#ShowOrgs").on("click", ".delete", function () {
                var OrgId = $(this).val();
                $.SmartMessageBox({
                    title: "คำเตือน!",
                    content: "ต้องการลบรายการนี้หรือไม่?",
                    buttons: '[ไม่][ใช่]'
                }, function (ButtonPressed) {
                    if (ButtonPressed == "ใช่") {
                        $.get("/Organizations/DeleteOrg", { "OrgId": OrgId }, function (response) {
                            if (response.valid == true) {
                                $.smallBox({
                                    title: response.message,
                                    content: "<i class='fa fa-clock-o'></i> <i>" + response.message + "</i>",
                                    color: "#296191", // red color code #FB0404
                                    iconSmall: "fa fa-thumbs-up bounce animated",
                                    timeout: 1000
                                });
                                setTimeout(function () {
                                    window.location.href = "/Organizations/Index";
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
                                    window.location.href = "/Organizations/Index";
                                }, 100)
                            }
                        })
                    }
                    if (ButtonPressed == "ไม่") {

                    }
                });
                e.preventDefault();

            });

        }, 100)
    });



    //$.get("/UsersManagement/Get", { "UserId": "4be80ba6-e8f7-445f-b9c4-3ae5cfaaf5f5" }, function (RS) {
    //    $("#Json").html(RS);
    //})









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

        $('#td_orgs').dataTable({
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
                    responsiveHelper_dt_basic = new ResponsiveDatatablesHelper($('#td_orgs'), breakpointDefinition);
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
    


});