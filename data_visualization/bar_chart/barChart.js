//Bugs.. But it passed sooo.. 
//i'll be but to correct things

const height = 600 ;
const width =  1000 ;
const margin = {top: 50, bottom:40, left:10, right:10};

const svg =d3.select('#gdp')
            .append('svg')
            .attr('height', height -margin.top -margin.bottom)
            .attr('width', width -margin.left -margin.right)
            .attr('viewBox', [0, 0, width, height])
            .style('background-color', 'tomato')
            .style('margin', 'auto')

const tooltip = d3.select('#tooltip')
                .attr('height', height)
                .attr('width', width)

d3.json('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json', (e ,data) => {
    //console.log(data)
    var yearsDate = data.data.map(function (item) {
        //console.log((item[0]))
            return new Date(item[0]);
          });
    var xMax = new Date(d3.max(yearsDate));
          xMax.setMonth(xMax.getMonth() + 5);

    var x = d3.scaleTime()
          .domain([d3.min(yearsDate), xMax])
          .range([0, width]);

    var GDP = data.data.map( (a) => {
            //console.log(a[1])
                return a[1];
            });

    var scaledGDP = [];

    var gdpMax = d3.max(GDP);
    
    var linearScale = d3.scaleLinear().domain([0, gdpMax]).range([0, height-margin.bottom-margin.top]);
    //console.log(linearScale)

    scaledGDP = GDP.map(d => {
        //console.log(linearScale(item)) //seems to be in decending order
        return linearScale(d);
    });
    //console.log(scaledGDP)
     
    //var xAxis = d3.axisBottom().scale(xScale);
    var y = d3.scaleLinear().domain([0, gdpMax]).range([height-margin.bottom, margin.top]);

    // for the Bars
    svg.selectAll('rect')
        .data(scaledGDP)
        .enter()
            .append('rect')
            .attr('data-date', function (d, i) {
                //console.log(data.data[i][0])
               return data.data[i][0] ;
                })
            .attr('data-gdp', function (d, i) {
                //console.log(data.data[i][1])
                return data.data[i][1];
            })
            .attr('x', function (d, i) {
                //console.log(x(yearsDate[i]))
                return x(yearsDate[i]);
              })
            .attr('y', (d) => height - margin.bottom - d)
            .on('mouseover', (d, i) => {
    tooltip.attr('data-date', data.data[i][0])

                //let index = scaledGDP.indexOf(i)
                //console.log(data.data[i][0])
                //console.log(scaledGDP.indexOf(i)[0])
  tooltip.attr('style', 'display:block')
.attr('data-date', data.data[i][0])              
      d3.select('#tooltip').text('Date :' + data.data[i][0] + '\n Data :' + data.data[i][1] )
                                     
  }).on('mouseleave', (d,i) =>{
      tooltip.style('transition', 3).attr('style', 'display:none')              
      })
            .attr('height', d => d)
            .attr('width', 3)
            .attr('fill', '#222')
            .attr('class', 'bar rect')
            
    //text [ Gross Domestic Product]        
    svg.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('x', -height/1.5)
        .attr('y', margin.left + 15)
        .text('Gross Domestic Product')
        .style('color', 'white')
        .style('font-size', '25px')

    function xAxis(g){
        g.attr('transform', `translate(0, ${height - margin.bottom})`)
        .call(d3.axisBottom(x))
        .attr('font-size', 15)
        .attr('id', 'x-axis')
    }
    function yAxis(g){
        g.attr('transform', `translate(0, 0)`)
        .call(d3.axisLeft(y))
        .attr('font-size', 15)
        .attr('id', 'y-axis')
    }
    svg.append('g').call(xAxis).style('color', '#222').attr('class', 'tick')
    svg.append('g').call(yAxis).style('color', '#222').attr('class', 'tick')
})