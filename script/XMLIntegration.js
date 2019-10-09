const xHttpReq = new XMLHttpRequest();

let dynamicContent = ["header", "footer"];

function contentOnServer(request, content, parameter, location, data)
{
    xHttpReq.open(request, content, false);

    xHttpReq.onreadystatechange = function()
    {
        if(this.readyState == 4)
        {
            if(this.status == 200)

                    if(data == 2)
                        check_session(this.responseText)
                    else
                    if(data == 1)
                        retrieve_user_data(this.responseText);
                    else
                    if(location != null)
                        location.innerHTML = this.responseText;
                    else
                    if(parameter != null)
                        login_response(this.responseText);                

            if(this.status == 404)
                console.warn("File not found!");
        }
    }

    xHttpReq.send(parameter);
}

