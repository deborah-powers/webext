var header = "<title></title><meta name='viewport' content='width=device-width,initial-scale=1'/><meta charset='utf-8'/>";
var fanfic ={
	title: "",
	text: "",
	author: "",
	authlink: "",
	subject: "",
	link: window.location.href
};
if (! window.location.href.includes ('//googleads.')){
document.body.cleanBody();
HTMLElement.prototype.removeAnnotations = function(){
	if (this.children.length >0){ for (var c=0; c< this.children.length; c++) if (this.children[c].tagName !== 'svg') this.children[c].removeAnnotations(); }
	else if (this.innerText){
		var text = this.innerHTML.slice (0, 15).toLowerCase();
		text = text.replaceAll (" ","");
		if (text.includes ('disclaimer')) this.parentElement.removeChild (this);
		else if (text.slice (0,3).includes ('a/n')) this.parentElement.removeChild (this);
}}
if (window.location.href.includes ('https://menace-theoriste.fr/')){
	document.body.findTagReplace ('wrap_all');
	document.body.findTagReplace ('main');
//	document.body.innerHTML = document.getElementByid ('main').innerHTML;
}
else if (window.location.href.includes ('https://www.fanfiction.net/s/')){
	document.body.findTagReplace ('content_parent');
	// les métadonnées
	const head = document.body.findTag ('profile_top');
	fanfic.title = head.findTag ('b').innerText;
	fanfic.author = head.findTag ('a').innerText;
	fanfic.authlink = head.findTag ('a').href;
	fanfic.subject = 'fanfic';
	// le texte, y compris les autres chapitres
	const chapters = document.body.findTag ('chap_select');
	document.body.findTagReplace ('storytextp');
	if (chapters) document.body.appendChild (chapters);
}
document.body.removeAnnotations();
document.body.innerHTML = document.body.innerHTML.usePlaceholders();
header = header.replace ('<title></title>', '<title>' + fanfic.title + '</title>');
document.head.innerHTML = header;
document.body.delIds();
// sendToBackend (fanfic);
}