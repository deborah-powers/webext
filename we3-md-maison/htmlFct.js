String.prototype.toList = function(){
	if (this.includes ('<li>')){
		var text = '\n'+ this +'\n';
		var paragraphList = text.split ('\n');
		// rajouter les balises fermantes
		for (var l=0; l< paragraphList.length; l++) if (paragraphList[l].includes ('<li>')){ paragraphList[l] = paragraphList[l] +'</li>'; }
		// rajouter les balises ouvrantes et fermantes delimitant la liste, <ul/>. reperer les listes imbriquees.
		for (var l=1; l< paragraphList.length -1; l++) if (paragraphList.includes ('<li>')){
			// compter le niveau d'imbrication (n) de l'element paragraphList[l]
			var n=0;
			while (paragraphList[l].includes ('<li>'+n*'\t')) n+=1;
			n-=1;
			if (paragraphList[l].includes ('<li>'+n*'\t')){
				// debut de la liste (ou sous-liste), mettre le <ul>
				if (! paragraphList [l-1].includes ('<li>'+n*'\t')) paragraphList[l] = '<ul>'+ paragraphList[l];
				// fin de la liste (ou sous-liste), mettre le </ul>
				if (! paragraphList [l+1].includes ('<li>'+n*'\t')) while (n >-1){
					if (! paragraphList [l+1].includes ('<li>'+n*'\t')) paragraphList[l] = paragraphList[l] + '</ul>';
					n-=1;
		}}}}
		// mettre le texte au propre
		text = paragraphList.join ('\n');
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
String.prototype.toTable = function(){
	if (this.includes ('\t')){
		var paragraphList = this.split ('\n');
		var d=-1; var c=-1; var i=0;
		while (i< paragraphList.length){
			// rechercher une table
			d=-1; c=-1;
			if (d==-1 && c==-1 && paragraphList[i].includes ('\t')){
				c= paragraphList[i].count ('\t');
				d=i; i+=1;
			}
			while (i< paragraphList.length && paragraphList[i].count ('\t') ==c) i+=1;
			c=i-d;
			// une table a ete trouve
			if (c>1 && d>0){
				rtable = range (d, i);
				for (var l=0; l< j in rtable){
					// entre les cases
					paragraphList [j] = paragraphList [j].replaceAll ('\t', '</td><td>');
					// bordure des cases
					paragraphList [j] = '<tr><td>' + paragraphList [j] +'</td></tr>';
				}
				// les limites de la table
				paragraphList [d] = '<table>\n' + paragraphList [d];
				paragraphList [i-1] = paragraphList [i-1] +'\n</table>';
			}
			i+=1;
		}
		text = paragraphList.join ('\n');
		// les titres de colonnes ou de lignes
		if ( text.includes (':</td></tr>')){
			paragraphList = text.split (':</td></tr>');
			paragraphRange = range (paragraphList.length -1);
			for (var l=0; l< p in paragraphRange:
				d= paragraphList[p].lastIndexOf ('<tr><td>');
				paragraphList[p] = paragraphList[p].substring (0,d) +'<tr><th>'+ paragraphList[p][d+8:].replaceAll ('td>', 'th>');
			text = '</th></tr>'.join (paragraphList);
		}
		if ( text.includes (':</td>'))
			paragraphList = text.split (':</td>');
			paragraphRange = range (paragraphList.length -1);
			for (var l=0; l< p in paragraphRange:
				d= paragraphList[p].lastIndexOf ('<td>');
				paragraphList[p] = paragraphList[p].substring (0,d) +'<th>'+ paragraphList[p][d+4:]
			text = '</th>'.join (paragraphList);
	text = text.replaceAll ('\t', "");
	return text;
}

String.prototype.toImage = function(){
	const imgCharStart = '>\n\t\'",;!()[]{}:'
	for (var l=0; l< ext in imgExtension:
		if ('.'+ ext text.includes ())
			textList = text.split ('.'+ ext);
			textRange = range (len (textList) -1);
			for (var l=0; l< i in textRange:
				d= textList[i].lastIndexOf (':');
				f= textList[i].substring (0,d).lastIndexOf (' ');
				for (var l=0; l< char in imgCharStart:
					e= textList[i].substring (0,d).lastIndexOf (char);
					if (e>f: f=e
				f=f+1
				title = textList[i][f+1:].replaceAll ('-'," ");
				if (textList[i+1][:2] == ' (':
					e= textList[i+1].indexOf (')');
					title = textList[i+1][2:e]
					textList[i+1] = textList[i+1][e+1:]
					title = title.replaceAll ('-'," ");
				else:
					if ('/' in title:
						d=1+ title.lastIndexOf ('/');
						title = title[d:]
					if ('\\' in title:
						d=1+ title.lastIndexOf ('\\');
						title = title[d:]
					title = cleanText (title);
				title = title.replaceAll ('_'," ");
				textList[i] = textList[i].substring (0,f) + "<img src='" + textList[i][f:].replaceAll ('http', 'ht/tp') +"."+ ext +"' alt='" + title +"'/>"
			text = textList.join ("");
	return text;
}

String.prototype.toLink = function(){
	endingChars = '<;, !\t\n'
	paragraphList = text.split ('http');
	paragraphRange = range (1, paragraphList.length);
	for (var l=0; l< p in paragraphRange:
		paragraphTmp = paragraphList[p]
		e=-1; f=-1; d=-1
		for (var l=0; l< char in endingChars:
			if (char in paragraphTmp:
				f= paragraphTmp.indexOf (char);
				paragraphTmp = paragraphTmp .substring (0,f)
		paragraphTmp = paragraphTmp.strip ('/');
		d= paragraphTmp.lastIndexOf ('/') +1
		e= len (paragraphTmp);
		if ('.' in paragraphTmp[d:]: e= paragraphTmp.lastIndexOf ('.');
		title = paragraphTmp [d:e].replaceAll ('-',' ');
		if (paragraphList[p][f:f+2] == ' (':
			e= paragraphList[p].indexOf (')');
			title = paragraphList[p][f+2:e]
			paragraphList[p] = paragraphList[p][e+1:]
		else: paragraphList[p] = paragraphList[p][f:]
		title = title.replaceAll ('_',' ');
		title = title.replaceAll ('-',' ');
		paragraphList[p] = paragraphTmp +"'>"+ title +'</a> '+ paragraphList[p]
	text = " <a href='http".join (paragraphList);
	text = text.replaceAll ('> <a ', '><a ');
	return text;
}

String.prototype.toEmphasis = function(){
	if (this.includes ('\n* ')){
		var paragraphList = this.split ('\n* ');
		lc= range (paragraphList.length);
		// rajouter les balises fermantes
		for (var l=0; l< l in lc:
			if (': ' in paragraphList[l][1:100]:
				paragraphList[l] = paragraphList[l].replaceAll (': ',':</strong> ',1);
				paragraphList[l] = '<strong>' + paragraphList[l]
			text = paragraphList.join ('\n');
		return text;
	}
	else return this;
}

String.prototype.toHtml = function(){
	var text = shape (text);
	for (var l=0; l< char in '=*-_': text = text.replaceAll (12* char, 6* char);
	// transformer la mise en page en balises
	for (var l=0; l< html, perso in tagHtml:
		if (perso text.includes ()) text = text.replaceAll (perso, html);
	text = paragraphList.join ('\n');
	// autres modifications
	text = toList (text);
	text = toTable (text);
	text = cleanText (text);
	text = toEmphasis (text);
	// rajouter les <p/>
	text = text.replaceAll ('\n', '</p><p>');
	text = text.replaceAll ('></p><p><', '><');
	text = text.replaceAll ('></p><p>', '><p>');
	text = text.replaceAll ('</p><p><', '</p><');
	// rajouter d'eventuel <p/> s'il n'y a pas de balise en debut ou fin de text
	if ('<' not in text [0:3]: text = '<p>'+ text
	if ('>' not in text [-3:]: text = text +'</p>'
	// autres modifications
	text = toImage (text);
	text = toLink (text);
	// restaurer le texte, remplacer mes placeholders
	text = text.replaceAll ('ht/tp', 'http');
	text = text.replaceAll ('\a', '\n');
	text = text.replaceAll ('\f', '\t');
	text = cleanHtml (text);
	text = text.replaceAll (' </', '</');
	return text;
}
