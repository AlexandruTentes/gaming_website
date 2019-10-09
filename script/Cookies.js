function set_cookie(name, data) {
    let date = new Date();
    
    date.setTime(date.getTime() + 2000*24*60*60*1000);

    let expire = "expires=" + date.toUTCString();
    let string = "";
    let i = 0;

    data.forEach(element => 
    {
        string += element + (i + 1 >= data.length ? "" : "&");
        i++;   
    });

    document.cookie = name + "=" + string + "; " + expire + "; path=/;"; 
}

function get_cookie(name)
{
    let user_data = document.cookie.split(name);//console.log(user_data);
    let i = 0;
    let data_found = false;

    for(let element of user_data)
        if(element[0] == "=")
        {
            data_found = true;
            break;
        }
        else
            i++;

    if(!data_found)
        return 0;
    
    user_data[i][0] = "";
    user_data = user_data[i].split("&");
    i = 1;
        
    return user_data;
}

function delete_cookie(name)
{
    name += "=; ";
    
    document.cookie = name + "expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}