// initialize settings
var margin = {top: 20, right: 15, bottom: 60, left: 60}
  , width = 1000 - margin.left - margin.right
  , height = 580 - margin.top - margin.bottom;
var padding = 50;

var transduration = 800;
var dotr = 3.5;
var xMax = 85;
var yMax = 880; 
var fromYear = 1994;
var cyear = fromYear;

var xScale;
var yScale;
var xAxis;
var yAxis;
var line;
var chart;
var main;

// initialize datasets
var FilePath = "data/";
var femaleSuffix = "FC.csv";
var maleSuffix = "MC.csv"
var datasetFemale = [];
var datasetMale = [];
var check_state = "";

// indicators
var femaleDataReady = 0;
var maleDataReady = 0;

// something defined by Mr. Robot
  var maxMale = [];
  var maxFemale = [];
  var maxArray = [];
  var codeArray = [];
  var dictionary = [];//for all code dictionary
  var fullNameCode = [];

// index
var disease_index = [
    "C07-C07.9",
    "C15-C15.9",
    "C16-C16.9",
    "C17-C17.9",
    "C18-C18.9",
    "C19-C19.9",
    "C20-C20.9",
    "C21-C21.9",
    "C22-C22.9",
    "C23-C23.9",
    "C24-C24.9",
    "C25-C25.9",
    "C32-C32.9",
    "C34-C34.9",
    "C43-C43.9",
    "C44-C44.9",
    "C48-C48.9",
    "C49-C49.9",
    "C50-C50.9",
    "C64-C64.9",
    "C67-C67.9",
    "C69-C69.9",
    "C71-C71.9",
    "C73-C73.9",
    "C80-C80.9",
    "C81-C81.9",
    "C82-C82.9",
    "C83-C83.9",
    "C85-C85.9",
    "C88-C88.9",
    "C90-C90.9",
    "C91-C91.9",
    "C92-C92.9",
    "C96-C96.9"
  ];

  var diseases = ["Parotide",
          "Esofago",
          "Stomaco",
          "Piccolo intestino",
          "Colon",
          "Giunz. rettosigmoidea",
          "Retto",
          "Ano e canale anale",
          "Fegato dotti intraepatici",
          "Colecisti",
          "Altre ns parti vie biliari",
          "Pancreas",
          "Laringe",
          "Bronchi e polmoni",
          "Melanoma della pelle",
          "Pelle non melanomi",
          "Retroperit.peritoneo",
          "Tess.connettivo e molle",
          "Mammella",
          "Rene eccet.pelvi renale",
          "Vescica",
          "Occhio e annessi",
          "Cervello",
          "Ghiandola tiroide",
          "T.m.n.a.s. o n.s.prim.sec.",
          "Malattia di Hodgkin",
          "Linfoma follicol.non-Hodgkin",
          "Linfoma diffuso non-Hodgkin",
          "Al.n.s.linfomi non-Hodgkin",
          "Mal.immunoprolifer.maligna",
          "Mieloma multipl.t.m.plasmacellule",
          "Leucemia linfoide",
          "Leucemia mieloide",
          "Al. ns t.m.tess.linf.emat."];

var label_color = [
    "#6699FF",
    "#00FF99",
    "#FF9933",
    "#6600CC",
    "#CC6666",
    "#FF99FF",
    "#5CFFAD",
    "#CC99FF",
    "#9999FF",
    "#FFFF99",
    "#FFCC00",
    "#48488E",
    "#3DB1FF",
    "#FFAF7A",
    "#9933FF",
    "#33FF99",
    "#FF9933",
    "#8FFFFF",
    "#CCFFFF",
    "#FFFF66",
    "#99FF66",
    "#CC99FF",
    "#66FFFF",
    "#99CC00",
    "#009933",
    "#33CCCC",
    "#0033CC",
    "#CC33FF",
    "#FF99FF",
    "#666699",
    "#990099",
    "#009999",
    "#000099",
    "#CC6600"
    ];


// on document ready
$(document).ready(function(){
    appendCheckbox();

  	// ready data from csv files
  	csvReadFile();

});

