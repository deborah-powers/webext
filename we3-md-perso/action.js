const styleRf =`<style type='text/css'>
h1 {
	font-size: 1.2em;
	border-width: 0.4em;
	border-top-style: double;
	border-bottom-style: double;
	background-color: var(--fond-color);
}
h2 {
	font-size: 1.2em;
	color: var(--page-color);
	background-color: var(--bord-color);
}
h2.ok { background-color: teal; }
h2.ko { background-color: orangered; }
h3 {
	border-top-style: solid;
}
p.resultat {
	padding: 1em;
	border-radius: 1em;
	background-color: var(--fond-color);
	text-align: center;
}
</style>`;

var text = document.body.children[0].innerHTML.toHtml();
text = text.toHtmlShapes();
if (window.location.origin === 'file://' && window.location.href.includes ('/rf%20')){
	/*
	text = text.replaceAll ('<h1>', '</section><section><h1>');
	text = '<section>' + text + '</section>';
	*/
	var d=0;
	const textList = text.split ('</h2><p>Titre');
	for (var t=1; t< textList.length; t++){
		textList[t] = textList[t].replace ('</p>', '</h2>');
		d=20+ textList[t].indexOf ('<p>Resultat obtenu: ');
		const resultat = textList[t].substring (d, d+2);
		if (resultat === 'Ok') textList[t-1] = textList[t-1].replace ('<h2>', "<h2 class='ok'>");
		else if (resultat === 'KO') textList[t-1] = textList[t-1].replace ('<h2>', "<h2 class='Ko'>");
	}
	text = textList.join ("");
	text = text.replaceAll ('<p>Resultat obtenu: Ok</p>', "");
	text = text.replaceAll ('<p>Resultat obtenu: Ko</p>', "");
//	text = text.replaceAll ('<p>Resultat obtenu: Non réalisable, ', "<p class='resultat inconnu'>");
	document.head.innerHTML = document.head.innerHTML + styleRf;
}
document.body.innerHTML = text;