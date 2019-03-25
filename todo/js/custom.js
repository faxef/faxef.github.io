$(document).ready(function(){
	// Открытие вкладок(табов)
	$('.tabs .tab').on('click', function (){
		$(this).addClass('active').siblings().removeClass('active')
		$(this).closest('.column_body').find('.list').removeClass('active').eq($(this).index()).addClass('active');
	});
	// Разворачивание полного описания звонка
	var list_title = $('.lists .call .call_title');
	list_title.on('click', function(){
		$(this).siblings('.call_content').toggleClass('show');
	})
})