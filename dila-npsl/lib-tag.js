function wait (dixiemeDeSeconde){
	// convertir en milliseconde
	dixiemeDeSeconde *=100;
	const dateFin = Date.now() + dixiemeDeSeconde;
	while (Date.now() < dateFin) continue;
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
/*
document.body.addEventListener ('change', function (event){ setTimeout (function(){
	if (document.body.includes ('Commune de mariage')) log ('mariage');
}, 500); });
*/