const numeros = '0123456789.';

String.prototype.extractFontSize = function(){
	// this = "12px" --> 12 + "px"
	var posUnit =0;
	while (numeros.includes (this[posUnit]) && posUnit < this.length) posUnit +=1;
	return [parseFloat (this.substring (0, posUnit)), this.substring (posUnit)];
}
Element.prototype.adjustFont = function(){ return; }
HTMLElement.prototype.adjustFont = function(){
	const fontSizeStr = window.getComputedStyle (this).fontSize;
	const fontData = fontSizeStr.extractFontSize();
	const fontSize = fontData[0];
	const fontUnit = fontData[1];
	this.style.lineHeight = (fontSize* 1.5).toString() + fontUnit;
	this.style.marginBottom = (fontSize * 2).toString() + fontUnit;
	this.style.wordSpacing = (fontSize * 0.16).toString() + fontUnit;
	this.style.letterSpacing = (fontSize * 0.12).toString() + fontUnit;
	for (var c=0; c< this.children.length; c++) this.children[c].adjustFont();
}
document.body.style.width = '1280px';
document.body.style.margin = 'auto';
document.body.adjustFont();
