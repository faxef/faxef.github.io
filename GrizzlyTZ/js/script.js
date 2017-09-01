jQuery(document).ready(function ($) {

	var count = $('.slides li figure').length;
	var size = $('.slides li').outerWidth();
	fullWidth=size * count; 
	fullWidth1=size * (count-1);

	check=0;
	$('.prev').on('click', function(){
		if (check == 0 ){
			check = fullWidth1;
			$('.slides').css({transform : 'translateX('+check+'px)'});
		} else {
			check += size;
			$('.slides').css({transform : 'translateX('+check+'px)'});
		}
	})

	$('.next').on('click', function(){
		if (check != fullWidth1) {
			check -= size;
			$('.slides').css({transform : 'translateX('+check+'px)'});
		} else {
			check = 0;
			$('.slides').css({transform : 'translateX('+check+'px)'});
		}
	})
	fullWidth1 = -fullWidth1;

//--Автоматичесое переключение слайдов--//
setInterval(sliding,5000)

function sliding() {
	if (check != fullWidth1) {
		check -= size;
		$('.slides').css({transform : 'translateX('+check+'px)'});
	} else {
		check = 0;
		$('.slides').css({transform : 'translateX('+check+'px)'});
	}
}

// --------------------- GOOGLE MAP ------------------------ //
// Инициализация обектов
var objects = {
	skladPos: {
		coords: [53.8945873, 27.5867],
		title: 'Склад',
		description: 'Координаты Склада',
		category: 'sklad'
	},
	companyPos: {
		coords: [53.8964, 27.5854],
		title: 'Компания',
		description: 'Координаты Компании',
		category: 'company'
	},
	magazPos: {
		coords: [53.8964, 27.5844],
		title: 'Магазин',
		description: 'Координаты магазина',
		category: 'shop'
	}
}
var map = [];
var markers = []
// инициализация карты
window.onload = function initialize() {
	var settings = {
		zoom: 15,
		center: {
			lat: 53.8964,
			lng: 27.5854
		},
		markers: [],
		mapTypeControl: true,
		mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU},
		navigationControl: true,
		navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	map = new google.maps.Map(document.getElementById("map_canvas"), settings);

	// Добавление маркера на карту
	for (var i in objects) {
		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(
				objects[i].coords[0],
				objects[i].coords[1]
				),
			map: map,
			title: objects[i].title,
			category: objects[i].category
		})
		map.markers.push(marker)
		marker.setVisible(false)
	}
}
$('.ion-ios-location').on('click', function() {
	// Снятие\нажатие метки
	if($(this).hasClass('active')){
		$(this).removeClass('active')
	}
	else {
		$('.ion-ios-location').not($(this)).removeClass('active')
		$(this).addClass('active')
	}
	
	var categ = $(this).attr('data-category');

	for (var i=0; i <map.markers.length; i++){
		if (map.markers[i].category == categ && $(this).hasClass('active')) {
			map.markers[i].setVisible(true);
			map.markers[i].setAnimation(google.maps.Animation.BOUNCE)
		}
		else {
			map.markers[i].setVisible(false)
		}
	}
})

// --------------------- Search Window ------------------------ //
$('.search-icon').click(function(event){
	event.preventDefault()
	$('.search-modal').fadeIn(200, function(){
		$('.search-modal .overlay')
		.css('display', 'block')
		.animate({opacity: 0.8}, 400, function(){
			$('.search-modal .search-form')
			.css('display', 'block')
			.animate({
				opacity: 1, 
				top: '0'
			}, 500)
		})
	})
})
$('.search-modal .close, .search-modal .overlay').click(function(event){
	event.preventDefault()
	$('.search-modal .search-form')
	.animate({
		opacity: 0,
		top: '10%'
	}, 500, function(){
		$('.search-modal .overlay')
		.animate({
			opacity: 0
		},400, function(){
			$('.search-modal').fadeOut(200)
		})
	})
})
// -------------- Fixed header ----------------- //
$(window).scroll(function() {
	var headerHeight = $('header').outerHeight(false);
	if ($(this).scrollTop() >= 0){
		$('header').addClass("fixed");
		$('main').css({
			paddingTop : headerHeight + 'px',
			minHeight: 'calc(100vh - 244px)'
		})
	}
	else{
		$('header').removeAttr("class");
		$('main').removeAttr("style")
	}
});

// --------------------- CallBack Window ------------------------ //
$('.callBack-button').click(function(event){
	event.preventDefault()
	$('.callBack-modal').fadeIn(200, function(){
		$('.callBack-modal .overlay')
		.css('display', 'block')
		.animate({opacity: 0.8}, 400, function(){
			$('.callBack-modal .callBack-form')
			.css('display', 'block')
			.animate({
				opacity: 1
			}, 500)
		})
	})
})
$('.callBack-modal .close , .callBack-modal .overlay').click(function(event){
	event.preventDefault()
	$('.callBack-modal .callBack-form')
	.animate({
		opacity: 0
	}, 500, function(){
		$('.callBack-modal .overlay')
		.animate({
			opacity: 0
		},400, function(){
			$('.callBack-modal').fadeOut(200)
		})
	})
})
// ----------------- Autocomplete ------------------
var langs = ["Алфавит", "Январь", "Февраль", "Шалаш", "холодильник", "Зоопарк", "Инъекция", "Сентябрь", "Щенок", "Огород", "Март", "Апрель", "Декабрь", "Йод", "Цвет", "Юля", "Чечевица", "Суппорт", "Железо", "Экватор", "Дыня", "Суппорта на Alfa Romeo", "JavaScript", "VisualBasic", "PHP", "Pascal",'January', 'February', 'March','Liberia','Libyan','Liechtenstein','Lithuania']
$('#search').autocomplete({
	source: langs,
	appendTo: ".search-modal",
	classes: {
		"ui-autocomplete": "autocomplete"
	},
	position: { my : "right+50.001% top+15", at: "bottom" },
   messages: {
        noResults: '',
        results: function() {}
    }
})
$('.ui-helper-hidden-accessible').remove()
//  ================= !!! Resize window !!! ==================== //
// ============================================================ //
var oldWidth = window.innerWidth;
window.onresize = function () {
	var newWidth = window.innerWidth;
	if (newWidth != oldWidth) {
		window.setTimeout('location.reload()',100)
	}
};
});