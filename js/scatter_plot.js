// scatter_plot.js - minimal version matching histogram structure
const drawScatter = (data) => {
    if (!data || !Array.isArray(data)) return;

    const svg = d3.select('#scatterplot').append('svg').attr('viewBox', `0 0 ${width} ${height}`);
     innerChartS = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

const filteredData = data.filter(d => d.star != null && d.energyConsumption != null);
if (filteredData.length === 0) return;

    const xExtent = d3.extent(filteredData, d => d.star);
    const yExtent = d3.extent(filteredData, d => d.screenSize);

    xScaleS.domain([xExtent[0] -0.5, xExtent[1] + 0.5]).range([0, innerWidth]);
    yScaleS.domain([yExtent[0], yExtent[1]]).range([innerHeight, 0]).nice();
colorScale.domain([...new Set(filteredData.map(d => d.screenTech))]).range(d3.schemeCategory10);
    innerChartS.selectAll('circle')
        .data(filteredData)
        .enter()
        .append('circle')
        .attr('cx', d => xScaleS(d.star))
        .attr('cy', d => yScaleS(d.screenSize))
        .attr('r', 4)
.attr('fill', d => colorScale(d.screenTech))
        .attr('stroke', bodyBackgroundColor)
        .attr('stroke-width', 0.5);

    const bottomAxis = d3.axisBottom(xScaleS);
    innerChartS.append('g').attr('transform', `translate(0, ${innerHeight})`).call(bottomAxis);

    const leftAxis = d3.axisLeft(yScaleS);
    innerChartS.append('g').call(leftAxis);

    svg.append('text')
        .text('Star Rating')
        .attr('text-anchor', 'end')
        .attr('x', width - 20)
        .attr('y', height - 5)
        .attr('class', 'axis-label');

    svg.append('text')
        .text('Energy Consumption (kWh/year)')
        .attr('x', 30)
        .attr('y', 20)
        .attr('class', 'axis-label');
};

window.drawScatter = drawScatter;
