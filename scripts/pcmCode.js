//variables definition
var xyArray=[]; //Temporal
var xyPaths=[];
var images=[];
var canvas = document.getElementById('drawing');
var context = canvas.getContext("2d");
var clickState = false;
var x=-1, y=-1, prevX=-1, prevY=-1; //X's y Y's
var thickness=2;

//variables declaration
canvas.width=window.innerWidth*.8;
canvas.height=window.innerHeight*.7;

init();

function init(){
    xyArray=[];
    xyPaths=[];
    images=[];
}

function mouseDown(){
    console.log("mouse down");
    clickState=true;
}

function mouseUp(){
    console.log("mouse up");
    endOfPath();
}

function mouseOut(){
    console.log("mouse out");
    endOfPath();
}
function endOfPath(){

    if(clickState && xyArray.length!=0){
	clickState=false;
	xyPaths.push(xyArray);
	xyArray=[];
    }
    x=-1;
    y=-1;
}

function touchMove(e){
    console.log("Console LOG");
    var touch = e.touches[0];
    movement(touch.clientX, touch.clientY);
}

function mouseMove(e){
    movement(e.clientX, e.clientY);
}

function movement(xLocal, yLocal, color="black"){
    var rect = canvas.getBoundingClientRect();
    if(clickState){
	prevX = x;
	prevY = y;
	x = xLocal - rect.left;
	y = yLocal - rect.top;
	if(xyArray.length==0)
	    images.push(context.getImageData(0,0,canvas.width, canvas.height));
	draw(color);
	updateCoor();
    }
}

function draw(color){
    console.log("prevX"+prevX);
    console.log("Array: "+xyArray.length);
    if(prevX!=-1 && xyArray.length>1){
	context.beginPath();
	context.moveTo(prevX, prevY);
	context.lineTo(x, y);
	context.strokeStyle = color;
	context.lineWidth = thickness;
	context.stroke();
	context.closePath();
    }
}

function updateCoor(){
    xyArray.push({
	    pX: x,
	    pY: y
    });
}

function print(){
    alert(xyArray.length);
    var msg="";
    var req={
    method: 'POST',
    url: 'http://33.33.33.15/user/signin',
    headers : {
        'Content-Type' : 'application/json'
    },
    data: JSON.stringify({ test: 'test' })
    };
}

function clearAll(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    init();
}

function back(){
    if(images.length==0)
	return;
    xyPaths.pop();
    context.putImageData(images.pop(), 0, 0);
}
