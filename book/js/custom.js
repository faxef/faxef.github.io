jQuery(document).ready(function ($) {
	$('ul.tabs li').on('click', function (){
		$(this).addClass('active').siblings().removeAttr('class')
		$(this).closest('.tabs_gallery').find('.gallery__block').removeClass('active').eq($(this).index()).addClass('active');
	});

	$('.colors__tabs li').on('click', function (){
		$(this).addClass('active').siblings().removeClass('active')
		$(this).closest('.colors__wrapper').find('.colors__block').removeClass('active').eq($(this).index()).addClass('active');
	});

	$('.colors__block .colors .color').on('click',function(e){
		if(!$(this).hasClass('active')){
			$(this).addClass('active').siblings().removeClass('active')
			var color = $(this).find('img').attr('src');
			var image = $(this).closest('.colors__block').find('.images .image img')
			if($(this).closest('.colors__block').hasClass('first_colors')){
				var gl = color.replace('/colors/color/', '/colors/image/gl/');
				console.log(gl)
				image.animate({opacity: 0.7},200).attr('src',gl).animate({opacity: 1},500)
			}else{
				var mt = color.replace('/colors/color/', '/colors/image/mt/');
				console.log(mt)
				image.animate({opacity: 0.7},200).attr('src',mt).animate({opacity: 1},500)
			}
			e.preventDefault();
		}
	});

	$('.six_screen .slider_block').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		lazyLoad: 'ondemand',
		dots: true,
		arrows: false,
		autoplay: true,
		autoplaySpeed: 3000,
		responsive: [
		{
			breakpoint: 992,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 1,
			}
		},
		{
			breakpoint: 768,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
			},
		}]
	});
})