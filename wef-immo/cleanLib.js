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
	while (toStrip.includes (text[0])) text = text.slice (1);
	while (toStrip.includes (text [text.length -1])) text = text.slice (0, text.length -1);
	return text;
}
function sendToBackend(){
	// récupérer les métadonnées
	const data = {
		title: 'nouvel article',
		link: window.location.href,
		body: document.body.innerHTML,
		author: "",
		subject: "",
		autlink: window.location.href
	};
	const title = document.head.getElementsByTagName ('title')[0].innerHTML.toLowerCase().clean();
	if (exists (title)) data.title = title;
	if (exists (document.getElementById ('infos-page').getElementById ('author')))
		data.author = document.getElementById ('infos-page').getElementById ('author').innerText.toLowerCase().clean();
	if (exists (document.getElementById ('infos-page').getElementById ('subject')))
		data.subject = document.getElementById ('infos-page').getElementById ('subject').innerText.toLowerCase().clean();
	if (exists (document.getElementById ('infos-page').getElementById ('autlink')))
		data.autlink = document.getElementById ('infos-page').getElementById ('autlink').innerText;
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
	if (this.innerHTML.includes ('<!--')){
		this.innerHTML = this.innerHTML.replaceAll ('-->', '<!--');
		listCom = this.innerHTML.split ('<!--');
		this.innerHTML = "";
		for (var i=0; i< listCom.length; i+=2) this.innerHTML = this.innerHTML + listCom[i];
		this.innerHTML = this.innerHTML.clean();
	}
	/*
	for (var c= this.childNodes.length -1; c>=0; c--){
		if (this.childNodes[c].constructor.name === 'Comment') this.removeChild (this.childNodes[c]);
		else if (this.childNodes[c].constructor.name === 'Text' && this.childNodes[c].length <2
				&& ! "0123456789abcdefghijklmnopqrstuvwxyz.:;,!?".includes (this.childNodes[c].textContent))
			this.removeChild (this.childNodes[c]);
	}
	for (var c=0; c< this.children.length; c++) this.children[c].removeComments();
	*/
}
HTMLElement.prototype.removeEmptyTag = function(){
	if ([ 'SCRIPT', 'NOSCRIPT', 'HEADER', 'FOOTER' ].includes (this.tagName)) this.parentElement.removeChild (this);
	else if (! [ 'IMG', 'BR', 'HR', 'INPUT', 'TEXTAREA' ].includes (this.tagName)){
		if (! exists (this.innerHTML) || ! exists (this.innerText) && this.children.length ===0)
			this.parentElement.removeChild (this);
		else if ('svg' !== this.tagName){
		console.log ('c', this.children.length, this.children);
			for (var c=0; c< this.children.length; c++) this.children[c].removeEmptyTag();
		console.log ('f');
			if (! exists (this.innerHTML) || ! exists (this.innerText) && this.children.length ===0) this.parentElement.removeChild (this);
		console.log ('v');
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
		console.log ('b');
		this.removeEmptyTag();
		console.log ('w');
		this.simplifyNesting();
		console.log ('y');
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
	console.dir (this.attributes);
	for (var a= this.attributes.length -1; a>=0; a--) if (! 'id class'.includes (this.attributes[a].name)){
		console.log (a, this.attributes[a].name);
		this.removeAttribute (this.attributes[a].name);
	}
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
	if (! exists (container)) container = document.getElementById (tagName);
	if (! exists (container)) container = this.getElementsByClassName (tagName)[0];
	if (exists (container)) return container;
	else return null;
}
HTMLElement.prototype.findTagReplace = function (tagName){
	var container = this.findTag (tagName);
	if (container != null) this.innerHTML = container.innerHTML;
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
HTMLElement.prototype.cleanBody = function(){
	this.innerHTML = this.innerHTML.clean();
	this.findTagReplace ('main');
	if (this.innerHTML.count ('</article>') >0) this.findTagList ('article');
	for (var a= this.attributes.length -1; a>=0; a--) this.removeAttribute (this.attributes[a].name);
	console.log ('a');
	this.clean();
	console.log ('a');
	this.innerHTML = this.innerHTML.cleanEmptyTags();
	console.log ('a');
}
