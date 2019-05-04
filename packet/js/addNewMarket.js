$(document).ready(function(){
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
				var newMarket = $('.market_lists .market_skillet').clone(true).removeClass("market_skillet");

				var newMarketGroups = $('.market_group.skillet').clone(true).removeClass("skillet").attr("id", marketName);;
				$('.market_lists').append(newMarket);
				$('.block.chooses').append(newMarketGroups);

				market = {
					marketName: marketName,
					description: marketDescription,
					groups : [],
				}
				markets.markets.push(market)
			},
		});
		return false;
	}

	// // Удаление рынка
	// $('.market .delete.icon').on('click', function(){
	// 	var $this = $(this)
	// 	marketRemove($this);
	// })
	// function marketRemove($this){
	// 	var indexMarket = $this.closest('.market').index() - 1;
	// 	markets.markets.splice(indexMarket,1)
	// 	$this.closest('.market').remove();
	// }

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
				$this.parent().siblings('.groups_content').find('.groups').append("<div class='group'>" + group + "</div>");	
				var chooses = $this.closest('.add').siblings('.chooses')
				var newGroupName = chooses.find('.added_group.skillet .title h2').text(group);

				var marketName =$this.closest('li.active').find('.market_title h2').text()
				
				var newGroup = newGroupName.closest('.skillet').clone(true).removeClass('skillet');

				var marketId = chooses.find('#' + marketName)
				marketId.append(newGroup)

				var indexMarket = $this.closest('.market.active').index()
				for (var i = 0; i < markets.markets.length; i++) {
					if (i == indexMarket-1 ) {
						var groups = {
							groupName : group,
							products: ''
						};
						markets.markets[i].groups.push(groups);
					}
				}

				$('.groups_content .groups .group').on('click', function (){
					$(this).addClass('active').siblings().removeClass('active')
					$(this).closest('.block.add').siblings('.chooses').find('.market_group.active .added_group').removeClass('active').eq($(this).index()).addClass('active');
				});
			}
		});
		return false;
	}

	// Добавление продуктов в группы
	$('.block.products .lists .block_lists input[type="checkbox"').on('change', function(){
		$(this).parent().toggleClass('selected', this.checked);
	});

	$('.products .selectedProducts').on('submit', function(e){
		e.preventDefault()
		var $this = $(this)
		productAdd($this)
	})
	function	productAdd($this) {
		var group = $('.market_group.active .added_group.active');
		var indexGroup = group.index();
		var indexMarket = group.closest('.market_group.active').index() - 2;
		var zLists = []

		$this.find('input:checked').each(function() {
			var productId = $(this).attr('id')
			// var productId = $(this).clone(true)
			var li = ('<li>'+ productId +'</li>')

			zLists.push(productId);

			$('.market_group.active .added_group.active .lists .block_lists').append(li)
			// li.appendTo('.market_group.active .added_group .lists .block_lists');	
		});

		// Удаление продуктов из группы
		$('.market_group.active .product.selected i').on('click', function(){
			var $this = $(this)
			productRemove($this);
		})

		markets.markets[indexMarket].groups[indexGroup].products = zLists
	}
	// Сворачивание\разворачивание рынка
	$('.market_lists .market_title').on('click', function(e){
		var marketName = $(this).find('h2').text();
		var groupId = $(this).closest('.add').siblings('.chooses').find('#' + marketName).addClass('active').find('.skillet').removeClass('skillet')
		var z = $(this).closest('.add').siblings('.chooses').find('.market_group:not(#'+marketName+ ')').removeClass('active')

		$(this).siblings('.market_groups').toggleClass('show').parent().siblings().find('.market_groups').removeClass('show')
		$(this).parent().addClass('active').siblings().removeClass('active')
	})

	// фильтрация на бэк
	$('.filteringProducts').on('submit',function(){
		var $this = $(this)
		filteringProduct($this)
		return false;
	})
	function filteringProduct($this){
		var form_data = $this.serialize();
		console.log(form_data)
		$.ajax({
			type: 'GET',
			url: 'http://localhost:8080/products',
			data: form_data,
			dataType: 'json',
			contentType: 'application/json; charset=utf-8',
			error: function (response) {
				var r = jQuery.parseJSON(response.responseText);
				console.log("Full errror", response)
				console.log("-------------", response)
				console.log("Message: " + r.Message);
				console.log("-------------", response)
				console.log("StackTrace: " + r.StackTrace);
				console.log("-------------", response)
				console.log("ExceptionType: " + r.ExceptionType);
			},
			success: function (response, textStatus) { 
				$('.block.products .lists .block_lists').html('')
				console.log(JSON.stringify(response))
				$.each(response, function(i, val) {  
					$('.block.products .lists .block_lists').html('');
					for (var i = 0; i < response.length; i++) {
						'<div class="product"><input type="checkbox" id="'+ response[i].uid +'"><label for="'+ response[i].uid +'">'+response[i].name+'</label></div>'
					}
				});
			}
		});
	}

	// Создание и передача объекта на бэк
	function send(markets) {
		console.log(markets)
		$.ajax({
			headers: { 
				Accept : "application/json"
			},
			type: 'POST',
			contentType : 'application/json; charset=utf-8',
			dataType : 'json',
			url : "http://localhost:8080/report",
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

	$('.createReport button').on('click', function(){
		send(markets);
	})
});