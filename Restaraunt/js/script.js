jQuery(document).ready(function ($) {
	var count = $('.slides li img').length;
	var size = $('.slides li').outerWidth();
	fullWidth=size * count; 
	fullWidth1=size * (count-1);
	console.log(size)
	
	// setInterval(sliding,5000);
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

// 	function sliding() {
// 		if (check != fullWidth1) {
// 			check -= size;
// 			$('.slides').css({transform : 'translateX('+check+'px)'});
// 		} else {
// 			check = 0;
// 			$('.slides').css({transform : 'translateX('+check+'px)'});

// 		}
// }
});