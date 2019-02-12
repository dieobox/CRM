$(document).ready(function () {
    
    $("#type").select2();

    "use strict";
    
    var hdr = {
        left: 'title',
        center: 'month,agendaWeek,agendaDay',
        right: 'prev,today,next'
    };
    var initDrag = function (e) {
        var eventObject = {
            reserverid: $.trim(e.children('span').attr('data-id')),
            title: $.trim(e.children().text()), // use the element's text as the event title
            description: $.trim(e.children('span').attr('data-description')),
            icon: $.trim(e.children('span').attr('data-icon')),
            className: $.trim(e.children('span').attr('class')) // use the element's children as the event class
        };
        e.data('eventObject', eventObject);
        e.draggable({
            zIndex: 999,
            revert: true, // will cause the event to go back to its
            revertDuration: 0 //  original position after the drag
        });
    };
    var addEvent = function (title, priority, description, icon, reserverId) {
        reserverid = reserverid.length === 0 ? "Untitled Event" : reserverid;
        title = title.length === 0 ? "Untitled Event" : title;
        description = description.length === 0 ? "No Description" : description;
        icon = icon.length === 0 ? " " : icon;
        priority = priority.length === 0 ? "label label-default" : priority;
        var html = $('<li><span class="' + priority + '" data-description="' + description + '" data-icon="' + icon + '">' + title + '</span></li>').prependTo('ul#external-events').hide().fadeIn();
        $("#event-container").effect("highlight", 800);

        initDrag(html);
    };
    $('#calendar').fullCalendar({
        header: hdr,
        editable: false,
        durationEditable: true,
        startEditable: true,
        eventResize: true,
        droppable: true,

        select: function (start, end, allDay) {
            var title = prompt('Event Title:');
            if (title) {
                calendar.fullCalendar('renderEvent', {
                    reserverid : reserverid,
                    title: title,
                    start: start,
                    end: end,
                    allDay: allDay
                }, true 
                        );
            }
            calendar.fullCalendar('unselect');
        },

        events:
            $("#type").change(function () {
                $.get("/RoomReserves/GetViewCalendar", { "Type": $(this).val() }, function (Source) {
                    $('#calendar').fullCalendar('removeEvents');
                    $('#calendar').fullCalendar('removeEventSource', $('.Source').val());
                    $('#calendar').fullCalendar('addEventSource', Source);
                });
            }),
        eventClick: function (event) {
            if (!event.url) {
                $.get("/RoomReserves/GetViewDetails", { "ReserverId": event.reserverid }, function (rs) {
                    $("#ModalDetail").html(rs);
                    $("#ButtonDetail").modal('show');
                })
                return false;
            }
            if (event.url) {
                return false;
            }
        },
        eventRender: function (event, element, icon) {
            if (!event.description == "") {
                element.find('.fc-title').append("<br/><span class='ultra-light'>" + event.description + "</span>");
            }
            if (!event.icon == "") {
                element.find('.fc-title').append("<i class='air air-top-right fa " + event.icon +  " '></i>");
            }
        },      
    });
    /* hide default buttons */
    $('.fc-right, .fc-center').show();

    $('#calendar-buttons #btn-prev').click(function () {
        $('.fc-prev-button').click();
        return false;
    });

    $('#calendar-buttons #btn-next').click(function () {
        $('.fc-next-button').click();
        return false;
    });

    $('#calendar-buttons #btn-today').click(function () {
        $('.fc-today-button').click();
        return false;
    });

})