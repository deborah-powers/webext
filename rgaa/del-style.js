// éffacer le style natif
HTMLElement.prototype.delStyle = function(){
	this.style = 'none';
	for (var c=0; c< this.children.length; c++) this.children[c].delStyle();
}
var styles = document.getElementsByTagName ('style');
for (var s= styles.length -1; s>=0; s--) styles[s].parentElement.removeChild (styles[s]);
styles = document.getElementsByTagName ('link');
for (var s= styles.length -1; s>=0; s--){ if (styles[s].type === 'text/css') styles[s].parentElement.removeChild (styles[s]); }
document.body.delStyle();
