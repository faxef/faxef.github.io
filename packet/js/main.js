$(document).ready(function(){

	// Сворачивание\разворачивание бокового меню
	$('.close').on('click',function(){
		var full = $(this).closest('.full');
		full.find('.nav_menu li.parentMenu .subMenu.active').removeClass('active');
		full.removeClass('active').siblings('.part').addClass('active')
	});
	$('.open').on('click',function(){
		var part = $(this).closest('.part');
		part.removeClass('active').siblings('.full').addClass('active')
	});

	// Аккордеон основного меню
	$('li.parentMenu > a').on('click', menu_acc);

	function menu_acc(e){
		e.preventDefault();
		$('.nav_menu .parentMenu .subMenu').not($(this).next()).removeClass('active');
		$(this).next().toggleClass('active');
	}

	// Переключение вкладок(импорт\экспорт)
	$('main .tabs_menu li').on('click', function (){
		$(this).addClass('active').siblings().removeClass('active')
		$(this).closest('main').find('.tabs_content .content').removeClass('active').eq($(this).index()).addClass('active');
	});
})
