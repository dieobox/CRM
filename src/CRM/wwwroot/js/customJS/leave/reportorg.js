
$(function () {

    $("#OrgId").select2();
    $("#StartMonth").select2();
    $("#StartYear").select2();
    $("#PerYear").select2();
    $("#PersonalCode").select2();
    

    //$.get("/Organizations/GetOrgSelectListByOrgType", { "OrgType": 1 }, function (rs) {
    //    $("#OrgId").empty();
    //    $("#OrgId").append($("<option></option>").attr("value", "").text(""));
    //    $.each(rs, function (i, val) {
    //        $("#OrgId").append($("<option></option>").attr("value", val.value).text(val.text));
    //    });
    //    $("#OrgId").select2();
    //    $('#OrgId option[value="' + $(".OrgId").val() + '"]').attr("selected", "selected");

    //    $("#OrgId").change(function () {
    //        var OrgId = $(this).val();
    //        $.get("/Leave/GetPersonalCodeByOrgId", { "OrgId": OrgId }, function (rs) {
    //            $("#PersonalCode").empty();
    //            $("#PersonalCode").append($("<option></option>").attr("value", "").text(""));
    //            $.each(rs, function (i, val) {
    //                $("#PersonalCode").append($("<option></option>").attr("value", val.value).text(val.text));
    //            });
    //            $("#PersonalCode").select2();
    //        })
    //    })

     
    //});
    $("#excel").click(function () {
        // value
        var OrgId = $("#OrgId").val();
        var filter = $("input[name=filter]:checked").val();
        var Month = $("#StartMonth").val();
        var StartYear = $("#StartYear").val();
        var PerYear = $("#PerYear").val();
        window.location.href = "/Leave/ReportExcelOrg?filter=" + filter + "&Month=" + Month + "&Year=" + StartYear + "&PerYear=" + PerYear + "&OrgId=" + OrgId;
    });

    $("#pdf").click(function () {
        // value
        var OrgId = $("#OrgId").val();
        var filter = $("input[name=filter]:checked").val();
        var Month = $("#StartMonth").val();
        var StartYear = $("#StartYear").val();
        var PerYear = $("#PerYear").val();

        var Url = "/Leave/ReportPDfOrg?filter=" + filter + "&Month=" + Month + "&Year=" + StartYear + "&PerYear=" + PerYear + "&OrgId=" + OrgId;
        window.open(Url, "__blank");
    });
    
});