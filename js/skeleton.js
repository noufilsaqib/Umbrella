function loadSkeleton(){
    $('#navTemplate').load('/text/nav.html', function () {
        $('.navbar .nav-item .nav-link').each(function () {
            $(this).toggleClass('active', this.getAttribute('href') === location.pathname);
        })
    });
}
loadSkeleton();  //invoke the function