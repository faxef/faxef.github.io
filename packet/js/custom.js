$(document).ready(function(){
	$('.add_new').on('click', function(){
		var body = $(this).closest('body');
		body.find('.load_popup').addClass('show');
		body.addClass('overlay');
	})
	$('.bottom_part a.close').on('click',function(){
		var body = $(this).closest('body');
		body.removeClass('overlay');
		body.find('.load_popup').removeClass('show');
	})

	$('.groups_content_tabs .tab').on('click', function (){
		$(this).addClass('active').siblings().removeClass('active')
		$(this).closest('.groups_content').find('.group').removeClass('active').eq($(this).index()).addClass('active');
	});
	$('.market .market_title').on('click', function(){
		$(this).siblings('.market_content').toggleClass('show')
	})
	$('.products .product_lists .product').on('click', function(){
		$(this).toggleClass('selected')
	})
	$('a.product_select').on('click', function(){
		console.log($(this).siblings('.products_body').find('.product.selected'))
		var selected = $(this).siblings('.products_body').find('.product.selected').clone();
		selected.appendTo('.group.active');
		
	})
})