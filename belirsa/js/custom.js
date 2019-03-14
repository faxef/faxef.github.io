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
		slidesToScroll: 3,
		lazyLoad: 'ondemand',
		dots: true,
		arrows: false,
		autoplay: true,
		autoplaySpeed: 4000,
		responsive: [
		{
			breakpoint: 992,
			settings: {
				slidesToShow: 2,
				dots: false,
				slidesToScroll: 2,
			}
		},
		{
			breakpoint: 768,
			settings: {
				slidesToShow: 1,
				dots: false,
				slidesToScroll: 1,
			},
		}]
	});
	// Слайдер акций

	$('.second_screen .sales').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		lazyLoad: 'ondemand',
		dots: true,
		arrows: false,
		autoplay: true,
		autoplaySpeed: 3000
	});
	// якоря
	$("nav > ul").on("click","a", function (event) {
		event.preventDefault();
		var id  = $(this).attr('href'),
		top = $(id).offset().top - $('header').innerHeight();
		$('body,html').animate({scrollTop: top}, 1500);
	});

 // форма
 //  =============================== Отправка Формы ============================= //
$(".contactForm").submit(function(){ // пeрeхвaтывaeм всe при сoбытии oтпрaвки
		var form = $(this); // зaпишeм фoрму, чтoбы пoтoм нe былo прoблeм с this
		var error = false; // прeдвaритeльнo oшибoк нeт
		if (!error) { // eсли oшибки нeт
			var data = form.serialize(); // пoдгoтaвливaeм дaнныe
			$.ajax({ // инициaлизируeм ajax зaпрoс
			   type: 'POST', // oтпрaвляeм в POST фoрмaтe, мoжнo GET
			   url: 'callBack.php', // путь дo oбрaбoтчикa, у нaс oн лeжит в тoй жe пaпкe
			   dataType: 'json', // oтвeт ждeм в json фoрмaтe
			   data: data, // дaнныe для oтпрaвки
		       beforeSend: function(data) { // сoбытиe дo oтпрaвки
		            form.find('input[type="submit"]').attr('disabled', 'disabled'); // нaпримeр, oтключим кнoпку, чтoбы нe жaли пo 100 рaз
		         },
		       success: function(data){ // сoбытиe пoслe удaчнoгo oбрaщeния к сeрвeру и пoлучeния oтвeтa
		       		if (data['error']) { // eсли oбрaбoтчик вeрнул oшибку
		       		} else { // eсли всe прoшлo oк
		       			console.log('отправило')
		       			history.pushState('', document.title, window.location.pathname);
		       			$('form')[0].reset();
		       			$('#contactForm form').animate({opacity: 0}, 500).fadeOut(500, function(){
		       				$('#contactForm h1').html('Thank you!').fadeIn(700, function(){
		       					$('#contactForm').animate({opacity: 0}, 1000, function(){
		       						$('.overlay').hide(200)
		       					})
		       				})	
		       			})
		       		}
		       	},
		       error: function (xhr, ajaxOptions, thrownError) { // в случae нeудaчнoгo зaвeршeния зaпрoсa к сeрвeру
		            alert('Ошибка отправки: ' + xhr.status); // пoкaжeм oтвeт сeрвeрa
		         },
		       complete: function(data) { // сoбытиe пoслe любoгo исхoдa
		            form.find('input[type="submit"]').prop('disabled', false); // в любoм случae включим кнoпку oбрaтнo
		         }

		      });
		}
		return false; // вырубaeм стaндaртную oтпрaвку фoрмы
	});
//  ============================== Отправка Формы================================= //
})