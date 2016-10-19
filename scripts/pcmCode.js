//variables definition
var width=screen.width;
var canvas = document.getElementById('drawing');
var context = canvas.getContext("2d");
var clickState = false;
var x=-1, y=-1;
var prevX=-1, prevY=-1;

//variables declaration
canvas.width=window.innerWidth*.8;

function mouseDown(){
    clickState=true;
}

function mouseUp(){
    clickState=false;
    //alert("Hey");
}

function mouseMove(e){
    if(clickState){
	var rect = canvas.getBoundingClientRect();
	prevX = x;
	prevY = y;
	x = e.clientX - rect.left;
	y = e.clientY - rect.top;
	updateCoor();
	draw();
    }
}

function draw(){
    if(prevX!=-1){
	context.beginPath();
	context.moveTo(prevX, prevY);
	context.lineTo(x, y);
	context.strokeStyle = "black";
	context.lineWidth = 2;
	context.stroke();
	context.closePath();
    }
}

function updateCoor(){
    coor=x + " "+ y;
    document.getElementById("coor").innerHTML = coor;
}
function mouseOut(){
}

function print(){
    
}

function clearAll(){
}
//document.getElementById('drawing').width=width;
//alert('Hello');
