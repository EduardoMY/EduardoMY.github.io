loadRepositories();

function loadRepositories(){
   var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
	    addRepos(JSON.parse(xmlHttp.responseText));
    }
    xmlHttp.open("GET", "https://api.github.com/users/eduardomy/repos?sort=updated", true);
    xmlHttp.send(null);
}

function addRepos(repos){
    var container = document.getElementById('two').getElementsByClassName('row')[0];
    for(var i=0; i < repos.length && i<6; i++){
	var article = document.createElement('article');
	var header = document.createElement('h3');
	var a = document.createElement('a');
	var par = document.createElement('p');
	article.className = '6u 12u$(xsmall) work-item';
	a.href=repos[i].html_url;
	a.appendChild(document.createTextNode(repos[i].name));
	header.appendChild(a);
	par.appendChild(document.createTextNode(repos[i].description));
	article.appendChild(header);
	article.appendChild(par);
	container.appendChild(article);
    }
}

function loadAvatar(){
    $.ajax(
        {
            type:"GET",
            url:"https://api.github.com/users/eduardomy",
            dataType: "json",
            success: function(result){
                $("#avatar").attr(
                    "src",
                    result.avatar_url   
                );
            }
        }
    );
}
