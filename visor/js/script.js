jQuery(function( $ ) {
	var isMuted = false; 
	$('video').prop("muted", isMuted);
	$('.sound_on').on('click', function(){
		isMuted = !isMuted;
		$('video').prop("muted", isMuted);
		$('.sound_on').removeClass('show').addClass('hidden');
		$('.sound_off').removeClass('hidden').addClass('show');
	})
	$('.sound_off').on('click', function(){
		isMuted = !isMuted;
		$('video').prop("muted", isMuted);
		$('.sound_off').removeClass('show').addClass('hidden');
		$('.sound_on').removeClass('hidden').addClass('show');
	})
	var v = document.getElementById('videoPlayer');
	if($(window).width() <= 768) {
		v.pause()
	} else {
		v.play()
	}
	$('.formBtn').on('click',function(){
		$('.pop-up').fadeIn(500, function(){
			$('.overlay').animate({opacity:1},500)
		})
	})	
	$('#close').on('click',function(){
		$('.overlay').animate({opacity:0},500,function(){
			$('.pop-up').fadeOut(500)
		})

	})
	$("header .another .list").hover(function(){
		$(this).find($('.list .sub-menu')).fadeIn()
	}, function () {
		$(this).find($('.list .sub-menu')).fadeOut()
	})
})