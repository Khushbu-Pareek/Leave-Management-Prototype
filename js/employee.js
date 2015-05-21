function init(){
    initWidgets();
    bindEvents();
    renderLeaveTallyChart();
}

function initWidgets(){
    $("#fromdatepicker").datepicker();
    $("#todatepicker").datepicker();
}

function bindEvents(){
    $('#leaveform').on("click", function() {
        $('#leavefrm').show();
    });

    $('#leavecancel').on("click", function() {
        $('#fromdatepicker').datepicker('setDate', null);
        $('#todatepicker').datepicker('setDate', null);
        $('.apply-box input[type="text"]').val('');
        $('.apply-box textarea').val('');
    });

    $('#leaveapply').on("click", function() {
        console.log($('#fromdatepicker').val());
        console.log($('#todatepicker').val());
        $('#type').val();
        $('#desc').val();
    });
    $("aside h4 a").click(function() {
        $('.tab').hide();
        theDiv = $(this).attr("href");
        $(theDiv).show();
    });
}


function renderLeaveTallyChart(){
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

    var height = 280;
    var width = 280;

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


/*=====================================
=            Bootstrapping            =
=====================================*/

init();

/*-----  End of Bootstrapping  ------*/

