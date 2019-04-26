$(document).ready(function(){

	// Кастомизация формы добавления файла (поле: Файл не выбран)
	$('main .export_import .tabs_content .content.active form input[id="add_file"]').change(function(){
		var fileName = $(this); //имя файла
		fileName.siblings('.adding_files').find('.file_name_block p').html(getFileName(fileName))
		console.log(fileName)

	});

	function getFileName(elm) {
		var fn = $(elm).val();
   var filename = fn.match(/[^\\/]*$/)[0]; // remove C:\fakename
   return filename;
}

	// Переключение вкладок(импорт\экспорт)
	$('main .tabs_menu li').on('click', function (){
		$(this).addClass('active').siblings().removeClass('active')
		$(this).closest('main').find('.tabs_content .content').removeClass('active').eq($(this).index()).addClass('active');
	});

	// Добавление загруженого файла в список
	$('main .export_import .tabs_content .content.active form').on('submit', function(e){
		e.preventDefault()
	// вывод текущего времени загрузки файла
	var dt = new Date();
	var time = dt.getHours() + ":" + dt.getMinutes();

	var date_str=('0'+dt.getDate()).substr(-2,2)+'.'+('0'+dt.getMonth()).substr(-2,2)+'.'+(dt.getFullYear());

	var time_str=('0'+dt.getHours()).substr(-2,2)+':'+('0'+dt.getMinutes()).substr(-2,2);

	var name = $(this).find('input[id="add_file"]');

	var file = '<li><div class="file">'+ getFileName(name) +'</div><div class="date"><span class="d">' + date_str + '</span><span class="t">' +  time_str +'</span></div><div class="icons"><i class="fas fa-plus"></i><i class="fas fa-pencil-alt"></i><i class="fas fa-trash-alt"></i></div></li'
	var base = $(this).find('.bases_block select').val()
	var lists = $('.base_accordeon ul.files_list').eq(base);
	lists.css("display","block")
	lists.append(file)
})
	// Аккордеон
	$('.base_accordeon .title').on('click', base_acc);

	function base_acc(){
		$('.base_accordeon .files_list').not($(this).next()).slideUp(100);
		$(this).next().slideToggle(200);
	}
});