$(document).ready(function(){
// // ===========================//
// // Инициализация Слайдера

$('#slick').slick({
	dots: false,
	arrows: false,
	fade: true,
	autoplay: false,
	swipe: false,
	touchMove: false,
	centerMode: true,
	variableWidth: false,
	slidesToShow: 1,
	slidesToScroll: 1,
	asNavFor: '#slick-thumbs',
});

$('#slick-thumbs').slick({
	dots: false,
	arrows: true,
	autoplay: false,
	slidesToShow: 5,
	slidesToScroll: 1,
	centerMode: false,
	mobileFirst: false,
	variableWidth: false,
	adaptiveHeight: false,
	autoplay: true,
	autoplaySpeed: 4500,
	asNavFor: '#slick',
	focusOnSelect: true,
	nextArrow: '<img class="next" src="img/arrow_right.png" alt="">',
	prevArrow: '<img class="prev" src="img/arrow_left.png" alt="">',
	responsive: [
	{
		breakpoint: 1401,
		settings: {
			slidesToShow: 4,
			slidesToScroll: 2
		}
	},
	{
		breakpoint: 1025,
		settings: {
			slidesToShow: 3,
			slidesToScroll: 3
		}
	},
	{
		breakpoint: 768,
		settings: {
			slidesToShow: 2,
			slidesToScroll: 2
		}
	},
	{
		breakpoint: 481,
		settings: {
			slidesToShow: 1,
			slidesToScroll: 1
		}
	}
	]	
});

// // Инициализация Сортировки Категорий

function filterSlider(filter) {
	$('#slick-thumbs').slick('slickUnfilter');
	$('#slick-thumbs').slick('slickFilter', '.moloko_past');
}
filterSlider()

$('#slick-buttons button').bind('click', function(e){
	if($(this).hasClass('btn-default')){
		$('#slick-buttons button').attr('class', 'btn btn-default');
		$(this).attr('class', 'btn btn-primary');
		e.preventDefault();
		
		var filter = $(this).val();
		var key = "."+filter;
		var currentclass = $(this).attr('class');
		$('#slick, #slick-thumbs').slick('slickUnfilter');
		$('#slick, #slick-thumbs').slick('slickFilter',key);
		$('#slick, #slick-thumbs').slick('slickGoTo', 0).slick('refresh').animate({opacity: 0},0).animate({opacity: 1},800);
	}
});

// // Инициализация Слайдера
// // ===========================//


// ===========================//
// Инициализация Google Maps

function init_map() {
	var myOptions = {
		zoom: 5,
		center: new google.maps.LatLng(57.838428, 27.786287)
	};
	map = new google.maps.Map(document.getElementById('map'), myOptions);
	marker1 = new google.maps.Marker({
		map: map,
		position: new google.maps.LatLng(54.9199441,32.0746799)
	});		
	marker2 = new google.maps.Marker({
		map: map,
		position: new google.maps.LatLng(53.9039147,27.5834969)
	});		
	marker3 = new google.maps.Marker({
		map: map,
		position: new google.maps.LatLng(59.984604,30.2407877)
	});
	infowindow1 = new google.maps.InfoWindow({
		content: 'Россия, Смоленский р-н,<br> д. Стабна, ул. Заозерна'
	});		
	infowindow2 = new google.maps.InfoWindow({
		content: '<strong>Беларусь, г. Минск,<br> ул. З. Бядули, дом 11, пом. 8'
	});		
	infowindow3 = new google.maps.InfoWindow({
		content: 'Россия, Санкт-Петербург,<br> ул. Савушкина, 112'
	});
	google.maps.event.addListener(marker1, 'click', function() {
		infowindow1.open(map, marker1);
	});		
	google.maps.event.addListener(marker2, 'click', function() {
		infowindow2.open(map, marker2);
	});		
	google.maps.event.addListener(marker3, 'click', function() {
		infowindow3.open(map, marker3);
	});
	infowindow1.open(map, marker1);
	infowindow2.open(map, marker2);
	infowindow3.open(map, marker3);
}
google.maps.event.addDomListener(window, 'load', init_map);

// Инициализация Google Maps
// ===========================//



// ===========================//
// Preloader
$(window).load(function() {
	setTimeout(function() {
		$('.preloader-wrap').fadeOut('slow',function(){
			$(this).remove();
		});
	}, 100);

});

// ===========================//
// Инициализация parallax

// Инициализация anchor

var tween1 = TweenMax.from("#animate", 1.5, {autoAlpha: 0, scale: 0.7});

var scene = new ScrollMagic.Scene({duration: 300})
.setTween(tween1)
.addTo(controller)

controller.scrollTo(function (newpos) {
	TweenMax.to(window, 1.5, {scrollTo: {y: newpos}});
});

$(document).on("click", "a[href^='#']", function (e) {

	if ($(this).parent().hasClass('')) {
		$('header .navbar .main-menu > ul li').attr('class', '');
		$(this).parent().attr('class', 'active');
	}
	var id = $(this).attr("href");
	if ($(id).length > 0) {
		e.preventDefault();
		controller.scrollTo(id);

		if (window.history && window.history.pushState) {
			history.pushState("", document.title, id);
		}
	}
});

// инициализация наезда блока
var main_screen__height = $('.main_screen').outerHeight()
var header = $('header').outerHeight()
$('.main_screen').css({paddingTop: header})


if(window.matchMedia('(min-width: 768px)').matches)
{
$('.main_screen #wreath').css({minHeight: '100vh'}).css({minHeight: '-=' + header*2})
main_screen__height = $('.main_screen').outerHeight()
$('main').css({paddingTop: main_screen__height})
$('.main_screen').css({position: 'fixed'})
}
// инициализация наезда блока


// Инициализация parallax
// ===========================//

});