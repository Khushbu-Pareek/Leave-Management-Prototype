
  // Rendering of LeaveTally -Pie Chart 

    var sampleData = [
        {key: "Total Leave", y: 10},
        {key: "Applied Leave", y: 2},
        {key: "Remaining Leave", y: 8}
    ];

    var height = 280;
    var width = 280;

    nv.addGraph(function() {
        var chart = nv.models.pieChart()
            .x(function(d) { return d.key })
            .y(function(d) { return d.y })
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
