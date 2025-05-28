document.addEventListener ('DOMContentLoaded', function(){
	console.log ('ok');
	chrome.tabs.query ({currentWindow: true, active: true}, function (tabs){
		var activeTab = tabs[0];
		console.log (activeTab);
	});
});