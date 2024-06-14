var headerarea;
var lastScrollTop = 0;
var headermove = 0;
document.addEventListener("DOMContentLoaded", () => {
    var cookie = getCookie('Cookiebanner');
    if(cookie == "accepted"){
      $('#cookie-banner').css('display','none');
    }
    headerarea = document.querySelector('.header-wrapper');
    $('.mobileburger').click(function(){
      $('#nav').addClass('open');
    })
});
document.querySelector('#content').addEventListener("scroll", () =>{
  $('#nav').removeClass('open');
    if(headerarea){
        var st = $('#content').scrollTop();
        var viewHeight = $(window).height();
        var scrollratio = ((st/viewHeight)*100) + 100;
        var slideritem = Math.trunc(st/viewHeight) + 1;
        var sliderlength = $('#header-slider .slider-item').length;
        var itempercentage = parseInt(scrollratio % 100);
        var slidernext = slideritem + 1;
        var sliderpre = slideritem - 1;
        if(st > 0){
            if (sliderpre < 1 && sliderpre >= 0){
            $('#header-slider .slider-item:nth-child('+slideritem+') .header-wrapper img').css("transform", "translatey("+(0 - (itempercentage/5))+"svh)");
            }

            
            $('#header-slider .slider-item:nth-child('+slideritem+') .header-wrapper img').css("filter", "brightness("+(1 - (itempercentage/100))+")");
            $('#header-slider .slider-item:nth-child('+slideritem+') .event-header').css("opacity", 1 - (itempercentage/100));
            $('#header-slider .slider-item:nth-child('+slideritem+') .overlay').css("opacity", (itempercentage/100) + 0.5);

            if(slidernext <= sliderlength && slidernext !== 1){
                $('#header-slider .slider-item:nth-child('+slidernext+') .header-wrapper img').css("transform", "translatey("+((itempercentage - 100)/5)+"svh)");
                $('#header-slider .slider-item:nth-child('+slidernext+') .header-wrapper img').css("filter", "brightness("+(itempercentage/100)+")");
                $('#header-slider .slider-item:nth-child('+slidernext+') .event-header').css("opacity", (itempercentage/100));
                $('#header-slider .slider-item:nth-child('+slidernext+') .overlay').css("opacity", 1 -(itempercentage/100) + 0.5);
                $('.inner-content').removeClass('visible');
            }else{
                $('.inner-content').addClass('visible');
            }
        }
        lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
    }
}, false);


let clock = 0;
let intervaltime = 10;
let clockmax = 100;
let fillclock = clockmax/3;

const clockDiv = document.querySelector('.splash-clock-counter');
const circleDiv = document.querySelector('.splash-clock-background');
const splashInterval = setInterval(splashClock, intervaltime);



function splashClock(){
    clock++;
    if(clock < clockmax){
    clockDiv.innerHTML = clock;
    circleDiv.style.background = "conic-gradient(transparent, white "+(clockmax - clock)/20+"%, white "+clock+"%, transparent "+clock*1.2+"%)";
    }
    else if(clock >= clockmax){
        intervaltime = 1;
        clock = 100;
        fillclock++;
        clockDiv.innerHTML = clock;
        if(fillclock >= clockmax){
            clearInterval(splashInterval);
            endSplash();
        }
    }
}
function cookiecheck(){
  setCookie('Cookiebanner', 'accepted', 365);
  $('#cookie-banner').css('display','none');
}

function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
function eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function endSplash(){
    setTimeout(() => {
        document.querySelector('body').classList.add('display-content');
        document.querySelector('#splash-clock-wrapper').classList.add('endSplash');
        document.querySelector('#splash').classList.add('removeSplash');
    }, 400);
    
}


document.addEventListener("DOMContentLoaded", function() {
 let lazyVideos = [...document.querySelectorAll("video.lazy")]

 if ("IntersectionObserver" in window) {
   let lazyVideoObserver = new IntersectionObserver(function(entries) {
     entries.forEach(function(video) {
       if (video.isIntersecting) {
         for (let source in video.target.children) {
           let videoSource = video.target.children[source];
           if (typeof videoSource.tagName === "SOURCE") {
             videoSource.src = videoSource.dataset.src;
             console.log(videoSource.src);
           }
         }

         video.target.load();
         video.target.classList.remove("lazy");
         lazyVideoObserver.unobserve(video.target);
       }
     });
   });

   lazyVideos.forEach(function(lazyVideo) {
     lazyVideoObserver.observe(lazyVideo);
   });
 }
});