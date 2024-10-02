const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZaàâbcdeéêèëfghiîïjkmlmnoôpqrstuûvwxyz0123456789-\xe7\xc7';
const punctuation = '.?!:\n\t';
const charErase =[ '\r', '&nbsp;', '&#160;', '&mdash;', '&quot;', '\x9c', '\xa0' ];
const charReplace =[
	['«', '"'], ['»', '"'], ['–', '-'], ['‘', "'"], ['’', "'"], ['“', '"'], ['”', '"'], ['"', '"'], ['&hellip;', '...'], ['…', '...'], ['\u00c2', 'Â'], ['\u00ca', 'Ê'], ['\u00cb', 'Ë'], ['\u00ce', 'Î'], ['\u00cf', 'Ï'], ['\u00d4', 'Ô'], ['\u00d6', 'Ö'], ['\u00db', 'Û'], ['\u00e0', 'à'], ['\u00e2', 'â'], ['\u00e7', 'ç'], ['\u00e8', 'è'], ['\u00e9', 'é'], ['\u00ea', 'ê'], ['\u00eb', 'ë'], ['\u00ee', 'î'], ['\u00ef', 'ï'], ['\u00f4', 'ô'], ['\u00f6', 'ö'], ['\u00fb', 'û'], ['\x85', '.'], ['\x92', "'"], ['\x96', '"'], ['\x97', "'"], ['&agrave;', 'à'], ['&acirc;', 'â'], ['&ccedil;', 'ç'], ['&eacute;', 'é'], ['&egrave;', 'è'], ['&ecirc;', 'ê'], ['&icirc;', 'î'], ['&iuml;', 'ï'], ['&ocirc;', 'ô'], ['&ugrave;', 'ù'], ['&ucirc;', 'û'], ['&apos;', "'"], ['&ldquo;', '"'], ['&rdquo;', '"'], ['&rsquo;', "'"], ['&#8220;', '"'], ['&#8221;', '"'], ['&amp;', '&'], ['&#x27;', "'"], ['&#039', "'"], ['&#39;', "'"], ['&#8217;', "'"], ['&oelig;', 'oe'], ['&lt;', '<'], ['&gt;', '>']
];
const charUpper =[ 'aA', 'àA', 'bB', 'cC', '\xe7\xc7', 'dD', 'eE', 'éE', 'èE', 'êE', 'ëE', 'fF', 'gG', 'hH', 'iI', 'îI', 'ïI', 'jJ', 'kK', 'lL', 'mM', 'nN', 'oO', '\xf4\xe4', 'pP', 'qQ', 'rR', 'sS', 'tT', 'uU', 'vV', 'wW', 'xX', 'yY', 'zZ'];
const wordsBeginMaj =['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche', 'janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre', 'deborah', 'powers', 'maman', 'mamie', 'papa', 'victo', 'tony', 'simplon', 'loïc', 'france', 'paris', 'rueil'];
const wordsBeginMin =['Deborah.powers', 'Deborah.noisetier', 'Http', '\nPg_'];
const urlWords =[ [': /', ':/'], ['localhost: ', 'localhost:'], ['www. ', 'www.'], ['. bmp', '.bmp'], ['. gif', '.gif'], ['. jpeg', '.jpeg'], ['. jpg', '.jpg'], ['. png', '.png'], ['. css', '.css'], ['. js', '.js'], [': 80', ':80'], ['. com', '.com'], ['. org', '.org'], ['. net', '.net'], ['. fr', '.fr'], ['. ico', '.ico'] ]
const markerToHtml =[ ['\n', '</p><p>'], ['<p>=== ', '<h1>'], [' ===</p>', '</h1>'], ['<p>*** ', '<h2>'], [' ***</p>', '</h2>'], ['<p>--- ', '<h3>'], [' ---</p>', '</h3>' ], ['<p>___ ', '<h4>'], [' ___</p>', '</h4>'],
['<p>http', "<p><a href='http"], ['<p>\t', '<li>'], ['<p>===</p>', '<hr/>'], ['<p>***</p>', '<hr/>']];

