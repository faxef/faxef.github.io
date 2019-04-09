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

	// Добавление груп
	var markets =[]
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
					marketName: '',
					description: "Описание рынка",
					groups : [],
				}
				market.description = marketDescription;
				market.marketName = marketName;
				markets.push(market);
			}
		});
		return false;
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

				for (var i = 0; i < markets.length; i++) {
					if (i == indexMarket-1 ) {
						var groups = {
							groupName : group,
							productsList: ''
						};
						markets[i].groups.push(groups);
					}
				}

				$('.groups_content_tabs .tab').on('click', function (){
					$(this).addClass('active').siblings().removeClass('active')
					$(this).closest('.groups_content').find('.group').removeClass('active').eq($(this).index()).addClass('active');
				});
			}
		});
		console.log(markets)
		return false;
	}

	// Добавление продуктов в группы
	$('.products .product_lists').on('click','.product', function(){
		$(this).toggleClass('selected')
	})
	$('a.product_select').on('click', function(){
		var $this = $(this)
		productAdd($this)
	})
	function	productAdd($this) {
		var selected = $this.siblings('.products_body').find('.product.selected').clone();
		selected.appendTo('.market.active .group.active');	

		var group = $('.market.active .group.active');
		var indexGroup = group.index();
		var indexMarket = group.closest('.market.active').index() - 1;
		var zLists = []

		selected.each(function(index){
			var value = $(this).html();
			zLists.push(value);
		})
		markets[indexMarket].groups[indexGroup].productsList = zLists
	}
	// отправка массива в JSON
	function send(markets) {
		console.log(JSON.stringify(markets))
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
	// фильтр 
	var ProductInfo = [{
		region: "Брестская обл",
		aptekatitle: "Презик 8",
		supplier: "Боде Хеми ГмбХ & Ко",
		Model: "101"
	},
	{
		region: "Могилевская обл",
		aptekatitle: "Презик 5",
		supplier: "ОАО Аромат",
		Model: "234"
	},
	{
		region: "Могилевская обл",
		aptekatitle: "Презик 5",
		supplier: "ОАО Аромат",
		Model: "234"
	},
	{
		region: "Брест",
		aptekatitle: "Презик 1",
		supplier: "ООО Мечта",
		Model: "100"
	},
	{
		region: "Минск",
		aptekatitle: "Презик 4",
		supplier: "ООО Две линии",
		Model: "500"
	},
	{
		region: "Могилев",
		aptekatitle: "Презик 8",
		supplier: "Научно-производственное объединение Химсинтез",
		Model: "100"
	},
	{
		region: "Гродно",
		aptekatitle: "Презик 1",
		supplier: "ООО Рекитт Бенкизер Групп",
		Model: "100"
	},
	{
		region: "Витебск",
		aptekatitle: "Презик 3",
		supplier: "ООО Мечта",
		Model: "455"
	}];
	var regionArray = [];
	var supplierArray = [];

// adding unique region to regionArray
$.each(ProductInfo, function (index) {
	var region = ProductInfo[index].region;
	if ($.inArray(region, regionArray) == -1) {
		regionArray.push(region);
	}
});
//sorting the region 
regionArray.sort();
var $regionDropDown = $("#region");
var $supplierDropDown = $("#supplier");
var $nameInclude = $("#like");
var $nameNotInclude = $("#notLike");
var $container = $(".products_body").find(".product_lists");
// append the region to select
$.each(regionArray, function (i) {
	$regionDropDown.append('<option value="' + regionArray[i] + '">' + regionArray[i] + '</option>');
});

$regionDropDown.change(function () {
	var selectedregion = this.value;
    //filter based on  selected year.
    supplierArray = jQuery.grep(ProductInfo, function (product, i) {
    	return product.region == selectedregion;
    });
    $supplierDropDown.empty();
    $supplierDropDown.append('<option>Выберите производителя</option>');
    for (var i = 0; i < supplierArray.length; i++) {
    	$supplierDropDown.append('<option value="' + supplierArray[i].supplier + '">' + supplierArray[i].supplier + '</option>');
    }
    updateTable(supplierArray);
 });

$supplierDropDown.change(function () {
	var selectedSupplier = this.value;
    //filter select based on selected supplier
    selectedArray = jQuery.grep(ProductInfo, function (product, i) {
    	return product.supplier == selectedSupplier;
    });
    console.log(selectedArray)
    updateTable(selectedArray);
 });

$nameInclude.change(function () {
	var selectednameInclude = this.value;
    //filter select based on selected nameInclude
    selectedArray = jQuery.grep(ProductInfo, function (product, i) {
    	return product.aptekatitle.toLowerCase().indexOf(selectednameInclude) != -1;
    });
    updateTable(selectedArray);
 });

$nameNotInclude.change(function () {
	var selectednameNotInclude = this.value;
    //filter select based on selected nameNotInclude
    selectedArray = jQuery.grep(ProductInfo, function (product, i) {
    	return product.aptekatitle.toLowerCase().indexOf(selectednameNotInclude) === -1;
    });
    updateTable(selectedArray);
 });

//To update the table element with selected items
updateTable = function (product) {
	$container.empty();
	for (var i = 0; i < product.length; i++) {
		$container.append("<div class='product'>" + product[i].aptekatitle + "</div>");
	}
}
$('.btns .createReport').on('click', function(){
	send(markets);
})

})