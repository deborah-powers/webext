function avancerNavigateurQwant(){
	console.log ('avancer');
	var buttons = document.getElementsByClassName ('vE9rz jdx48 i89U4 SWHl4 _1xQVj uorL9 G-2qb');
	var buttonMore = null;
	for (var button of buttons) if ('buttonShowMore' === button.getAttribute ('data-testid')){ buttonMore = button; }
	if (buttonMore === null){
		console.log ('fin des pages');
	}
	else{
		buttonMore.click();
		setTimeout (function(){ avancerNavigateurQwant(); }, 1000);
	}
}
// recevoir un message du script de la popup et lui renvoyer une réponse
chrome.runtime.onMessage.addListener (function (message, sender, sendResponse){
	console.log ('action:', message.action, sender);
	avancerNavigateurQwant();
	sendResponse ({ status: 'hellove' });
});
// recevoir un message d'une autre extension et lui renvoyer une réponse
chrome.runtime.onMessageExternal.addListener (function (message, sender, sendResponse){
	console.log ("action d'une autre extension:", message.action, sender);
	avancerNavigateurQwant();
	sendResponse ({ status: 'hellove' });
});
// "externally_connectable": { "ids": ["*"] },
