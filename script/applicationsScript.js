window.onload = function()
{
    dynamicContent.forEach(function(page)
    {
        contentOnServer('get', (page + ".html"), 
                        null, document.getElementById(page), 0);
    });
    
    var imported = document.createElement('script');
    imported.src = 'script/headerScript.js';
    document.body.appendChild(imported);
}