String.prototype.strip = function(){
	const toStrip = '\n \t/';
	var d=0;
	while (d< this.length && toStrip.includes (this[d])) d++;
	var f= this.length -1;
	while (f>=0 && toStrip.includes (this[f])) f--;
	f=f+1;
	return this.slice (d,f);
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
String.prototype.rindex = function (word, pos){
	if (pos == null || pos == undefined || pos <2) return this.lastIndexOf (word);
	else{
		var textTmp = this.slice (0, pos);
		return textTmp.lastIndexOf (word);
}}
String.prototype.cleanTxt = function(){
	// éliminer les caractères en trops
	var text = this.replaceAll ('\\', "/");
	for (var c=0; c< charErase.length; c++) text = text.replaceAll (charErase[c], " ");
	for (var c=0; c< charReplace.length; c++) text = text.replaceAll (charReplace[c][0], charReplace[c][1]);
	while (text.includes ('  ')) text = text.replaceAll ('  ', ' ');
	while (text.includes ('\n\n')) text = text.replaceAll ('\n\n', '\n');
	while (text.includes ('\t\t')) text = text.replaceAll ('\t\t', '\t');
	const charLine = '=*-_.'
	for (var c=0; c< charLine.length; c++){ while text.includes (4* charLine[c]) text = text.replaceAll (4* charLine[c], 3* charLine[c]); }
	for (var u=0; u< urlWords.length; u++) text = text.replaceAll (urlWords[u][0], urlWords[u][1]);
	text = text.replaceAll ('\n ','\n');
	text = text.replaceAll (' \n','\n');
	text = text.replaceAll ('\t ','\t');
	text = text.replaceAll (' \t','\t');
	// nettoyer les bords du texte
	text = text.strip();
	return text;
}
String.prototype.toHtml = function(){
	var text = this.cleanTxt();
	text = '<p>'+ text +'</p>';
	for (var r=0; r< markerToHtml.length; r++) text = text.replaceAll (markerToHtml[r][0], markerToHtml[r][1]);
	// les liens
	var linkList = text.split ('<a href=');
	for (var r=1; r< linkList.length; r++){
		var d= linkList[r].index ('</');
		var linkFull = linkList[r].substring (0,d);
		linkList[r] = linkList[r].substring (d);
		if (linkFull.substring (linkFull.length -1) =='/') linkFull = linkFull.substring (0, linkFull.length -1);
		d= linkFull.rindex ('/') +1;
		var linkTitle = linkFull.substring (d);
		if (linkTitle.includes ('.')){
			d= linkTitle.rindex ('.');
			linkTitle = linkTitle.substring (0, d);
		}
		linkList[r] = linkFull +"'>"+ linkTitle +'</a>'+ linkList[r];
	}
	text = linkList.join ('<a href=');
	// les listes
	linkList = text.split ('<li>');
	for (var r=1; r< linkList.length; r++){
		var d= linkList[r].index ('</');
		var item = linkList[r].substring (0,d);
		d= linkList[r].index ('>',d) +1;
		linkList[r] = item +'</li>'+ linkList[r].substring (d);
	}
	text = linkList.join ('<li>');
	return text;
}
/*
def toHtml (text):
	# transformer la mise en page en balises
	for html, perso in tagHtml:
		if perso in text: text = text.replaceAll (perso, html)
	# ajustement pour les grands titres et les images
	paragraphList = text.split ('\n')
	paragraphRange = range (len (paragraphList))
	for i in paragraphRange:
		if '<img' in paragraphList[i]: paragraphList[i] = paragraphList[i] +"'/>"
	text = '\n'.join (paragraphList)
	# les formules
	if '\nM\t' in text:
		paragraphList = text.split ('\n')
		paragraphRange = range (1, len (paragraphList))
		for i in paragraphRange:
			if paragraphList[i][:2] == 'M\t':
				if 'f/' in paragraphList[i]:
					paragraphList[i] = paragraphList[i].replaceAll (' f/ ', '<mfrac><mrow>')
					paragraphList[i] = paragraphList[i].replaceAll ('\tf/ ', '<mfrac><mrow>')
					paragraphList[i] = paragraphList[i].replaceAll (' /f', '</mrow></mfrac>')
					if '</mfrac>' not in paragraphList[i]: paragraphList[i] = paragraphList[i] + '</mrow></mfrac>'
					paragraphList[i] = paragraphList[i].replaceAll (' / ', '</mrow><mrow>')
				paragraphList[i] = '<math>' + paragraphList[i][2:] + '</math>'
		text = '\n'.join (paragraphList)
	# les figures
	if '<figure>' in text:
		# mettre en forme le contenu des figures
		paragraphList = text.split ('figure>')
		paragraphRange= range (1, len (paragraphList), 2)
		for i in paragraphRange:
			# nettoyer le texte pour faciliter sa transformation
			paragraphList[i] = paragraphList[i].strip ('\n')
			paragraphList[i] = paragraphList[i].split ('\n')
			paragraphRange = range (len (paragraphList[i]) -1)
			for j in paragraphRange:
				# les images ont deja ete modifiees precedement
				if paragraphList[i][j][:4] != '<img':
					paragraphList[i][j] = '<figcaption>' + paragraphList[i][j] + '</figcaption>'
			paragraphList[i] = "".join (paragraphList[i])
		text = 'figure>'.join (paragraphList)
	# les bloc de code
	if '<xmp>' in text:
		paragraphList = text.split ('xmp>')
		paragraphRange = range (1, len (paragraphList), 2)
		for i in paragraphRange:
			paragraphList[i] = paragraphList[i].strip()
			paragraphList[i] = paragraphList[i].strip ('\n\t ')
			paragraphList[i] = paragraphList[i].replaceAll ('\n', '\a')
			paragraphList[i] = paragraphList[i].replaceAll ('\t', '\f')
		text = 'xmp>'.join (paragraphList)
		text = text.replaceAll ('\a</xmp>', '</xmp>')
	# les listes
	if '<li>' in text:
		text = '\n'+ text +'\n'
		paragraphList = text.split ('\n')
		lc= range (len (paragraphList))
		# rajouter les balises fermantes
		for l in lc:
			if '<li>' in paragraphList [l]: paragraphList [l] = paragraphList [l] +'</li>'
		lc= range (1, len (paragraphList) -1)
		# rajouter les balises ouvrantes et fermantes delimitant la liste, <ul/>. reperer les listes imbriquees.
		for l in lc:
			if '<li>' in paragraphList [l]:
				# compter le niveau d'imbrication (n) de l'element paragraphList [l]
				n=0
				while '<li>'+n*'\t' in paragraphList [l]: n+=1
				n-=1
				if '<li>'+n*'\t' in paragraphList [l]:
					# debut de la liste (ou sous-liste), mettre le <ul>
					if '<li>'+n*'\t' not in paragraphList [l-1]: paragraphList [l] = '<ul>'+ paragraphList [l]
					# fin de la liste (ou sous-liste), mettre le </ul>
					if '<li>'+n*'\t' not in paragraphList [l+1]:
						while n >-1:
							if '<li>'+n*'\t' not in paragraphList [l+1]: paragraphList [l] = paragraphList [l] + '</ul>'
							n-=1
		# mettre le texte au propre
		text = '\n'.join (paragraphList)
		text = text.strip ('\n')
		while '<li>\t' in text: text = text.replaceAll ('<li>\t', '<li>')
		while '<ul>\t' in text: text = text.replaceAll ('<ul>\t', '<ul>')
		# liste ordonnée
		while '<li>#' in text:
			d= text.indexOf ('<li># ')
			d= text[:d].lastIndexOf ('<ul>')
			text = text[:d] + '<ol>' + text[d+4:]
			f= text.indexOf ('</ul>', d)
			while text[d:f].count ('<ul>') != text[d:f].count ('</ul>'): f= text.indexOf ('</ul>', f+4)
			text = text[:f] + '</ol>' + text[f+5:]
			text = text.replaceAll ('<li># ', '<li>', 1)
	# les tableaux
	if '\t' in text:
		paragraphList = text.split ('\n')
		len_chn = len (paragraphList)
		d=-1; c=-1; i=0
		while i< len_chn:
			# rechercher une table
			d=-1; c=-1
			if d==-1 and c==-1 and '\t' in paragraphList[i]:
				c= paragraphList[i].count ('\t')
				d=i; i+=1
			while i< len_chn and paragraphList[i].count ('\t') ==c: i+=1
			c=i-d
			# une table a ete trouve
			if c>1 and d>0:
				rtable = range (d, i)
				for j in rtable:
					# entre les cases
					paragraphList [j] = paragraphList [j].replaceAll ('\t', '</td><td>')
					# bordure des cases
					paragraphList [j] = '<tr><td>' + paragraphList [j] +'</td></tr>'
				# les limites de la table
				paragraphList [d] = '<table>\n' + paragraphList [d]
				paragraphList [i-1] = paragraphList [i-1] +'\n</table>'
			i+=1
		text = '\n'.join (paragraphList)
		# les titres de colonnes ou de lignes
		if ':</td></tr>' in text:
			paragraphList = text.split (':</td></tr>')
			paragraphRange = range (len (paragraphList) -1)
			for p in paragraphRange:
				d= paragraphList[p].lastIndexOf ('<tr><td>')
				paragraphList[p] = paragraphList[p][:d] +'<tr><th>'+ paragraphList[p][d+8:].replaceAll ('td>', 'th>')
			text = '</th></tr>'.join (paragraphList)
		if ':</td>' in text:
			paragraphList = text.split (':</td>')
			paragraphRange = range (len (paragraphList) -1)
			for p in paragraphRange:
				d= paragraphList[p].lastIndexOf ('<td>')
				paragraphList[p] = paragraphList[p][:d] +'<th>'+ paragraphList[p][d+4:]
			text = '</th>'.join (paragraphList)
	# nettoyer le texte pour faciliter la suite des transformations
	text = text.replaceAll ('\t', "")
	text = cleanText (text)
	# les <strong/>, mettre en gras le début d'une ligne
	if '\n* ' in text:
		paragraphList = text.split ('\n* ')
		lc= range (len (paragraphList))
		# rajouter les balises fermantes
		for l in lc:
			if ': ' in paragraphList[l][1:100]:
				paragraphList[l] = paragraphList[l].replaceAll (': ',':</strong> ',1)
				paragraphList[l] = '<strong>' + paragraphList[l]
			text = '\n'.join (paragraphList)
	# rajouter les <p/>
	text = text.replaceAll ('\n', '</p><p>')
	text = text.replaceAll ('></p><p><', '><')
	text = text.replaceAll ('></p><p>', '><p>')
	text = text.replaceAll ('</p><p><', '</p><')
	# rajouter d'eventuel <p/> s'il n'y a pas de balise en debut ou fin de text
	if '<' not in text [0:3]: text = '<p>'+ text
	if '>' not in text [-3:]: text = text +'</p>'
	# les images
	imgExtension =( 'jpg', 'jpeg', 'bmp', 'gif', 'png')
	imgCharStart = '>\n\t\'",;!()[]{}:'
	for ext in imgExtension:
		if '.'+ ext in text:
			textList = text.split ('.'+ ext)
			textRange = range (len (textList) -1)
			for i in textRange:
				d= textList[i].lastIndexOf (':')
				f= textList[i][:d].lastIndexOf (' ')
				for char in imgCharStart:
					e= textList[i][:d].lastIndexOf (char)
					if e>f: f=e
				f=f+1
				title = textList[i][f+1:].replaceAll ('-'," ")
				if textList[i+1][:2] == ' (':
					e= textList[i+1].indexOf (')')
					title = textList[i+1][2:e]
					textList[i+1] = textList[i+1][e+1:]
					title = title.replaceAll ('-'," ")
				else:
					if '/' in title:
						d=1+ title.lastIndexOf ('/')
						title = title[d:]
					if '\\' in title:
						d=1+ title.lastIndexOf ('\\')
						title = title[d:]
					title = cleanText (title)
				title = title.replaceAll ('_'," ")
				textList[i] = textList[i][:f] + "<img src='" + textList[i][f:].replaceAll ('http', 'ht/tp') +"."+ ext +"' alt='" + title +"'/>"
			text = "".join (textList)
	# transformer les p contenant un lien en a
	endingChars = '<;, !\t\n'
	paragraphList = text.split ('http')
	paragraphRange = range (1, len (paragraphList))
	for p in paragraphRange:
		paragraphTmp = paragraphList[p]
		e=-1; f=-1; d=-1
		for char in endingChars:
			if char in paragraphTmp:
				f= paragraphTmp.indexOf (char)
				paragraphTmp = paragraphTmp [:f]
		paragraphTmp = paragraphTmp.strip ('/')
		d= paragraphTmp.lastIndexOf ('/') +1
		e= len (paragraphTmp)
		if '.' in paragraphTmp[d:]: e= paragraphTmp.lastIndexOf ('.')
		title = paragraphTmp [d:e].replaceAll ('-',' ')
		if paragraphList[p][f:f+2] == ' (':
			e= paragraphList[p].indexOf (')')
			title = paragraphList[p][f+2:e]
			paragraphList[p] = paragraphList[p][e+1:]
		else: paragraphList[p] = paragraphList[p][f:]
		title = title.replaceAll ('_',' ')
		title = title.replaceAll ('-',' ')
		paragraphList[p] = paragraphTmp +"'>"+ title +'</a> '+ paragraphList[p]
	text = " <a href='http".join (paragraphList)
	text = text.replaceAll ('> <a ', '><a ')
	text = text.replaceAll ('ht/tp', 'http')
	# pour les blocs de code
	text = text.replaceAll ('\a', '\n')
	text = text.replaceAll ('\f', '\t')
	text = text.cleanHtml()
	text = text.replaceAll (' </', '</')
	return text
*/
String.prototype.toHtmlShapes = function(){
	// le texte à été préalablement transformé par toHtml. shape.css contient le style correspondant aux balises créées.
	var text = this;
	if (text.includes ('<-->')) text = text.replaceAll ('<-->', "<hr class='arrow horizontal'/>");
	if (text.includes ('-->')) text = text.replaceAll ('-->', "<hr class='arrow'/>");
	if (text.includes ('<--')) text = text.replaceAll ('<--', "<hr class='arrow left'/>");
	return text;
}
HTMLElement.prototype.fromText = function (text){
	text = text.toHtml();
	this.innerHTML = text;
}
String.prototype.cleanHtml = function(){
	var text = this.replaceAll ('\n', "");
	text = text.replaceAll ('\t', "");
	text = text.cleanTxt();
	// nettoyer les balises
	text = text.replaceAll ('> ','>');
	text = text.replaceAll (' <','<');
	text = text.replaceAll ('<br>', '<br/>');
	text = text.replaceAll ('<hr>', '<hr/>');
	while (text.includes ('<br/><br/>')) text = text.replaceAll ('<br/><br/>', '<br/>');
	const tagHtml =( 'span', 'p', 'div', 'section', 'tr', 'caption', 'table' );
	for (var c=0; c< tagHtml.length; c++) text = text.replaceAll ('<'+ tagHtml[c] +'></'+ tagHtml[c] +'>', "");
	return text;
}