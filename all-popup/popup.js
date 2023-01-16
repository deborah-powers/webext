var cssCode = 'body { background-color: yellow; }';

function setBlue(){
	const cssCode = `body {
	background-color: lightblue;
	color: blue;
	border: dotter 10px blue;
}
body * {
	color: inherit;
	border: inherit;
}`;
	return cssCode;
}
function setColor (event){
	// event.target contient le bouton (p) de la popup sur lequel j'ai cliqué
	var colorName = event.target.id;
	chrome.tabs.query ({currentWindow: true, active: true}, function (tabs){
		var activeTab = tabs[0];
		chrome.scripting.removeCSS ({
			target: {tabId: activeTab.id, allFrames: true},
			css: cssCode
		});
		if (colorName === 'lightblue') cssCode = setBlue();
		else cssCode = 'body { background-color: '+ colorName +'; }';
		chrome.scripting.insertCSS ({
			target: {tabId: activeTab.id, allFrames: true},
			css: cssCode
		});
	});
	/*
	if (chrome.tabs !== undefined && chrome.scripting !== undefined){
		// manifest V3. marche aussi avec V2
		chrome.tabs.query ({currentWindow: true, active: true}, function (tabs){
			var activeTab = tabs[0];
			chrome.scripting.insertCSS ({
				target: {tabId: activeTab.id, allFrames: true},
				css: cssCode
			});
		});
	} else if (browser.tabs !== undefined){
		// manifest V2
		browser.tabs.insertCSS ({ code: cssCode });
	}*/
}
document.addEventListener ('DOMContentLoaded', function(){
	// document.body contient le body de la popup
	var plist = document.body.getElementsByTagName ('p');
	for (var p=0; p<3; p++) plist[p].addEventListener ('click', setColor);
});
