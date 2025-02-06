/*
source https://stackoverflow.com/questions/19191679/chrome-extension-inject-js-before-page-load
manifest
	"content_scripts": [{
		"matches": [ "<all_urls>" ],
		"js": [ "injector.js" ]
	}],
	"web_accessible_resources": [{
		"matches": [ "<all_urls>" ],
		"resources": [ "injected.js" ]
	}]
*/
// injector.js
const myScript = document.createElement ('script');
myScript.src = chrome.runtime.getURL ('injected.js');
document.documentElement.appendChild (myScript);
console.log ('injection terminée');

// injected.js
console.log ('code injecté');
