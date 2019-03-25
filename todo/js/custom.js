$(document).ready(function(){
	// Открытие вкладок(табов)
	$('.column_tabs .tab').on('click', function (){
		console.log($(this).data("slick-index"))
		$(this).addClass('active').siblings().removeClass('active')
		$(this).closest('.column_tabs').siblings('.column_body').find('.list').removeClass('active').eq($(this).data("slick-index")).addClass('active');
	});
	// Разворачивание полного описания звонка
	var list_title = $('.lists .call .call_title');
	list_title.on('click', function(){
		$(this).siblings('.call_content').toggleClass('show');
	})
	// Комментарий
	$('.content_option.comment_input a').click(function(e){
		e.preventDefault();
		var comment_filed = $(this).closest('.content_option').siblings('.comment').find('.content');
		var textarea = $(this).siblings('textarea');
		var comment_text = textarea.val();
		textarea.val('')
		if(comment_text !== '') {
			comment_filed.text(comment_text);
			textarea.removeClass('error')
		}
		else {
			textarea.addClass('error')
		}
	});
	// слайдер дат
	$('.date_tabs').slick({
		slidesToShow: 3,
		arrows: false,
		focusOnSelect: true,
		slidesToScroll: 1,
		centerMode: true,
		centerPadding: '0px',
		nextArrow: '<i class="fas fa-chevron-right arrow_right"></i>',
		prevArrow: '<i class="fas fa-chevron-left arrow_left"></i>',
	});
})