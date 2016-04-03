var informationRepos=[];

function loadRepositories(){ 
$.ajax({
    type: "GET",
    url: "https://api.github.com/users/eduardomy/repos",
    dataType: "json",
    success: function(result){
        for(var i in result){
            var information=[];
            information[0]=result[i].html_url+"";
            information[1]=result[i].name+"";
            information[2]=result[i].description+"";
            information[3]=result[i].created_at+"";
            $("#github-projects").append(
              printIndividualRepos(information[0],
              information[1],information[2], information[3])
            )
            informationRepos.push(information);
        }
    }   

})
};

function printIndividualRepos(url, name, description,date ){
            //alert(url);
             return "<div class='github-repos-wrapper'>"+
             "<article class='github-repos'><a href='" + url + 
              "' target='_blank'>" +
              name + "</a><hr>"+
              description + "<hr>Date: "+
              date +"</article></div>";
}

function sortName(){
    var temp=[];
    $("#github-projects").empty();
    
    for(var i=0; i<informationRepos.length; i++){
        for(var j=i+1; j<informationRepos.length; j++){
            if(informationRepos[j][1]<informationRepos[i][1])
                {
                    temp=informationRepos[i];    
                    informationRepos[i]=informationRepos[j];
                    informationRepos[j]=temp;
                }   
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