// drawing chart for the first time
function drawChart () {
	// chart definition
	xScale = d3.scale.linear()
		.domain([0, xMax])
		.range([ 0, width ]);

	yScale = d3.scale.linear()
		.domain([0, yMax])
		.range([ height, 0 ]);

	// x axis
	xAxis = d3.svg.axis()
	  .scale(xScale)
	  .orient('bottom')
	  .tickValues([0,5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85])
	  .tickFormat(function (d) { 
	  		if (d==85) {
	  			return ">= "+d;
	  		}
	  		return ""+d+" - "+(d+4);
	  	});

	// y axis
	yAxis = d3.svg.axis()
	  .scale(yScale)
	  .orient('left');

	// lines
	line = d3.svg.line().interpolate("monotone")
	  .x(function(d){ return xScale(d.x); })
	  .y(function(d){ return yScale(d.y); });

	// start drawing
	chart = d3.select('#chart')
	  .append('svg:svg')
	  .attr('width', width + margin.right + margin.left)
	  .attr('height', height + margin.top + margin.bottom)
	  .attr('class', 'chart')

	main = chart.append('g')
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
		cyear = this.value;
    render(cyear);
	});

	console.log("rendering");

	render(fromYear);
}

// rendering lines in chart
function render(inyear){
	// data to display
	var femaleData = getData(datasetFemale[(inyear - fromYear)], check_state);
	var maleData = getData(datasetMale[(inyear - fromYear)], check_state);
	var data = femaleData.concat(maleData);

	// draw lines
	var lines = main.selectAll(".line").data(data);
 
	// transition from previous paths to new paths
	lines.transition().duration(transduration)
		.attr("d",function (d) { return line(d.rate)});
	 
	// enter any new lines
  console.log(data);
	lines.enter()
		.append("path")
		.attr("class","line")
		.attr("d", function (d) { return line(d.rate)})
		.attr("class",function (d) { console.log(d.code); return "line "+d.code.substring(0,3)});

	/* TODO */
	var femaleDotData = [];
	for (var i = 0; i < femaleData.length; i++) {
	    femaleDotData = femaleDotData.concat(femaleData[i].rate);
	};

	// female dots
	fdots = main.selectAll(".femaleDot").data(femaleDotData);
	
    fdots.transition().duration(transduration)
    	.attr("cy", function (d) { return yScale(d.y)})

    fdots.enter().append("circle")
	    .attr("class", "femaleDot")
	    .attr("cx", function (d) { return xScale(d.x)})
	    .attr("cy", function (d) { return yScale(d.y)})
	    .attr("r", dotr);

	/* TODO */
	var maleDotData = [];
	for (var i = 0; i < maleData.length; i++) {
	    maleDotData = maleDotData.concat(maleData[i].rate);
	};

	// male dots
	mdots = main.selectAll(".maleDot").data(maleDotData);
	
    mdots.transition().duration(transduration)
    	.attr("cy", function (d) { return yScale(d.y)})

    mdots.enter().append("circle")
	    .attr("class", "maleDot")
	    .attr("cx", function (d) { return xScale(d.x)})
	    .attr("cy", function (d) { return yScale(d.y)})
	    .attr("r", dotr);

	// label to show year
	var yearLabel = main.selectAll(".yearLabel").data([""]);

	yearLabel.transition().text(""+inyear);

	yearLabel.enter().append("text")
		.attr("class", "yearLabel")
		.attr("x", margin.left+20)
		.attr("y", margin.top+20)
		.text(""+inyear)

	// exit
	lines.exit().remove();
    fdots.exit().remove();
    mdots.exit().remove();
    yearLabel.exit().remove();
}

function getData (inData, inSelection) {
	var outData = [];
	for (var i = 0; i < inData.length; i++) {
    outData.push({code: inData[i].code, rate: inData[i].rate });
		if (inSelection.search(outData[i].code) == -1) {
        outData[i].rate = [];
		}
	}
	return outData;
}

// read data (mostly by Mr Robot)
function csvReadFile()
{
    d3Csv(FilePath,1994,"FC.csv",datasetFemale,2010);
    d3Csv(FilePath,1994,"MC.csv",datasetMale,2010);
}

