var pageName ="";
function trouverMetadonneeHeader (nomMeta, codeMeta){
	var d=2+ nomMeta.length + pageOriginale.indexOf (nomMeta +": ");
	pageOriginale = pageOriginale.substring (d);
	d= pageOriginale.indexOf ('\n');
	pageFinale = pageFinale.replace ('$'+ codeMeta, pageOriginale.substring (0,d));
	if ('page' === codeMeta) pageName = pageOriginale.substring (0,d);
	pageOriginale = pageOriginale.substring (d+1);
}
var pageOriginale = document.body.innerHTML.cleanTxt();

// rajourer les métadonnées du header
trouverMetadonneeHeader ("ate d'audit", 'date');
trouverMetadonneeHeader ('udité par', 'auditeur');
trouverMetadonneeHeader ('age audité', 'page');
trouverMetadonneeHeader ('ien de la page', 'lien');
headPage = headPage.replace ('$page', pageName);
document.head.innerHTML = headPage;
