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
	var par = document.createElement('p');
	article.className = '6u 12u$(xsmall) work-item';
	header.appendChild(document.createTextNode(repos[i].name))
	par.appendChild(document.createTextNode(repos[i].description))
	article.appendChild(header);
	article.appendChild(par);
	container.appendChild(article);
    }

}

function sortDate(){
    var temp=[];
    $("#github-projects").empty();
    for(var i=0; i<informationRepos.length; i++){
        for(var j=i+1; j<informationRepos.length; j++)
            if(informationRepos[j][3]<informationRepos[i][3])
                {
                    temp=informationRepos[i];    
                    informationRepos[i]=informationRepos[j];
                    informationRepos[j]=temp;
                }
             $("#github-projects").append(
              printIndividualRepos(
                  informationRepos[i][0],
                  informationRepos[i][1],
                  informationRepos[i][2],
                  informationRepos[i][3])
            );   
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
