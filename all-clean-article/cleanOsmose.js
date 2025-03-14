var header =`<title></title>
	<meta name='viewport' content='width=device-width,initial-scale=1'/>
	<meta charset='utf-8'/>
`;
crutialData = `
cleanBody: function(){
	document.body.innerHTML = document.body.innerHTML.cleanHtml();
	document.body.replaceTag ('main');
	const h1 = document.body.findTag ('h1');
	document.body.replaceTag ('wysiwyg');
	if (document.body.innerHTML.includes ('<strong>A compléter plus tard</strong> [BEGIN]')){
		var textList = document.body.innerHTML.split ('<strong>A compléter plus tard</strong> [BEGIN]');
		for (var t=0; t< textList.length -1; t++){
			var d= textList[t].lastIndexOf ('<p>');
			textList[t] = textList[t].substring (0,d);
			d= textList[t+1].indexOf ('<strong>A compléter plus tard</strong> [END]');
			d=4+ textList[t+1].indexOf ('</p>', d);
			textList[t+1] = textList[t+1].substring (d);
		}
		document.body.innerHTML = textList.join ("<p>à compléter</p>");
	}
	document.body.innerHTML = h1.outerHTML + document.body.innerHTML;
	document.body.cleanBody();
	document.body.delAttributes();
	document.body.delIds();
	document.body.innerHTML = document.body.innerHTML.replaceAll ('<span>', " ");
	document.body.innerHTML = document.body.innerHTML.replaceAll ('</span>', " ");
	document.body.innerHTML = document.body.innerHTML.replaceAll ('<strong>', " ");
	document.body.innerHTML = document.body.innerHTML.replaceAll ('</strong>', " ");
//	while (document.body.innerHTML.includes ("  ")) document.body.innerHTML.replaceAll ("  "," ");
},
findTitle: findTitle
`;
const libHtml = callLibrary ([ 'textFct', 'htmlFct', 'pageFct' ]);
const title = libHtml.findTitle();

libHtml.cleanBody();
header = header.replace ('<title></title>', '<title>' + title + '</title>');
document.head.innerHTML = header;

// échanger avec le serveur
const toServer ={
	'title': title,
	'author': 'synergie',
	'subject': 'wiki osmose',
	'link': window.location.href,
	'text': document.body.innerHTML
};
const url = 'http://localhost:1407/';
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function(){ if (this.readyState ==4) console.log (this.responseText); };
xhttp.open ('POST', url, true);
xhttp.send (toServer);
