HTMLImageElement.prototype.isEmpty = function(){ if (this.src ==="") this.style.border = 'solid 4px deeppink'; }
HTMLAreaElement.prototype.isEmpty = function(){ if (this.innerHTML ==="") this.style.border = 'solid 4px deeppink'; }
SVGSVGElement.prototype.isEmpty = function(){ if (this.innerHTML ==="") this.style.border = 'solid 4px deeppink'; }
HTMLCanvasElement.prototype.isEmpty = function(){ if (this.innerHTML ==="") this.style.border = 'solid 4px deeppink'; }
HTMLObjectElement.prototype.isEmpty = function(){ if (this.innerHTML ==="" && this.src ==="") this.style.border = 'solid 4px deeppink'; }
HTMLInputElement.prototype.isEmpty = function(){ if (this.type === 'image' && this.src ==="") this.style.border = 'solid 4px deeppink'; }
HTMLElement.prototype.isEmpty = function(){
	if (! 'BR HR'.includes (this.tagName)){
		if (this.innerHTML ===""){
			this.innerHTML = this.tagName + ' vide';
			this.style.border = 'solid 4px deeppink';
		}
		else if (this.innerText ==="" && ! this.innerHTML.includes ('<img')){
			this.innerHTML = this.tagName + ' invisible '+ this.innerHTML;
			this.style.border = 'solid 4px deeppink';
		}
		else if ([ 'DIV', 'SECTION', 'ARTICLE', 'NAV' ].includes (this.tagName) && this.children.length ===0){
			this.innerHTML = this.tagName + ' paragraphe: '+ this.innerHTML;
			this.style.border = 'solid 4px deeppink';
		}
		for (var c=0; c< this.children.length; c++) this.children[c].isEmpty();
}}
HTMLElement.prototype.isTitle = function(){
	var text ="";
	if (this.tagName[0] === 'H' && '123456'.includes (this.tagName[1])){
		text = '<p>' + this.tagName +": "+ this.innerText +'</p>';
		this.innerHTML = this.tagName + ': '+ this.innerHTML;
		this.style.border = 'solid 4px deeppink';
		if (this.getAttribute ('role') === 'presentation'){
			this.style.border = 'dotted 4px deeppink';
			text = text.replace ('<p>', "<p style='color:#4208'>");
		}
	}
	for (var c=0; c< this.children.length; c++) text = text + this.children[c].isTitle();
	return text;
}
HTMLUListElement.prototype.addBorder = function(){
	this.style.border = 'solid 4px #420';
	for (var c=0; c< this.children.length; c++){
		if (![ 'LI', 'OL', 'UL' ].includes (this.children[c].tagName)) this.children[c].style.border = 'solid 2px lime';
}}
HTMLOListElement.prototype.addBorder = function(){
	this.style.border = 'solid 4px #420';
	for (var c=0; c< this.children.length; c++){
		if (![ 'LI', 'OL', 'UL' ].includes (this.children[c].tagName)) this.children[c].style.border = 'solid 2px lime';
}}
HTMLAnchorElement.prototype.inListe = function(){
	var nba =0;
	if (this.tagName === 'A') nba =1;
	if (this.nextElementSibling !== null && this.nextElementSibling.tagName === 'A') nba += this.nextElementSibling.inListe();
	if (this.previousElementSibling !== null && this.previousElementSibling.tagName === 'A') nba += this.previousElementSibling.inListe();
	return nba;
}
HTMLAnchorElement.prototype.inListe = function(){
	const nba = this.inListe();
}
HTMLAnchorElement.prototype.inListe_va = function(){
	if (this.nextElementSibling !== null && this.nextElementSibling.tagName === 'A'){
		if (this.previousElementSibling === null) this.style.border = 'dotted 4px lime';
		else if (this.previousElementSibling.tagName === 'A') this.style.border = 'solid 4px lime';
		else if (this.previousElementSibling.tagName === 'OL' || this.previousElementSibling.tagName === 'UL') this.style.border = 'dashed 4px lime';
		else this.style.border = 'dotted 4px lime';
	}
	else if (this.previousElementSibling !== null && this.previousElementSibling.tagName === 'A'){
		if (this.nextElementSibling === null) this.style.border = 'dotted 4px lime';
		else if (this.nextElementSibling.tagName === 'OL' || this.nextElementSibling.tagName === 'UL') this.style.border = 'dashed 4px lime';
		else this.style.border = 'dotted 4px lime';
	}
}
var titleText = document.body.isTitle();
voletRgaa.innerHTML = titleText;
document.body.isEmpty();
var listes = document.getElementsByTagName ('ul');
for (var i=0; i< listes.length; i++) listes[i].addBorder();
var listes = document.getElementsByTagName ('ol');
for (var i=0; i< listes.length; i++) listes[i].addBorder();
// liste de a dans une liste
listes = document.getElementsByTagName ('a');
for (var i=0; i< listes.length; i++) listes[i].inListe();

