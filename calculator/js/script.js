$(function() {
	var maxBudget = 1000000;
	var maxViews = 16666667;
	var maxConversion = 250000;
	var viewsCof = 15000;
	var conversionCof = 225;
	var budgetCof = 900;
// --- КООРДИНАТЫ И РАЗМЕЩЕНИЕ ПОЛЗУНКА --- //
	var slider = $('.js-irs-0'); // линия ползунка
	var button = $('.irs-slider'); // кружок ползунка
	var buttonCoords = button.offset(); // координаты кружка
	var center = button.outerWidth(true) / 2; // координаты центра кружка
	var sliderCoords = slider.offset(); // координаты линии ползунка
	var sliderWidth = slider.width(); // ширина линии ползунка
	var isTouchDevice = 'ontouchstart' in document.documentElement;
//===============================================================================//
//======= СОБЫТИЕ ИЗМЕНЕНИЯ ЗНАЧЕНИЙ ПОЛЕЙ ПРИ ПЕРЕТАСКИВАНИИ ПОЛЗУНКА =========//

// -------- НА ТЕЛЕФОНАХ С СЕНСОРНЫХ ЭКРАНОМ ------ ///
button.on('mousedown', function(e) {
	e.stopPropagation();
	e.preventDefault();
	if (isTouchDevice == false) { 
		document.onmousemove = function(e) { 
			e.stopPropagation();
			e.preventDefault();// функция изменения при удерживании ползунка
			var coords = e.pageX
			drag(e,coords)
		}
	document.onmouseup = function(e) {
		e.stopPropagation();
		e.preventDefault(); // функция изменения при отпускании ползунка
		document.onmousemove = null;
	}
}
});
// -------- НА ТЕЛЕФОНАХ С СЕНСОРНЫХ ЭКРАНОМ ------ ///
button.on('touchstart', function(e) {
	e.stopPropagation();
	e.preventDefault();
	if (isTouchDevice)  {
		document.ontouchmove = function(e) {
			e.stopPropagation();
			e.preventDefault();
			var coords = e.touches[0].clientX
			drag(e,coords) // функция изменения при удерживании ползунка
		}
	document.ontouchend = function(e) { 
		e.stopPropagation();
		e.preventDefault();// функция изменения при отпускании ползунка
		document.ontouchmove = null;
	}
}
});

//===============================================================================//
//======================= ФУНКЦИЯ ПЕРЕТАСКИВАНИЯ ПОЛЗУНКА ======================//
function drag(e,coords){
	var left = coords - sliderCoords.left - center; // адаптивная позиция ползунка при смещении
	if (left < 0) {
		left = 0;
	}
	var right = slider.width() - button.width();
	if (left > right) {
		left = right;
	}
	button.css({
		'left': (left * 100 / sliderWidth + '%')
	})
	$('.irs-bar').css({
		'width' : (left * 100 / sliderWidth + '%')
	})
	$(document).on('dragstart', function() {return false;});

	var budgetVal = Math.round((left * maxBudget / (sliderWidth - center)));
	var budget = budgetVal.toLocaleString();
	$('[data-result = budget]').val(budget);

	var viewsVal = Math.round((left * maxViews / (sliderWidth - center)));
	var views = viewsVal.toLocaleString();
	$('[data-result = views]').val(views);	

	var conversionVal = Math.round((left * maxConversion / (sliderWidth - center)));
	var conversion = conversionVal.toLocaleString();
	$('[data-result = conversion]').val(conversion);
	placement(budgetVal,budgetCof)
}
//===============================================================================//
//====================== ФУНКЦИЯ ФОРМУЛ РАСЧЕТА РАЗМЕЩЕНИЙ ======================//
function placement(value, coefficient){
	var count = Math.round((value / coefficient)/2); 
	var smallSecond = Math.round(count / 3.33);
	var midSecond = Math.round((count / 3.33) / 3.5);
	var largeSecond = Math.round(midSecond / 2.18);
	if (count <= 1754 && count > 2){
		$('[data-channel-small] .item__num').text(smallSecond + ' - ' + count);

	}else if  ( count <= 2 ) {
		$('[data-channel-small] .item__num').text(count)
	}
	if (smallSecond >2){
		$('[data-channel-mid] .item__num').text(midSecond + ' - ' + smallSecond);
	} else if ( smallSecond <= 2){
		$('[data-channel-mid] .item__num').text(smallSecond);
	}
	if (midSecond > 1){
		$('[data-channel-large] .item__num').text(largeSecond + ' - ' + midSecond);
	} else if ( midSecond <= 1){
		$('[data-channel-large] .item__num').text(midSecond);
	}
}
//===============================================================================//
//======== ИЗМЕНЕНИЕ ПОЛЕЙ "ПРОСМОТРЫ" И "ОХВАТЫ" ПРИ ИЗМЕНЕНИИ БЮДЖЕТА =========//
$('[data-result = budget]').on('input', function (){
	budgetInput(maxBudget,maxViews,maxConversion,budgetCof)
})
function  budgetInput(maxBudget,maxViews,maxConversion,budgetCof){
	var budgetVal = $((('[data-result = budget]'))).val();
	var budget = parseFloat(budgetVal.replace(/[^0-9.]/gim, ""))
	var viewsToString = Math.round((maxViews / maxBudget * budget));
	var conversionToString = Math.round((maxConversion / maxBudget * budget));
	var views = viewsToString.toLocaleString();
	var conversion = conversionToString.toLocaleString();
	var budgetNum = budget.toLocaleString();
	if(budget < maxBudget){
		$('[data-result = views]').val(views);	
		$('[data-result = conversion]').val(conversion);
		$('[data-result = budget]').val(budgetNum);
		button.css({
			'left': (budget * (100 - (100 * center / sliderWidth)) / maxBudget + '%')
		})
		$('.irs-bar').css({
			'width' : (budget * (100 - (100 * center / sliderWidth)) / maxBudget + '%')
		})

		// изменение размещений при значениях меньше максимального
		placement(budget,budgetCof)

	}else if(budget >= maxBudget) {
		var maxBudgetVal = maxBudget.toLocaleString();
		var maxViewsVal = maxViews.toLocaleString();
		var maxConversionVal = maxConversion.toLocaleString();
		$('[data-result = budget]').val(maxBudgetVal)
		$('[data-result = views]').val(maxViewsVal)
		$('[data-result = conversion]').val(maxConversionVal)
		var maxBudgetCount = Math.round((maxBudget / 900) /2)
		var smallBudgetCount = Math.round(maxBudgetCount / 3.33);
		var midBudgetCount = Math.round((maxBudgetCount / 3.33) / 3.5);
		var largeBudgetCount = Math.round(midBudgetCount / 2.18);
		$('[data-channel-small] .item__num').text(smallBudgetCount + ' - ' + maxBudgetCount);
		$('[data-channel-mid] .item__num').text(midBudgetCount + ' - ' + smallBudgetCount);
		$('[data-channel-large] .item__num').text(largeBudgetCount + ' - ' + midBudgetCount);
		button.css({
			'left':  (100 - (100 * center / sliderWidth) + '%')
		})
		$('.irs-bar').css({
			'width' : (100 - (100 * center / sliderWidth) + '%')
		})
		
		// изменение размещений при значениях больше максимального
		placement(maxBudget,budgetCof)
	}
};

//===============================================================================//
//========= ИЗМЕНЕНИЕ ПОЛЕЙ "БЮДЖЕТ" И "КЛИКИ" ПРИ ИЗМЕНЕНИИ ПРОСМОТРОВ =========//
$('[data-result = views]').on('input',  function(){
	viewsInput(viewsCof)
})

function viewsInput(viewsCof){
	var viewsVal = $('[data-result = views]').val();
	var views = parseFloat(viewsVal.replace(/[^0-9.]/gim, ""))
	var budgetToString = Math.round((maxBudget / maxViews * views));
	var conversionToString = Math.round((maxConversion / maxViews * views));
	var budget = budgetToString.toLocaleString();
	var conversion = conversionToString.toLocaleString();
	var viewsNum = views.toLocaleString();
	if(views < maxViews){
		$('[data-result = budget]').val(budget);	
		$('[data-result = conversion]').val(conversion);
		$('[data-result = views]').val(viewsNum);
		button.css({
			'left': (views * (100 - (100 * center / sliderWidth)) / maxViews + '%')
		})
		$('.irs-bar').css({
			'width' : (views * (100 - (100 * center / sliderWidth)) / maxViews + '%')
		})

		// // изменение размещений
		placement(views,viewsCof)
	}
	if(views > maxViews) {
		var maxBudgetVal = maxBudget.toLocaleString();
		var maxViewsVal = maxViews.toLocaleString();
		var maxConversionVal = maxConversion.toLocaleString();
		$('[data-result = views]').val(maxViewsVal)
		$('[data-result = budget]').val(maxBudgetVal)
		$('[data-result = conversion]').val(maxConversionVal)
		var maxViewsCount = Math.round((maxViews / viewsCof) /2)
		var smallViewsCount = Math.round(maxViewsCount / 3.33);
		var midViewsCount = Math.round((maxViewsCount / 3.33) / 3.5);
		var largeViewsCount = Math.round(midViewsCount / 2.18);
		$('[data-channel-small] .item__num').text(smallViewsCount + ' - ' + maxViewsCount);
		$('[data-channel-mid] .item__num').text(midViewsCount + ' - ' + smallViewsCount);
		$('[data-channel-large] .item__num').text(largeViewsCount + ' - ' + midViewsCount);
		button.css({
			'left':  (100 - (100 * center / sliderWidth) + '%')
		})
		$('.irs-bar').css({
			'width' : (100 - (100 * center / sliderWidth) + '%')
		})
	}
};

//===============================================================================//
//========= ИЗМЕНЕНИЕ ПОЛЕЙ "БЮДЖЕТ" И "ПРОСМОТРЫ" ПРИ ИЗМЕНЕНИИ КЛИКОВ =========//
$('[data-result = conversion]').on('input', function (){
	conversionInput(conversionCof)
})
function conversionInput(conversionCof){
	var conversionVal = $('[data-result = conversion]').val();
	var conversion = parseFloat(conversionVal.replace(/[^0-9.]/gim, ""))
	var viewsToString = Math.round((maxViews / maxConversion * conversion));
	var budgetToString = Math.round((maxBudget / maxConversion * conversion));
	var views = viewsToString.toLocaleString();
	var budget = budgetToString.toLocaleString();
	var conversionNum = conversion.toLocaleString();
	if(conversion < maxConversion){
		$('[data-result = views]').val(views);	
		$('[data-result = budget]').val(budget);
		$('[data-result = conversion]').val(conversionNum);
		button.css({
			'left': (conversion * (100 - (100 * center / sliderWidth)) / maxConversion + '%')
		})
		$('.irs-bar').css({
			'width' : (conversion * (100 - (100 * center / sliderWidth)) / maxConversion + '%')
		})
		// изменение размещений
		placement(conversion, conversionCof)

	}if(conversion > maxConversion) {
		var maxBudgetVal = maxBudget.toLocaleString();
		var maxViewsVal = maxViews.toLocaleString();
		var maxConversionVal = maxConversion.toLocaleString();
		$('[data-result = conversion]').val(maxConversionVal)
		$('[data-result = budget]').val(maxBudgetVal)
		$('[data-result = views]').val(maxViewsVal)
		var maxConversionCount = Math.round((maxConversion / conversionCof) /2)
		var smallConversionCount = Math.round(maxConversionCount / 3.33);
		var midConversionCount = Math.round((maxConversionCount / 3.33) / 3.5);
		var largeConversionCount = Math.round(midConversionCount / 2.18);
		$('[data-channel-small] .item__num').text(smallConversionCount + ' - ' + maxConversionCount);
		$('[data-channel-mid] .item__num').text(midConversionCount + ' - ' + smallConversionCount);
		$('[data-channel-large] .item__num').text(largeConversionCount + ' - ' + midConversionCount);
		button.css({
			'left':  (100 - (100 * center / sliderWidth) + '%')
		})
		$('.irs-bar').css({
			'width' : (100 - (100 * center / sliderWidth) + '%')
		})
	}
};

//===============================================================================//
//========================= ПРОВЕРКА НА ВВОД ТОЛЬКО ЦИФР ========================//
$('[data-result = budget], [data-result = views], [data-result = conversion]').on('keypress', function(event){
	return event.charCode >= 48 && event.charCode <= 57 || event.charCode <= 8
})

//===============================================================================//
//=========================== ТАБУЛЯЦИЯ ДЛЯ СОЦ.СЕТЕЙ ==========================//
$('.network__box').on('click', function (){
	$(this).addClass('is-active').siblings().removeClass('is-active')
	if($(this).index() == 0){
		maxBudget = 1000000;
		maxViews = 16666667;
		maxConversion = 250000;
		budgetCof = 900;
		viewsCof = 15000;
		iewsCof = 5000;
		conversionCof = 225;
		budgetInput(maxBudget,maxViews,maxConversion,budgetCof)
	}
	if($(this).index() == 1){
		maxBudget = 1000000;
		maxViews = 11111111;
		maxConversion = 111111;
		budgetCof = 450;
		viewsCof = 5000;
		conversionCof = 50;
		budgetInput(maxBudget,maxViews,maxConversion,budgetCof)
	}
	if($(this).index() == 2){ 
		maxBudget = 1000000;
		maxViews = 1754386;
		maxConversion = 175439;
		budgetCof = 285;
		viewsCof = 500;
		conversionCof = 50;
		budgetInput(maxBudget,maxViews,maxConversion,budgetCof)
	}
});

//===============================================================================//
//=============== ОБНОВЛЕНИЕ ПОЛЗУНКА ПРИ ИЗМЕНЕНИИ ШИРИНЫ ОКНА ================//
var oldWidth = window.innerWidth;
window.onresize = function () {
	var newWidth = window.innerWidth;
	if (newWidth != oldWidth) {
		buttonCoords = button.offset(); // координаты кружка
		center = button.outerWidth(true) / 2; // координаты центра кружка
		sliderCoords = slider.offset(); // координаты линии ползунка
		sliderWidth = slider.width(); 
		oldWidth = newWidth;
	}
};

});