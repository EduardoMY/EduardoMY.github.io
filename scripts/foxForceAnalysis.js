onload=function openXMLFIle(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
	//alert("hola");
	if(xhttp.readyState==4 && xhttp.status==200){
	    myFunction(xhttp);
	}
	//xhttp.close();
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
    while(nodeList != null){
	if(nodeList.nodeType==1)
	    values.push(nodeList.firstChild.nodeValue);
	nodeList=nodeList.nextSibling;
    };
    vLength=values.length;
    for(c=0; c<vLength/2; c++){
	points.push({x:values[c], y:values[c+vLength/2]});
	document.write(points[c].x+""+points[c].y+"br");
    }
    //document.write(points);
    return points;		   
}
function getValuesDRD(nodeList){
    var values=[];
    
