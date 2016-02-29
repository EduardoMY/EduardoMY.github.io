function loadRepositories(){ 
$.ajax({
    type: "GET",
    url: "https://api.github.com/users/eduardomy/repos",
    dataType: "json",
    success: function(result){
        for(i in result){
            $("#github-projects").append(
              "<article class='github-repos'><a href='" + result[i].html_url + "' target='_blank'>" +
              result[i].name + "</a></article>"
            )
        }
    }   

})
};
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