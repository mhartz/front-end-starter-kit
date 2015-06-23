var page = $('body').attr('id');

!(function() {
  //Toggle click function
  $.fn.toggleClick=function(){
    var functions=arguments;
    return this.click(function(){
      var iteration=$(this).data('iteration')||0;
      functions[iteration].apply(this,arguments);
      iteration= (iteration+1) %functions.length;
      $(this).data('iteration', iteration);
    });
  }

  var navToggle = document.getElementById("main-nav-toggle");

  //Event triggers
  $(function() {
    $(navToggle).toggleClick(function() {
      $('header').addClass("active");
    }, function() {
      $('header').removeClass("active");
    });
  });

  //Toggle active states for the anchors
  $('.tabbed').click(function() {
    $('.tabbed').removeClass('active');
    $(this).addClass('active');
  });

  //Video lazy loading over images
  $('.video-placeholder').click(function() {
    mapSelector = $(this).attr('data-vid-url');
    $(this).replaceWith('<div class="video-wrapper"><iframe src="https://www.youtube.com/embed/' + mapSelector + '?showinfo=0&autoplay=1" frameborder="0" allowfullscreen></iframe></div>');
  });

  /*
  *   Tab scrolling  *Needs refactoring*
  */
  if (page === 'stories' || page === 'expect') {
    var one = ($('#one').offset().top) - 120;
    var two = ($('#two').offset().top) - 120;
    var three = ($('#three').offset().top) - 120;
    var four = ($('#four').offset().top) - 120;
    

    var oneData = $('#one').attr('data-tabloc');
    var twoData = $('#two').attr('data-tabloc');
    var threeData = $('#three').attr('data-tabloc');
    var fourData = $('#four').attr('data-tabloc');
    
    if (page === 'expect') {
      var five = ($('#five').offset().top) - 120;
      var fiveData = $('#five').attr('data-tabloc');
    }

    $(window).scroll(function(){
      var windowTop = $(this).scrollTop();

      if (windowTop > 294) {
        $('.tabs ul').addClass('tab-fix');
      } else {
        $('.tabs ul').removeClass('tab-fix');
      }
      if (windowTop >= one && windowTop < two) {
        $('.tabbed').removeClass('active');
        $('.tabbed[data-tabto='+oneData+']').addClass('active');
      }
      if (windowTop >= two && windowTop < three) {
        $('.tabbed').removeClass('active');
        $('.tabbed[data-tabto='+twoData+']').addClass('active');
      }
      if (windowTop >= three && windowTop < four) {
        $('.tabbed').removeClass('active');
        $('.tabbed[data-tabto='+threeData+']').addClass('active');
      }

      if (page === 'stories') {
        if (windowTop >= four) {
          $('.tabbed').removeClass('active');
          $('.tabbed[data-tabto='+fourData+']').addClass('active');
        }
      }
      
      if (page === 'expect') {
        if (windowTop >= four && windowTop < five) {
          $('.tabbed').removeClass('active');
          $('.tabbed[data-tabto='+fourData+']').addClass('active');
        }
        if (windowTop >= five) {
          $('.tabbed').removeClass('active');
          $('.tabbed[data-tabto='+fiveData+']').addClass('active');
        }
      }
    });
  }
  
  /*
  *  BANNER ROTATION
  */
  var counter = 0,
  timer = 4500;

  function switchBanner() {
    $('.banner-slide').removeClass('active');
    $('.ban-switch li').removeClass('active');
    $('.banner-slide[data-banner=' + counter + ']').addClass('active');
    $('.ban-switch li[data-ban-trigger=' + counter + ']').addClass('active');
  }

  function timeout() {
    counter >= 2 ? counter = 0 : counter++;
    setTimeout(function() {
      switchBanner();
      timeout();
    }, timer);
  } 

  //Manual switch for banner
  $('.ban-switch li').click(function(){
    var currentSwitch = $(this).attr('data-ban-trigger');
    counter = currentSwitch;
    timer = 10000;
    switchBanner();
  });

  timeout();

  // $(function() {
  //   $('form').submit(function(){
  //     $.post('https://qamig.smartoffice.metlife.com/java/leads/9980754/4d67d6d10a5a482917c217c27d82856c', function() {
  //       window.location = 'thanks.html';
  //     });
  //     return false;
  //   });
  // });

}());