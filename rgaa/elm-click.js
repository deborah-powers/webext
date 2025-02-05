/* modifier addEventListener afin de repérer les éléments ayant un eventListener
code trouvé sur https://stackoverflow.com/questions/63914050/how-to-get-event-listener-of-an-element
les évènements sur https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent
*/
const orig = EventTarget.prototype.addEventListener;
EventTarget.prototype.addEventListener = function (...args){
	if (this instanceof Element && ('mouse' === args[0].substring (0,5) || 'click' === args[0].substring (args[0].length -5)))
		this.classList.add ('rgaa-highlight');
	return orig.apply (this, args);
};
console.log (document);
document.body.style.backgroundColor = 'orange';