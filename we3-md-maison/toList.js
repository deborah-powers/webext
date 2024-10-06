
String.prototype.toList = function(){
	if (this.includes ('<li>')){
	//	var text = '\n'+ this +'\n';
		var text = this.replaceAll ('<ul><li>');
		var textList = text.split ('\n');
		// rajouter les balises fermantes
		for (var l=0; l< textList.length; l++) if (textList[l].substring (0,8) === '<ul><li>'){
			textList[l] = textList[l] + '</li></ul>';
			console.log (l, textList[l+1].substring (0,8), textList[l+1].substring (0,8) !== '<ul><li>');
			/*
			if (l===0 || textList[l-1].substring (0,4) !== '<li>') textList[l] = '<ul>' + textList[l];
			if (l=== textList.length -1 || textList[l+1].substring (0,4) !== '<li>') textList[l] = textList[l] + '</ul>';
			*/
		}
		/*/ rajouter les balises ouvrantes et fermantes delimitant la liste, <ul/>. reperer les listes imbriquees.
		for (var l=1; l< textList.length -1; l++) if (textList[l].includes ('<li>')){
			// compter le niveau d'imbrication (n) de l'element textList[l]
			var n=0;
			var textTmp = '<li>';
			while (textList[l].includes (textTmp)){
				textTmp = textTmp +'\t';
				n+=1;
			}
			n-=1;
			textTmp = textTmp.substring (0, textTmp.length -1);
			if (textList[l].includes (textTmp)){
				// debut de la liste (ou sous-liste), mettre le <ul>
				if (! textList [l-1].includes (textTmp)) textList[l] = '<ul>'+ textList[l];
				// fin de la liste (ou sous-liste), mettre le </ul>
				if (! textList [l+1].includes (textTmp)) while (n >-1){
					if (! textList [l+1].includes (textTmp)) textList[l] = textList[l] + '</ul>';
					n-=1;
		}}}*/
		// mettre le texte au propre
		text = textList.join ('\n');
		text = text.replaceAll ('</li></ul>\n<ul><li>', '</li><li>');
		text = text.strip();
		text = text.replaceAll ('\t',"");
		/*
		while (text.includes ('<li>\t')) text = text.replaceAll ('<li>\t', '<li>');
		while (text.includes ('<ul>\t')) text = text.replaceAll ('<ul>\t', '<ul>');
		// liste ordonnée
		while (text.includes ('<li>#')){
			var d= text.indexOf ('<li># ');
			d= text.substring (0,d).lastIndexOf ('<ul>');
			text = text.substring (0,d) + '<ol>' + text.substring (d+4);
			var f= text.indexOf ('</ul>', d);
			while (text.substring (d,f).count ('<ul>') != text.substring (d,f).count ('</ul>')) f= text.indexOf ('</ul>', f+4);
			text = text.substring (0,f) + '</ol>' + text.substring (f+5);
			text = text.replace ('<li># ', '<li>');
		}*/
		console.log (text);
		return text;
	}
	else return this;
}
String.prototype.toList = function(){
	if (this.includes ('<li>')){
		var text = '\n'+ this +'\n';
		var textList = text.split ('\n');
		// rajouter les balises fermantes
		for (var l=0; l< textList.length; l++) if (textList[l].includes ('<li>')){ textList[l] = textList[l] +'</li>'; }
		// rajouter les balises ouvrantes et fermantes delimitant la liste, <ul/>. reperer les listes imbriquees.
		for (var l=1; l< textList.length -1; l++) if (textList[l].includes ('<li>')){
			// compter le niveau d'imbrication (n) de l'element textList[l]
			var n=0;
			var textTmp = '<li>';
			while (textList[l].includes (textTmp)){
				textTmp = textTmp +'\t';
				n+=1;
			}
			n-=1;
			textTmp = textTmp.substring (0, textTmp.length -1);
			if (textList[l].includes (textTmp)){
				// debut de la liste (ou sous-liste), mettre le <ul>
				if (! textList [l-1].includes (textTmp)) textList[l] = '<ul>'+ textList[l];
				// fin de la liste (ou sous-liste), mettre le </ul>
				if (! textList [l+1].includes (textTmp)) while (n >-1){
					if (! textList [l+1].includes (textTmp)) textList[l] = textList[l] + '</ul>';
					n-=1;
		}}}
		// mettre le texte au propre
		text = textList.join ('\n');
		text = text.strip();
		while (text.includes ('<li>\t')) text = text.replaceAll ('<li>\t', '<li>');
		while (text.includes ('<ul>\t')) text = text.replaceAll ('<ul>\t', '<ul>');
		// liste ordonnée
		while (text.includes ('<li>#')){
			var d= text.indexOf ('<li># ');
			d= text.substring (0,d).lastIndexOf ('<ul>');
			text = text.substring (0,d) + '<ol>' + text.substring (d+4);
			var f= text.indexOf ('</ul>', d);
			while (text.substring (d,f).count ('<ul>') != text.substring (d,f).count ('</ul>')) f= text.indexOf ('</ul>', f+4);
			text = text.substring (0,f) + '</ol>' + text.substring (f+5);
			text = text.replace ('<li># ', '<li>');
		}
		return text;
	}
	else return this;
}