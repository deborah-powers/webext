function chooseActionOverPage(){
	if (window.location.href.includes ('/service-public/protocol/openid-connect/')){
		const main = document.getElementsByTagName ('main')[0];
		const buttonFranceConnect = main.getElementsByTagName ('a')[2];
		buttonFranceConnect.click();
	}
	else if (window.location.href.includes ('franceconnect.fr/api/v2/interaction/')){
		var form = null;
		if (window.location.href.includes ('/consent')) form = document.getElementsByTagName ('form')[0];	// page de re-connexion
		else form = document.getElementsByTagName ('form')[2];	// page de connexion
		const buttonFranceConnect = form.getElementsByTagName ('button')[0];
		buttonFranceConnect.click();
		setTimeout (function (event){ log (buttonFranceConnect); }, 2000);
	}
	else if (window.location.href.includes ('fournisseur-d-identite.fr/interaction/')){
		// les données sont déjà pré-entrées
		const main = document.getElementsByTagName ('form')[0];
		const buttonFranceConnect = main.getElementsByTagName ('button')[0];
		buttonFranceConnect.click();
		setTimeout (chooseActionOverPage, 3000);
	}
	if (document.body.innerText.includes ('Étape 1') && document.body.innerText.includes ('Avertissement')){
		const buttonNext = document.getElementById ('btn-next');
		buttonNext.click();
}}
setTimeout (chooseActionOverPage, 2000);
const buttonNext = document.getElementById ('btn-next');
if (buttonNext){
	buttonNext.click = function (event){
		log (event);
		setTimeout (chooseActionOverPage, 3000);
}}
