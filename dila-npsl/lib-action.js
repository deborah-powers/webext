function goNextPage_vb(){
	var buttonNext = document.getElementById ('btn-next');	// npsl
	console.log (buttonNext);
	if (! buttonNext) buttonNext = document.getElementById ('suivant');	// legacy
	buttonNext.click();
}
function goNextPage(){
	const buttonNext = document.getElementById ('btn-next');
	buttonNext.click();
}
function goNextLegacyPage(){
	const buttonNext = document.getElementById ('suivant');
	buttonNext.click();
}
function validate(){
	const buttonValider = document.body.findByInnerText ('Valider');
	buttonValider.addEventListener ('click', function (event){});
}
function adresseEnFranceRochefourchat(){
	fillInputByLabel ('En France');
	setTimeout (function(){
		fillInputByLabel ('Écrire mon adresse');
		setTimeout (function(){
			fillInputByLabel ('nom de la voie', '11 avenue Aristide Briand');
			fillInputByLabel ('Code postal et commune', 'ROCHEFOURCHAT');
			fillInputByLabel ('Lieu-dit', 'les châteaux');
		//	fillInputByLabel ('Téléphone', '0678910112');
	}, 500); }, 500);
}
function adresseEnFranceArpajon(){
	fillInputByLabel ('En France');
	setTimeout (function(){
		fillInputByLabel ('Adresse', '11 avenue Aristide Briand, 91290');
	//	fillInputByLabel ('Téléphone', '0678910112');
	}, 500);
}
function adresseEnHongrie(){
	fillInputByLabel ("A l'étranger");
	setTimeout (function(){
		fillInputByLabel ('nom de la voie', '11 rue paskal');
		fillInputByLabel ('Code postal', '99112');
		fillInputByLabel ('Ville ou localité', 'Budapest');
		const inputs = document.body.findHomonymInputs ('Pays');
		inputs[1].fillInput ('HONGRIE');
	//	fillInputByLabel ('Pays', 'HONGRIE');
	}, 500);
}
function naissanceEnHongrie(){
	document.body.addBlurListener ('Pays de naissance', 'HONGRIE', function(){ fillInputByLabel ('Commune de naissance', 'Budapest'); });
/*	fillInputByLabel ('Pays de naissance', 'HONGRIE');
	setTimeout (function(){ fillInputByLabel ('Commune de naissance', 'Budapest'); }, 500);
	*/
}
function pageParents (nomPere, prenomPere, nomMere, prenomMere){
	if (document.body.innerText.includes ('parent 1 ?')){
		var personne = document.body.findByInnerText ('parent 1 ?').parentElement;
		personne = personne.findContainer ('fieldset');
		personne.fillInputByLabel ('Père');
		personne.fillInputByLabel ('Nom', nomPere.capitalize());
		personne.fillInputByLabel ('Prénom', prenomPere.capitalize());
		personne = document.body.findByInnerText ('parent 2 ?').parentElement;
		personne = personne.findContainer ('fieldset');
		personne.fillInputByLabel ('Mère');
		personne.fillInputByLabel ('Nom', nomMere.capitalize());
		personne.fillInputByLabel ('Prénom', prenomMere.capitalize());
}}
/* ------------------------ fin de la démarche ------------------------ */

var downloadLink = "<a id='download-link' href='data:text/plain;charset=utf-8,$data' download='recap $demarche $psl $date.html'>télécharger</a>";
var downloadPage = `<!DOCTYPE html><html lang='fr'><head><title>recap $demarche $date</title>
	<meta name='viewport' content='width=device-width,initial-scale=1'/><meta charset='utf-8'/><base target='_blank'>
</head><body>
	<h1>recap $demarche $date</h1>
	$text
</body></html>`;

