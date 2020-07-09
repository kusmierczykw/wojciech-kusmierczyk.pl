'use strict';
function smoothScroll(itemClass, navbarClass, transition){
    $("."+itemClass).on('click', function(e){
        var hashLink = $(this)[0].hash;

        if(hashLink !== "") {
            e.preventDefault();
            var navbarHeight = (navbarClass == null) ? 0 : getNavbarHeight(navbarClass);
            $("html, body").animate({ scrollTop: $(hashLink).offset().top - navbarHeight }, transition);
        }
    });
}

function setCookie(cookieName, cookieValue, cookieExpireDays){
    var date = new Date();

    date.setTime(date.getTime() + (cookieExpireDays*24*60*60*1000));
    var expires = "expires="+date.toUTCString();
    document.cookie = cookieName+"="+cookieValue+";"+expires+";path=/";
}

function getCookie(cookieName){
    var cookieName = cookieName+"=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var cookieArray = decodedCookie.split(";");
    for(var i = 0; i < cookieArray.length; i++){
        var cookie = cookieArray[i];
        while(cookie.charAt(0) == ' '){
            cookie = cookie.substring(1);
        }
        if(cookie.indexOf(cookieName) == 0){
            return cookie.substring(cookieName.length, cookie.length);
        }
    }
    return "";
}

function getNavbarHeight(navbarClass){
    return $("."+navbarClass).innerHeight();
}

$(document).ready(function () {
    let navbarHeight = getNavbarHeight('navbar');

    $('body').css({"padding-top": navbarHeight + "px"});
    $('body > header').css({"height": "calc(100vh - "+navbarHeight+"px)"});


    if(getCookie("cookiePolicy") == ""){
        $(".cookies").show();
    }

    $(".cookie__close-button").click(function(){
        $(".cookies").hide();
        setCookie("cookiePolicy","isSet", 7);
    });
});