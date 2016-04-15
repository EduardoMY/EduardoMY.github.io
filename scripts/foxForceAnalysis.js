var width=screen.width;
var height=500;
var padding=30;
var drdPoints;
var plpPoints;

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
    var data2=xmlDoc.getElementsByTagName("DRD")[0];
    var nodeList=data.firstChild;
    var nodeList2=data2.firstChild;
    getValuesPLP(nodeList);
    getValuesDRD(nodeList2);
}

function getValuesPLP(nodeList){
    var values=[];
    var vLength;
    var points=[];
    var xMax, xMin, yMax, yMin;
    
    while(nodeList != null){
	if(nodeList.nodeType==1){
	    values.push(Number(nodeList.firstChild.nodeValue));
//	    console.log(nodeList.firstChild.nodeValue);
	}
	nodeList=nodeList.nextSibling;
    };
    
    vLength=values.length;
    for(c=0; c<vLength/2; c++)
	points.push({x:values[c], y:values[c+vLength/2]});
    xMax=getMax(points, "x");
    xMin=getMin(points, "x");
    yMin=Number(12);//getMin(points, "y");
    yMax=getMax(points, "y");
    console.log(xMax+"Holis");
    console.log(xMin);
    console.log(yMin);
    console.log(yMax);
    
    buildGraph(points, xMin,xMax,yMin,yMax,'#plp');
    plpPoints=points;
}
function getMax(points, variable){
    if(points==null || points.length==0)
	return 0;
    var max;
    for(var c=0; c<points.length; c++){
	if(c==0)
	    max=points[c][variable];
	else if(points[c][variable]>max)
	    max=points[c][variable];
    }
    return max;
    
}
function getMin(points, variable){
    if(points==null || points.length==0)
	return 0;
    var min;
    for(var c=0; c<points.length; c++){
	if(c==0)
	    min=points[c][variable];
	else if(points[c][variable]<min)
	    min=points[c][variable];
    }
    return min;
    
}

function getValuesDRD(nodeList){

    var values=[];
    var takeOfPoints=[];
    var sustainedLevelTurnPoints=[];
    var landingPoints=[];
    var ffPoints=[];
    var xMin, xMax, yMin, yMax;
    
    while(nodeList !=null){
	if(nodeList.nodeType==1)
	    values.push(Number(nodeList.firstChild.nodeValue));
	nodeList=nodeList.nextSibling;
    };
    
    //Set the variables in the textboxes
    document.getElementById("thrust").value=values[0];
    document.getElementById("velocity").value=values[5];
    document.getElementById("density").value=values[6];
    

    takeOfPoints=getTakeOff(values[21],values[22],values[23],values[3], values[4], values[6], values[7]);
    sustainedLevelTurnPoints=getSustainedLevelTurn(values[24], values[25], values[26],
						  values[13], values[10], values[6], values[5], values[9]);
    landingPoints=getLanding(values[27], values[28], values[29]);
    ffPoints=getPreviousFox(values[30], values[31], values[32],
			    values[0],values[2]);
    
    xMin=Math.min(getMin(takeOfPoints, "x"),
		  getMin(sustainedLevelTurnPoints, "x"),
		  getMin(landingPoints, "x"),
		  getMin(ffPoints, "x"));
    xMax=Math.max(getMax(takeOfPoints, "x"),
		  getMax(sustainedLevelTurnPoints, "x"),
		  getMax(landingPoints, "x"),
		      getMax(ffPoints, "x"));
    yMin=Math.min(getMin(takeOfPoints, "y"),
		  getMin(sustainedLevelTurnPoints, "y"),
		  getMin(landingPoints, "y"),
		      getMin(ffPoints, "y"));
    yMax=Math.max(getMax(takeOfPoints, "y"),
		  getMax(sustainedLevelTurnPoints, "y"),
		  getMax(landingPoints, "y"),
		      getMax(ffPoints, "y"));
    console.log(xMin);
    console.log(xMax);
    console.log(yMin);
    console.log(yMax);
    
    buildGraph(takeOfPoints, 0,5.5,0,1.2,'#drd');
    continueGraph(landingPoints, 0,5.5,0,1.2,'#drd');
    continueGraph(sustainedLevelTurnPoints, 0,5.5,0,1.2,'#drd');
    continueGraph(ffPoints, 0,5.5,0,1.2,'#drd');

    drdPoints=points;
    
}

function getTakeOff(i, df, f, v3,v4, v6, v7){

    var value, points=[];
    
    while(i<=f){
	value=i*(1.21/(v3*v6*v4*v7));
	points.push({x:i, y:value});
	i=i+df;
    }
    
    return points;
}

function getSustainedLevelTurn(i, df, f, v13, v10, v6, v5, v9){

    var values, points=[];
    
    while(i<=f){
	value=(((Math.pow(v13,2))*v10*(i))/(0.5*v6*(Math.pow(v5,2))))+((0.5*v6*(Math.pow(v5,2))*v9)/(i));
	points.push({x:i,y:value});
	i=i+df;
    }
    //    value=(((16^2)*13*(x))/(0.5*9*(8^2)))+((0.5*9*(8^2)*12)/(x));
    return points;
    
}
function getLanding(i, df, f){
    //Only a vertical line
    var value=Number(0.1);
    var points=[];
    
    while(value<1.2){
	points.push({x:i, y:value});
	value=value+0.1;
    }
    return points;
    
}
function getPreviousFox(i, df, f, v0,v2){
    var pValue;
    var value;
    var points=[];
    console.log(f);
    while(i<=f){
	pValue=i/v2;
	value=v0/i;
	points.push({x:pValue, y:value});
	i=i+df;
    }
    return points;

}

function buildGraph(points, xMin, xMax, yMin, yMax,id){
    
    //setting up thep scale
    var xScale = d3.scale.linear().
	domain ([xMin, xMax]).
	range([padding,width-padding]);
    
    var yScale = d3.scale.linear().
	domain([yMin, yMax]).
	range([height-padding,padding]);
    
    //Building the graph
    var svg= d3.select(id).append("svg");
    svg.attr("width", width-padding).attr("height", height);
    
    //ads the element
    if(id=="#drd")
	svg.attr("id", "drdSvg");
    else svg.attr("id", "plpSvg");

    //... and lines
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
	ticks(7).
	innerTickSize(-width).
	outerTickSize(0).
	tickPadding(10);
    svg.append("g").
	attr("class", "axis").
	attr("transform", "translate(0," + (height - padding) + ")").
	call(xAxis);
    
    //...and now the Yaxis
    var yAxis=d3.svg.axis().
	scale(yScale).
	orient("left").
	ticks(10).
	innerTickSize(-width).
	outerTickSize(0).
	tickPadding(10);;
    svg.append("g").
	attr("class", "axis").
	attr("transform", "translate("+padding+", 0)").
	call(yAxis);
}


function continueGraph(points, xMin, xMax, yMin, yMax,id){
    
    //setting up thep scale
    var xScale = d3.scale.linear().
	domain ([xMin, xMax]).
	range([padding,width-padding]);
    
    var yScale = d3.scale.linear().
	domain([yMin, yMax]).
	range([height-padding,padding]);
    
    //Building the graph
    var svg= d3.select("#drdSvg");

    //... and lines
    var lines=d3.svg.line().
	x(function (d) {return xScale(d.x);}).
	y(function (d) {return yScale(d.y);});
    svg.append("path").
	attr("class", "line").
	attr("d", lines(points));
}

function rebuild(){
    document.append("Hola");
}
