
var h = 500;
var w = 1000;

var border = { top: 50, bottom: 50, left: 50, right : 50}

const svg = d3.select('#svg')
              .append('svg')
              .attr('height', h)
              .attr('width', w)

var div = d3.select('.App')
            .append('div')
            .attr('class', 'tooltip')
            .attr('id', 'tooltip')
            .style('opacity', 0);

d3.json('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json', data => {
  data.forEach((d) => {
    d.Place = +d.Place;
    var parsedTime = d.Time.split(':');
    d.Time = new Date(Date.UTC(1970, 0, 1, 0, parsedTime[0], parsedTime[1]));
  });

    var yearsDate = data.map( y => {
        return y.Year
      });

    var x = d3.scaleLinear()
              .domain([d3.max(yearsDate) + 1, d3.min(yearsDate) - 1])
              .range([w - border.left, border.right])

    svg.append('g')
        .call(d3.axisBottom(x).tickFormat(d3.format('d')))
        .attr('transform', `translate(0, ${h-border.bottom})`)
        .attr('color', 'crimson')
        .attr('font-size',14)
        .attr('id', 'x-axis')

    var timeFormat = d3.timeFormat('%M:%S');
    var y = d3.scaleTime()
              .domain(d3.extent(data, function (d) {
                return d.Time;
              }))
              .range([border.bottom,h-border.top]);
    //console.log(d.Time)
    svg.append('g')
        .call(d3.axisLeft(y).tickFormat(timeFormat))
        .attr('transform', `translate( ${border.left}, 0)`)
        .attr('color', 'crimson').attr('font-size',14)
        .attr('id', 'y-axis')
  
    svg.selectAll('circle')
        .data(data.sort((a,b) => d3.ascending(a.Year, b.Year)))
        .enter()
            .append('circle')
            .attr('r', 5)
            .attr('cy', d => y(d.Time))
            .attr('cx', d => x(d.Year))
            .attr('fill', d => {
              if(d.Doping == ''){
                return 'white'
              }else{
                return 'crimson'
              }
            })
            .attr('class', 'dot')
            .attr('data-xvalue', d => d.Year)
            .attr('data-yvalue', d => d.Time)
            .on('mouseover', function (d) {
              div.style('opacity', 0.9);
              div.attr('data-year', d.Year);
              div
                .html(
                  d.Name +
                    ': ' +
                    d.Nationality +
                    '<br/>' +
                    'Year: ' +
                    d.Year +
                    ', Time: ' +
                    timeFormat(d.Time) +
                    (d.Doping ? '<br/><br/>' + d.Doping : '')
                )
               .style('left', d3.event.pageX + 'px')
        .style('top', d3.event.pageY - 28 + 'px');
            })
            .on('mouseout', function () {
              div.style('opacity', 0);
            });

      svg
        .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('x',  - h/2)
        .attr('y', border.left + 15)
        .style('font-size', 15)
        .text('Time in Minutes')
        .attr('fill', 'whitesmoke');
            
});
