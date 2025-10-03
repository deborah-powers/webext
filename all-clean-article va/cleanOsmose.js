// éffacer les images
HTMLPictureElement.prototype.delUnecessary = function(){
	if (this.innerHTML.includes ('https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/2666.png')){
		const span = document.createElement ('span');
		span.innerHTML ='-';
		this.parentElement.insertBefore (span, this);
	}
	this.parentElement.removeChild (this);
}
var pictureList = document.getElementsByTagName ('picture');
for (var p= pictureList.length -1; p>=0; p--) pictureList[p].delUnecessary();

HTMLImageElement.prototype.delUnecessary = function(){ this.parentElement.removeChild (this); }
pictureList = document.getElementsByTagName ('img');
for (var p= pictureList.length -1; p>=0; p--) pictureList[p].delUnecessary();

HTMLAnchorElement.prototype.showUrl = function(){
	if (this.innerText ==="") this.parentElement.removeChild (this);
	else if (this.href.includes ('/')) this.innerHTML = this.innerHTML +" ("+ this.href +')';
	else{
		const span = document.createElement ('p');
		span.innerHTML = this.innerHTML;
		this.parentElement.insertBefore (span, this);
		this.parentElement.removeChild (this);
	}
}
pictureList = document.getElementsByTagName ('a');
for (var p= pictureList.length -1; p>=0; p--) pictureList[p].showUrl();

// récupérer les fonctions de mes librairies
crutialData = `
cleanStart: function(){
	document.body.innerHTML = document.body.innerHTML.cleanHtml();
	document.body.replaceTag ('main');
	const h1 = document.body.findTag ('h1');
	document.body.replaceTag ('wysiwyg');
	return h1.outerHTML;
},
cleanEnd: function(){
	document.body.cleanBody();
	document.body.delAttributes();
	document.body.delIds();
	document.getElementsByTagName ('html')[0].delAttributes();
	document.getElementsByTagName ('html')[0].delIds();
},
cleanText: function (text){ return text.cleanTxt(); },
findTitle: findTitle
`;
const libHtml = callLibrary ([ 'textFct', 'htmlFct', 'pageFct' ]);
const title = libHtml.findTitle();

// nettoyer le texte
const h1Html = libHtml.cleanStart();
if (document.body.innerHTML.includes ('<strong>A compléter plus tard</strong> [BEGIN]')){
	var textList = document.body.innerHTML.split ('<strong>A compléter plus tard</strong> [BEGIN]');
	for (var t=0; t< textList.length -1; t++){
		var d= textList[t].lastIndexOf ('<p>');
		textList[t] = textList[t].substring (0,d);
		d= textList[t+1].indexOf ('<strong>A compléter plus tard</strong> [END]');
		d=4+ textList[t+1].indexOf ('</p>', d);
		textList[t+1] = textList[t+1].substring (d);
	}
	document.body.innerHTML = textList.join ("<p>TODO: A compléter</p>");
}
document.body.innerHTML = h1Html + document.body.innerHTML;
libHtml.cleanEnd();

HTMLElement.prototype.replace = function (oldWord, newWord){
	if (newWord === undefined) newWord ="";
	this.innerHTML = this.innerHTML.replaceAll (oldWord, newWord);
}
document.body.replace ('<span>', " ");
document.body.replace ('</span>', " ");
document.body.replace ('<strong>', " ");
document.body.replace ('</strong>', " ");
if (document.body.innerHTML.includes ('<h3>') && ! document.body.innerHTML.includes ('<h2>')){
	document.body.replace ('<h3>', '<h2>');
	document.body.replace ('</h3>', '</h2>');
	document.body.replace ('<h4>', '<h3>');
	document.body.replace ('</h4>', '</h3>');
	document.body.replace ('<h5>', '<h4>');
	document.body.replace ('</h5>', '</h4>');
	document.body.replace ('<h6>', '<h5>');
	document.body.replace ('</h6>', '</h5>');
}
document.body.replace ('</a>', '</a></p>');
document.body.replace ('<a ', '<p><a ');
document.body.replace ('&nbsp;-&nbsp;', "");
document.body.innerHTML = libHtml.cleanText (document.body.innerHTML);
document.body.replace ('<p></p>', "");

document.head.innerHTML = '<title>' + title + `</title>
	<meta name='viewport' content='width=device-width,initial-scale=1'/>
	<meta charset='utf-8'/>
`;
document.body.innerHTML = '<xmp>' + document.head.innerHTML + libHtml.cleanText (document.body.outerHTML) + '</xmp>';
// document.body.innerHTML = '<xmp>' + libHtml.cleanText (document.body.innerText) + '</xmp>';

/* échanger avec le serveur
const toServerData ={
	'title': title,
	'author': 'synergie',
	'subject': 'wiki osmose',
	'link': window.location.href,
	'text': 'coucou'
};
const toServer = JSON.stringify (toServerData);
const url = 'http://localhost:1407/';
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function(){ if (this.readyState ===4) console.log (this.readyState, this.status, this.responseText); };
xhttp.open ('POST', url, false);
xhttp.send (toServer);
console.log (xhttp.readyState, xhttp.status, xhttp.responseText);
*/