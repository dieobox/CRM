$(document).ready(function () {
    $.get("/Home/GetCustomers", function (rs) {
        $("#Customers").html(rs);
    });

    $.get("/Home/GetUsers", function (rs) {
        $("#Users").html(rs);
    });

    $.get("/Home/BestSellerProduct", function (rs) {
        $("#BestSellers").html(rs);
    });

    $.get("/Home/LogsView", function (rs) {
        $("#LogView").html(rs);
    });
});
