var currentX =0;
var currentY =0;
var boundaries =[];

console.log ('coucou');
function dragDrop (paragraph){
	paragraph.removeAttribute ('onmousemove');
	paragraph.removeAttribute ('onmouseup');
	paragraph.removeAttribute ('onmouseout');
}
function dragMove (paragraph){
	var dx= event.screenX - currentX;
	var dy= event.screenY - currentY;
	paragraph.move (dx, dy);
	currentX = event.screenX;
	currentY = event.screenY;
}
function dragSelect (event){
	console.log ('dragSelect', event);
	currentX = event.screenX;
	currentY = event.screenY;
	if (event.target.tagName === 'SECTION'){
		event.target.setAttribute ('onmousemove', 'dragMove(this)');
		event.target.setAttribute ('onmouseup', 'dragDrop(this)');
		event.target.setAttribute ('onmouseout', 'dragDrop(this)');
	}
	else {
		event.target.setAttribute ('onmousemove', 'dragMove(this.parentElement)');
		event.target.setAttribute ('onmouseup', 'dragDrop(this.parentElement)');
		event.target.setAttribute ('onmouseout', 'dragDrop(this.parentElement)');
	}
}
HTMLElement.prototype.move = function (dx, dy){
	dx = this.offsetLeft + dx;
	dy = this.offsetTop + dy;
	const pos = this.senseBoundaries (dx, dy);
	this.style.left = pos[0] + 'px';
	this.style.top = pos[1] + 'px';
	this.style.animationName = 'moving-heart';
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
	var y1=0;
	if (this.clientTop > y1) y1= this.clientTop;
	var tmp = style.top.fromPxToNb();
	if (tmp >y1) y1= tmp;
	tmp = style.marginTop.fromPxToNb();
	if (tmp >y1) y1= tmp;
	const y2= y1+ this.clientHeight - style.paddingBottom.fromPxToNb();
	y1= y1+ style.paddingTop.fromPxToNb();
	boundaries = [ x1, y1, x2, y2 ];
}
HTMLElement.prototype.senseBoundaries = function (posX, posY){
	if (boundaries.length ===4){
		if (posX < boundaries[0]) posX = boundaries[0];
		else if (posX + this.clientWidth > boundaries[2]) posX = boundaries[2] - this.clientWidth;
		if (posY < boundaries[1]) posY = boundaries[1];
		else if (posY + this.clientHeight > boundaries[3]) posY = boundaries[3] - this.clientHeight;
	}
	return [ posX, posY ];
}
