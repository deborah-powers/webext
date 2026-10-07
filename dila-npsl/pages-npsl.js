chrome.action.onClicked.addListener (function (tab){
	if (! tab.url.includes ('/mademarche/')) return;
//	if (! tab.url.includes ('/mademarche/demarcheGenerique/')) return;
	else if (tab.title.includes ('Votre demande a été envoyée')) chrome.scripting.executeScript ({
		target: {tabId: tab.id, allFrames: false },
		files: [ 'demarche-terminer.js' ]
	});
	else if (tab.url.includes ('DemandeAutorisationEnvironnementale')) chrome.scripting.executeScript ({
		target: {tabId: tab.id, allFrames: false },
		files: [ 'demarche-daenv.js' ]
	});
	else if (tab.url.includes ('pub-changement-nom')) chrome.scripting.executeScript ({
		target: {tabId: tab.id, allFrames: false },
		files: [ 'demarche-pcn.js' ]
	});
	else if (tab.url.includes ('EtatCivil')) chrome.scripting.executeScript ({
		target: {tabId: tab.id, allFrames: false },
		files: [ 'demarche-etatcivil.js' ]
	});
	else if (tab.url.includes ('depotDossierPACS')) chrome.scripting.executeScript ({
		target: {tabId: tab.id, allFrames: false },
		files: [ 'demarche-ddpacs.js' ]
	});
	else if (tab.url.includes ('DDmariage')) chrome.scripting.executeScript ({
		target: {tabId: tab.id, allFrames: false },
		files: [ 'demarche-ddmariage.js' ]
	});
	else if (tab.url.includes ('TranscriptionActe')) chrome.scripting.executeScript ({
		target: {tabId: tab.id, allFrames: false },
		files: [ 'demarche-transcription.js' ]
	});
	else if (tab.url.includes ('CIPHYTO')) chrome.scripting.executeScript ({
		target: {tabId: tab.id, allFrames: false },
		files: [ 'demarche-ciphyto.js' ]
	});
	else if (tab.url.includes ('EICPE')) chrome.scripting.executeScript ({
		target: {tabId: tab.id, allFrames: false },
		files: [ 'demarche-eicpe.js' ]
	});
	else if (tab.url.includes ('rnipp')) chrome.scripting.executeScript ({
		target: {tabId: tab.id, allFrames: false },
		files: [ 'demarche-rnipp.js' ]
	});
	else if (tab.url.includes ('JeChangeDeCoordonnees')) chrome.scripting.executeScript ({
		target: {tabId: tab.id, allFrames: false },
		files: [ 'demarche-jcc.js' ]
	});
	else if (tab.url.includes ('DAUA')) chrome.scripting.executeScript ({
		target: {tabId: tab.id, allFrames: false },
		files: [ 'demarche-daua.js' ]
	});
	else if (tab.url.includes ('RenouvPasseport')) chrome.scripting.executeScript ({
		target: {tabId: tab.id, allFrames: false },
		files: [ 'demarche-rnpp.js' ]
	});
	else if (tab.url.includes ('INSRegistreFR')) chrome.scripting.executeScript ({
		target: {tabId: tab.id, allFrames: false },
		files: [ 'demarche-irf.js' ]
	});
	else if (tab.url.includes ('ModificationAIOT')) chrome.scripting.executeScript ({
		target: {tabId: tab.id, allFrames: false },
		files: [ 'demarche-maiot.js' ]
	});
	else if (tab.url.includes ('arnaqueInternet')) chrome.scripting.executeScript ({
		target: {tabId: tab.id, allFrames: false },
		files: [ 'demarche-ai.js' ]
	});
	else if (tab.url.includes ('DeclarationIncidentAccident')) chrome.scripting.executeScript ({
		target: {tabId: tab.id, allFrames: false },
		files: [ 'demarche-diaic.js' ]
	});
	else if (tab.url.includes ('codeDemarche=CR')) chrome.scripting.executeScript ({
		target: {tabId: tab.id, allFrames: false },
		files: [ 'demarche-cr.js' ]
	});
	else if (tab.title.includes ('Vérification et envoi')) chrome.scripting.executeScript ({
		target: {tabId: tab.id, allFrames: false },
		files: [ 'demarche-recap.js' ]
	});
});
