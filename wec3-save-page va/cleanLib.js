function exists (object){
	if (object == null || object == undefined) return false;
	else if ((object.constructor == Array || object.constructor == HTMLCollection) && object.length ==0) return false;
	else if (typeof (object) == 'string'){
		if (object =="" || object ==" " || object =="\n" || object =="\t" || object =="\r") return false;
		else return true;
	}
	else return true;
}
String.prototype.index = function (word, pos){
	if (pos == null || pos == undefined) pos =0;
	var posReal = this.indexOf (word, pos);
	if (posReal <0 && word.includes ('"')){
		word = word.replaceAll ('"', "'");
		posReal = this.indexOf (word, pos);
	}
	else if (posReal <0 && word.includes ("'")){
		word = word.replaceAll ("'", '"');
		posReal = this.indexOf (word, pos);
	}
	return posReal;
}
String.prototype.count = function (word){
	if (! this.includes (word)) return 0;
	var pos =0, nb=0;
	while (pos >=0){
		pos = this.index (word, pos);
		if (pos <0) break;
		pos +=1; nb +=1;
	}
	return nb;
}
String.prototype.strip = function(){
	var toStrip = '\n \t/';
	var text = this;
	var i=0, j=1;
	while (toStrip.index (text[0]) >=0) text = text.slice (1);
	while (toStrip.index (text [text.length -1]) >=0) text = text.slice (0, text.length -1);
	return text;
}
function sendToBackend(){
	const data = {
		title: 'nouvel article',
		link: window.location.href,
		body: document.body.innerHTML,
		author: "",
		subject: "",
		autlink: window.location.href
	};
	const title = document.head.getElementsByTagName ('title')[0].innerHTML.clean();
	if (exists (title)) data.title = title;
	const metas = document.head.getElementsByTagName ('meta');
	for (var m=0; m< metas.length; m++){
		if (metas[m].name === 'author') data.author = metas[m].content;
		else if (metas[m].name === 'subject') data.subject = metas[m].content;
		else if (metas[m].name === 'autlink') data.autlink = metas[m].content;
	}
	// ecrire le body propre dans un fichier grâce à un backend python
	const urlBE = 'http://localhost:1407/';
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		if (this.readyState ===4 && this.status === 200) console.log ("les données ont bien été envoyées au back-end.\nsa réponse:", this.responseText);
//		else console.log ("l'échange avec le back-end est en erreur.\nécoute-il sur le port 1407 ?\nétat =", this.readyState, 'status =', this.status);
	};
	xhttp.open ('POST', urlBE, true);
	xhttp.send (JSON.stringify (data));
}
String.prototype.clean = function(){
	// éliminer les caractères en trops
	var text = this.replaceAll ('\r', " ");
	text = text.replaceAll ('\n', " ");
	text = text.replaceAll ('\t', " ");
	text = text.replaceAll ('&nbsp;'," ");
	while (text.includes ('  ')) text = text.replaceAll ('  ', ' ');
	// nettoyer les bords du texte
	var textEnd = text.length -1;
	if (text[0] ===" ") text = text.slice (1);
	if (text [text.length -1] ===" ") text = text.slice (0, textEnd);
	// nettoyer les balises internes
	text = text.replaceAll ('> ','>');
	text = text.replaceAll (' <','<');
	/*
	text = text.replaceAll ('> ','>');
	text = text.replaceAll (' <','<');
	text = text.replaceAll ('<a ',' <a ');
	text = text.replaceAll ('</a>','</a> ');
	text = text.replaceAll ('> <','><');
	*/
	while (text.includes ('<br/><br/>')) text = text.replaceAll ('<br/><br/>', '<br/>');
	text = text.strip();
	return text;
}
String.prototype.cleanEmptyTags = function(){
	var text = this.replaceAll ('<br>', '<br/>');
	text = text.replaceAll ('<hr>', '<hr/>');
	while (text.includes ('<br/><br/>')) text = text.replaceAll ('<br/><br/>', '<br/>');
	text = text.replaceAll ('<br/><', '<');
	text = text.replaceAll ('><br/>', '>');
	text = text.replaceAll ('<br/>', '</p><p>');
	text = text.replaceAll ('<span></span>', "");
	text = text.replaceAll ('<p></p>', "");
	text = text.replaceAll ('<div></div>', "");
	return text;
}
HTMLElement.prototype.removeComments = function(){
	for (var c= this.childNodes.length -1; c>=0; c--){
		if (this.childNodes[c].constructor.name === 'Comment') this.removeChild (this.childNodes[c]);
		else if (this.childNodes[c].constructor.name === 'Text' && this.childNodes[c].length <2
				&& ! "0123456789abcdefghijklmnopqrstuvwxyz.:;,!?".includes (this.childNodes[c].textContent))
			this.removeChild (this.childNodes[c]);
	}
	for (var c=0; c< this.children.length; c++) this.children[c].removeComments();
}
HTMLElement.prototype.removeEmptyTag = function(){
	if ([ 'SCRIPT', 'NOSCRIPT', 'HEADER', 'FOOTER' ].includes (this.tagName)) this.parentElement.removeChild (this);
	else if (! [ 'IMG', 'BR', 'HR', 'INPUT', 'TEXTAREA' ].includes (this.tagName)){
		if (! exists (this.innerHTML) || ! exists (this.innerText) && this.children.length ===0) this.parentElement.removeChild (this);
		else if ('svg' !== this.tagName){
			for (var c=0; c< this.children.length; c++) this.children[c].removeEmptyTag();
			if (! exists (this.innerHTML) || ! exists (this.innerText) && this.children.length ===0) this.parentElement.removeChild (this);
}}}
HTMLElement.prototype.simplifyNesting = function(){
	for (var c= this.children.length -1; c>=0; c--) this.children[c].simplifyNesting();
	if (this.children.length ===1 && this.childNodes.length ===1){
		if ([ 'A', 'IMG', 'BR', 'HR', 'INPUT', 'TEXTAREA', 'svg' ].includes (this.children[0].tagName)){
			this.parentElement.insertBefore (this.children[0], this);
			this.parentElement.removeChild (this);
		}
		else if (this.children.length >0) this.innerHTML = this.children[0].innerHTML;
}}
HTMLElement.prototype.clean = function(){
	if (! [ 'IMG', 'BR', 'HR', 'INPUT', 'svg' ].includes (this.tagName)){
		this.removeComments();
		this.removeEmptyTag();
		this.simplifyNesting();
		for (var c=0; c< this.children.length; c++) this.children[c].clean();
}}
// est-ce que je conserve la classe et l'id ?
HTMLImageElement.prototype.delAttribute = function(){
	for (var a= this.attributes.length -1; a>=0; a--) if (! 'id src alt'.includes (this.attributes[a].name))
		this.removeAttribute (this.attributes[a].name);
}
HTMLInputElement.prototype.delAttribute = function(){
	for (var a= this.attributes.length -1; a>=0; a--) if (! 'id type name value'.includes (this.attributes[a].name))
		this.removeAttribute (this.attributes[a].name);
}
HTMLElement.prototype.delAttribute = function(){
	for (var a= this.attributes.length -1; a>=0; a--) if (! 'id class'.includes (this.attributes[a].name))
		this.removeAttribute (this.attributes[a].name);
	for (var c=0; c< this.children.length; c++) this.children[c].delAttribute();
}
HTMLAnchorElement.prototype.delAttribute = function(){
	for (var a= this.attributes.length -1; a>=0; a--) if (! 'id class href'.includes (this.attributes[a].name))
		this.removeAttribute (this.attributes[a].name);
	for (var c=0; c< this.children.length; c++) this.children[c].delAttribute();
}
HTMLFormElement.prototype.delAttribute = function(){
	for (var a= this.attributes.length -1; a>=0; a--) if (! 'id action method'.includes (this.attributes[a].name))
		this.removeAttribute (this.attributes[a].name);
	for (var c=0; c< this.children.length; c++) this.children[c].delAttribute();
}
HTMLButtonElement.prototype.delAttribute = function(){
	for (var a= this.attributes.length -1; a>=0; a--) if (this.attributes[a].name != 'onclick')
		this.removeAttribute (this.attributes[a].name);
	for (var c=0; c< this.children.length; c++) this.children[c].delAttribute();
}
HTMLElement.prototype.delIds = function(){
	if (exists (this.getAttribute ('class'))) this.removeAttribute ('class');
	if (exists (this.getAttribute ('id'))) this.removeAttribute ('id');
	for (var c=0; c< this.children.length; c++) this.children[c].delIds();
}
HTMLElement.prototype.findTag = function (tagName){
	var container = this.getElementsByTagName (tagName)[0];
	if (! exists (container)) container = this.getElementsByClassName (tagName)[0];
	if (! exists (container)) container = document.getElementById (tagName);
	if (exists (container)) this.innerHTML = container.innerHTML;
}
HTMLElement.prototype.findTagList = function (tagName){
	var containerList = this.getElementsByTagName (tagName);
	if (! exists (containerList)) containerList = this.getElementsByClassName (tagName);
	if (exists (containerList)){
		if (containerList.length ===1) this.innerHTML = containerList[0].innerHTML;
		else if (containerList.length >1){
			this.innerHTML = containerList[0].outerHTML;
			for (var c=1; c< containerList.length; c++) this.innerHTML = this.innerHTML + containerList[c].outerHTML;
	}}
	else{
		containerList = document.getElementById (tagName);
		if (exists (containerList)) this.innerHTML = containerList.innerHTML;
}}
HTMLBodyElement.prototype.cleanBody = function(){
	this.innerHTML = this.innerHTML.clean();
	this.findTag ('main');
	if (this.innerHTML.count ('</article>') >0) this.findTagList ('article');
	for (var a= this.attributes.length -1; a>=0; a--) this.removeAttribute (this.attributes[a].name);
	this.clean();
	this.innerHTML = this.innerHTML.cleanEmptyTags();
}