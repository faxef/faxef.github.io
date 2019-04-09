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

	$('.market .market_title').on('click', function(){
		$(this).siblings('.market_content').addClass('show').parent().siblings().find('.market_content').removeClass('show')
		$(this).parent().addClass('active').siblings().removeClass('active')
	})

	$('table thead th').on('click',function(){
		$(this).closest('.group').find('tbody').toggleClass('hide');
	})

	// Формирование объекта на выход
	var markets ={
		markets : [ ]
	}
	var market = {}
	
	// Добавление рынка
	$('.markets_header form').on('submit', function(){
		var $this = $(this)
		marketAdd($this);
		return false;
	});

	function marketAdd($this){
		var marketName = $this.find('input#marketName').val();
		var marketDescription = $this.find('textarea#marketDescription').val();
		$.ajax({
			method: 'GET',
			url: '?marketName' + marketName,
			success: function (result) {
				var newMarketName = $('.market_skillet .market_title h2').text(marketName);
				var newMarketDescription = $('.market_skillet .market_content .market_description').text(marketDescription);
				var newMarket = $('.markets_body .market_skillet').clone(true).removeClass("market_skillet");

				$('.markets_body').append(newMarket);
				market = {
					marketName: marketName,
					description: marketDescription,
					groups : [],
				}
				markets.markets.push(market)
			}
		});
		return false;
	}
	// Удаление рынка
	$('.market .delete.icon').on('click', function(){
		var $this = $(this)
		marketRemove($this);
	})
	function marketRemove($this){
		var indexMarket = $this.closest('.market').index() - 1;
		markets.markets.splice(indexMarket,1)
		$this.closest('.market').remove();
	}
	// добавление групп
	$('.groups_header form').on('submit', function(){
		var $this = $(this)
		groupAdd($this);
		return false;
	})
	function groupAdd($this){
		var group = $this.find('input#groupName').val();
		$.ajax({
			method: 'GET',
			url: '?groupName' + group,
			success: function (result) {
				$this.parent().siblings('.groups_content').find('.groups_content_tabs').append("<div class='tab'>" + group + "</div>");	
				$this.parent().siblings('.groups_content').find('.groups').append("<div class='group'></div>");	
				var indexMarket = $this.closest('.market').index()

				for (var i = 0; i < markets.markets.length; i++) {
					if (i == indexMarket-1 ) {
						var groups = {
							groupName : group,
							products: ''
						};
						markets.markets[i].groups.push(groups);
					}
				}

				$('.groups_content_tabs .tab').on('click', function (){
					$(this).addClass('active').siblings().removeClass('active')
					$(this).closest('.groups_content').find('.group').removeClass('active').eq($(this).index()).addClass('active');
				});
			}
		});
		return false;
	}
	// Добавление продуктов в группы
	$('.products .product_lists').on('click','.product', function(){
		$(this).toggleClass(function() {
			if ($(this).hasClass('selected')) {
				$(this)
				return $(this).removeClass('selected');
			} else {
				return 'selected';
			}
		});
	})

	$('a.product_select').on('click', function(){
		var $this = $(this)
		productAdd($this)
	})
	function	productAdd($this) {
		var sdelete = '<i class="fas fa-trash-alt"></i>';
		var selected = $this.siblings('.products_body')
		.find('.product.selected')
		.clone(true)
		.append(sdelete);

		selected.appendTo('.market.active .group.active');	

		// Удаление продуктов из группы
		$('.group.active .product.selected i').on('click', function(){
			var $this = $(this)
			productRemove($this);
		})

		var group = $('.market.active .group.active');
		var indexGroup = group.index();
		var indexMarket = group.closest('.market.active').index() - 1;
		var zLists = []

		selected.each(function(index){
			var value = $(this).attr('id');
			zLists.push(value);
		})
		markets.markets[indexMarket].groups[indexGroup].products = zLists
	}
	// Удаление продуктов из группы
	function productRemove($this){
		var indexMarket = $this.closest('.market').index() - 1;
		var indexProduct = $this.closest('.product').index()
		var indexGroup = $this.closest('.group').index();
		markets.markets[indexMarket].groups[indexGroup].products.splice(indexProduct,1)
		$this.closest('.product').remove();
	}
	// фильтрация на бэк
	$('.products_header form').on('submit',function(){
		var $this = $(this)
		filteringProduct($this)
		return false;
	})
	var data = [
	{
		"uid": 234242, 
		"name":"Презики"
	}, 
	{
		"uid": 2342436456, 
		"name":"Таблетка"
	}, 
	{
		"uid": 26, 
		"name":"Пластырь"
	}, 
	{
		"uid": 212, 
		"name":"Гель"
	}, 
	{
		"uid": 314456, 
		"name":"Черный гель"
	}, 
	{
		"uid": 234, 
		"name":"Мазь"
	}
	]
	for (var i = 0; i < data.length; i++) {
		$('.product_lists').append("<div class='product' id='" + data[i].uid + "'>" + data[i].name + "</div>")
	}
	function filteringProduct($this){
		var form_data = $this.serialize();
		$.ajax({
			type: 'GET',
			url: 'http://localhost:3000/products.html',
			data: form_data,
			error : function(e) {
				console.log("ERROR: ", e);
			},
			success: function (data, textStatus) { 
				$('.product_lists').html('')
				var data = jQuery.parseJSON;
				$.each(data, function(i, val) {  
					$('.product_lists').html('');
					for (var i = 0; i < data.length; i++) {
						$('.product_lists').append("<div class='product' id='" + data[i].uid + "'>" + data[i].name + "</div>")
					}
				});
			}
		});
	}
	// выбор даты
	$('#calendar').datepicker({
		changeMonth: true,
		changeYear: true 
	})
	$('#finishDate').datepicker({
		changeMonth: true,
		changeYear: true 
	}) 
	$('#startDate').datepicker({
		changeMonth: true,
		changeYear: true 
	}) 

	// Создание и передача объекта на бэк
	function send(markets) {
		console.log(markets)
		var startDate = $('#startDate').val()
		var finishDate = $('#finishDate').val()

		markets.dateStart = startDate;
		markets.dateEnd = finishDate;

		$.ajax({
			headers: { 
				Accept : "application/json"
			},
			type: 'POST',
			contentType : 'application/json; charset=utf-8',
			dataType : 'json',
			url : "http://localhost:3000/report.html",
			data : JSON.stringify(markets),
			success: function (e) {
				console.log("success:", data);
			},
			done : function(e) {
				console.log("done", e);
			},
			error : function(e) {
				console.log("ERROR: ", e);
			}
		});
		return false;
	}

	$('.btns .createReport').on('click', function(){
		send(markets);
	})

})