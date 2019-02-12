$(document).ready(function () {
    loadchart();
    LoadData();

    //Auto Refreash
    setInterval(function () {
        loadchart();
        LoadData();               
    }, 60000);


    // Alert Message
    $.get("/Home/CheckTimeAlert", function (rs) {
        if (rs.valid == false) {
            $.smallBox({
                title: "แจ้งเตือน !",
                content: "กรุณาตรวจสอบเวลาเข้างานของคุณ",
                color: "#E5190C",
                timeout: 5000,
                icon: "fa fa-bell swing animated"
            });
        }
        else {
            // not do somthing
        }
    });
  
    // Profile
    $("#Profile").html('<img src="/img/Loading/Ajax-Loading.gif" width="50"> กำลังโหลด');
    $.get("/Home/GetProfileUser", function (rs) {
        $("#Profile").html(rs);
    });

    // birth days
    $("#BirthDays").html('<img src="/img/Loading/Ajax-Loading.gif" width="50"> กำลังโหลด');
    $.get("/Home/BirthDays", function (rs) {
        $("#BirthDays").html(rs);
    });
});

function LoadData() {
    // Announce
    $("#Announce").html('<img src="/img/Loading/Ajax-Loading.gif" width="50"> กำลังโหลด');
    $.get("/Home/GetAnnounce", function (rs) {
        $("#Announce").html(rs);
    });

    // notice 
    $("#Notices").html('<img src="/img/Loading/Ajax-Loading.gif" width="50"> กำลังโหลด');
    $.get("/Home/CountNoticeThisMount", function (rs) {
        $("#Notices").html(rs);
    });

    // Time 
    $("#TomeLog").html('<img src="/img/Loading/Ajax-Loading.gif" width="50"> กำลังโหลด');
    $.get("/Home/GetTimeLog", function (rs) {
        $("#TomeLog").html(rs);
    });

    // leave static
    $("#LeaveChart").html('<img src="/img/Loading/Ajax-Loading.gif" width="50"> กำลังโหลด');
    $.get("/Leave/GetLeaveStatic", { "Limit": 3, "View": "HomeLeaveStatic" }, function (rs) {
        $("#LeaveChart").html(rs);
    });

    // Room
    $("#Rooms").html('<img src="/img/Loading/Ajax-Loading.gif" width="50"> กำลังโหลด');
    $.get("/Home/GetRooms", function (rs) {
        $("#Rooms").html(rs);
    });

    // commands
    $("#HtmlCommand").html('<img src="/img/Loading/Ajax-Loading.gif" width="50"> กำลังโหลด');
    $.get("/Home/GetCommands", function (rs) {
        $("#HtmlCommand").html(rs);
    });
}

function loadchart(){
    // สถิติหนังสือเวียน
    $.get("/Home/GetNoticeChart", function (RS) {
        setTimeout(function () {
            var d = new Date();
            var n = d.getFullYear();
            if ($('#Notices-Graph').length) {
                Morris.Bar({
                    element: 'Notices-Graph',
                    data: RS,
                    xkey: 'x',
                    ykeys: ['y', 'z'],
                    labels: ['ปีนี้ (' + (n + 543) + ') ', 'เดือนนี้']
                });
            }
        }, 100)
    });

    // สถิติระบบสารบรรณ
    $.get("/Home/GetArchivesChart", function (RS) {
        setTimeout(function () {
            var d = new Date();
            var n = d.getFullYear();
            if ($('#Archive-Graph').length) {
                Morris.Bar({
                    element: 'Archive-Graph',
                    data: RS,
                    xkey: 'x',
                    ykeys: ['y', 'z'],
                    labels: ['รอลงรับ(ภายใน)', 'รอลงรับ(ภายนอก)']
                });
            }
        }, 100)
    });

    // leave
    $.get("/Leave/GetChart", function (rs) {
        if ($('#Leavechart').length) {
            Morris.Bar({
                element: 'Leavechart',
                data: rs,
                xkey: 'x',
                ykeys: ['y', 'z', 'a'],
                labels: ['สิทธิ์ต่อปี', 'ใช้ไป', 'คงเหลือ']
            });
        }
    });

    // Get Time Chart
    $.get("/Home/GetTimeStamp", function (rs) {
        if ($('#TimeChart').length) {
            Morris.Bar({
                element: 'TimeChart',
                data: rs,
                xkey: 'x',
                ykeys: ['y', 'z', 'a'],
                labels: ['ช่วงที่ 1', 'ช่วงที่ 2', 'ช่วงที่ 3']
            });
        }
    });

    // leave status
    $.get("/Home/GetLeaveStatusAll", function (rs) {
        $("#LeaveStatus").html('<img src="/img/Loading/Ajax-Loading.gif" width="50"> กำลังโหลด');
        $("#LeaveStatus").html(rs);
    });
}

