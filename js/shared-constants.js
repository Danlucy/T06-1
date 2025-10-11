// shared-constants.js - placeholder
// Set up dimensions and margins
const margin = { top: 40, right: 30, bottom: 50, left: 70 };
const width = 800; // Total width of the chart
const height = 400; // Total height of the chart
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;





const barColor = "#606464";
const bodyBackgroundColor = "#fffaf0";
const yScale = d3.scaleLinear();
const xScale = d3.scaleLinear();

const binGenerator = d3.bin().value(d => d.energyConsumption);