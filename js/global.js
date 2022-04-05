document.addEventListener("DOMContentLoaded", function(){
    // Opens hamburger menu
    function openNav() {
        document.getElementById("myNav").style.width = "100%";
    }
});

$(document).ready(function () {
    $(document).scroll(function () {
        var $nav = $(".navbar-custom");
        $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
    });

    // Adds navbar hamburger button animation
    $('.um-button').on('click', function () {
        $('.um-navbar-icon-animated').toggleClass('open');
    });
    
    // Stops .wrapper from overflowing onto footer on window resize
    $('.wrapper').css('margin-bottom', $('.footer').height() + 'px');

    $(window).on('resize', function(){
        $('.wrapper').css('margin-bottom', $('.footer').height() + 'px');
    });
});