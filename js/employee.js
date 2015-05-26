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
        $('#fromdatepicker').datepicker('setDate', null);
        $('#todatepicker').datepicker('setDate', null);
        $('.apply-box .leaveType').val('');
        $('.apply-box textarea').val('');
        $('#leaveform-dialog-modal').dialog({
            resizable: false,
            height: 400,
            width: 600,
            modal: true,
        });
    });

    $('#leavecancel').on("click", function() {
        $("#leaveform-dialog-modal").dialog('close');
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

    $('#managerField').on("click", function() {
        $('#managerField').show();
    });

    $('.linkReport').on("click", function() {
        $('#managerField').hide();
        $('#leaveReports').show();
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
    if(($('#fromdatepicker').val() == '') || ($('#todatepicker').val() == '')) {
       alert("Please select dates"); 
       return;
    }
    else if($('.leaveType').val() == '')
    {
       alert("Please select leave type"); 
       return;
    } else {
       confirmLeaves(diff);
    }
}

function confirmLeaves(diff){
    $('#message-dialog-modal').dialog();
    $('#message-dialog-modal p').html("Are you sure you want to apply " + diff + " days leave");
    $('#message-dialog-confirm').on("click", function() {
        $('#leaveform-dialog-modal').dialog('close');
        leaveDetails['startDate'] = $('#fromdatepicker').val();
        leaveDetails['endDate'] = $('#todatepicker').val();
        leaveDetails['type'] = $('.leaveType').val();
        leaveDetails['desc'] = $('#desc').val();
        leaveDetails['duration'] = diff;
        leaveDetails['status'] = "Waiting";
        updateUpcomingTable();
        $('.tab').hide();
        $('#upcoming').show();
        $('#message-dialog-modal').dialog('close');
    });
    $('#message-dialog-close').on("click", function() {
        $('#leaveform-dialog-modal').dialog('close');
        $('#message-dialog-modal').dialog('close');
    });
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

/*=====================================
=            Render Line Graph         =
=====================================*/

nv.addGraph(function() {
  var chart = nv.models.lineChart()
    .useInteractiveGuideline(true)
    ;

  chart.xAxis
    .axisLabel('Date')
    .tickFormat(d3.format(',r'))
    ;

  chart.yAxis
    .axisLabel('No. of leaves (v)')
    .tickFormat(d3.format('.02f'))
    ;

  d3.select('#linechart svg')
    .datum(data())
    .transition().duration(100) 
    .call(chart)
    ;

  nv.utils.windowResize(chart.update);

  return chart;
});

function data() {
  var sampleData = [{x: 5, y: 2}, {x: 10, y: 3}
                , {x: 15, y: 1}, {x: 20, y: 5}
                , {x: 25, y: 4}];

  return [
    {
      values: sampleData,
      key: 'Leaves',
      color: '#ABB5F2'
    }
  ];
}
/*-----  End of rendering line graph  ------*/