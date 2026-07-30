
chrome.action.onClicked.addListener (function (tab){
	if (! tab.url.includes ('/mademarche/')) return;
//	if (! tab.url.includes ('/mademarche/demarcheGenerique/')) return;
	else if (tab.url.includes ('DemandeAutorisationEnvironnementale')) chrome.scripting.executeScript ({
		target: {tabId: tab.id, allFrames: false },
		files: [ 'textFct.js', 'htmlFct.js', 'pageFct.js', 'demarche-daenv.js' ]
	});
	else if (tab.url.includes ('pub-changement-nom')) chrome.scripting.executeScript ({
		target: {tabId: tab.id, allFrames: false },
		files: [ 'textFct.js', 'htmlFct.js', 'pageFct.js', 'demarche-pcn.js' ]
	});
	else if (tab.url.includes ('EtatCivil')) chrome.scripting.executeScript ({
		target: {tabId: tab.id, allFrames: false },
		files: [ 'textFct.js', 'htmlFct.js', 'pageFct.js', 'demarche-etatcivil.js' ]
	});
	else if (tab.url.includes ('depotDossierPACS')) chrome.scripting.executeScript ({
		target: {tabId: tab.id, allFrames: false },
		files: [ 'textFct.js', 'htmlFct.js', 'pageFct.js', 'demarche-ddpacs.js' ]
	});
	else if (tab.url.includes ('CIPHYTO')) chrome.scripting.executeScript ({
		target: {tabId: tab.id, allFrames: false },
		files: [ 'textFct.js', 'htmlFct.js', 'pageFct.js', 'demarche-ciphyto.js' ]
	});
	else if (tab.url.includes ('EICPE')) chrome.scripting.executeScript ({
		target: {tabId: tab.id, allFrames: false },
		files: [ 'textFct.js', 'htmlFct.js', 'pageFct.js', 'demarche-eicpe.js' ]
	});
	else if (tab.url.includes ('rnipp')) chrome.scripting.executeScript ({
		target: {tabId: tab.id, allFrames: false },
		files: [ 'textFct.js', 'htmlFct.js', 'pageFct.js', 'demarche-rnipp.js' ]
	});
	else if (tab.url.includes ('JeChangeDeCoordonnees')) chrome.scripting.executeScript ({
		target: {tabId: tab.id, allFrames: false },
		files: [ 'textFct.js', 'htmlFct.js', 'pageFct.js', 'demarche-jcc.js' ]
	});
	else if (tab.url.includes ('DAUA')) chrome.scripting.executeScript ({
		target: {tabId: tab.id, allFrames: false },
		files: [ 'textFct.js', 'htmlFct.js', 'pageFct.js', 'demarche-daua.js' ]
	});
	else if (tab.url.includes ('RenouvPasseport')) chrome.scripting.executeScript ({
		target: {tabId: tab.id, allFrames: false },
		files: [ 'textFct.js', 'htmlFct.js', 'pageFct.js', 'demarche-rnpp.js' ]
	});
	else chrome.scripting.executeScript ({
		target: {tabId: tab.id, allFrames: false },
		files: [ 'textFct.js', 'htmlFct.js', 'pageFct.js', 'demarche-recap.js' ]
	});
});
