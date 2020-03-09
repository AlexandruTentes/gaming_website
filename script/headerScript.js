const lgnbtn = document.getElementsByClassName("login_popup");
const prevent_default = document.getElementsByClassName("login_popup");
const popup_login = document.getElementsByClassName("login_page");
const popup_register = document.getElementsByClassName("register_page");
const menu = document.getElementById("header");

let err = document.getElementsByClassName("err_msg");
let i = 0;

check_cookie_login();

handler_show_login = function(event)
{
    if(event.target.className == "loginbtn")
    {
        err[0].innerHTML = "";
        err[0].style.display = "none";
        popup_register[0].style.display = "none";
        popup_login[0].style.display = "block";
        lgnbtn[0].style.display = "block";
    }

    if(event.target.className == "registerbtn")
    {
        err[1].innerHTML = "";
        err[1].style.display = "none";
        popup_login[0].style.display = "none";
        popup_register[0].style.display = "block";
        lgnbtn[0].style.display = "block";
    }

    if(event.target.className == "logoutbtn")
    {
        remove_data();

        contentOnServer('get', "php/destroy_session.php", null, null, 0);
    }

    if(event.target.className == "games_list_btn")
        window.location = "applications.html"
}

handler_close_login = function(event)
{
    if(event.target.className == "login_popup"
        || event.target.className == "close")
        lgnbtn[0].style.display = "none";
}

handler_popup = function(event)
{
    let class_name = event.target.className.split(" ");

    if(class_name[0] == "ignore")
    {
        event.preventDefault();

        if(event.target.id == "lgn" && class_name[1] == "focused")
        {
            i = 0;
            contentOnServer('post', "php/login.php", new FormData(document.getElementById("login_form")), null, 0);
        }
        else
        if(event.target.id == "rgst" && class_name[1] != "focused")
        {
            err[1].innerHTML = "";
            err[1].style.display = "none";
            popup_login[0].style.display = "none";
            popup_register[0].style.display = "block";
        }
        else
        if(event.target.id == "lgn" && class_name[1] != "focused")
        {
            err[0].innerHTML = "";
            err[0].style.display = "none";
            popup_register[0].style.display = "none";
            popup_login[0].style.display = "block";
        }
        else
        if(event.target.id == "rgst" && class_name[1] == "focused")
        {
            i = 1;
            contentOnServer('post', "php/register.php", new FormData(document.getElementById("register_form")), null, 0);
        } 
    }
}

function login_response(parameter)
{
    error_msg = err[i];
    error_msg.innerHTML = "";
    error_msg.style.display = "none";

    if(parameter != 1)
    {
        error_msg.innerHTML = parameter;
        error_msg.style.display = "block";
    }
    else
    {
        lgnbtn[0].style.display = "none";
        document.getElementsByClassName("loginbtn")[0].style.display = "none";
        document.getElementsByClassName("logoutbtn")[0].style.display = "block";
        document.getElementsByClassName("user_name")[0].style.display = "block";
        document.getElementsByClassName("registerbtn")[0].style.display = "none";
        popup_register[0].style.display = "none";

        if(get_cookie() == 0)
            contentOnServer('get', "php/get_user.php", null, null, 1);
    }
}

function add_data()
{
    let data = get_cookie("account_data");
    document.getElementsByClassName("add_name")[0].innerHTML = data[1];
}

function remove_data()
{
    delete_cookie("account_data");

    document.getElementsByClassName("loginbtn")[0].style.display = "block";
    document.getElementsByClassName("registerbtn")[0].style.display = "block";
    document.getElementsByClassName("logoutbtn")[0].style.display = "none";
    document.getElementsByClassName("user_name")[0].style.display = "none";

    document.getElementsByClassName("add_name")[0].innerHTML = "";
}

function retrieve_user_data(data)
{
    data = data.split(" ");
    data[0] = data[0].substr(2);
    set_cookie("account_data", data);
    add_data();
}

function check_session(data)
{
    if(data != 0)
        login_response(1);
    else
        remove_data();
}

function check_cookie_login()
{
    if(get_cookie("account_data") != 0)
    {   
        add_data();
        login_response(1);
    }
    else
        remove_data();
}

menu.addEventListener("click", handler_show_login);
lgnbtn[0].addEventListener("click", handler_close_login);
prevent_default[0].addEventListener("click", handler_popup);

window.addEventListener("focus", check_cookie_login);
window.addEventListener("blur", check_cookie_login);

//contentOnServer('get', "php/check_session.php", null, null, 2);