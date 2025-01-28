Element.prototype.isTitle = function(){ return ""; }
HTMLElement.prototype.isTitle = function(){
	var text ="";
	if (this.tagName[0] === 'H' && '123456'.includes (this.tagName[1])){
		var textTmp = '<p>' + this.tagName +": "+ this.innerText +'</p>';
		if (this.getAttribute ('role') === 'presentation') textTmp = textTmp.replace ('<p>', "<p class='title-presentation'>");
		if (! this.innerText.exists() && ! this.innerHTML.includes ('<img')){
			textTmp = textTmp.replace ('<p>', "<p class='title-presentation'>");
			textTmp = textTmp.replace ('</p>', "ERREUR, tître vide</p>");
		}
		text = text + textTmp;
	}
	else if (this.getAttribute ('role') === 'heading'){
		var ariaLevel = this.getAttribute ('aria-level');
		if (! exists (ariaLevel)) ariaLevel = '0';
		var textTmp = "<p>aria "+ ariaLevel +": "+ this.innerText +'</p>';
		if (ariaLevel ==='0'){
			textTmp = textTmp.replace ('<p>', "<p class='title-presentation'>");
			textTmp = textTmp.replace ('</p>', " ERREUR, manque aria-level</p>");
		}
		if (! this.innerText.exists() && ! this.innerHTML.includes ('<img')){
			textTmp = textTmp.replace ('<p>', "<p class='title-presentation'>");
			if (textTmp.includes ('ERREUR')) textTmp = textTmp.replace ('</p>', ", tître vide</p>");
			else textTmp = textTmp.replace ('</p>', " ERREUR, tître vide</p>");
		}
		text = text + textTmp;

	}
	else if (this.innerHTML.includes ('<h1') || this.innerHTML.includes ('<h2') || this.innerHTML.includes ('<h3')
			|| this.innerHTML.includes ('<h4') || this.innerHTML.includes ('<h5') || this.innerHTML.includes ('<h6')){
		text = '<div><span>'+ this.addLabelModal() +'</span>';
		for (var c=0; c< this.children.length; c++) text = text + this.children[c].isTitle();
		text = text +'</div>';
	}
	return text;
}
voletRgaa.innerHTML = document.body.isTitle();

