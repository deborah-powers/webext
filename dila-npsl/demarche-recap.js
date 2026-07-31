if (document.body.innerText.includes ('Vérification et envoi') || document.body.innerText.includes ('Votre démarche est bientôt terminée'))
	getRecap (window.location.search.substring (14));
else if (document.body.innerText.includes ('Télécharger votre récapitulatif')) terminerDemarche();
