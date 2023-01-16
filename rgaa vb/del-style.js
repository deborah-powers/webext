const styleAttributes =[ 'style', 'align', 'background', 'bgcolor', 'border', 'cellpadding', 'cellspacing', 'color', 'marginheight', 'marginwidth' ];
const styleImg = "<style type='text/css'>img, svg, canvas, area, input[type='image'] { max-width: 50vw; }</style>";

// éffacer le style natif
Element.prototype.delStyle = function(){
	this.style = 'none';
	for (var a=0; a< styleAttributes.length; a++) this.removeAttribute (styleAttributes[a]);
}
HTMLElement.prototype.delStyle = function(){
	Element.prototype.delStyle.call (this);
	for (var c=0; c< this.children.length; c++) this.children[c].delStyle();
}
var styles = document.getElementsByTagName ('style');
for (var s= styles.length -1; s>=0; s--) styles[s].parentElement.removeChild (styles[s]);
styles = document.getElementsByTagName ('link');
for (var s= styles.length -1; s>=0; s--){ if (styles[s].rel === 'stylesheet') styles[s].parentElement.removeChild (styles[s]); }
document.body.delStyle();
document.head.innerHTML = document.head.innerHTML + styleImg;
