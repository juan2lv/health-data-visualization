var datas = [[[5,0,300,"ICD10"], [10,17,200,"ICD9"], [15,4,50,"ICD10"], [2,8,50,"ICD9"], [10,0,20,"ICD9"]],
            [[5,1,10,"ICD10"], [10,17,200,"ICD9"], [15,4,50,"ICD10"], [2,8,50,"ICD9"], [10,0,200,"ICD9"]]];
   
var margin = {top: 20, right: 15, bottom: 60, left: 60}
	, width = 1000 - margin.left - margin.right
	, height = 580 - margin.top - margin.bottom;

var padding = 50;

var x = d3.scale.linear()
	.domain([0, d3.max(datas[0], function (d) { return d[0]; })])
	.range([ 0, width ]);

var y = d3.scale.linear()
	.domain([0, d3.max(datas[0], function(d) { return d[1]; })])
	.range([ height, 0 ]);

var r = d3.scale.linear()
	.domain([0, d3.max(datas[0], function(d) { return d[2]; })])
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
	.orient('bottom')
	.tickValues([0,5,10,15])
	.tickFormat(function (d) { return ""+d+" - "+(d+4);});

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

/*

update(datas[0]);

function update(data) {
	var g = main.append("svg:g"); 
	var circles = g.selectAll("circle").data(data);
	var circlesEnter = circles.enter().append("circle")
		.attr("cx", function (d) { return x(d[0]); } )
		.attr("cy", function (d) { return y(d[1]); } )
		.attr("r", function (d) { return r(d[2]); } )
		.attr("class", function (d) { return d[3];});
	var circlesExit = circles.exit().remove();
	circlesExit.selectAll("circle").attr("r", 0);
	console.log("update");
}

var count = 0;

document.getElementById('animate').addEventListener('click', function () {
	count++;
	var i=count%2;
	update(datas[i]);
	console.log(i);
})

*/


//g.selectAll("circle").transition().duration(2000).attr("cy", "50%");