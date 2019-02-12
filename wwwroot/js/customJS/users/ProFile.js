$(function () {

    $("#ViewImage").click(function () {
        $("#ShowPicture").slideToggle("slow");
    });

    //Validate Form
    $('#FormEditUser').bootstrapValidator();
    $("#submit").click(function () {

        var UserId = $("#UserId").val();

        $('#FormEditUser').data("bootstrapValidator").validate();
        if ($('#FormEditUser').data("bootstrapValidator").isValid() == true) {
            var Data = new FormData($("#FormEditUser")[0]);
            $.ajax(
            {
                type: "POST",
                url: "/UsersManagement/EditProFile",
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
                            window.location.href = "/UsersManagement/ProFile?UserId=" + UserId;
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
                            window.location.href = "/UsersManagement/ProFile?UserId=" + UserId;
                        }, 1000)
                    }
                }
            })
        }
    })

});