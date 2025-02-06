/* modifier addEventListener afin de repérer les éléments ayant un eventListener
code trouvé sur https://stackoverflow.com/questions/63914050/how-to-get-event-listener-of-an-element
les évènements sur https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent
étudier
https://stackoverflow.com/questions/48809691/override-javascript-function-from-browser-extension
*/
const myscript = document.createElement ('script');
myscript.innerHTML =`
const orig = EventTarget.prototype.addEventListener;
EventTarget.prototype.addEventListener = function (...args){
	console.log ('coucou');
	if (this instanceof Element && ('mouse' === args[0].substring (0,5) || 'click' === args[0].substring (args[0].length -5))){
		this.classList.add ('rgaa-highlight');
		this.style.backgroundColor = 'purple';
		console.log ('rgaa-highlight');
	}
	return orig.apply (this, args);
};
// document.body.style.backgroundColor = 'lightgreen';
console.log (document);`;
/*
document.head.appendChild (myscript);
function coucouPage (tab){
	chrome.tabs.insertCSS ({ code: 'body { background-color: green; }' });
}
function coucouBrowser (tab){
	browser.tabs.insertCSS ({ code: 'body { background-color: orangered; }' });
}
chrome.pageAction.onClicked.addListener (coucouPage);
browser.browserAction.onClicked.addListener (coucouBrowser);
*/