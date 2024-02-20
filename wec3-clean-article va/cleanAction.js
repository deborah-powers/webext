var header =`<title></title>
	<meta name='viewport' content='width=device-width,initial-scale=1'/>
	<meta charset='utf-8'/>
`;
// récupérer le titre et nettoyer les headers
const titleTag = document.head.getElementsByTagName ('title')[0];
if (exists (titleTag)){
	var title = titleTag.innerHTML;
	title = title.toLowerCase().clean();
	header = header.replace ('<title></title>', '<title>' + title + '</title>');
}
document.head.innerHTML = header;
document.body.cleanBody();

var fanfic ={
	title: "",
	text: "",
	author: "",
	authlink: "",
	subject: "",
	link: window.location.href
};
HTMLElement.prototype.removeAnnotations = function(){
	if (this.children.length >0){ for (var c=0; c< this.children.length; c++) if (this.children[c].tagName !== 'svg') this.children[c].removeAnnotations(); }
	else if (this.innerText){
		var text = this.innerHTML.slice (0, 15).toLowerCase();
		text = text.replaceAll (" ","");
		if (text.includes ('disclaimer')) this.parentElement.removeChild (this);
		else if (text.slice (0,3).includes ('a/n')) this.parentElement.removeChild (this);
}}
String.prototype.usePlaceholders = function(){
	const placeholders = ('y/n', 'e/c', 'h/c', 'l/n');
	var text = this;
	for (var p=0; p< placeholders.length; p++){
		text = text.replaceAll (placeholders[p].toUpperCase(), placeholders[p]);
		text = text.replaceAll ('('+ placeholders[p] +')', placeholders[p]);
		text = text.replaceAll ('['+ placeholders[p] +']', placeholders[p]);
		text = text.replaceAll ('{'+ placeholders[p] +'}', placeholders[p]);
	}
	text = text.replaceAll ('y/n', 'Deborah');
	text = text.replaceAll ('e/c', 'grey');
	text = text.replaceAll ('h/c', 'dark blond');
	text = text.replaceAll ('l/n', 'Powers');
	return text;
}
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
document.head.getElementsByTagName ('title')[0].innerHTML = fanfic.title;
document.body.delIds();
// sendToBackend (fanfic);