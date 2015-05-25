function init() {
    initWidgets();
    bindEvents();
    renderLeaveTallyChart();
}

function initWidgets() {
    $("#fromdatepicker").datepicker({
        minDate: 0,
        maxDate: '+1Y+6M',
        onSelect: function(dateStr) {
            var min = $(this).datepicker('getDate'); // Get selected date
            $("#todatepicker").datepicker('option', 'minDate', min || '0'); // Set other min, default to today
        }
    });
    $("#todatepicker").datepicker({
        minDate: '0',
        maxDate: '+1Y+6M',
    });
}

/*=====================================
=            Binding Events           =
=====================================*/

function bindEvents() {
        $('#leaveform').on("click", function() {
            $('#leavefrm').show();
        });

        $('#leavecancel').on("click", function() {
            $('#fromdatepicker').datepicker('setDate', null);
            $('#todatepicker').datepicker('setDate', null);
            $('.apply-box .leaveType').val('');
            $('.apply-box textarea').val('');
            $('#leavefrm').hide();
        });

        $('#leaveapply').on("click", function() {
            console.log($('#fromdatepicker').val());
            console.log($('#todatepicker').val());
            $('#type').val();
            $('#desc').val();
            showConfirmationBox();
        });

        $("aside h4 a").click(function() {
            $('.tab').hide();
            theDiv = $(this).attr("href");
            $(theDiv).show();
        });

        $('.managerTab').on("click", function() {
            $('.requests').show();
        });

        $('.requests').on("click", function() {
            $('#leaveTrackerChart').show();
            $('#managerField').show();
            renderLeaveTrackerChart();
        });

        $('.request-reject').on("click", function() {
            showDialog();
        });

        $('#dialog-close').on("click", function() {
            $("#dialog-modal").dialog('close');
        });
    }
    /*-----  End of event bindings  ------*/

/*=====================================
=            Render Pie Chart         =
=====================================*/

function renderLeaveTallyChart() {
        var sampleData = [{
            key: "Total Leave",
            y: 10
        }, {
            key: "Applied Leave",
            y: 2
        }, {
            key: "Remaining Leave",
            y: 8
        }];

        var height = 400;
        var width = 400;

        nv.addGraph(function() {
            var chart = nv.models.pieChart()
                .x(function(d) {
                    return d.key
                })
                .y(function(d) {
                    return d.y
                })
                .width(width)
                .height(height);

            d3.select("#LeaveTally")
                .datum(sampleData)
                .transition().duration(1200)
                .attr('width', width)
                .attr('height', height)
                .call(chart);

            return chart;
        });
    }
    /*-----  End of rendering Pie chart  ------*/

var leaveDetails = {};

function showConfirmationBox() {
    var diff = ($('#todatepicker').datepicker("getDate") - $('#fromdatepicker').datepicker("getDate")) / (1000 * 60 * 60 * 24);
    if (confirm("Are you sure you want to apply " + diff + " days leave") == true) {
        $('#leavefrm').hide();
        leaveDetails['startDate'] = $('#fromdatepicker').val();
        leaveDetails['endDate'] = $('#todatepicker').val();
        leaveDetails['type'] = $('.leaveType').val();
        leaveDetails['desc'] = $('#desc').val();
        leaveDetails['duration'] = diff;
        leaveDetails['status'] = "Waiting";
        updateUpcomingTable();
        $('.tab').hide();
        $('#upcoming').show();
    } else {
        $('#leavefrm').hide();
    }
}

function updateUpcomingTable() {
    $(".tblUpcoming > tbody").append("<tr><td> " + leaveDetails['startDate'] + "</td><td> " + leaveDetails['endDate'] + "</td>  <td>" + leaveDetails['type'] + "</td><td>" + leaveDetails['duration'] + "</td><td>" + leaveDetails['desc'] + "</td> <td>" + leaveDetails['status'] + "</td></tr>");
}

function showDialog() {
    $("#dialog-modal").dialog();
}

/*=====================================
=            Bootstrapping            =
=====================================*/

init();

/*-----  End of Bootstrapping  ------*/


/*=====================================
=            Render Pie Chart         =
=====================================*/

function renderLeaveTrackerChart() {
        var sampleData = [{
            key: "Total Leave",
            y: 20
        }, {
            key: "Approved Leave",
            y: 7
        }, {
            key: "Pending Leave",
            y: 13
        }];

        var height = 350;
        var width = 350;

        nv.addGraph(function() {
            var chart = nv.models.pieChart()
                .x(function(d) {
                    return d.key
                })
                .y(function(d) {
                    return d.y
                })
                .width(width)
                .height(height);

            d3.select("#leaveTracker")
                .datum(sampleData)
                .transition().duration(1200)
                .attr('width', width)
                .attr('height', height)
                .call(chart);

            return chart;
        });

}
    /*-----  End of rendering Pie chart  ------*/
