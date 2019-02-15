$(function () {
    $.get("/Comment/Gets",{"CustomerId" : $("#CustomerId").val()} ,function (Result) {
        $("#JsonShow").html(Result);

        $("#add").on("click", function () {
            var Id = $("#CustomerId").val();
            $.get("/Comment/FormAdd", { "CustomerId": Id }, function (Result) {
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
                            url: "/Comment/Add",
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
                                        window.location.href = "/Comment/Index?CustomerId=" + Id;
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
                                        window.location.href = "/Comment/Index?CustomerId=" + Id;
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
    });
});

