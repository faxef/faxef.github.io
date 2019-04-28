$(document).ready(function(){
	$('.market .market_title').on('click', function(){
		$(this).siblings('.market_content').addClass('show').parent().siblings().find('.market_content').removeClass('show')
		$(this).parent().addClass('active').siblings().removeClass('active')
	})

	$('table thead th').on('click',function(){
		$(this).closest('.group').find('tbody').toggleClass('hide');
	})

	// Страница отчета 

	$('select[name="market"]').on('change', function(){
		filteringReport($(this));
	})

	function filteringReport($this){
		var market = $this.val()
		$.ajax({
			type: 'GET',
			url: 'http://localhost:3000/products.html',
			data: market,
			success: function (response) {
				console.log(response)
			},
			error: function (msg){
				console.log(msg)
			}
		});
	}
})