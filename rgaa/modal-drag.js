var currentX =0;
var boundaries =[];

function dragDrop (event){
	console.log ('dragDrop', event.target.tagName);
	event.target.removeAttribute ('onmousemove');
	event.target.removeAttribute ('onmouseup');
	event.target.removeAttribute ('onmouseout');
}
function dragMove (event){
	console.log ('dragMove', event.target.tagName);
	var dx= event.screenX - currentX;
	if (event.target.tagName === 'SECTION') event.target.move (dx);
	else event.target.parentElement.move (dx);
	currentX = event.screenX;
}
function dragSelect (event){
	currentX = event.screenX;
	event.target.addEventListener ('mousemove', dragMove);
	event.target.addEventListener ('mouseup', dragDrop);
	event.target.addEventListener ('mouseout', dragDrop);
}
function closeModal (event){ event.target.parentElement.style.display = 'none'; }
HTMLElement.prototype.move = function (dx){
	dx = this.offsetLeft + dx;
	const pos = this.senseBoundaries (dx);
	this.style.left = pos + 'px';
}
String.prototype.fromPxToNb = function(){
	// nbStr = 12px
	const nbStr = this.slice (0, -2);
	var nbInt = parseInt (nbStr);
	return nbInt;
}
HTMLElement.prototype.setBoundaries = function(){
	const style = window.getComputedStyle (this);
	var x1=0;
	if (this.clientLeft > x1) x1= this.clientLeft;
	var tmp = style.left.fromPxToNb();
	if (tmp >x1) x1= tmp;
	tmp = style.marginLeft.fromPxToNb();
	if (tmp >x1) x1= tmp;
	const x2= x1+ this.clientWidth - style.paddingRight.fromPxToNb();
	x1= x1+ style.paddingLeft.fromPxToNb();
	boundaries = [ x1, x2 ];
}
HTMLElement.prototype.senseBoundaries = function (posX){
	if (boundaries.length ===2){
		if (posX < boundaries[0]) posX = boundaries[0];
		else if (posX + this.clientWidth > boundaries[1]) posX = boundaries[1] - this.clientWidth;
	}
	return posX;
}
var modale = document.createElement ('section');
modale.innerHTML = "<h2>infos de l'élément inspecté</h2><span>X</span><p></p>";
modale.addEventListener ('mousedown', dragSelect);
modale.id = 'modale';
modale.children[1].addEventListener ('click', closeModal);
document.body.setBoundaries();
document.body.appendChild (modale);
innerHTML = modale + document.body.innerHTML;
