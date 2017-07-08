jQuery(document).ready(function ($) {
var toDo = document.getElementById('toDo1');
var elements=toDo.getElementsByTagName('li');
var tasks = [];
var task = {};
//=======================================================================
function randomInt(min,max) {
	return Math.floor(Math.random() * (max - min) - min);
}
//=======================================================================
//===========Отмена переноса строки у textarea через Enter, Enter - отправка формы =========//
$('textarea').keypress(function(e){
    if(e.keyCode == 13) {
    	e.preventDefault();
        $(this).closest('form').find('button[type=submit][name=submit]').click();
    }
});
//=======================================================================
//-------------------START! Создание задачи-----------------
	//---START! Проверяем заполено ли поле ввода
	$('#enter').click( function newList() {
		var valueText = $('#text').val();
		var valueDesc = $('#description').val();
		var valueDataStart = $('#startDate').val();
		var valueDataFinish = $('#finishDate').val();
		if (valueText == '' || valueDesc == '' || valueDataStart == '' || valueDataFinish == '') {
			$('textarea').attr('required', 'required');
			$('#startDate').attr('required', 'required');
			$('#finishDate').attr('required', 'required');
			return true;
		}
		else {
			$('textarea').removeAttr('required', 'required');
			$('#startDate').removeAttr('required', 'required');
			$('#finishDate').removeAttr('required', 'required');

			task ={
				Key: "1",
				id: "",
				name: valueText,
				taskDescription: valueDesc,
				taskStartDate: valueDataStart,
				taskFinishDate: valueDataFinish,
			};
			$(task).each(function(){
				tasks.push(task);
			});
			console.log(tasks);

			form.text.value = "";
			form.startDate.value = "";
			form.finishDate.value = "";
			form.description.value = "";
		}
		//---END! Проверяем заполено ли поле ввода

//---START! Проверяем заполнено ли поле, если да - создаем задачу

	//--- START! Создаем разметку элементов задачи
	var section = 1;
	var li = document.createElement('li');
		$(li).addClass("task");
		$(li).uniqueId();
		task.id= li.id;

	var label = document.createElement('div');
	    label.className = "spanStyle";
	    label.innerHTML = valueText;
	    label.onclick = showDescription;

	var description = document.createElement('div');
		description.className="description";
// ------------календарь-------------//

// Description//
	var clearfix1= document.createElement('div');
		clearfix1.className = "clearfix";

	var descriptionNote = document.createElement('li');
	    descriptionNote.className = "descriptionNote";

	var descriptionIcon = document.createElement('i');
		descriptionIcon.className= "fa fa-id-card-o fa-1x";

	var descriptionContainer = document.createElement('div');
		descriptionContainer.className = "descriptionContainer";
    
    var descriptionTitle = document.createElement('div');
	    descriptionTitle.className = "descriptionTitle";
	    descriptionTitle.innerHTML = "Description";

	var descriptionText = document.createElement('div');
	    descriptionText.className = "descriptionText";
	    descriptionText.innerHTML = valueDesc;


	description.appendChild(descriptionNote);
	descriptionNote.appendChild(descriptionIcon);
	descriptionNote.appendChild(descriptionContainer);
	descriptionContainer.appendChild(descriptionTitle);
	descriptionContainer.appendChild(descriptionText);
	descriptionNote.appendChild(clearfix1);
// Description//

// start calendar date//
	var clearfix2= document.createElement('div');
		clearfix2.className = "clearfix";

	var liStarCalendar = document.createElement('li');
	    liStarCalendar.className = "liStarCalendar";

	var startIcon = document.createElement('i');
		startIcon.className= "fa fa-calendar-plus-o fa-1x";

	var startCalendarContainer = document.createElement('div');
		startCalendarContainer.className = "startCalendarContainer";
    
    var startCalendarTitle = document.createElement('div');
	    startCalendarTitle.className = "startCalendarTitle";
	    startCalendarTitle.innerHTML = "Start date";

	var startCalendarText = document.createElement('div');
	    startCalendarText.className = "startCalendarText";
	    startCalendarText.innerHTML = valueDataStart;

	    			//----start calendar //
	description.appendChild(liStarCalendar);
	liStarCalendar.appendChild(startIcon);
	liStarCalendar.appendChild(startCalendarContainer);
	startCalendarContainer.appendChild(startCalendarTitle);
	startCalendarContainer.appendChild(startCalendarText);
	liStarCalendar.appendChild(clearfix2);


// finish calendar date//
	var clearfix3= document.createElement('div');
		clearfix3.className = "clearfix";

    var lifinishCalendar = document.createElement('li');
	    lifinishCalendar.className = "lifinishCalendar";

	var finishIcon = document.createElement('i');
		finishIcon.className= "fa fa-calendar-times-o fa-1x";

	var finishCalendarContainer = document.createElement('div');
		finishCalendarContainer.className = "finishCalendarContainer";
    
    var finishCalendarTitle = document.createElement('div');
	    finishCalendarTitle.className = "finishCalendarTitle";
	    finishCalendarTitle.innerHTML = "Finish date";

	var finishCalendarText = document.createElement('div');
	    finishCalendarText.className = "finishCalendarText";
	    finishCalendarText.innerHTML = valueDataFinish;

//----finish calendar //
	description.appendChild(lifinishCalendar);
	lifinishCalendar.appendChild(finishIcon);
	lifinishCalendar.appendChild(finishCalendarContainer);
	finishCalendarContainer.appendChild(finishCalendarTitle);
	finishCalendarContainer.appendChild(finishCalendarText);
	lifinishCalendar.appendChild(clearfix3);

// ------------календарь-------------//
	var editIcon = document.createElement('i');
		editIcon.className="fa fa-pencil";

	var edit = document.createElement ('span');
		edit.className ="edit";
		edit.onclick = editList1;

	var starIcon = document.createElement('i');
		starIcon.className = "fa fa-star";

	var star = document.createElement ('span');
		star.onclick = starColor;
		star.className = "star";

	$('#list').prepend(li);
	li.appendChild(label);
	li.appendChild(edit);
	edit.appendChild(editIcon);
	li.appendChild(star);
	star.appendChild(starIcon);
	li.appendChild(description);

});

//-------------------------END! Создание задачи---------------

//================== LOCAL STORAGE ====================================//
//==========================Сохранение JSON========================//

function save() {
	var arrToJSON = JSON.stringify(tasks, "", 3);
	localStorage.setItem("object", arrToJSON);
	console.log(arrToJSON);
}
jsonSave.addEventListener("click", save);

//=============================Загрузка JSON======================//
function downl() {
	var arrFromJSON = JSON.parse(localStorage.getItem("object"));
	console.log(arrFromJSON);

	// var valueDataStart = $('#startDate').val();
	// var valueDataFinish = $('#finishDate').val();
for(i=0; i<=arrFromJSON.length-1; i++){
	if($("ul").is(task.id)){
		task ={
				Key: "1",
				id: arrFromJSON[i].id,
				name: arrFromJSON[i].name,
				taskDescription: arrFromJSON[i].taskDescription,
				taskFinishDate: arrFromJSON[i].taskFinishDate,
				taskStartDate: arrFromJSON[i].taskStartDate,
				
			};
			$(task).each(function(){
				tasks.push(task);
			});


		if (arrFromJSON[i].Key == '1'){
			var li = document.createElement('li');
			li.className="task";
			arrFromJSON[i].Key = "1";

		var label = document.createElement('div');
		    label.className = "spanStyle";
		    label.innerHTML = arrFromJSON[i].name;
		    label.onclick = showDescription;

		var description = document.createElement('div');
			description.className="description";
			description.innerHTML = arrFromJSON[i].taskDescription;

			    // ------------календарь-------------//

	// Description//
		var clearfix1= document.createElement('div');
			clearfix1.className = "clearfix";

		var descriptionNote = document.createElement('li');
		    descriptionNote.className = "descriptionNote";

		var descriptionIcon = document.createElement('i');
			descriptionIcon.className= "fa fa-id-card-o fa-1x";

		var descriptionContainer = document.createElement('div');
			descriptionContainer.className = "descriptionContainer";
	    
	    var descriptionTitle = document.createElement('div');
		    descriptionTitle.className = "descriptionTitle";
		    descriptionTitle.innerHTML = "Description";

		var descriptionText = document.createElement('div');
		    descriptionText.className = "descriptionText";
		    descriptionText.innerHTML = valueDesc;
	// Description//

	// start calendar date//
		var clearfix2= document.createElement('div');
			clearfix2.className = "clearfix";

		var liStarCalendar = document.createElement('li');
		    liStarCalendar.className = "liStarCalendar";

		var startIcon = document.createElement('i');
			startIcon.className= "fa fa-calendar-plus-o fa-1x";

		var startCalendarContainer = document.createElement('div');
			startCalendarContainer.className = "startCalendarContainer";
	    
	    var startCalendarTitle = document.createElement('div');
		    startCalendarTitle.className = "startCalendarTitle";
		    startCalendarTitle.innerHTML = "Start date";

		var startCalendarText = document.createElement('div');
		    startCalendarText.className = "startCalendarText";
		    startCalendarText.innerHTML = valueDataStart;
	// start calendar date//

	// finish calendar date//
		var clearfix3= document.createElement('div');
			clearfix3.className = "clearfix";

	    var lifinishCalendar = document.createElement('li');
		    lifinishCalendar.className = "lifinishCalendar";

		var finishIcon = document.createElement('i');
			finishIcon.className= "fa fa-calendar-times-o fa-1x";

		var finishCalendarContainer = document.createElement('div');
			finishCalendarContainer.className = "finishCalendarContainer";
	    
	    var finishCalendarTitle = document.createElement('div');
		    finishCalendarTitle.className = "finishCalendarTitle";
		    finishCalendarTitle.innerHTML = "Finish date";

		var finishCalendarText = document.createElement('div');
		    finishCalendarText.className = "finishCalendarText";
		    finishCalendarText.innerHTML = valueDataFinish;
	// finish calendar date//
	// ------------календарь-------------//

		var startCalendar = document.createElement('i');
			startCalendar.className= "fa fa-calendar-plus-o fa-1x";

		var editIcon = document.createElement('i');
			editIcon.className="fa fa-pencil";

		var edit = document.createElement ('span');
			edit.className ="edit";
			edit.onclick = editList1;

		var starIcon = document.createElement('i');
			starIcon.className = "fa fa-star";

		var star = document.createElement ('span');
			star.onclick = starColor;
			star.className = "star";
		
		//---END! Создаем разметку элементов задачи

				//---START! Размещаем созданную задачу
		$('#list').prepend(li);
		li.appendChild(label);
		li.appendChild(edit);
		edit.appendChild(editIcon);
		li.appendChild(star);
		star.appendChild(starIcon);
		li.appendChild(description);

		// ----description----//
		description.appendChild(descriptionNote);
		descriptionNote.appendChild(descriptionIcon);
		descriptionNote.appendChild(descriptionContainer);
		descriptionContainer.appendChild(descriptionTitle);
		descriptionContainer.appendChild(descriptionText);
		descriptionNote.appendChild(clearfix1);
		// ----description----//

		//----start calendar //
		description.appendChild(liStarCalendar);
		liStarCalendar.appendChild(startIcon);
		liStarCalendar.appendChild(startCalendarContainer);
		startCalendarContainer.appendChild(startCalendarTitle);
		startCalendarContainer.appendChild(startCalendarText);
		liStarCalendar.appendChild(clearfix2);
		//----start calendar //

		//----finish calendar //
		description.appendChild(lifinishCalendar);
		lifinishCalendar.appendChild(finishIcon);
		lifinishCalendar.appendChild(finishCalendarContainer);
		finishCalendarContainer.appendChild(finishCalendarTitle);
		finishCalendarContainer.appendChild(finishCalendarText);
		lifinishCalendar.appendChild(clearfix3);
		//----finish calendar //
		}	
		else if (arrFromJSON[i].Key == '2'){
			var li = document.createElement('li');
			li.className="taskDone";

		var label = document.createElement('div');
		    label.className = "spanStyle";
		    label.innerHTML = arrFromJSON[i].name;
		    label.onclick = showDescription;

		var description = document.createElement('div');
			description.className="description";
			description.innerHTML = arrFromJSON[i].taskDescription; 
		    // ------------календарь-------------//

	// Description//
		var clearfix1= document.createElement('div');
			clearfix1.className = "clearfix";

		var descriptionNote = document.createElement('li');
		    descriptionNote.className = "descriptionNote";

		var descriptionIcon = document.createElement('i');
			descriptionIcon.className= "fa fa-id-card-o fa-1x";

		var descriptionContainer = document.createElement('div');
			descriptionContainer.className = "descriptionContainer";
	    
	    var descriptionTitle = document.createElement('div');
		    descriptionTitle.className = "descriptionTitle";
		    descriptionTitle.innerHTML = "Description";

		var descriptionText = document.createElement('div');
		    descriptionText.className = "descriptionText";
		    descriptionText.innerHTML = valueDesc;
	// Description//

	// start calendar date//
		var clearfix2= document.createElement('div');
			clearfix2.className = "clearfix";

		var liStarCalendar = document.createElement('li');
		    liStarCalendar.className = "liStarCalendar";

		var startIcon = document.createElement('i');
			startIcon.className= "fa fa-calendar-plus-o fa-1x";

		var startCalendarContainer = document.createElement('div');
			startCalendarContainer.className = "startCalendarContainer";
	    
	    var startCalendarTitle = document.createElement('div');
		    startCalendarTitle.className = "startCalendarTitle";
		    startCalendarTitle.innerHTML = "Start date";

		var startCalendarText = document.createElement('div');
		    startCalendarText.className = "startCalendarText";
		    startCalendarText.innerHTML = valueDataStart;
	// start calendar date//

	// finish calendar date//
		var clearfix3= document.createElement('div');
			clearfix3.className = "clearfix";

	    var lifinishCalendar = document.createElement('li');
		    lifinishCalendar.className = "lifinishCalendar";

		var finishIcon = document.createElement('i');
			finishIcon.className= "fa fa-calendar-times-o fa-1x";

		var finishCalendarContainer = document.createElement('div');
			finishCalendarContainer.className = "finishCalendarContainer";
	    
	    var finishCalendarTitle = document.createElement('div');
		    finishCalendarTitle.className = "finishCalendarTitle";
		    finishCalendarTitle.innerHTML = "Finish date";

		var finishCalendarText = document.createElement('div');
		    finishCalendarText.className = "finishCalendarText";
		    finishCalendarText.innerHTML = valueDataFinish;
	// finish calendar date//
	// ------------календарь-------------//
		var editIcon = document.createElement('i');
			editIcon.className="fa fa-pencil";

		var edit = document.createElement ('span');
			edit.className ="edit";
			edit.onclick = editList1;

		var starIcon = document.createElement('i');
			starIcon.className = "fa fa-star";

		var star = document.createElement ('span');
			star.onclick = starColor;
			star.className = "star";
		
		//---END! Создаем разметку элементов задачи

		//---START! Размещаем созданную задачу
					//---START! Размещаем созданную задачу
		$('#list').prepend(li);
		li.appendChild(label);
		li.appendChild(edit);
		edit.appendChild(editIcon);
		li.appendChild(star);
		star.appendChild(starIcon);
		li.appendChild(description);

		// ----description----//
		description.appendChild(descriptionNote);
		descriptionNote.appendChild(descriptionIcon);
		descriptionNote.appendChild(descriptionContainer);
		descriptionContainer.appendChild(descriptionTitle);
		descriptionContainer.appendChild(descriptionText);
		descriptionNote.appendChild(clearfix1);
		// ----description----//

		//----start calendar //
		description.appendChild(liStarCalendar);
		liStarCalendar.appendChild(startIcon);
		liStarCalendar.appendChild(startCalendarContainer);
		startCalendarContainer.appendChild(startCalendarTitle);
		startCalendarContainer.appendChild(startCalendarText);
		liStarCalendar.appendChild(clearfix2);
		//----start calendar //

		//----finish calendar //
		description.appendChild(lifinishCalendar);
		lifinishCalendar.appendChild(finishIcon);
		lifinishCalendar.appendChild(finishCalendarContainer);
		finishCalendarContainer.appendChild(finishCalendarTitle);
		finishCalendarContainer.appendChild(finishCalendarText);
		lifinishCalendar.appendChild(clearfix3);
		//----finish calendar //
		}	
		else {
			var li = document.createElement('li');
			li.className="taskArchive";

		var label = document.createElement('div');
		    label.className = "spanStyle";
		    label.innerHTML = arrFromJSON[i].name;
		    label.onclick = showDescription;

		var description = document.createElement('div');
			description.className="description";
			description.innerHTML = arrFromJSON[i].taskDescription; 
		    // ------------календарь-------------//

	// Description//
		var clearfix1= document.createElement('div');
			clearfix1.className = "clearfix";

		var descriptionNote = document.createElement('li');
		    descriptionNote.className = "descriptionNote";

		var descriptionIcon = document.createElement('i');
			descriptionIcon.className= "fa fa-id-card-o fa-1x";

		var descriptionContainer = document.createElement('div');
			descriptionContainer.className = "descriptionContainer";
	    
	    var descriptionTitle = document.createElement('div');
		    descriptionTitle.className = "descriptionTitle";
		    descriptionTitle.innerHTML = "Description";

		var descriptionText = document.createElement('div');
		    descriptionText.className = "descriptionText";
		    descriptionText.innerHTML = valueDesc;
	// Description//

	// start calendar date//
		var clearfix2= document.createElement('div');
			clearfix2.className = "clearfix";

		var liStarCalendar = document.createElement('li');
		    liStarCalendar.className = "liStarCalendar";

		var startIcon = document.createElement('i');
			startIcon.className= "fa fa-calendar-plus-o fa-1x";

		var startCalendarContainer = document.createElement('div');
			startCalendarContainer.className = "startCalendarContainer";
	    
	    var startCalendarTitle = document.createElement('div');
		    startCalendarTitle.className = "startCalendarTitle";
		    startCalendarTitle.innerHTML = "Start date";

		var startCalendarText = document.createElement('div');
		    startCalendarText.className = "startCalendarText";
		    startCalendarText.innerHTML = valueDataStart;
	// start calendar date//

	// finish calendar date//
		var clearfix3= document.createElement('div');
			clearfix3.className = "clearfix";

	    var lifinishCalendar = document.createElement('li');
		    lifinishCalendar.className = "lifinishCalendar";

		var finishIcon = document.createElement('i');
			finishIcon.className= "fa fa-calendar-times-o fa-1x";

		var finishCalendarContainer = document.createElement('div');
			finishCalendarContainer.className = "finishCalendarContainer";
	    
	    var finishCalendarTitle = document.createElement('div');
		    finishCalendarTitle.className = "finishCalendarTitle";
		    finishCalendarTitle.innerHTML = "Finish date";

		var finishCalendarText = document.createElement('div');
		    finishCalendarText.className = "finishCalendarText";
		    finishCalendarText.innerHTML = valueDataFinish;
	// finish calendar date//
	// ------------календарь-------------//
		var editIcon = document.createElement('i');
			editIcon.className="fa fa-pencil";

		var edit = document.createElement ('span');
			edit.className ="edit";
			edit.onclick = editList1;

		var starIcon = document.createElement('i');
			starIcon.className = "fa fa-star";

		var star = document.createElement ('span');
			star.onclick = starColor;
			star.className = "star";
		
		//---END! Создаем разметку элементов задачи

		//---START! Размещаем созданную задачу
				//---START! Размещаем созданную задачу
		$('#list').prepend(li);
		li.appendChild(label);
		li.appendChild(edit);
		edit.appendChild(editIcon);
		li.appendChild(star);
		star.appendChild(starIcon);
		li.appendChild(description);

		// ----description----//
		description.appendChild(descriptionNote);
		descriptionNote.appendChild(descriptionIcon);
		descriptionNote.appendChild(descriptionContainer);
		descriptionContainer.appendChild(descriptionTitle);
		descriptionContainer.appendChild(descriptionText);
		descriptionNote.appendChild(clearfix1);

		// ----description----//

		//----start calendar //
		description.appendChild(liStarCalendar);
		liStarCalendar.appendChild(startIcon);
		liStarCalendar.appendChild(startCalendarContainer);
		startCalendarContainer.appendChild(startCalendarTitle);
		startCalendarContainer.appendChild(startCalendarText);
		liStarCalendar.appendChild(clearfix2);
		//----start calendar //

		//----finish calendar //
		description.appendChild(lifinishCalendar);
		lifinishCalendar.appendChild(finishIcon);
		lifinishCalendar.appendChild(finishCalendarContainer);
		finishCalendarContainer.appendChild(finishCalendarTitle);
		finishCalendarContainer.appendChild(finishCalendarText);
		lifinishCalendar.appendChild(clearfix3);
		//----finish calendar //
		}
	}
}
}
jsonDownl.addEventListener("click", downl);
//================== LOCAL STORAGE =========================//

//=======================================================================
//-------------------------------------------------------------
var current_id;
var modal = $('.modal');

function editList1() {

	var parentLi = $(this).parent(),
		taskName = parentLi.find('.spanStyle').text(),
		taskDesc = parentLi.find('div.descriptionText').text(),
		taskStartCalendar = parentLi.find('div.startCalendarText').text(),
		taskFinishCalendar = parentLi.find('div.finishCalendarText').text();

	current_id = parentLi.attr('id');
	
	modal.find("#text").val( taskName );
	modal.find('#description').val( taskDesc );
	modal.find('#startDate').val( taskStartCalendar );
    modal.find('#finishDate').val( taskFinishCalendar ); 

	showModalEdit();
}

	$('#edit').on('click',function() {

		$('#'+current_id).find('.spanStyle').text( modal.find("#text").val() );
		$('#'+current_id).find('div.descriptionText').text( modal.find('#description').val() );
		$('#'+current_id).find('div.startCalendarText').text( modal.find('#startDate').val() );
		$('#'+current_id).find('div.finishCalendarText').text( modal.find('#finishDate').val() );
	});

	function showModalEdit() {
	$('.overlay').fadeIn(400, function(){
		$('.modal').css('display','block').animate({opacity:1},800);
		$('#enter').css('display', 'none');
		$('#edit').css('display','inline-block');
	})
	}
	$('form').on('submit', function(e){
		e.preventDefault();
		closeModal();
	})
	$('#close').on('click', function(e){
		e.preventDefault();
		closeModal();
	})

//=======================================================================
//--------------------- Hide lists-----------------//
$('.toDo i').on('click', function() {
	if ($(this).hasClass('fa fa-chevron-down fa-1x')){
		$(this).closest('div').next().slideUp(800);
		$(this).removeClass('fa fa-chevron-down fa-1x');
		$(this).addClass('fa fa-chevron-up fa-1x');
		$(this).parent().animate({
			borderRadius:'10px',
			margin: '2%'
		},150);
	}
	else {
		$(this).removeClass('fa fa-chevron-up fa-1x');
		$(this).addClass('fa fa-chevron-down fa-1x');	
		$(this).closest('div').next().slideDown(800);
		$(this).parent().animate({
			margin: '',
			borderRadius:'0',
			borderTopLeftRadius:'10px',
			borderTopRightRadius: '10px'
		},150);	
	}
	});
//--------------------- Hide lists-----------------//


//--------------------- Show Description-----------------//
function showDescription(){
	if ($(this).hasClass('descriptionShow')) {
		$(this).siblings('div').slideUp(400);
		$(this).removeClass('descriptionShow');
	}
	else {
		$(this).addClass('descriptionShow');
		$(this).siblings('div').slideDown(400);
	}
}
//--------------------- Show Description-----------------//
var slides =$(".slides");
function starColor() {
	var li=$(this).parent();
	li.toggleClass("important-task");

	if (li.hasClass("important-task")){
		li.css ({
			styleBorder: "0px solid rgba(249, 154, 73, 0.6)",
			color: "black",
			fontWeight: "bold",
			border: "1px solid black",
			display:"inline-block"
		})

		cloneLi = li.clone().appendTo(slides);
		console.log(cloneLi)

		var is = this.firstChild;
		is.className= "fa fa-star-o";
	}
	else {
		li.css ({
			styleBorder: "0px solid rgba(249, 154, 73, 0.6)",
			color: "",
			fontWeight: "",
			border: ""

		})

		current_id = li.attr('id');
		slides.find("#" + current_id).remove();

		var is = this.firstChild;
		is.className= "fa fa-star";

	}
}
//====================DRAG AND DROP =======================//
		$(function() {
			
			$('#list, #listDone, #listArchive').sortable ({
				cursor:'move',
				helper:'clone',
				opacity:0.75,
				delay: 150,
				connectWith: '.connectedSortable',
				stop: function(event, ui){
				var current_li = ui.item.context;
				var parentc = current_li.parentElement.id;

				if (parentc == 'listDone') {
				current_li.classList.add('done');
				$(".description").css({
					border: "2px solid #e4d0d0",
					borderTop : "none",
				});
				current_li.classList.remove('archive');
				task.Key = "2";
					}

				else if (parentc == 'list') {
				current_li.classList.remove('done');
				current_li.classList.remove('archive');
				task.Key = "1";
				$(".description").css({
					border: "",
					borderTop : "",
				});
					}

				else if (parentc == 'listArchive') {
				current_li.classList.add('archive');
				current_li.classList.remove('done');
				task.Key = "3";
				$(".description").css({
					border: "2px solid #3fc27c",
					borderTop : "none",
				});
					}

				$('#delete-div').hide();
				},
				start: function(){
					$('#delete-div').show();
				}
				

			})
		});
		$(function(){
			$('#startDate').datepicker({
				dateFormat: "DD, d MM, yy",
		        changeMonth: true,
		        changeYear: true,
				onClose: function( selectedDate ) {
			        $( "#finishDate" ).datepicker( "option", "minDate", selectedDate );
		        }

			});
  
			$('#finishDate').datepicker({
				dateFormat: "DD, d MM, yy",
				changeMonth: true,
		        changeYear: true,
				onClose: function( selectedDate ) {
			        $( "#finishDate" ).datepicker( "option", "minDate", selectedDate );
			    }
				
			});

		});
// ===================DRAG AND DROP =======================//

//============================ Модальное окно =======================//
	//----------------------- Вызов модального окна---------------------//
	$('.call').on('click', function (e){
		e.preventDefault();
		showModal();

	modal.find("#text").val("");
	modal.find('#description').val("");
	modal.find('#startDate').val("");
    modal.find('#finishDate').val(""); 

	})

	function showModal() {
		$('.overlay').fadeIn(400, function(){
			$('.modal').css('display','block').animate({opacity:1},800);
			$('#edit').css('display', 'none');
			$('#enter').css('display', 'inline-block');
		})
	}

	$('form').on('submit', function(e){
		e.preventDefault();
		closeModal();
	})
	$('#close').on('click', function(e){
		e.preventDefault();
		closeModal();
	})
	//------------------------ Закрытие модального окна -------------------------//
	function closeModal() {
		$('.modal').fadeOut(400,function(){
				$('.overlay').css('display','none').animate({opacity:1},500);
		})
	}
//============================ Модальное окно =======================//

// ------------- delete div -----------//
$('#delete-div').droppable({
drop:function(event,ui){
	 ui.draggable.remove();
	 $("#delete-div").hide();
        var current_id =ui.draggable.attr('id');

        for(key in task ){
        if( task[key] = current_id){
        	delete task[key];
        	console.log(task)
	    }}},
activate: function() {
    $('#delete-div').css({
        border: "medium double green",
        backgroundColor: "#e9fce9",
        }).animate({
			borderRadius:'10px',
			margin: '2%'
		},450)
	},
	over: function() {
          $('#delete-div').css({
            border: "medium double red",
             backgroundColor: "#e9fce9",
        });
    },
    out: function() {
            $('#delete-div').css("border", "medium double green");
        },
});
// ------------- delete div------------//
// ----------time---------------\
window.onload = function(){
	    (function(){
	    	Date.prototype.getMonthName = function() {
		    var month = ['Jan','Feb','Mar','Apr','May','Jun',
		    'Jul','Aug','Sep','Oct','Nov','Dec'];
		    return month[this.getMonth()];
}
	        var date = new Date();
	        curmonth=date.getMonthName();
	        var time = date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
	        var month= date.getDate()+ '-'+ curmonth + '-'+date.getFullYear();
	        document.querySelector('.time').innerHTML = month +"</br>" + time;
	        window.setTimeout(arguments.callee, 1000);
	    })();
	};
// -----------time---------------//

// -----------Slider--------------//
	function sliding() {
	var count = $('.slides > li').length;
	var size = $('.slides > li').outerWidth();

	fullWidth1=size * (count-1);

	check=fullWidth;
    fullWidth1 = -fullWidth1;
		if (check != fullWidth1) {
			$('.slides').css("margin-right", "0%");
			$('.slides').animate({ "margin-right":""+check+"px" }, 12000, 'linear');
		} else {
			check=fullWidth;
			$('.slides').css({transform : 'translateX('+check+'px)'});

		}
}
// -----------Slider--------------//
});