var header =`<title></title>
	<meta name='viewport' content='width=device-width,initial-scale=1'/>
	<meta charset='utf-8'/>
`;
if (! exists (metas)){
	// récupérer le titre et nettoyer les headers
	var title = document.head.getElementsByTagName ('title')[0].innerHTML;
	title = title.toLowerCase().clean();
	header = header.replace ('<title></title>', '<title>' + title + '</title>');
	document.head.innerHTML = header;
	document.body.cleanBody();
	document.body.delAttribute();
}