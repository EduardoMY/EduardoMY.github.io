var width=screen.width;
var canvas = document.getElementById('drawing');

function mouseDown(){
    alert('Hola Amiguito');
}

function mouseOver(){
    //alert('Hola Amiguito Over');
}

function mouseMove(e){
    var rect = canvas.getBoundingClientRect();
    var pos={
	x: e.clientX - rect.left,
	y: e.clientY - rect.top
    };
    updateCoor(pos);
}
function updateCoor(pos){
    coor=pos.x + " "+ pos.y;
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
