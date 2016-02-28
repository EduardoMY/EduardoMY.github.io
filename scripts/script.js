var buttonMenu=document.getElementById("dropbtn");
var menu=document.getElementById("dropdown-content");

buttonMenu.onmouseover=function(){
	menu.style.display='block';    
}

menu.onmouseover=function(){
    menu.style.display='block';
}

buttonMenu.onmouseout=function(){
    menu.style.display='none';
}

menu.onmouseout=function(){
    menu.style.display='none';
}

