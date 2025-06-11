// tester l'échange de message avec le background script
// ne marche pas

// le content envoi un message au background
function handleBackgroundResponse (response){ console.log ('un message à été renvoyé par le background', response.maReponse); }
function handleBackgroundError (error){ console.log ('une erreur est survenue lors de la réponse du background', error); }
function sendMessageToBackground (event){
	const sending = browser.runtime.sendMessage ({ monMessage: 'coucou je suis le content script' });
	sending.then (handleBackgroundResponse, handleBackgroundError);
}
window.addEventListener ('click', sendMessageToBackground);

// le content reçoit un message du background
browser.runtime.onMessage.addListener (handleBackgroundResponse);
