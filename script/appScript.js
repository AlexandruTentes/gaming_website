const pictures = document.getElementById("pictures");
const image = document.getElementsByClassName("overlay_image");
const eachPic = document.getElementsByClassName("click");

let eachPic_src;

handler_show_pic = function(event)
{
    if(event.target.className == "click")
    {
        eachPic_src = event.target.src;
        image[0].childNodes[1].src = eachPic_src;
        image[0].style.display = "block";
    }
}

handler_close_pic = function(event)
{
    if(event.target.className == "overlay_image" 
       || event.target.className == "click")
        image[0].style.display = "none";
}

window.onload = function()
{
    //contentOnServer('get', "php/destroy_session.php", null, null, 0);
    //delete_cookie("account_data");

    dynamicContent.forEach(function(page)
    {
        contentOnServer('get', (page + ".html"), 
                        null, document.getElementById(page), 0);
    });
    
    var imported = document.createElement('script');
    imported.src = 'script/headerScript.js';
    document.body.appendChild(imported);

    pictures.addEventListener("click", handler_show_pic);
    image[0].addEventListener("click", handler_close_pic);
}