var header =`<title></title>
	<meta name='viewport' content='width=device-width,initial-scale=1'/>
	<meta charset='utf-8'/>
`;
function setMeta (name, value){
	const metaTag = document.createElement ('meta');
	metaTag.name = name;
	if (exists (value)) metaTag.content = value;
	else metaTag.content ="";
	document.head.appendChild (metaTag);
}
if (! exists (document.getElementById ('marqueur-nettoyage'))){
	// récupérer le titre et nettoyer les headers
	var title = document.head.getElementsByTagName ('title')[0].innerHTML;
	title = title.toLowerCase();
	header = header.replace ('<title></title>', '<title>' + title + '</title>');
	document.head.innerHTML = header;
	document.body.cleanBody();
	document.body.delAttribute();
	// infos à conserver pour l'enregistrement
	setMeta ('link', window.location.href);
	setMeta ('author', 'anonyme');
	setMeta ('subject', 'divers');
	cleanEb();
	cleanAooo();
	// balise marqueur, pour vérifier si l'affichage à déjà été modifié
	const marqueur = document.createElement ('p');
	marqueur.id = 'marqueur-nettoyage';
	marqueur.innerHTML = 'page propre';
	marqueur.style = 'display: none';
	document.body.appendChild (marqueur);
}
function cleanAooo(){
	if (window.location.href.includes ('https://archiveofourown.org/works/')){
		document.body.innerHTML = document.getElementsByClassName ('work')[0].innerHTML;
		const tmpTag = document.createElement ('div');
		tmpTag.appendChild (document.getElementsByTagName ('ul')[0];
		tmpTag.appendChild (document.getElementsByTagName ('ul')[0];
}}
function cleanEb(){
	if (window.location.href.includes ('https://www.ebooksgratuits.com/html/')){
		var auteur ="";
		if (exists (document.getElementsByClassName ('Auteur'))) auteur = document.getElementsByClassName ('Auteur')[0].innerHTML;
		else auteur = document.getElementsByClassName ('MsoNormal')[0].innerHTML;
		setMeta ('author', auteur);
		setMeta ('subject', 'fiction');
		if (exists (document.getElementsByClassName ('Section1'))) document.body.innerHTML = document.getElementsByClassName ('Section1')[0].innerHTML;
		document.body.delIds();
}}