var show = document.querySelector('.contact-button')
var modal = document.getElementById('contactForm')
var overlay = document.querySelector('.overlay')

function showModal()
{
	modal.style.opacity = "1";
	overlay.style.display = "block";
}
function hideModal()
{
	modal.style.opacity = "0";
	setTimeout(function() { 
		overlay.style.display = "none";
	},1000)

	
} 
show.onclick = showModal
overlay.onclick = hideModal