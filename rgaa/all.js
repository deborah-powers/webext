HTMLElement.prototype.removeSelf = function(){ this.parentElement.removeChild (this); }

var styles = document.getElementsByTagName ('script');
for (var s= styles.length -1; s>=0; s--) styles[s].parentElement.removeChild (styles[s]);

// repérer les paragraphes vides
var nodes = document.getElementsByTagName ('p');
for (var i=0; i< nodes.length; i++) if (nodes[i].innerText ==="") console.log ('paragraphe vide dans', nodes[i].parentElement);
nodes = document.getElementsByTagName ('br');
for (var i=0; i< nodes.length; i++)
	if (nodes[i].nextSibling !== null && nodes[i].nextSibling.constructor.name != 'Text' && nodes[i].nextSibling.tagName === 'BR')
		console.log ('deux br à la suite dans', nodes[i].parentElement);

/*/ repérer les images
var nodes = document.getElementsByTagName ('img');
for (var i=0; i< nodes.length; i++){
	nodes[i].style.borderColor = 'red';
	nodes[i].style.borderWidth = '16px';
	nodes[i].style.borderStyle = 'double';
}
// repérer les frames
nodes = document.getElementsByTagName ('iframe');
for (var i=0; i< nodes.length; i++){
	nodes[i].style.borderColor = 'blue';
	nodes[i].style.borderWidth = '16px';
	nodes[i].style.borderStyle = 'double';
}
var debugstyle = `
img {
	border-style: double;
	border-color: red;
	border-width: 10px;
}
iframe {
	border-style: double;
	border-color: blue;
	border-width: 10px;
}
`;
var style = document.createElement ('style');
style.innerHTML = debugstyle;
document.head.appendChild (style);
*/