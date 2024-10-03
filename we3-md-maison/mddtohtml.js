const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZaàâbcdeéêèëfghiîïjkmlmnoôpqrstuûvwxyz0123456789-\xe7\xc7';
const punctuation = '.?!:\n\t';
const weirdChars =[
	['« ', '"'], [' »', '"'], ['«', '"'], ['»', '"'], ['–', '-'], ['‘', "'"], ['’', "'"], ['“', '"'], ['”', '"'], ['"', '"'], ['&hellip;', '...'], ['&#8230;', '...'], ['…', '...'],
	['\n ', '\n'], ['\r', ''], [' \n', '\n'], ["\\'", "'"], ['\\n', '\n'], ['\\r', ''], ['\\t', '\t'],
	['\\u00c2', 'Â'], ['\\u00ca', 'Ê'], ['\\u00cb', 'Ë'], ['\\u00ce', 'Î'], ['\\u00cf', 'Ï'], ['\\u00d4', 'Ô'], ['\\u00d6', 'Ö'], ['\\u00db', 'Û'], ['\\u00e0', 'à'], ['\\u00e2', 'â'], ['\\u00e7', 'ç'], ['\\u00e8', 'è'], ['\\u00e9', 'é'], ['\\u00ea', 'ê'], ['\\u00eb', 'ë'], ['\\u00ee', 'î'], ['\\u00ef', 'ï'], ['\\u00f4', 'ô'], ['\\u00f6', 'ö'], ['\\u00fb', 'û'],
	['\\', '/'],
	['\x85', '.'], ['\x92', "'"], ['\x96', '"'], ['\x97', "'"], ['\x9c', ' '], ['\xa0', ' '],
	['&agrave;', 'à'], ['&acirc;', 'â'], ['&ccedil;', 'ç'], ['&eacute;', 'é'], ['&egrave;', 'è'], ['&ecirc;', 'ê'], ['&icirc;', 'î'], ['&iuml;', 'ï'], ['&ocirc;', 'ô'], ['&ugrave;', 'ù'], ['&ucirc;', 'û'], ['&apos;', "'"],
	['&mdash;', ' '], ['&nbsp;', ''], ['&oelig;', 'oe'], ['&quot;', ''], ['&lt;', '<'], ['&gt;', '>'], ['&lsquo;', '"'], ['&ldquo;', '"'], ['&rdquo;', '"'], ['&rsquo;', "'"], ['&laquo;', '"'], ['&raquo;', '"'], ['&#8220;', '"'], ['&#8221;', '"'], ['&#8211;', '-'],
	['&amp;', '&'], ['&#x27;', "'"], ['&#039', "'"], ['&#160;', ' '], ['&#39;', "'"], ['&#8217;', "'"], ['\n" ', '\n"']
];
String.prototype.cleanBasic = function(){
	var text = this.strip();
	for (var c=0; c< weirdChars.length; c++) text = text.replaceAll (weirdChars[c][0], weirdChars[c][1]);
	text = text.strip();
	while text.includes ("  ") text = text.replaceAll ("  "," ");
	text = text.replaceAll ('\n ', '\n');
	text = text.replaceAll (' \n', '\n');
	text = text.replaceAll ('\t ', '\t');
	text = text.replaceAll (' \t', '\t');
	while text.includes ('\t\t') text = text.replaceAll ('\t\t', '\t');
	while text.includes ("  ") text = text.replaceAll ("  "," ");
	text = text.replaceAll ('\t\n', '\n');
	while text.includes ('\n\n') text = text.replaceAll ('\n\n', '\n');
	return text;
}
String.prototype.cleanTxt = function(){
	var text = this.cleanBasic();
	// la ponctuation
	const punctuation = '?!;.:,';
	for (p in punctuation) text = text.replaceAll (' '+p, p);
	while (text.includes '....') text = text.replaceAll ('....', '...');
	for (var l=0; l< letters.length; l++){
		text = text.replaceAll (letter +'!', letter +' !');
		text = text.replaceAll (letter +'?', letter +' ?');
		text = text.replaceAll (letter +';', letter +' ;');
		text = text.replaceAll ('...' + letter, '... '+ letter);
	}
	while (text.includes ("  ")) text = text.replaceAll ("  "," ");
	// restaurer les url
	if (text.includes ('http') && text.includes ('?')){
		var textList = text.split ('?');
		for (var t=0; t< textList.length -1; t++){
			if (textList[t].includes ('http')){
				var d= textList[t].lastIndexOf ('http');
				const textTmp = textList[t].substring (d);
				if (textTmp.includes (" ") || textTmp.includes ('\t') || textTmp.includes ('\n')) textList[t] = textList[t] +" ";
			}
			else textList[t] = textList[t] +" ";
		}
		text = textList.join ('?');
	}
	// restaurer les heures
	var textList = text.split (':');
	for (var t=0; t< textList.length -1; t++){
		if (textList[t].length >1 && textList[t+1].length >1
			&& '012345'.includes (textList[t][-2]) && '0123456789'.includes (textList[t][-1])
			&& '012345'.includes (textList[t+1][0]) && '0123456789'.includes (textList[t+1][1]))
			continue;
		else textList[t+1] =" "+ textList[t+1]
	}
	text = textList.join (':');
	while (text.includes ("  ")) text = text.replaceAll ("  "," ");
	charEndUrl = '\n\t \'",;!()[]{}';
	for (var w=0; w<8; w++) text = text.replaceAll (urlWords[0], urlWords[1]);
	for (var w=8; w< urlWords.length; w++){ for (var e=0; e< charEndUrl.length; e++) text = text.replaceAll (urlWords[0] +e, urlWords[1] +e); }
	text = text.replaceAll (' \n', '\n');
	text = text.replaceAll (' \t', '\t');
	text = text.replaceAll ('\t ', '\t');
	text = text.replaceAll ('\n ', '\n');
	return text;
}
