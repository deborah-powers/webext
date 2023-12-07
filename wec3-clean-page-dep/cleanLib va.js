function exists (object){
	if (object == null || object == undefined) return false;
	else if ((object.constructor == Array || object.constructor == HTMLCollection) && object.length ==0) return false;
	else if (typeof (object) == 'string'){
		if (object.length ==0 || object =="" || object ==" " || object =="\n" || object =="\t" || object =="\r") return false;
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
function sendToBackend(){
	// ecrire le body propre dans un fichier grâce à un backend python
	const urlBE = 'http://localhost:1407/';
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		if (this.readyState ===4 && this.status === 200) console.log ("les données ont bien été envoyées au back-end.\nsa réponse:", this.responseText);
		else console.log ("l'échange avec le back-end est en erreur.\nécoute-il sur le port 1407 ?\nétat =", this.readyState, 'status =', this.status);
	};
	xhttp.open ('POST', urlBE, true);
	xhttp.send (document.body.innerHTML);
}
String.prototype.clean = function(){
	// éliminer les caractères en trops
	var text = this.replaceAll ('\r', "");
	text = text.replaceAll ('\n', "");
	text = text.replaceAll ('\t', "");
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
	text = text.replaceAll ('<a ',' <a ');
	text = text.replaceAll ('</a>','</a> ');
	text = text.replaceAll ('> <','><');
	*/
	while (text.includes ('<br/><br/>')) text = text.replaceAll ('<br/><br/>', '<br/>');
	return text;
}
String.prototype.cleanEmptyTags = function(){
	var text = this.replaceAll ('<br>', '<br/>');
	text = text.replaceAll ('<hr>', '<hr/>');
	while (text.includes ('<br/><br/>')) text = text.replaceAll ('<br/><br/>', '<br/>');
	text = text.replaceAll ('<br/><', '<');
	text = text.replaceAll ('><br/>', '>');
	text = text.replaceAll ('<br/>', '</p><p>');
	text = text.replaceAll ('<span></span>');
	text = text.replaceAll ('<p></p>');
	text = text.replaceAll ('<div></div>');
	return text;
}
HTMLElement.prototype.clean = function(){
	// éliminer les commentaires
	for (var c= this.childNodes.length -1; c>=0; c--){
		if (this.childNodes[c].constructor.name === 'Comment') this.removeChild (this.childNodes[c]);
		else if (this.childNodes[c].constructor.name === 'Text' && this.childNodes[c].length <2
				&& ! "0123456789abcdefghijklmnopqrstuvwxyz.:;,!?".includes (this.childNodes[c].textContent))
			this.removeChild (this.childNodes[c]);
	}
	// éliminer les blocs inutiles
	for (var c= this.children.length -1; c>=0; c--){
		if (this.children[c].tagName == 'SCRIPT' || this.children[c].tagName == 'NOSCRIPT'
			|| this.children[c].tagName == 'HEADER' || this.children[c].tagName == 'FOOTER')
			this.removeChild (this.children[c]);
		else if (! exists (this.children[c].innerText) && ! "A IMG BR HR INPUT TEXTAREA".includes (this.children[c].tagName))
			this.removeChild (this.children[c]);
	}
	for (var c=0; c< this.children.length; c++) this.children[c].clean();
}
HTMLElement.prototype.simplifyNesting = function(){
	// HTMLElement.prototype.clean à déjà été jouée
	for (var c= this.children.length -1; c>=0; c--) this.children[c].simplifyNesting();
	if (this.children.length ===1 && this.childNodes.length ===1){
		if ("A IMG BR HR INPUT TEXTAREA svg".includes (this.children[0].tagName)){
			this.parentElement.insertBefore (this.children[0], this);
			this.parentElement.removeChild (this);
		}
		else if (this.children.length >0) this.innerHTML = this.children[0].innerHTML;
	}
}
// est-ce que je conserve la classe et l'id ?
HTMLImageElement.prototype.delAttribute = function(){
	for (var a= this.attributes.length -1; a>=0; a--) if (this.attributes[a].name != 'src' && this.attributes[a].name != 'alt')
		this.removeAttribute (this.attributes[a].name);
}
HTMLInputElement.prototype.delAttribute = function(){
	for (var a= this.attributes.length -1; a>=0; a--) if (! 'id type name value'.includes (this.attributes[a].name))
		this.removeAttribute (this.attributes[a].name);
}
HTMLElement.prototype.delAttribute = function(){
	for (var a= this.attributes.length -1; a>=0; a--) this.removeAttribute (this.attributes[a].name);
	for (var c=0; c< this.children.length; c++) this.children[c].delAttribute();
}
HTMLAnchorElement.prototype.delAttribute = function(){
	for (var a= this.attributes.length -1; a>=0; a--) if (this.attributes[a].name != 'href')
		this.removeAttribute (this.attributes[a].name);
	for (var c=0; c< this.children.length; c++) this.children[c].delAttribute();
}
HTMLFormElement.prototype.delAttribute = function(){
	for (var a= this.attributes.length -1; a>=0; a--) if (! 'action method'.includes (this.attributes[a].name))
		this.removeAttribute (this.attributes[a].name);
	for (var c=0; c< this.children.length; c++) this.children[c].delAttribute();
}
HTMLButtonElement.prototype.delAttribute = function(){
	for (var a= this.attributes.length -1; a>=0; a--) if (this.attributes[a].name != 'onclick')
		this.removeAttribute (this.attributes[a].name);
	for (var c=0; c< this.children.length; c++) this.children[c].delAttribute();
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