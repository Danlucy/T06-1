// interactions.js - placeholder
const populateFilters = (data) => {


    const filter_screen = [{
        id: 'all', label: "All", isActive: true
    }, {
        id: 'LED', label: "LED", isActive: false
    }, {
        id: 'LCD', label: "LCD", isActive: false
    }, {
        id: 'OLED', label: "OLED", isActive: false
    }
    ]
    d3.select("#filters_screen").selectAll("button").data(filter_screen)
        .join("button")
        .attr("class", d => d.isActive ? "filter active" : "filter")
        .attr("data-filter", d => d.id)
        .text(d => d.label)
        .on('click', function(event, d) {
            const btn = d3.select(this);
            const filterId = d && d.id ? d.id : btn.attr('data-filter');

            // toggle active state: mark only this button as active
            d3.selectAll("#filters_screen .filter").classed('active', false);
            btn.classed('active', true);

            updateHistogram(filterId, data);
        });


  
}


  updateHistogram = (filterId, data) => {

        const updatedData = filterId === 'all' ? data : data.filter(d => d.screenTech === filterId);
        const updatedBins = binGenerator(updatedData);
        d3.selectAll("#histogram rect")
  .data(updatedBins)
  .join("rect")
  .transition()
  .duration(500)
  .ease(d3.easeCubic)
  .attr("y", d => yScale(d.length))
  .attr("height", d => innerHeight - yScale(d.length));

    }