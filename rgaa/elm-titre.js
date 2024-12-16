Element.prototype.isTitle = function(){
	var text ="";
	if (this.tagName[0] === 'H' && '123456'.includes (this.tagName[1])){
		text = '<p>' + this.tagName +": "+ this.innerText +'</p>';
	//	this.style.border = 'solid 4px deeppink';
		if (this.getAttribute ('role') === 'presentation'){
		//	this.style.border = 'dotted 4px deeppink';
			text = text.replace ('<p>', "<p style='color:#4208'>");
		}
	}
	for (var c=0; c< this.children.length; c++) text = text + this.children[c].isTitle();
	return text;
}
voletRgaa.innerHTML = document.body.isTitle();

