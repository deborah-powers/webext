/* modifier addEventListener afin de repérer les éléments ayant un eventListener
code trouvé sur https://stackoverflow.com/questions/63914050/how-to-get-event-listener-of-an-element
les évènements sur https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent
étudier
https://stackoverflow.com/questions/48809691/override-javascript-function-from-browser-extension
*/
const myScript =`
const orig = EventTarget.prototype.addEventListener;
EventTarget.prototype.addEventListener = function (...args){
	if (args[0] === 'auxclick') return orig.apply (this, args);
	else if (this instanceof Element && ('mouse' === args[0].substring (0,5) || 'click' === args[0].substring (args[0].length -5))){
		console.log (this, orig.valueOf(), orig.toLocaleString());
		this.classList.add ('rgaa-event');
		this.setAttribute ('event', args[0]);
	}
	return orig.apply (this, args);
};
EventTarget.prototype.addEventListener.name = 'addEventListener';
`;
for (var item in window) console.log (item);
const myScriptTag = document.createElement ('script');
myScriptTag.innerHTML = myScript;
function insertMyScript(){ document.head.appendChild (myScriptTag); }
/* ne marche pas
document.addEventListener ('DOMContentLoaded', insertMyScript);
*/
// beforescriptexecute ne fonctionne qu'avec firefox
document.addEventListener ('beforescriptexecute', insertMyScript);