function d3Csv(File,year,gender,dataset,breakCondition)
{
  var outPutPath = File + year + gender;
  d3.csv(outPutPath,function(error,csvdata)
  {
    var ArrayForOneTable = [];
    var CodeForOneTable = [];
    if(error)
    {
      console.log(error);
    }
    var MaxValue = 0.0;
    for( var i=0; i<csvdata.length; i++ )
    {
      var contentName = csvdata[i]["ICD10"];
      var ObjectForOneRows = new Object();
      dictionary.push(contentName);
      ObjectForOneRows.code = contentName.substr(0,contentName.indexOf(" "));
      CodeForOneTable.push(ObjectForOneRows.code);
      var content = [];
      for(var t=0; t<=17;++t)
      {
        var ObjectForLocationXandY = new Object();
        var temp1 = t*5;
        var temp2 = 4+t*5;
        var tempTotal = temp1 + "_" +temp2;
        //console.log(tempTotal);
        if(t==17)
        tempTotal = temp1;
        ObjectForLocationXandY.y   = parseFloat(csvdata[i][tempTotal]);

        if(ObjectForLocationXandY.y>MaxValue)
        MaxValue = ObjectForLocationXandY.y;

        ObjectForLocationXandY.x   = parseInt(temp1);
        content.push(ObjectForLocationXandY);
        //console.log(content);
      }
      //ObjectForLocationXandY.y   = parseFloat(csvdata[i]['85']);
      //ObjectForLocationXandY.x   = 85;
      //content.push(ObjectForLocationXandY);

      //console.log(content);
      ObjectForOneRows.rate = content;
      ArrayForOneTable.push(ObjectForOneRows);

      content = [];
      }
      dataset.push(ArrayForOneTable);
      maxArray.push(MaxValue);
      codeArray.push(CodeForOneTable);

      if(year==breakCondition)
      {
        yMax = Math.max.apply(null,maxArray);
        if (gender == femaleSuffix) {
      		if (maleDataReady == 1) {
      			drawChart();
      		}
      		else {
      			femaleDataReady = 1;
      		}
      	}
      	else {
      		console.log("male data done.");
      		if (femaleDataReady == 1) {
      			console.log("start drawing");
      			drawChart();
      		}
      		else {
      			maleDataReady = 1;
      		}
      	}
        return ;
      }
      year++;
      d3Csv(File,year,gender,dataset,breakCondition);
    
  });

}


// checkbox (written by Antee and modified by Joann)
function appendCheckbox () {
    create_disease_list(diseases);
    var elems = Array.prototype.slice.call(document.querySelectorAll('.js-switch'));
    elems.forEach(function(html){
      var init = new Switchery(html, {size: "small"});
    });

    var elems = Array.prototype.slice.call(document.querySelectorAll('.js-switch'));

    getCheck_state();

    // on change
    $('input[name="checkboxgroup"]').change(function () {
        getCheck_state();
        render(cyear);
    })
}

function getCheck_state () {
    check_state = "";
    $('input[name="checkboxgroup"]:checked').each(function() {
        check_state = check_state + " " + this.value;
    });
}

function create_disease_list(diseases){
    var container = document.createElement("div");
    var disease_list = document.createElement("ul");

    container.setAttribute("style", "width: 300px; margin: 0px; border: 0px; float: left;");
    disease_list.setAttribute("style", "width: 300px; margin: 0px;");

    container.setAttribute("id", "container");
    disease_list.setAttribute("id", "list");  
    for(i=0;i<diseases.length;i++){
      var label_id = "disease_" + i;
      var checker_id = "checker_" + i;

      var disease_li = document.createElement("li");
      var disease_label = document.createElement("label");
      var checker = document.createElement("input");

      checker.setAttribute("type", "checkbox");
      checker.setAttribute("class", "js-switch");
      checker.setAttribute("id", checker_id);
      checker.setAttribute("style", "width: 60px; float: left;");
      checker.setAttribute("value", disease_index[i]);
      checker.setAttribute("name", "checkboxgroup");
      checker.checked = true;
      disease_label.setAttribute("id", label_id);
      disease_label.setAttribute("style", "color: gray; width: 250px; margin-left: 3px; float: left;");
      disease_li.setAttribute("class", "loda-btn");
      disease_li.setAttribute("style", "margin-top: 12px; width: 288px; padding: 2px;")

      disease_label.appendChild(document.createTextNode(diseases[i]));
      disease_li.appendChild(disease_label);
      disease_li.appendChild(checker);
      disease_list.appendChild(disease_li);
    }

    container.appendChild(disease_list);
    document.getElementById("checkbox_div").appendChild(container);
  }
