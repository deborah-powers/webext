const encartHtml = "<h2>infos de l'élément inspecté</h2><span class='cross'></span><span class='arrow'></span><span class='arrow vertical'></span><p></p>";

Element.prototype.addModal = function(){
	this.addEventListener ('mouseover', function (event){
	//	const labelModal = event.target.addLabelModal();
		encartRgaa.children[0].innerHTML = event.target.label;
		encartRgaa.children[4].innerHTML = event.target.infos;
		encartRgaa.style.display = 'grid';
});}
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
HTMLElement.prototype.transmitInfos = function(){
	this.label = this.addLabelModal() +' ; '+ this.parentElement.label;
	this.infos = this.parentElement.infos;
	for (var c=0; c< this.children.length; c++) this.children[c].transmitInfos();
}
HTMLElement.prototype.addAll = function(){
	Element.prototype.addAll.call (this);
	for (var c=0; c< this.children.length; c++) this.children[c].transmitInfos();
}
const encartRgaa = document.createElement ('section');
encartRgaa.id = 'encart-rgaa';
encartRgaa.innerHTML = encartHtml;
encartRgaa.children[1].addEventListener ('click', closeModal);
encartRgaa.children[2].addEventListener ('click', moveLeftModal);
encartRgaa.children[3].addEventListener ('click', moveTopModal);
document.body.appendChild (encartRgaa);
