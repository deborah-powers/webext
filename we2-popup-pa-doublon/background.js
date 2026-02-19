function avancer(){
	console.log ('avancer');
	var buttons = document.getElementsByClassName ('vE9rz jdx48 i89U4 SWHl4 _1xQVj uorL9 G-2qb');
	var buttonMore = null;
	for (var button of buttons) if ('buttonShowMore' === button.getAttribute ('data-testid')){ buttonMore = button; }
	if (buttonMore === null){
		console.log ('fin des pages');
	}
	else{
		buttonMore.click();
		setTimeout (function(){ avancer(); }, 1000);
	}
}
chrome.runtime.onMessage.addListener (function (message, sender, sendResponse){
	console.log ('action:', message.action);
	avancer();
	sendResponse ({ status: 'hellove' });
});
