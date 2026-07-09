
chrome.action.onClicked.addListener (function (tab){
	if (! tab.url.includes ('/mademarche/')) return;
//	if (! tab.url.includes ('/mademarche/demarcheGenerique/')) return;
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
	else chrome.scripting.executeScript ({
		target: {tabId: tab.id, allFrames: false },
		files: [ 'demarche-recap.js' ]
	});
});
