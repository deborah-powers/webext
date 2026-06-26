function wait (dixiemeDeSeconde){
	// convertir en milliseconde
	dixiemeDeSeconde *=100;
	const dateFin = Date.now() + dixiemeDeSeconde;
	while (Date.now() < dateFin) continue;
}
String.prototype.count = function (char){
	if (! this.includes (char)) return 0;
	else{
		var nbOccurences =0;
		var pos =0;
		while (this.substring (pos).includes (char)){
			pos =1+ this.indexOf (char, pos);
			nbOccurences +=1;
		}
		return nbOccurences;
}}
HTMLElement.prototype.getElementsByProperties = function (tagName, className){
	var elements = null;
	var elementsFin =[]
	if (tagName){
		elements = this.getElementsByTagName (tagName);
		if (className) for (var elm of elements){
			if (elm.className.includes (className)) elementsFin.push (elm);
		}
		else for (var elm of elements){ elementsFin.push (elm); }
	}
	else if (className){
		elements = this.getElementsByClassName (className)
		for (var elm of elements) elementsFin.push (elm);
	}
	return elementsFin;
}
HTMLElement.prototype.findByInnerText = function (message){
	if (this.innerText.includes (message)){
		var tagRes = null;
		var c=0;
		while (c< this.children.length && tagRes === null){
			tagRes = this.children[c].findByInnerText (message);
			c+=1;
		}
		if (tagRes === null) return this;
		else return tagRes;
	}
	else return null;
}
HTMLElement.prototype.findListByInnerText = function (message){
	if (this.innerText.includes (message)){
		var listRes =[];
		var listTmp =[];
		for (var element of this.children){
			listTmp = element.findListByInnerText (message);
			for (var child of listTmp) listRes.push (child);
		}
		if (listRes.length ===0) return [ this, ];
		else return listRes;
	}
	else return [];
}
HTMLElement.prototype.findContainer = function (containerTag){
	containerTag = containerTag.toUpperCase();
	if (this.tagName === containerTag || this.tagName === 'BODY') return this;
	else return this.parentElement.findContainer (containerTag);
}
HTMLElement.prototype.findBody = function(){ return this.findContainer ('body'); }
String.prototype.capitalize = function(){ return this[0].toUpperCase() + this.substring (1); }
function waitInputAppears (innerText){
	function resolveFunc (resolve){
		var observer = new MutationObserver (function (mutations){
//			mutations[0].target	élément dans lequel les nouveaux ont été insérés
//			mutations[0].addedNodes	élements insérés
			var n=0;
			const nbNodes = mutations[0].addedNodes.length;
			while (n< nbNodes && ! mutations[0].addedNodes[n].innerText.includes (innerText)) n+=1;
			if (n< nbNodes){
				observer.disconnect();
				resolve (mutations[0].addedNodes[n]);
		}});
		observer.observe (document.body, { childList: true, subtree: true });
		const element = document.body.findByInnerText (innerText);
		return resolve (element);
	}
	return new Promise (resolveFunc);
}