jQuery(document).ready(function ($) {
//  ======================= Search category ====================== //
// ================================================================ //
$('.categories .select .dropdown-menu').find('a').click(function(e) {
		e.preventDefault();
		var text = $(this).text();
		$('#drop1 span').text(text);
})

//  ===================== Slider hot deals ====================== //
// ================================================================ //
$('.hot-deals .buttons li').on('click', function(){
		$(this).addClass('active').siblings().removeClass('active')
		$(this).closest('.hot-deals').find('.items>li')
		.animate({
			opacity: 0.7
		}).removeClass('active').eq($(this).index())
		.animate({
			opacity: 1
		}).addClass('active')
		console.log()
	});

// setInterval(function(){
// 	var next= $('.hot-deals .buttons li.active').next()
// 	var first = $('.hot-deals .buttons li:first-child')
// 		if (next.length>0) next.trigger('click')

// 		else first.trigger('click')
// 	},5000)

// ========================= Slider Indoor =========================== //
// =================================================================== //
	var count = $('.indoor .slides .text').length;
	var size = $('.indoor .slides .text').outerWidth(true);
	var slides = $('.indoor .slides');
	fullWidth=size * count; 
	fullWidth1=size * (count-1);
	console.log(size)
	// setInterval(sliding,5000);
	check=0;
	$('.indoor .arrows .left').on('click', function(){
		if (check == 0 ){
			check = fullWidth1;
			slides.css({transform : 'translateX('+check+'px)'});
		} else {
			check += size;
			slides.css({transform : 'translateX('+check+'px)'});
		}
	})

	$('.indoor .arrows .right').on('click', function(){
		if (check != fullWidth1) {
			check -= size;
			slides.css({transform : 'translateX('+check+'px)'});
		} else {
			check = 0;
			slides.css({transform : 'translateX('+check+'px)'});
		}
	})
    fullWidth1 = -fullWidth1;

	function sliding() {
		if (check != fullWidth1) {
			check -= size;
			slides.css({transform : 'translateX('+check+'px)'});
		} else {
			check = 0;
			slides.css({transform : 'translateX('+check+'px)'});
		}
}

//  ==================== !!!NEW FURNITURE TAB!!! =================== //
// ================================================================ //
$('.new-products #deals-btns li').on('click', function(){
		var mix = $('.new-products .products').eq($(this).index());
		mixitup(mix,{
			selectors: {
			control: '.new-products .title .filter'
			},
			classNames: {
		        block: 'furniture'
		    }
		})
		$(this).addClass('active').siblings().removeClass('active')
		$(this).closest('.new-products').find('.products')
		.animate({
			opacity: 0.7
		}).removeClass('active').eq($(this).index())
		.animate({
			opacity: 1
		}).addClass('active')
	});

// setInterval(function(){
// 	var next= $('.new-products #deals-btns li.active').next()
// 	var first = $('.new-products #deals-btns li:first-child')
// 		if (next.length>0) next.trigger('click')

// 		else first.trigger('click')
// 	},5000)

// ======================= Furniture gallery TABS ===================== //
// =================================================================== //
$('.gallery .tabs li').on('click', function (){
		$(this).addClass('tabs-active').siblings().removeClass('tabs-active')
		$(this).closest('.gallery').find('.text')
		.animate({
			opacity: 0.7
		}).removeClass('tabs-active').eq($(this).index())
		.animate({
			opacity: 1
		}).addClass('tabs-active');
	});
// =============== Brand slider ================= //
var brandSlide = $('.furniture .gallery .slider-bottom .slide');
var brandSize = brandSlide.outerWidth(true);
$('.furniture .gallery .slider-bottom .left').on('click', function (){
	$('.furniture .gallery .slider-bottom .slide:eq(0)').clone().appendTo('.furniture .gallery .slider-bottom .slides')
		$('.furniture .gallery .slider-bottom .slides').css({
			transition: '0.4s ease',
			transform : 'translateX(-'+brandSize+'px)'
		});
		setTimeout(function(){
			$('.furniture .gallery .slider-bottom .slides .slide:eq(0)').remove();
			$('.furniture .gallery .slider-bottom .slides').css({
				transition: 'none',
				transform : 'translateX(0px)'
			});
		},200)
});
$('.furniture .gallery .slider-bottom .right').on('click', function (){
		$('.furniture .gallery .slider-bottom .slides').css({
			transition: '0.4s ease',
			transform : 'translateX('+brandSize+'px)'
		});
		setTimeout(function(){
			$('.furniture .gallery .slider-bottom .slides .slide:eq(-1)').clone().prependTo('.furniture .gallery .slider-bottom .slides')
			$('.furniture .gallery .slider-bottom .slides .slide:eq(-1)').remove();
			$('.furniture .gallery .slider-bottom .slides').css({
				transition: 'none',
				transform : 'translateX(0px)'
			});
		},200)
});

//  ==================== !!!LATEST BLOG TAB!!! ===================== //
// ================================================================ //
$('.blog #deals-btns li').on('click', function(){
		$(this).addClass('active').siblings().removeClass('active')
		$(this).closest('.blog').find('.blog-items')
		.animate({
			opacity: 0.7
		}).removeClass('active').eq($(this).index())
		.animate({
			opacity: 1
		}).addClass('active')
	});

// setInterval(function(){
// 	var next= $('.blog #deals-btns li.active').next()
// 	var first = $('.blog #deals-btns li:first-child')

// 		if (next.length>0) next.trigger('click')
// 		else first.trigger('click')

// 	},15000)

// ========================== Brand slider ============================ //
// =================================================================== //
var brandSlide = $('.slider-blog .slides .slide');
var brandSize = brandSlide.outerWidth(true);
$('.slider-blog .left').on('click', function (){
	$('.slider-blog .slides .slide:eq(0)').clone().appendTo('.slider-blog .slides')
		$('.slider-blog .slides').css({
			transition: '0.5s ease',
			transform : 'translateX(-'+brandSize+'px)'
		});
		setTimeout(function(){
			$('.slider-blog .slides .slide:eq(0)').remove();
			$('.slider-blog .slides').css({
				transition: 'none',
				transform : 'translateX(0px)'
			});
		},500)
});
$('.slider-blog .right').on('click', function (){
		$('.slider-blog .slides').css({
			transition: '0.5s ease',
			transform : 'translateX('+brandSize+'px)'
		});
		setTimeout(function(){
			$('.slider-blog .slides .slide:eq(-1)').clone().prependTo('.slider-blog .slides')
			$('.slider-blog .slides .slide:eq(-1)').remove();
			$('.slider-blog .slides').css({
				transition: 'none',
				transform : 'translateX(0px)'
			});
		},500)
});

//  ==================== !!!LATEST BLOG TAB!!! =================== //
// ================================================================ //
$('.feedback #deals-btns li').on('click', function(){
		$(this).addClass('active').siblings().removeClass('active')
		$(this).closest('.feedback').find('.content')
		.animate({
			opacity: 0.2
		}).removeClass('active').eq($(this).index())
		.animate({
			opacity: 1
		}).addClass('active')
	});

// setInterval(function(){
// 	var next= $('.feedback #deals-btns li.active').next()
// 	var first = $('.feedback #deals-btns li:first-child')
// 		if (next.length>0) next.trigger('click')
// 		else first.trigger('click')
// 	},5000)

//  ==================== !!!MIX IT UP!!! =========================== //
// ================================================================ //
var mixOnLoad = $('.new-products .products.active');
var mixer = mixitup(mixOnLoad,{
	selectors: {
	control: '.new-products .title .filter'
	},
	classNames: {
        block: 'furniture'
    }
})

//  ================= !!! PAGE ANCHOR SCROLL!!! ==================== //
// ========================!! Fixed menu !!========================== //

var headerHeight = $('.nav-stripe').outerHeight();
var toMenu = $('.nav-stripe').offset().top
// ---- Fixed menu -----
$(window).scroll(function(){
	if($(this).scrollTop() >= toMenu){
		$('.nav-stripe').css({
			backgroundColor : 'white'
		}).addClass('navbar-fixed-top');
		$('body').css({paddingTop : headerHeight + 'px'});
	}
	else {
		$('.nav-stripe').removeClass('navbar-fixed-top');
		$('body').css({paddingTop : ''});
	}
});
// ---- Anchor scroll -----
$('.page-scroll a').bind('click', function(event){
	event.preventDefault();
	var id = $(this).attr('href'),
		top = $(id).offset().top - headerHeight
	$('html, body').stop().animate({
		scrollTop: top
	},1500);	
});
//  ================= !!! Resize window !!! ==================== //
// ============================================================ //
var oldWidth = window.innerWidth;
window.onresize = function () {
	var newWidth = window.innerWidth;
	if (newWidth != oldWidth) {
		oldWidth = newWidth;
	}
};
});