function getToday(){
	const today = new Date();
	var todayStr = '0'+ today.getMinutes();
	if (todayStr.length ===3) todayStr = todayStr.substring (1);
//	if (todayStr.length ===1) todayStr = '0'+ todayStr;
	todayStr = today.getHours() +'-'+ todayStr;
	if (todayStr.length <5) todayStr = '0'+ todayStr;
	todayStr = today.getDate() +'-'+ todayStr;
	if (todayStr.length <8) todayStr = '0'+ todayStr;
	todayStr = (1+ today.getMonth()) +'-'+ todayStr;
	if (todayStr.length <11) todayStr = '0'+ todayStr;
	return todayStr;
}
String.prototype.delPaddingTag = function(){
}
String.prototype.cleanForShow = function(){
	var htmlText = this.cleanHtml();
	htmlText = htmlText.delScripts();
	htmlText = htmlText.delComments();
	htmlText = htmlText.delHiddenInputs();
	var d=0;
	var f=0;
	var textList = htmlText.split ('<');
	for (var l=1; l< textList.length; l++){
		f= textList[l].indexOf ('>');
		d= textList[l].indexOf (" ");
		if (d>f || textList[l].substring (0,f).includes ('<') || ! textList[l].substring (0,f).includes (" ")) continue;
		else if (textList[l].substring (0,d) === 'input') continue;
		textList[l] = textList[l].substring (0,d) + textList[l].substring (f);
	}
	htmlText = textList.join ('<');
	htmlText = htmlText.delAttributeFamily ('aria');
	htmlText = htmlText.delAttributeFamily ('data');
	const attributes =[ 'class', 'id', 'role', 'style', 'title', 'required' ];
	for (var attr of attributes) htmlText = htmlText.delAttribute (attr);
	return htmlText;
}
function getRecap (demarche){
	// préparer le titre
	const todayStr = getToday();
	downloadPage = downloadPage.replaceAll ('$demarche', demarche);
	downloadPage = downloadPage.replaceAll ('$date', todayStr);
	// préparer le lien de téléchargement
	const downloadLink = document.createElement ('a');
	downloadLink.href = 'data:text/plain;charset=utf-8,';
	var psl = 'psl';
	if (window.location.search.includes ('codeDemarche=')) psl = 'npsl';
	else if (window.location.search.includes ('execution=')) psl = 'lega';
	else return;
	downloadLink.download = demarche +" "+ todayStr +" "+ psl +" recap.html";
	// récupérer le récap
	var tagRecap = document.getElementsByTagName ('form')[0];
	const tagStock = document.createElement ('div');
	if (window.location.search.includes ('codeDemarche=')){
		// pour npsl
		var containers = tagRecap.getElementsByProperties ('div', 'fr-grid-row');
		tagRecap = containers[1];
		tagStock.innerHTML = tagRecap.innerHTML;
	}
	else{
		// pour legacy
		var containers = tagRecap.getElementsByProperties ('div', 'cadre-recap');
		for (var contain of containers) tagStock.innerHTML = tagStock.innerHTML + contain.outerHTML;
	}
	tagStock.innerHTML = tagStock.innerHTML.cleanHtml();
	tagStock.removeComments();
	for (var a= tagStock.attributes.length -1; a>=0; a--) tagStock.removeAttribute (tagStock.attributes[a].name);
	tagStock.innerHTML = tagStock.innerHTML.delHiddenInputs();
/*	tagStock.innerHTML = tagStock.innerHTML.replaceAll ('</h3></div>', '</h3>');
	tagStock.innerHTML = tagStock.innerHTML.replaceAll ('<div><div></div><h3> ', '<h3>');
	*/
	tagStock.delAttributes();
	tagStock.delIds();
	tagStock.innerHTML = tagStock.innerHTML.replaceAll ('<div>', "");
	tagStock.innerHTML = tagStock.innerHTML.replaceAll ('</div>', "");
	tagStock.innerHTML = tagStock.innerHTML.replaceAll ('</span><span>', " ");
	tagStock.innerHTML = tagStock.innerHTML.replaceAll ('<span>', "");
	tagStock.innerHTML = tagStock.innerHTML.replaceAll ('</span>', "");
	tagStock.simplifyNesting();
	tagStock.innerHTML = tagStock.innerHTML.cleanHtml();
//	const tagRecapText = tagRecap.innerHTML.cleanForShow();
	downloadPage = downloadPage.replace ('$text', tagStock.innerHTML);
	// activer le lien
	var textEncoded = encodeURIComponent (downloadPage);
	textEncoded = textEncoded.replaceAll ("'", '%27');
	downloadLink.href = downloadLink.href + textEncoded;
	downloadLink.click();
}
function terminerDemarche(){
	var linkDownload = document.body.findByInnerText ('Télécharger votre récapitulatif');
	linkDownload = linkDownload.findContainer ('a');
	linkDownload.click();
	if (document.body.containsText ('Télécharger le flux')){
		linkDownload = document.body.findByInnerText ('Télécharger le flux');
		linkDownload = linkDownload.findContainer ('a');
		linkDownload.click();
		setTimeout (function(){ clickButtonByText ('Terminer'); }, 500);
}}
function terminerDemarcheLegacy(){
	const linkDownload = document.getElementById ('confirmationTelechargement_btn_cofirmationPaseport');
	linkDownload.click();
	clickButtonByText ('Terminer');
}