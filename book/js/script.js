jQuery(document).ready(function ($) {
	var info = []
	console.log(info)
	var name = $('input[name="name"]');
	var email = $('input[name="email"]');
	var text = $('textarea[name="message"]');
	
	$('.formBtn').on('click', function Info () {
		if(name.val() !="" && email.val() !="" && email.val() !=""){
			var item = $('.info .info__items').append($('<div class="person"></div>'))
			$('.person').last()
			.append($('<div class="person__name">' + name.val() + '</div>'))
			.append($('<div class="person__email">' + email.val() + '</div>'))
			.append($('<div class="person__text">' + text.val() + '</div>'))
			// alert('Ваш отзыв успешно отправлен')
			// анимация при успешной отправке отзыва

			$('.container .overlay')
			.css('visibility', 'visible')
			.animate({
				opacity: 0.8,
			}, 400, function(){
				$('.container for').animate({opacity: 0}, 800)
				.css('display', 'none')
				$('.container .info')
				.css('display', 'block')
				.animate({opacity: 1}, 400)
			})
		}	
	})
	$('.container .overlay').on('click',function(event){
		$('.container .info')
		.animate({opacity: 0}, 400, function(){
			$('.container .overlay')
			.css('visibility', 'hidden')
			.animate({
				opacity: 0,
			}, 800, function(){
				$('.container for')
				.animate({opacity: 1}, 600)
				.css('display', 'block')
			})
		})
		name.val('')
		email.val('')
		text.val('')
	})
})
