var header =`<title></title>
	<meta name='viewport' content='width=device-width,initial-scale=1'/>
	<meta charset='utf-8'/>
`;
crutialData = `
cleanBody: function(){
	document.body.cleanBody();
	document.body.delAttributes();
	document.body.delIds();
},
findTitle: findTitle
`;
const libHtml = callLibrary ([ 'textFct', 'htmlFct', 'pageFct' ]);
console.log (libHtml);
libHtml.cleanBody();
const title = libHtml.findTitle();
header = header.replace ('<title></title>', '<title>' + title + '</title>');
document.head.innerHTML = header;
addStyle ([ 'structure', 'perso' ]);
