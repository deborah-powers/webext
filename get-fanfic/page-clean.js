/* dépend de
	text-clean.js
	text.js
	backend.py
fonctionne avec cleanAction.js
/
function sendToBackend(){
	console.log (document.head);
	// récupérer les métadonnées
	const data = {
		title: 'nouvel article',
		link: window.location.href,
		text: document.body.innerHTML
	};
	const title = document.head.getElementsByTagName ('title')[0].innerHTML.toLowerCase().cleanTxt();
	if (exists (title)) data.title = title;
	// ecrire le body propre dans un fichier grâce à un backend python
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		if (this.readyState ===4 && this.status === 200) console.log ("les données ont bien été envoyées au back-end.\nsa réponse:", this.responseText);
//		else console.log ("l'échange avec le back-end est en erreur.\nécoute-il sur le port 1407 ?\nétat =", this.readyState, 'status =', this.status);
	};
	xhttp.open ('POST', urlBackend, true);
	xhttp.send (JSON.stringify (data));
}*/
HTMLElement.prototype.removeComments = function(){
	if (! [ 'IMG', 'BR', 'HR', 'INPUT' ].includes (this.tagName)){
		for (var c= this.childNodes.length -1; c>=0; c--){
			if (this.childNodes[c].constructor.name === 'Comment') this.removeChild (this.childNodes[c]);
			else if (this.childNodes[c].constructor.name === 'Text' && this.childNodes[c].length <2
					&& ! "0123456789abcdefghijklmnopqrstuvwxyz.:;,!?".includes (this.childNodes[c].textContent))
				this.removeChild (this.childNodes[c]);
		}
		for (var c=0; c< this.children.length; c++) this.children[c].removeComments();
}}
SVGSVGElement.prototype.removeComments = function(){
	for (var c= this.childNodes.length -1; c>=0; c--){
		if (this.childNodes[c].constructor.name === 'Comment') this.removeChild (this.childNodes[c]);
		else if (this.childNodes[c].constructor.name === 'Text' && this.childNodes[c].length <2
				&& ! "0123456789abcdefghijklmnopqrstuvwxyz.:;,!?".includes (this.childNodes[c].textContent))
			this.removeChild (this.childNodes[c]);
}}
HTMLElement.prototype.removeEmptyTag = function(){
	if ([ 'SCRIPT', 'NOSCRIPT', 'HEADER', 'FOOTER' ].includes (this.tagName)) this.parentElement.removeChild (this);
	else if (! [ 'IMG', 'BR', 'HR', 'INPUT', 'TEXTAREA', 'svg' ].includes (this.tagName)){
		if (! exists (this.innerHTML) || ! exists (this.innerText) && this.children.length ===0) this.parentElement.removeChild (this);
		else if ('svg' !== this.tagName){
			for (var c=0; c< this.children.length; c++) if (this.children[c].tagName !== 'svg') this.children[c].removeEmptyTag();
			if (! exists (this.innerHTML) || ! exists (this.innerText) && this.children.length ===0) this.parentElement.removeChild (this);
}}}
HTMLElement.prototype.simplifyNesting = function(){
	if (! [ 'IMG', 'BR', 'HR', 'INPUT', 'svg' ].includes (this.tagName)){
		for (var c= this.children.length -1; c>=0; c--) if (this.children[c].tagName !== 'svg') this.children[c].simplifyNesting();
		if (this.children.length ===1 && this.childNodes.length ===1){
			if ([ 'A', 'IMG', 'BR', 'HR', 'INPUT', 'TEXTAREA', 'svg' ].includes (this.children[0].tagName)){
				this.parentElement.insertBefore (this.children[0], this);
				this.parentElement.removeChild (this);
			}
			else if (this.children.length >0) this.innerHTML = this.children[0].innerHTML;
}}}
HTMLElement.prototype.clean = function(){
	if (! [ 'IMG', 'BR', 'HR', 'INPUT', 'svg' ].includes (this.tagName)){
		this.removeComments();
		this.removeEmptyTag();
		this.simplifyNesting();
		for (var c=0; c< this.children.length; c++) if (this.children[c].tagName !== 'svg') this.children[c].clean();
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
HTMLSelectElement.prototype.delAttribute = function(){
	for (var a= this.attributes.length -1; a>=0; a--) if (! 'id name onchange'.includes (this.attributes[a].name))
		this.removeAttribute (this.attributes[a].name);
}
HTMLOptionElement.prototype.delAttribute = function(){
	for (var a= this.attributes.length -1; a>=0; a--) if (! 'value'.includes (this.attributes[a].name))
		this.removeAttribute (this.attributes[a].name);
}
HTMLElement.prototype.delAttribute = function(){
	for (var a= this.attributes.length -1; a>=0; a--) if (! 'id class'.includes (this.attributes[a].name))
		this.removeAttribute (this.attributes[a].name);
	for (var c=0; c< this.children.length; c++) if (this.children[c].tagName !== 'svg') this.children[c].delAttribute();
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
	const container = this.findTag (tagName);
	if (container !== null) this.innerHTML = container.innerHTML;
}
HTMLElement.prototype.findTagList = function (tagName){
	var containerList = this.getElementsByTagName (tagName);
	if (! exists (containerList)) containerList = this.getElementsByClassName (tagName);
	if (exists (containerList)){
		if (containerList.length ===1) this.innerHTML = containerList[0].innerHTML;
		else if (containerList.length >1){
			this.innerHTML = containerList[0].outerHTML;
			for (var c=1; c< containerList.length; c++) this.innerHTML = this.innerHTML + containerList[c].outerHTML;
	}}else{
		containerList = document.getElementById (tagName);
		if (exists (containerList)) this.innerHTML = containerList.innerHTML;
}}
HTMLBodyElement.prototype.cleanBody = function(){
	this.innerHTML = this.innerHTML.cleanHtml();
	this.findTagReplace ('main');
	if (this.innerHTML.includes ('</article>')) this.findTagList ('article');
	for (var a= this.attributes.length -1; a>=0; a--) this.removeAttribute (this.attributes[a].name);
	this.clean();
	this.delAttribute();
}