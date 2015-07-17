var data = [[[5,0,300,"ICD10"], [10,17,200,"ICD9"], [15,4,50,"ICD10"], [2,8,50,"ICD9"], [10,0,20,"ICD9"]],
            [[5,1,100,"ICD10"], [10,17,200,"ICD9"], [15,4,50,"ICD10"], [2,8,50,"ICD9"], [10,0,20,"ICD9"]]];
   
var margin = {top: 20, right: 15, bottom: 60, left: 60}
	, width = 1000 - margin.left - margin.right
	, height = 580 - margin.top - margin.bottom;

var padding = 50;

var x = d3.scale.linear()
	.domain([0, d3.max(data, function (d) { return d[0]; })])
	.range([ padding, width-50 ]);

var y = d3.scale.linear()
	.domain([0, d3.max(data, function(d) { return d[1]; })])
	.range([ height-padding, padding ]);

var r = d3.scale.linear()
	.domain([0, d3.max(data, function(d) { return d[2]; })])
	.range([ 0, padding ]);

var chart = d3.select('#content')
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
var xAxis = d3.svg.axis()
	.scale(x)
	.orient('bottom');

main.append('g')
	.attr('transform', 'translate(0,' + height + ')')
	.attr('class', 'main axis date')
	.call(xAxis);

// draw the y axis
var yAxis = d3.svg.axis()
	.scale(y)
	.orient('left');

main.append('g')
	.attr('transform', 'translate(0,0)')
	.attr('class', 'main axis date')
	.call(yAxis);

var g = main.append("svg:g"); 

g.selectAll("circle")
	.data(data)
		.enter().append("circle")
		.attr("cx", function (d) { return x(d[0]); } )
		.attr("cy", function (d) { return y(d[1]); } )
		.attr("r", function (d) { return r(d[2]); } )
		.attr("class", function (d) { return d[3];});

//g.selectAll("circle").transition().duration(2000).attr("cy", "50%");