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

var downloadLink = "<a id='download-link' href='data:text/plain;charset=utf-8,$data' download='recap $demarche $date.html'>télécharger</a>";
var downloadPage = `<!DOCTYPE html><html lang='fr'><head><title>recap $demarche $date</title>
	<meta name='viewport' content='width=device-width,initial-scale=1'/><meta charset='utf-8'/><base target='_blank'>
</head><body>
	<h1>recap $demarche $date</h1>
	$text
</body></html>`;

function getToday(){
	const today = new Date();
	var todayStr = '0'+ today.getMinutes();
	log (todayStr, todayStr.length);
	if (todayStr.length ===3) todayStr = todayStr.substring (1);
//	if (todayStr.length ===1) todayStr = '0'+ todayStr;
	todayStr = today.getHours() +'-'+ todayStr;
	if (todayStr.length <5) todayStr = '0'+ todayStr;
	todayStr = today.getDate() +'-'+ todayStr;
	if (todayStr.length <8) todayStr = '0'+ todayStr;
	todayStr = today.getMonth() +'-'+ todayStr;
	if (todayStr.length <11) todayStr = '0'+ todayStr;
	return todayStr;
}
function getRecap (demarche){
	// préparer le titre
	const todayStr = getToday();
	downloadPage = downloadPage.replaceAll ('$demarche', demarche);
	downloadPage = downloadPage.replaceAll ('$date', todayStr);
	// préparer le lien de téléchargement
	const downloadLink = document.createElement ('a');
	downloadLink.href = 'data:text/plain;charset=utf-8,';
	downloadLink.download = demarche +" "+ todayStr + " recap.html";
	// récupérer le récap
	var tagRecap = document.getElementsByTagName ('form')[0];
	var containers = tagRecap.getElementsByProperties ('div', 'fr-grid-row');
	tagRecap = containers[1];
	downloadPage = downloadPage.replace ('$text', tagRecap.innerHTML);
	// activer le lien
	var textEncoded = encodeURIComponent (downloadPage);
	textEncoded = textEncoded.replaceAll ("'", '%27');
	downloadLink.href = downloadLink.href + textEncoded;
	downloadLink.click();
}
function getRecap_va (demarche){
	// préparer le titre
	const todayStr = getToday();
	downloadLink = downloadLink.replace ('$demarche', demarche);
	downloadLink = downloadLink.replace ('$date', todayStr);
	downloadPage = downloadPage.replaceAll ('$demarche', demarche);
	downloadPage = downloadPage.replaceAll ('$date', todayStr);
	// récupérer le récap
	var tagRecap = document.getElementsByTagName ('form')[0];
	var containers = tagRecap.getElementsByProperties ('div', 'fr-grid-row');
	tagRecap = containers[1];
	downloadPage = downloadPage.replace ('$text', tagRecap.innerHTML);
	var textEncoded = encodeURIComponent (downloadPage);
	textEncoded = textEncoded.replaceAll ("'", '%27');
	downloadLink = downloadLink.replace ('$data', textEncoded);
	tagRecap.innerHTML = tagRecap.innerHTML + downloadLink;
}