$(document).ready(function(){
    // Smooth scrolling for anchor links
    $("a").on('click', function(event) {
      if (this.hash !== "") {
        event.preventDefault();
        var hash = this.hash;
        $('html, body').animate({
          scrollTop: $(hash).offset().top
        }, 800, function(){
          window.location.hash = hash;
        });
      } 
    });
  
    // Add active class to navbar items on scroll
    $(window).on('scroll', function() {
      $('.navbar-nav a').each(function() {
        var topDistance = $(window).scrollTop();
        var distance = $(this.hash).offset().top;
        if (distance <= topDistance + 50) {
          $('.navbar-nav a').removeClass('active');
          $(this).addClass('active');
        }
      });
    });
  
    // Navbar background color change on scroll
    $(window).on('scroll', function() {
      if ($(this).scrollTop() > 100) {
        $('.navbar').addClass('bg-dark');
      } else {
        $('.navbar').removeClass('bg-dark');
      }
    });
  });
  $(document).ready(function(){
    $("a").on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function(){
                window.location.hash = hash;
            });
        }
    });
    
    // Scroll to listings section when "View Listings" button is clicked
    $(".btn-view-listings").on('click', function(event) {
        event.preventDefault();
        var hash = $(this).attr('href');
        $('html, body').animate({
            scrollTop: $(hash).offset().top
        }, 800, function(){
            window.location.hash = hash;
        });
    });
});