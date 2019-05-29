jQuery(document).ready(function ($) {
	$('main.home .fastSearch_wrapper .slider_wrapper .slides').slick({
		slidesToShow: 4,
		slidesToScroll: 1,
		lazyLoad: 'ondemand',
		dots: false,
		arrows: true,
		prevArrow: '<div class="arrow_prev"><img src="img/left.png" alt="left"></div>',
		nextArrow: '<div class="arrow_next"><img src="img/right.png" alt="right"></div>',
		responsive: [
		{
			breakpoint: 1200,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 1,
				infinite: true,
			}
		},
		{
			breakpoint: 992,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 1,
				infinite: true,
			}
		},
		]
	});
	$('main.home .tabs_wrapper .tabs_btns li').on('click', function (){
		$(this).addClass('active').siblings().removeClass('active')
		$(this).closest('.tabs_block').find('.tabs_content .content').removeClass('active').eq($(this).index()).addClass('active');
	});
	$('main.home .actionsSlider_wrapper .slider_wrapper .slides').slick({
		slidesToShow: 4,
		slidesToScroll: 1,
		lazyLoad: 'ondemand',
		dots: false,
		arrows: true,
		prevArrow: '<div class="arrow_prev"><img src="img/left.png" alt="left"></div>',
		nextArrow: '<div class="arrow_next"><img src="img/right.png" alt="right"></div>',
		responsive: [
		{
			breakpoint: 992,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 1,
				infinite: true,
			}
		},
		]
	});
	$('main.home .blog_wrapper .slider_wrapper .slides').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		lazyLoad: 'ondemand',
		dots: false,
		arrows: true,
		prevArrow: '<div class="arrow_prev"><img src="img/left.png" alt="left"></div>',
		nextArrow: '<div class="arrow_next"><img src="img/right.png" alt="right"></div>',
		responsive: [
		{
			breakpoint: 992,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 1,
				infinite: true,
			}
		},
		]
	});
})