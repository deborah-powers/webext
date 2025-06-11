Element.prototype.findFrame = function(){
	if (this.tagName === 'SECTION') return this;
	else return this.parentElement.findFrame();
}
const voletRgaa = document.createElement ('section');
voletRgaa.id = 'volet-rgaa';
document.body.appendChild (voletRgaa);

voletRgaa.addEventListener ('dblclick', function (event){
	const frame = event.target.findFrame();
	if (frame.style.right ==='0%'){
		frame.style.right = 'unset';
		frame.style.left = '0%';
	}else{
		frame.style.left = 'unset';
		frame.style.right = '0%';
}});
/* obsolète, les flèches de déplacement du volet /
function moveTop (event){
	console.log ('moveTop', event.target.parentElement);
	if (event.target.parentElement.style.top ==='0%'){
		event.target.parentElement.style.top = 'unset';
		event.target.parentElement.style.bottom = '0%';
	}
	else{
		event.target.parentElement.style.top = '0%';
		event.target.parentElement.style.bottom = 'unset';
	}
}
function moveRight (event){
	if (event.target.parentElement.style.right ==='0%'){
		event.target.parentElement.style.right = 'unset';
		event.target.parentElement.style.left = '0%';
	}
	else{
		event.target.parentElement.style.left = 'unset';
		event.target.parentElement.style.right = '0%';
	}
}
const arrowRight = document.createElement ('hr');
arrowRight.className = 'arrow';
arrowRight.addEventListener ('click', moveRight);
const arrowTop = document.createElement ('hr');
arrowTop.className = 'arrow vertical';
arrowTop.addEventListener ('click', moveTop);
const contentRgaa = document.createElement ('section');
contentRgaa.appendChild (arrowTop);
contentRgaa.appendChild (arrowRight);
contentRgaa.appendChild (voletRgaa);
*/