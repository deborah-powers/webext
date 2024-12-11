const encartHtml = "<h2>infos de l'élément inspecté</h2><span class='cross'></span><span class='arrow'></span><span class='arrow vertical'></span><p></p>";

Element.prototype.addModal = function(){
	this.addEventListener ('mouseover', function (event){
		encartRgaa.children[0].innerHTML = event.target.tagName;
		if (event.target.id !== undefined && event.target.id !=="") encartRgaa.children[0].innerHTML = encartRgaa.children[0].innerHTML +' #'+ event.target.id;
		else if (event.target.className !== undefined && event.target.className !=="" && event.target.className !== 'rgaa-highlight'){
			var className = event.target.className.replaceAll (" ",".");
			className = className.replace ('.rgaa-highlight', "");
			encartRgaa.children[0].innerHTML = encartRgaa.children[0].innerHTML +' .'+ className;
		}
		encartRgaa.children[0].innerHTML = encartRgaa.children[0].innerHTML +" "+ event.target.label;
		encartRgaa.children[4].innerHTML = event.target.infos;
		encartRgaa.style.display = 'grid';
});}
Element.prototype.findFrame = function(){
	if (this.tagName === 'SECTION') return this;
	else return this.parentElement.findFrame();
}
function closeModal (event){
	const frame = event.target.findFrame();
	frame.style.display = 'none';
}
function moveTopModal (event){
	const frame = event.target.findFrame();
	if (frame.style.top ==='0%'){
		frame.style.top = 'unset';
		frame.style.bottom = '0%';
	}
	else{
		frame.style.top = '0%';
		frame.style.bottom = 'unset';
	}
}
function moveLeftModal (event){
	const frame = event.target.findFrame();
	if (frame.style.left ==='60%') frame.style.left = '0%';
	else frame.style.left = '60%';
}
const encartRgaa = document.createElement ('section');
encartRgaa.id = 'encart-rgaa';
encartRgaa.innerHTML = encartHtml;
encartRgaa.children[1].addEventListener ('click', closeModal);
encartRgaa.children[2].addEventListener ('click', moveLeftModal);
encartRgaa.children[3].addEventListener ('click', moveTopModal);
document.body.appendChild (encartRgaa);
