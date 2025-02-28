var header =`<title></title>
	<meta name='viewport' content='width=device-width,initial-scale=1'/>
	<meta charset='utf-8'/>
`;
document.head.innerHTML = header;

crutialData = `
cleanBody: function(){ document.body.cleanBody(); },
delAttribute: function(){
	document.body.delAttribute();
	document.body.delIds();
}`;
const libHtml = callLibrary ([ 'textFct', 'htmlFct', 'pageFct' ]);
libHtml.cleanBody();
libHtml.delAttribute();
addStyle ([ 'structure', 'perso' ]);

