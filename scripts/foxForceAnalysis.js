onload=function openXMLFIle(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
	//alert("hola");
	if(xhttp.readyState==4 && xhttp.status==200){
	    myFunction(xhttp);
	}
	xhttp.close();
    };
    xhttp.open("GET", "data/data.xml", true);
    xhttp.send();
}

function myFunction(xml){
    var xmlDoc=xml.responseXML;
    var data=xmlDoc.getElementsByTagName("PLP")[0];
    var nodeList=data.firstChild;
    getValues(nodeList);
}

function getValues(nodeList){
    //document.write("Hey");
    while(nodeList != null){
	if(nodeList.nodeType==1)
	    document.write(nodeList.firstChild.nodeValue);
	nodeList=nodeList.nextSibling;
    };
//    xhttp.close();
}
