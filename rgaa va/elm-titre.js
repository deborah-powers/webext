HTMLElement.prototype.isTitle = function(){
	var text ="";
	if (this.tagName[0] === 'H' && '123456'.includes (this.tagName[1])){
		text = '<p>' + this.tagName;
		if ('presentation' === this.role) text = text + ' ! pres';
		text = text + this.addText();
	}
	else if ('heading' === this.role){
		text = '<p>' + this.tagName +' (heading) niveau ';
		var ariaLevel = this.getAttribute ('aria-level');
		if (exists (ariaLevel)) textTmp = textTmp + ariaLevel;
		else textTmp = textTmp + 'absent';
		text = text + this.addText();
	}
	else if (this.innerHTML.includes ('<h1') || this.innerHTML.includes ('<h2') || this.innerHTML.includes ('<h3')
			|| this.innerHTML.includes ('<h4') || this.innerHTML.includes ('<h5') || this.innerHTML.includes ('<h6')
			|| this.innerHTML.includes ('role="heading"') || this.innerHTML.includes ("role='heading'")){
		var textTmp ="";
		var nbChWtitles =0;
		for (var child of this.children){
			textTmp = child.isTitle();
			if (textTmp.includes ('<p>')) nbChWtitles +=1;
			text = text + textTmp;
		}
		if (this.tagName !== 'BODY' && nbChWtitles >1) text = '<div>' + text + '</div>';
	}
	return text;
}
HTMLElement.prototype.addText = function(){
	var text = ": ";
	if (this.innerText) text = text + this.innerText;
	else if (! this.innerHTML.includes ('<img') && ! this.innerHTML.includes ('<svg')) text = text + '! vide';
	text = text +'</p>';
	return text;
}
Element.prototype.isTitle = function(){ return ""; }
voletRgaa.innerHTML = document.body.isTitle();

