( function($) {
	'use strict';



  	/*-------------------------------------------------------------------------------
	  Detect mobile device 
	  -------------------------------------------------------------------------------*/



	  var mobileDevice = false; 

	  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
	  	$('html').addClass('mobile');
	  	mobileDevice = true;
	  }

	  else{
	  	$('html').addClass('no-mobile');
	  	mobileDevice = false;
	  }



    /*-------------------------------------------------------------------------------
	  Window load
	  -------------------------------------------------------------------------------*/



	  $(window).load(function(){

	  	$('.loader').fadeOut();

	  	var wow = new WOW({
	  		offset: 100,          
	  		mobile: false
	  	}
	  	);
	  	wow.init();
	  });

	  var navbar=$('.js-navbar-affix');
	  var navbarAffixHeight=73




	/*-------------------------------------------------------------------------------
	  Smooth scroll to anchor
	  -------------------------------------------------------------------------------*/



	  $('.js-target-scroll, .navbar-nav li a[href^="#"]').on('click', function() {
	  	var target = $(this.hash);
	  	if (target.length) {
	  		$('html,body').animate({
	  			scrollTop: (target.offset().top - navbarAffixHeight + 1)
	  		}, 1000);
	  		return false;
	  	}
	  });



    /*-------------------------------------------------------------------------------
	  Affix
	  -------------------------------------------------------------------------------*/



	  navbar.affix({
	  	offset: {
	  		top: 12
	  	}
	  });

	  navbar.on('affix.bs.affix', function() {
	  	if (!navbar.hasClass('affix')){
	  		navbar.addClass('animated slideInDown');
	  		navbar.find('.js-brand-hinge').addClass('animated hinge');
	  	}
	  });

	  navbar.on('affix-top.bs.affix', function() {
	  	navbar.removeClass('animated slideInDown');
	  	$('.navbar-collapse').collapse('hide');
	  });


	/*-------------------------------------------------------------------------------
	 Navbar collapse
	 -------------------------------------------------------------------------------*/



	 $('.navbar-collapse').on('show.bs.collapse', function () {
	 	navbar.addClass('affix');
	 });

	 $('.navbar-collapse').on('hide.bs.collapse', function () {
	 	if (navbar.hasClass('affix-top')){
	 		navbar.removeClass('affix');
	 	}
	 });

	 $(".navbar-nav > li > a").on('click', function() {
	 	$(".navbar-collapse").collapse('hide');
	 });



	/*-------------------------------------------------------------------------------
	 Scrollspy
	 -------------------------------------------------------------------------------*/



	 $('body').scrollspy({
	 	offset:  navbarAffixHeight + 1
	 });

	 $(".partners-carousel").slick({
	 	dots: false,
	 	arrows: false,
	 	autoplay: true,
	 	swipe: true,
	 	slidesToShow: 4,
	 	slidesToScroll: 1,
	 	responsive: [
	 	{
	 		breakpoint: 992,
	 		settings: {
	 			slidesToShow: 3,
	 			slidesToScroll: 1,
	 			infinite: true,
	 		}
	 	},
	 	{
	 		breakpoint: 768,
	 		settings: {
	 			slidesToShow: 2,
	 			slidesToScroll: 1,
	 			infinite: true,
	 		}
	 	},
	 	{
	 		breakpoint: 479,
	 		settings: {
	 			slidesToShow: 1,
	 			slidesToScroll: 1,
	 			infinite: true,
	 		}
	 	},
	 	]
	 });


	/*-------------------------------------------------------------------------------
	  Parallax
	  -------------------------------------------------------------------------------*/



	  if(!mobileDevice){
	  	$(window).stellar({
	  		responsive: true,
	  		horizontalScrolling: false,
	  		hideDistantElements: false,
	  		horizontalOffset: 0,
	  		verticalOffset: -2000
	  	});
	  }



	/*-------------------------------------------------------------------------------
	  Pie charts
	  -------------------------------------------------------------------------------*/



	  $(window).scroll( function(){

	  	$('.chart').each( function(i){
	  		var bottom_of_object = $(this).offset().top + $(this).outerHeight();
	  		var bottom_of_window = $(window).scrollTop() + $(window).height();
	  		if( bottom_of_window > bottom_of_object ){
	  			$('.chart').easyPieChart({
	  				scaleColor:false,
	  				trackColor:'#ebedee',
	  				barColor: function(percent) {
	  					var ctx = this.renderer.getCtx();
	  					var canvas = this.renderer.getCanvas();
	  					var gradient = ctx.createLinearGradient(0,0,canvas.width,0);
	  					gradient.addColorStop(0, "#e35e5b");
	  					gradient.addColorStop(1, "#febf28");
	  					return gradient;
	  				},
	  				lineWidth:6,
	  				lineCap: false,
	  				rotate:180,
	  				size:180,
	  				animate:1000
	  			});
	  		}
	  	}); 
	  });



	/*-------------------------------------------------------------------------------
	  Video pop-up
	  -------------------------------------------------------------------------------*/



	  $('.js-play').magnificPopup({
	  	type: 'iframe',
	  	removalDelay: 300
	  });



	/*-------------------------------------------------------------------------------
	  Reviews carousel
	  -------------------------------------------------------------------------------*/

	  $(".review-carousel").slick({
	  	dots: false,
	  	arrows: false,
	  	autoplay: true,
	  	swipe: true,
	  	slidesToShow: 1,
	  	slidesToScroll: 1,
	  });


	/*-------------------------------------------------------------------------------
	  Product slider
	  -------------------------------------------------------------------------------*/
	  $(".product .slider").slick({
	  	dots: true,
	  	arrows: true,
	  	autoplay: true,
	  	swipe: true,
	  	slidesToShow: 4,
	  	slidesToScroll: 1,
	  	responsive: [
	  	{
	  		breakpoint: 992,
	  		settings: {
	  			slidesToShow: 3,
	  			slidesToScroll: 1,
	  			infinite: true,
	  		}
	  	},
	  	{
	  		breakpoint: 768,
	  		settings: {
	  			slidesToShow: 2,
	  			slidesToScroll: 1,
	  			infinite: true,
	  		}
	  	},
	  	{
	  		breakpoint: 479,
	  		settings: {
	  			slidesToShow: 1,
	  			slidesToScroll: 1,
	  			infinite: true,
	  		}
	  	},
	  	]
	  });
	})(jQuery);
