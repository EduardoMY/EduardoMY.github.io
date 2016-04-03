
onload=function openXMLFIle(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
	if(xhttp.readyState==4 && xhttp.status==200){
	    myFunction(xhttp);
	}
    };
    xhttp.open("GET", "data/data.xml", true);
    xhttp.send(null);
}

function myFunction(xml){
    var xmlDoc=xml.responseXML;
    var data=xmlDoc.getElementsByTagName("PLP")[0];
    var nodeList=data.firstChild;
    getValuesPLP(nodeList);
}

function getValuesPLP(nodeList){
    var values=[];
    var vLength;
    var points=[];
//    var ypoints=[];
    
    while(nodeList != null){
	if(nodeList.nodeType==1)
	    values.push(nodeList.firstChild.nodeValue);
	nodeList=nodeList.nextSibling;
    };
    
    vLength=values.length;
    for(c=0; c<vLength/2; c++){
	points.push({x:values[c], y:values[c+vLength/2]});
//	points.push(values[c+vLength/2]);
//	document.write("x: "points[c].x+" y:"+points[c].y+"<br>");
    }
    // document.write(points);
    buildGraph(points, '#plp');
//    return points;		   
}

function getValuesDRD(nodeList){
    var values=[];

    //
    
}

function buildGraph(points, id){
    var width=screen.width;
    var height=500;
    var padding=30;
    //setting up the scale
    var xScale = d3.scale.linear().
	domain ([0, 2000]).//d3.max(points, function(d){return d.x;})]).
	range([padding,width-padding]);
    
   // console.log(d3.max(points, function(d){return d.y;}));
    
    var yScale = d3.scale.linear().
	domain([24, d3.max(points, function (d) { return d.y;})]).
	range([height-padding,padding]);
    
    //Building the graph
    var svg= d3.select(id).append("svg");
    svg.attr("width", width).attr("height", height);
    /*var circles=svg.selectAll("circle").data(points).enter().append("circle").
	attr("cx", function(d){return xScale(d.x);}).
	attr("cy", function(d){return yScale(d.y);}).
	attr("r", 5);
    circles.attr("fill", "black");*/
    
    //... and lines
    /*
    var px, py;
    var lines =svg.selectAll("line").data(points).enter().append("line").
	attr("x1", function(d){ return 0;}).
	attr("y1", function(d){return 0;}).
	attr("x2", function (d){return xScale(d.x);}).
	attr("y2", function (d){return yScale(d.y);}).
	attr("stroke-width", 2).
	attr("stroke", "black");
    */
    var lines=d3.svg.line().
	x(function (d) {return xScale(d.x);}).
	y(function (d) {return yScale(d.y);});
    svg.append("path").
	attr("class", "line").
	attr("d", lines(points));
    
    //Building the axis
    var xAxis = d3.svg.axis().
	scale(xScale).
	orient("bottom").
	ticks(7);
    svg.append("g").
	attr("class", "axis").
	attr("transform", "translate(0," + (height - padding) + ")").
	call(xAxis);
    
    //...and now the Yaxis
    var yAxis=d3.svg.axis().
	scale(yScale).
	orient("left").
	ticks(10);
    svg.append("g").
	attr("class", "axis").
	attr("transform", "translate("+padding+", 0)").
	call(yAxis);
}
