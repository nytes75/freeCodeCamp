// D3 Heat-Map for Global Sea Surface Temperatures
var margin = {  top: 30,
                right: 30,
                bottom: 30,
                left: 30
            },
    width = 450 - margin.left - margin.right,
    height = 450 - margin.top - margin.top;
//appending svg object of the page
var svg = d3.select('#svg').append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
                .attr('transform', "translate(" + margin.left + "," + margin.top + ")");
// Lableing of rows and columns
d3.json('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json', 
data => {
    console.log(data)
})