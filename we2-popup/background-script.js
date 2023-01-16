var cssCode = 'body { background-color: yellow; }';
function setColor (event){
	browser.tabs.removeCSS ({ code: cssCode });
	var colorName = event.target.id;
	cssCode = 'body { background-color: '+ colorName +'; }';
	browser.tabs.insertCSS ({ code: cssCode });
}
var plist = document.body.getElementsByTagName ('p');
for (var p=0; p<3; p++) plist[p].addEventListener ('click', setColor);

/*/ tester l'échange de message avec le content script
// ne marche pas
browser.tabs.executeScript ({ file: 'content-script.js' });

// le background envoi un message au content

function handleContentResponse (request, sender, sendResponse){
	document.getElementsByTagName ('p')[3].innerHTML = request.monMessage;
	sendResponse ({ maReponse: 'coucou je suis le background' });
}
function handleContentError (error){
	document.getElementsByTagName ('p')[3].innerHTML = 'une erreur est survenue lors de la réponse du content';
}
function sendMessageToContent (event){
	const sending = browser.runtime.sendMessage ({ monMessage: 'coucou je suis le background script' });
	sending.then (handleContentResponse, handleContentError);
}
document.getElementsByTagName ('p')[3].addEventListener ('click', sendMessageToContent);

// le background reçoit un message du content
browser.runtime.onMessage.addListener (handleContentResponse);
*/
