// interactions.js - placeholder
const populateFilters = (data) => {


 
    
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

    // Create a simple HTML tooltip (absolute positioned div)
    const createTooltip = () => {
        // remove existing tooltip if any
        d3.select('body').selectAll('.tooltip').remove();

        d3.select('body').append('div')
            .attr('class', 'tooltip')
            .style('position', 'absolute')
            .style('pointer-events', 'none')
            .style('padding', '6px 8px')
            .style('background', '#222')
            .style('color', '#fff')
            .style('border-radius', '4px')
            .style('font-size', '12px')
            .style('opacity', 0);
    };

    // Attach mouse handlers to data elements (circles and rects)
    const handleMouseEvent = () => {
        const tip = d3.select('.tooltip');
        if (tip.empty()) return;

        // Helper to show tooltip with text and position
        function showTip(event, text) {
            tip.html(text)
                .style('left', (event.pageX + 10) + 'px')
                .style('top', (event.pageY + 10) + 'px')
                .transition().duration(150).style('opacity', 1);
        }

        function hideTip() {
            tip.transition().duration(150).style('opacity', 0);
        }

        // For scatter points (circles)
        d3.selectAll('circle').on('mouseover', function(event, d) {
            if (!d) return;
            const txt = `Brand: ${d.brand || '-'}<br>Screen: ${d.screenSize || '-'} in<br>Energy: ${d.energyConsumption || '-'} kWh`;
            showTip(event, txt);
        }).on('mousemove', function(event) {
            tip.style('left', (event.pageX + 10) + 'px').style('top', (event.pageY + 10) + 'px');
        }).on('mouseout', hideTip);

        // For histogram bars (rect), show bin info if bound
        d3.selectAll('rect').on('mouseover', function(event, d) {
            if (!d) return;
            // d is a bin from d3.bin: x0, x1, length
            const txt = `Range: ${d.x0}–${d.x1}<br>Count: ${d.length}`;
            showTip(event, txt);
        }).on('mousemove', function(event) {
            tip.style('left', (event.pageX + 10) + 'px').style('top', (event.pageY + 10) + 'px');
        }).on('mouseout', hideTip);
    };
