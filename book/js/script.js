jQuery(document).ready(function ($) {
	// переменные вытянутые из полей
	var name = $('input[name="name"]');
	var email = $('input[name="email"]');
	var text = $('textarea[name="message"]');

	name.focus(function(){
		name.css(
			'border', '1px solid black'
			)
	})
	email.focus(function(){
		email.css(
			'border', '1px solid black'
			)
	})
	text.focus(function(){
		text.css(
			'border', '1px solid black'
			)
	})

	// события при нажатии кнопки отправить полей
	$('.form-group .formBtn').on('click', function Info () {
		// проверка на пустые поля
		if(name.val() !="" && email.val() !="" && text.val() !=""){
			var item = $('.info .info__items').append($('<div class="person"></div>'))
			$('.person').last()
			.append($('<div class="person__name">' + name.val() + '</div>'))
			.append($('<div class="person__email">' + email.val() + '</div>'))
			.append($('<div class="person__text">' + text.val() + '</div>'))

			alert('Ваш отзыв успешно отправлен')

			// анимация при успешной отправке отзыва

			$('.container .overlay').fadeIn(200)
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
		else if (name.val() == '') {
			$('.formBtn').addClass('animated wobble')
			setInterval(function(){
				$('.formBtn').removeClass('animated wobble')
			}, 2000)
			name.css(
				'border', '1px solid red'
				)
		}else if (email.val() == '') {
			$('.formBtn').addClass('animated wobble')
			setInterval(function(){
				$('.formBtn').removeClass('animated wobble')
			}, 2000)
			email.css(
				'border', '1px solid red'
				)
		}else if (text.val() == '') {
			$('.formBtn').addClass('animated wobble')
			setInterval(function(){
				$('.formBtn').removeClass('animated wobble')
			}, 2000)
			text.css(
				'border', '1px solid red'
				)
		}
	})
	// анимация при закрытии книги
	$('.container .overlay').on('click',function(event){
		$('.container .info').fadeOut(400)
		.animate({opacity: 0}, 400, function(){
			$('.container .overlay').fadeOut(400)
			.animate({
				opacity: 0,
			}, 200, function(){
				$('.container for')
				.animate({opacity: 1}, 0)
				.css('display', 'block')
			})
		})
	// стирайние данных
	name.val('')
	email.val('')
	text.val('')
})
})
