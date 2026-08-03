function fillConnectionPage(){
	if (window.location.href.includes ('/service-public/protocol/openid-connect/')){
		// désactiver pour se connecter via les identifiants Service Public
		const main = document.getElementsByTagName ('main')[0];
		const buttonFranceConnect = main.getElementsByTagName ('a')[2];
		buttonFranceConnect.click();
	}
	else if (window.location.href.includes ('franceconnect.fr/api/v2/interaction/')){
		var form = null;
		if (window.location.href.includes ('/consent')) form = document.getElementsByTagName ('form')[0];	// page de re-connexion
		else{
			// page de connexion
			form = document.getElementsByTagName ('form')[2];
			if (! form) form = document.getElementsByTagName ('form')[0];
		}
		const buttonFranceConnect = form.getElementsByTagName ('button')[0];
		buttonFranceConnect.click();
	}
	else if (window.location.href.includes ('fournisseur-d-identite.fr/interaction/')){
		// page de connection avec france connect. certaines données sont déjà pré-entrées. désactiver ou modifier pour changer de compte
		setTimeout (function(){
			const main = document.getElementsByTagName ('form')[0];
			const userFields = main.getElementsByTagName ('input');
			userFields[1].value = 'test_BERTRAND';
			userFields[2].value = '123';
			const buttonFranceConnect = main.getElementsByTagName ('button')[0];
			buttonFranceConnect.click();
		}, 1000);
}}
fillConnectionPage();
// setTimeout (fillConnectionPage, 1000);