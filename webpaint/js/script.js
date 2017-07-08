$(function(){
  $("#Container").mixItUp({
		
		selectors: {
			target:'.mix',
			filter:'.filter',
			sort:'.sort'
		},
		load: {
			filter:'all',
			sort:'myorder:asc'
		},
		
		controls: {
			enable:true,
			//activeClass:'on'
		},
		
		animation: {
			enable:true,
			effects:'scale fade',
			duration:1000
		},
		
		/*layout: {
			//display:'block'
			containerClass:'list'
		}*/
		
		callbacks: {
			/*onMixLoad:function(state) {
				alert('Load');
			},
			onMixStart:function(state) {
				alert(state.$targets.text());
			},
			onMixEnd:function() {
				alert('End');
			}*/
		}
		
  	
  });
});