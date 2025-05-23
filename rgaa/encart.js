const encartHtml = "<h2>infos de l'élément inspecté</h2><span class='cross'></span><span class='arrow'></span><span class='arrow vertical'></span><p></p>";

Element.prototype.findInfos = function(){
	if (this.infos.isEmpty()) return this.parentElement.findInfos();
	else return this;
}
HTMLBodyElement.prototype.findInfos = function(){
	if (this.infos.isEmpty()) return null;
	else return this;
}
function overModal (event){
	const item = event.target.findInfos();
	if (item !== null){
		encartRgaa.children[0].innerHTML = item.label;
		encartRgaa.children[4].innerHTML = item.infos;
		encartRgaa.style.display = 'grid';
	}
	event.stopPropagation();
}
Element.prototype.addModal = function(){ this.addEventListener ('mouseover', overModal); }
HTMLElement.prototype.findFrame = function(){
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
	}else{
		frame.style.top = '0%';
		frame.style.bottom = 'unset';
}}
function moveLeftModal (event){
	const frame = event.target.findFrame();
	if (frame.style.left ==='60%') frame.style.left = '0%';
	else frame.style.left = '60%';
}
Element.prototype.addAll = function(){
	this.addInfos();
	this.addLabel();
	this.addModal();
}
HTMLScriptElement.prototype.addAll = function(){ return; }
const encartRgaa = document.createElement ('section');
encartRgaa.id = 'encart-rgaa';
encartRgaa.innerHTML = encartHtml;
encartRgaa.children[1].addEventListener ('click', closeModal);
encartRgaa.children[2].addEventListener ('click', moveLeftModal);
encartRgaa.children[3].addEventListener ('click', moveTopModal);
document.body.appendChild (encartRgaa);
