$(document).ready(function(){
		// var data = {
		// 	"groups":[
		// 	{"id":1, "name":"Гели"}, {"id":12, "name":"Гели"},
		// 	],
		// 	"products":[
		// 	{"id":1, "name":"Товар"}, {"id":1, "name":"Товар"},
		// 	],
		// 	"suppliers":[
		// 	{"id":1, "name":"Произв"}, {"id":1, "name":"Произв"},
		// 	]
		// }

		// // multiselect 
		//  $('#marketGroup').multiselect();

		// Пишем обработчик события для выбора значения в первом списке
		// Нас интересует событие изменения значения поля
		$( '#marketReport' ).change(function () {
			// При изменении значения первого списка мы должны удалить
			// все имеющиеся значения во втором и третьем, а также
			// сделать их неактивными
			$( '#marketGroup, #marketSup, #marketProduct' ).find( 'option:not(:first)' )	// Ищем все теги option, не являющиеся тегом по умолчанию
				.remove()	// Удаляем эти теги
				// Чтобы сделать поля неактивными, неправильно менять значение атрибута disabled
				// Теперь нам нужно изменять значение свойства disabled объектов полей списка, 
				// так как мы работаем с ними через библиотеку jQuery
				.end()		// Возвращаемся к исходному объекту
				.prop( 'disabled',true );		// Делаем поля неактивными
			// Сохраним выбранное значение списка в переменную
			var marketReport_id = $( this ).val();
			// Если выбрано значение по умолчанию, ничего не делаем
			if (marketReport_id == 0) { return; }
			// В ином случае нам необходимо отправить запрос на сервер
			// AJAX-запрос к серверу мы выполним, используя метод jQuery ajax()
			$.ajax({
				type: "GET",	// Тип запроса
				url: '/market_analysis_id',	// Путь к сценарию, обработающему запрос
				dataType: "json",	// Тип данных, в которых сервер должен прислать ответ
				data: 'id=' + marketReport_id,	// Строка GET-запроса
				error: function (data) {	// Обработчик, который будет запущен в случае неудачного запроса
					alert( "При выполнении запроса произошла ошибка :(" );	
					console.log(data)// Сообщение о неудачном запросе
				},
				success: function ( data ) { // Обработчик, который будет запущен после успешного запроса
					// В ответ на наш запрос сервер должен прислать массив значений
					// Мы его вставим в поле второго списка с помощью цикла for
					for ( var i = 0; i < data.groups.length; i++ ) {
					// Каждое полученное значение вставим в список категорий транспорта
					$( '#marketGroup' ).append( '<option value="' + data.groups[i].id + '">' + data.groups[i].name + '</option>' );
				}
					// После того, как мы сформировали список, мы можем сделать его активным
					// обратившись к его свойству disabled
					$( '#marketGroup' ).prop( 'disabled', false );	// Включаем поле
				}
			});
		});

		// Пишем обработчик события для выбора значения во втором списке
		// Нас интересует событие изменения значения поля
		$( '#marketGroup' ).change(function () {
			// При изменении значения второго списка мы должны удалить
			// все имеющиеся значения в третьем, а также
			// сделать его неактивными
			$( '#marketSup, #marketProduct' ).find( 'option:not(:first)' )	// Ищем все теги option, не являющиеся тегом по умолчанию
				.remove()	// Удаляем эти теги
				// Чтобы сделать поле неактивным, неправильно менять значение атрибута disabled
				// Теперь нам нужно изменять значение свойства disabled объекта поля списка, 
				// так как мы работаем с ним через библиотеку jQuery
				.end()		// Возвращаемся к исходному объекту
				.prop( 'disabled',true );		// Делаем поле неактивным
			// Сохраним выбранное значение списка в переменную
			var marketGroup_id = $( this ).val();
			// Сохраним выбранное значение типа транспорта в переменную
			var marketReport_id = $( '#marketReport' ).val();
			// Если выбрано значение по умолчанию, ничего не делаем
			if (marketReport_id === 0) { return; }
			// В ином случае нам необходимо отправить запрос на сервер
			// AJAX-запрос к серверу мы выполним, используя метод jQuery ajax()
					// После того, как мы сформировали список, мы можем сделать его активным
					// обратившись к его свойству disabled
					$( '#marketSup' ).prop( 'disabled', false );	// Включаем поле

					$.ajax({
				type: "GET",	// Тип запроса
				url: '/market_analysis_group',	// Путь к сценарию, обработающему запрос
				dataType: "json",	// Тип данных, в которых сервер должен прислать ответ
				data: 'id=' + marketReport_id + '&groups=' + marketGroup_id,	// Строка GET-запроса
				error: function () {	// Обработчик, который будет запущен в случае неудачного запроса
					alert( "При выполнении запроса произошла ошибка :(" );	// Сообщение о неудачном запросе
				},
				success: function ( data ) { // Обработчик, который будет запущен после успешного запроса
					// В ответ на наш запрос сервер должен прислать массив значений
					// Мы его вставим в поле третьего списка с помощью цикла for
					for ( var i = 0; i < data.suppliers.length; i++ ) {
						console.log(data.suppliers[i].id)
					// Каждое полученное значение вставим в список категорий транспорта
					$( '#marketSup' ).append( '<option value="' + data.suppliers[i].id + '">' + data.suppliers[i].name + '</option>' );
				}
					// После того, как мы сформировали список, мы можем сделать его активным
					// обратившись к его свойству disabled
					$( '#marketSup' ).prop( 'disabled', false );	// Включаем поле
				}
			});
				});
		$( '#marketSup' ).change(function () {
			// При изменении значения третьего списка мы должны удалить
			// все имеющиеся значения в четвертом, а также
			// сделать его неактивными
			$( '#marketProduct' ).find( 'option:not(:first)' )	// Ищем все теги option, не являющиеся тегом по умолчанию
				.remove()	// Удаляем эти теги
				// Чтобы сделать поле неактивным, неправильно менять значение атрибута disabled
				// Теперь нам нужно изменять значение свойства disabled объекта поля списка, 
				// так как мы работаем с ним через библиотеку jQuery
				.end()		// Возвращаемся к исходному объекту
				.prop( 'disabled',true );		// Делаем поле неактивным
			// Сохраним выбранное значение списка в переменную
			var marketSup = $( this ).val();

			var marketReport_id = $( '#marketReport' ).val();
			// Если выбрано значение по умолчанию, ничего не делаем
			if (marketReport_id === 0) { return; }

			// Сохраним выбранное значение типа транспорта в переменную
			var marketGroup_id = $( '#marketGroup' ).val();
			// Если выбрано значение по умолчанию, ничего не делаем
			if (marketGroup_id === 0) { return; }
			// В ином случае нам необходимо отправить запрос на сервер
			// AJAX-запрос к серверу мы выполним, используя метод jQuery ajax()
			$.ajax({
				type: "GET",	// Тип запроса
				url: '/market_analysis_group',	// Путь к сценарию, обработающему запрос
				dataType: "json",	// Тип данных, в которых сервер должен прислать ответ
				data: 'id=' + marketReport_id + '&groups=' + marketGroup_id + '&suppliers=' + marketSup,	// Строка GET-запроса
				error: function () {	// Обработчик, который будет запущен в случае неудачного запроса
					alert( "При выполнении запроса произошла ошибка :(" );	// Сообщение о неудачном запросе
				},
				success: function ( data ) { // Обработчик, который будет запущен после успешного запроса
					// В ответ на наш запрос сервер должен прислать массив значений
					// Мы его вставим в поле третьего списка с помощью цикла for
					for ( var i = 0; i < data.products.length; i++ ) {
						console.log(data.products[i].id)
					// Каждое полученное значение вставим в список категорий транспорта
					$( '#marketSup' ).append( '<option value="' + data.products[i].id + '">' + data.products[i].name + '</option>' );
				}
					// После того, как мы сформировали список, мы можем сделать его активным
					// обратившись к его свойству disabled
					$( '#marketProduct' ).prop( 'disabled', false );	// Включаем поле
				}
			});
		});

		// Отправка фильтра на бэк
		// Фильтрация на бэк
		$('.analysis_filter_form').on('submit',function(){
			var $this = $(this)
			filteringReport($this)
			return false;
		})
		function filteringReport($this){
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
					console.log(response)
				}
			});
		}

		//  Формирование таблиц
		var tableInfo = {
			"common": {
				"kg": "2323",
				"sumnat": "2323",
				"ds": "322",
				"dm": "3232",
				"avgm": "23232"
			},
			"groups": [
			{
				"name": "Группа 1",
				"commonGroup": {
					"kg": "2323",
					"sumnat": "2323",
					"ds": "322",
					"dm": "3232",
					"avgm": "23232",
					"products": [
					{
						"name": "Продукт 1",
						"kg": "2323",
						"sumnat": "2323",
						"ds": "322",
						"dm": "3232",
						"avgm": "23232"
					},
					{
						"name": "Продукт 2",
						"kg": "2323",
						"sumnat": "2323",
						"ds": "322",
						"dm": "3232",
						"avgm": "23232"
					},
					{
						"name": "Продукт 3",
						"kg": "2323",
						"sumnat": "2323",
						"ds": "322",
						"dm": "3232",
						"avgm": "23232"
					},
					]
				},
				"productsByDate": [
				{
					"kg": "2323",
					"sumnat": "2323",
					"ds": "322",
					"data": "34/34/3433"
				}
				]
			},
			{
				"name": "Группа 2",
				"commonGroup": {
					"kg": "1",
					"sumnat": "2",
					"ds": "4",
					"dm": "5",
					"avgm": "232",
					"products": [
					{
						"name": "productName",
						"kg": "2323",
						"sumnat": "2323",
						"ds": "322",
						"dm": "3232",
						"avgm": "23232"
					}
					]
				},
				"productsByDate": [
				{
					"kg": "2323",
					"sumnat": "2323",
					"ds": "322",
					"data": "34/34/3433"
				}
				]
			}
			]
		}
		console.log(tableInfo)

		// =============================
		// Формирование таблицы Common
		// =============================

		// очистка заголовков
		var commonHeaders = $('table.common thead tr.commonHeaders');
		// commonHeaders.html('')

		// очистка значений
		var commonValue = $('table.common tbody tr.commonValue');
		commonValue.html('')		

		// очистка дат
		var dates = $('.report_header_informations .month');
		dates.html('')

		// Перебор объекта на вывод в общую таблицу
		$.each(tableInfo.common,function(index,value){

			// замена новыми данными поле Значений
			var newCommonValue = "<td>" + value + "</td>";
			commonValue.append(newCommonValue)
		})

		// =============================
		// Формирование таблицы CommonGroup
		// =============================		
			// Перебор объекта на вывод в общую таблицу
			var groupsBlock = $('.analysis .analysis_block .groups_report');

			$.each(tableInfo.groups,function(index,value){
				// Средние значения групп
				var totalAvgm = value.commonGroup.avgm;
				var totalKg = value.commonGroup.kg;
				var totalDm = value.commonGroup.dm;
				var totalDs = value.commonGroup.ds;
				var totalSumnat = value.commonGroup.sumnat;

				var totalInfoKg = "<th>" + totalKg + "</th>"
				var totalInfoSumnat = "<th>" + totalSumnat + "</th>"
				var totalInfoDs = "<th>" + totalDs + "</th>"
				var totalInfoDm = "<th>" + totalDm + "</th>"
				var totalInfoAvgm = "<th>" + totalAvgm + "</th>"

				var productsArray = '2';
				console.log(value.commonGroup.products.length)


				console.log(productsArray)
				// вывод продуктов 
				var products = "<tbody class='hide'><tr class='product'><td>" + productsArray + "</td></tr></tbody>"
				// вывод названия групп
				var groups = "<thead><tr class='product_group_title'><th>" + value.name + "</th></tr></thead>"
				var generalGroupName = "<div class='group_name'><table>" + groups + products + "</table></div>";

				// вывод в средних значений групп
				var totalInfoHeaders = "<div class='total info'><table><thead><tr>"+ totalInfoKg + totalInfoSumnat + totalInfoDs +totalInfoDm + totalInfoAvgm +"</tr></thead></table></div>"

				for ( var i = 0; i < value.productsByDate.length; i++ ) {
					var monthAvgm = value.productsByDate[i].avgm;
					var monthKg = value.productsByDate[i].kg;
					var monthDm = value.productsByDate[i].dm;
					var monthDs = value.productsByDate[i].ds;
					var monthSumnat = value.productsByDate[i].sumnat;
					var data = value.productsByDate[i].data
				}
				// Средние значения месяцев

				var monthInfoKg = "<th>" + monthKg + "</th>"
				var monthInfoSumnat = "<th>" + monthSumnat + "</th>"
				var monthInfoDs = "<th>" + monthDs + "</th>"

				var headerDate = "<div class='info'><table><thead><tr><th colspan='3'>" +data+"</th></tr><tr><th>kg</th><th>sumnat</th><th>D%,уп</th></tr><thead></table></div>"
		
				dates.append(headerDate)
				// вывод месяцев групп
				
				var monthInfo = "<div class='info'><table><thead><tr>"+ monthInfoKg + monthInfoSumnat + monthInfoDs +"</tr></thead></table></div>";
				var monthHeaders = "<div class='month'>"+monthInfo+"</div>";
				var group_informations = "<div class='group_informations'>" + totalInfoHeaders + monthHeaders + "</div>";



				// формирование группы
				var group = "<div class='group'>" + generalGroupName + group_informations + "</div>";
				groupsBlock.append(group)		


				// $.each(value.commonGroup,function(index,value){
				// 	var products = "<tbody class='hide'><tr class='product'><td>" + value + "</td></tr></tbody>"
				// 	console.log(value)
				// 	groupsBlock.append(products)	
				// })
			})
			$('table thead th').on('click',function(){
				$(this).closest('.group').find('tbody').toggleClass('hide');
			})
		});