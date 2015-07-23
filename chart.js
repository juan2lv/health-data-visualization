// initialize settings
var margin = {top: 20, right: 15, bottom: 60, left: 60}
  , width = 1000 - margin.left - margin.right
  , height = 580 - margin.top - margin.bottom;

var padding = 50;

var xScale = d3.scale.linear()
  .domain([0, 30])
  .range([ 0, width ]);

var yScale = d3.scale.linear()
  .domain([0, 30])
  .range([ height, 0 ]);

// x axis
var xAxis = d3.svg.axis()
  .scale(xScale)
  .orient('bottom')
  .tickValues([0,5,10,15,20,25,30])
  .tickFormat(function (d) { return ""+d+" - "+(d+4);});

// y axis
var yAxis = d3.svg.axis()
  .scale(yScale)
  .orient('left');

// lines
var line = d3.svg.line().interpolate("monotone")
  .x(function(d){ return xScale(d.x); })
  .y(function(d){ return yScale(d.y); });

// initialize datasets
var allFemaleData = [];
var allMaleData = [];
var yMax = 0;


// on document ready
$(document).ready(function(){
	//draw chart
	var chart = d3.select('#chart')
	  .append('svg:svg')
	  .attr('width', width + margin.right + margin.left)
	  .attr('height', height + margin.top + margin.bottom)
	  .attr('class', 'chart')

	var main = chart.append('g')
	  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
	  .attr('width', width)
	  .attr('height', height)
	  .attr('class', 'main')   
	      
	// draw the x axis
	main.append('g')
	  .attr('transform', 'translate(0,' + height + ')')
	  .attr('class', 'main axis date')
	  .call(xAxis)
	    .selectAll("text")
	    .attr("y", 10)
	    .attr("x", -8)
	    .attr("dy", "0em")
	    .attr("transform", "rotate(305)")
	    .style("text-anchor", "end");

	// draw the y axis
	main.append('g')
	  .attr('transform', 'translate(0,0)')
	  .attr('class', 'main axis date')
	  .call(yAxis);

	// axis label
	main.append("text")
	        .attr("y", height + margin.bottom*2/3)
	        .attr("x", width/2)
	        .attr("dy", "1em")
	        .attr("class", "axisLable")
	        .text("Age");

	main.append("text")
	        .attr("transform", "rotate(-90)")
	        .attr("y", 0-margin.left+10)
	        .attr("x", 0-height/2)
	        .attr("dy", "1em")
	        .attr("class", "axisLable")
	        .text("Value");

	d3.select("#yearSlider").on("input", function() {
		render(this.value);
	});

	render(/*TODO: */);
}

// rendering lines in chart
function render(inyear){
	var data = dataset[inyear];
	var lines = main.selectAll(".line").data(data);
 
	// transition from previous paths to new paths
	lines.transition().duration(1500)
		.attr("d",function (d) { return line(d.rate)});
	 
	// enter any new lines
	lines.enter()
		.append("path")
		.attr("class","line")
		.attr("d", function (d) { return line(d.rate)})
		.attr("class",function (d) { return "line "+d.code});

	var dotsdata = [];
	for (var i = 0; i < data.length; i++) {
	    dotsdata = dotsdata.concat(data[i].rate);
	};

	// female dots
	fdots = main.selectAll(".dot").data(femaleData);
	
    fdots.transition().duration(1500)
    	.attr("cy", function (d) { return yScale(d.y)})

    fdots.enter().append("circle")
	    .attr("class", "femaleDot")
	    .attr("cx", function (d) { return xScale(d.x)})
	    .attr("cy", function (d) { return yScale(d.y)})
	    .attr("r", 3.5);

	// exit
	lines.exit().remove();
    fdots.exit().remove();
}
