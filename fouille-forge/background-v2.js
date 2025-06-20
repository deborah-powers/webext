function notLaunch(){ console.log ("l'extension fouille forge ne peut pas s'executer sur cette page"); }
function cleanpage(){
	document.body.innerHTML = document.getElementsByClassName ('content')[0].innerHTML;
	const pathAriana = document.getElementsByTagName ('td')[0].innerText.substring (10);
	document.body.innerHTML = document.getElementsByTagName ('ul')[1].outerHTML;
	const containers = document.getElementsByTagName ('div');
	var finalText = "<p>Fil d'Arianne: "+ pathAriana + '</p><p>Url: '+ window.location.href + '</p><table>';
	const linkRef = "<tr><td><a href=''></a><td></td></tr>";
	for (var contain of containers){
		const locRef = contain.getElementsByTagName ('a')[0].href;
		var linkLoc = linkRef.replace ("''", "'"+ locRef +"'");
		linkLoc = linkLoc.replace ('></a', '>'+ contain.getElementsByTagName ('span')[0].innerText +'</');
		linkLoc = linkLoc.replace ('td></td', 'td>'+ locRef +'</td');
		finalText = finalText + linkLoc;
	}
	finalText = finalText + '</table>';
/*
	var finalText ="";
	const linkRef = "<a href=''></a>"
	for (var contain of containers){
		var linkLoc = linkRef.replace ("''", "'"+ contain.getElementsByTagName ('a')[0].href +"'");
		linkLoc = linkLoc.replace ('></', '>'+ contain.getElementsByTagName ('span')[0].innerText +'</');
		finalText = finalText + linkLoc;
	}
*/
	document.head.innerHTML = document.head.getElementsByTagName ('title')[0].outerHTML;
	document.body.innerHTML = finalText;
}

chrome.browserAction.onClicked.addListener (function (tab){
	if (tab.url.includes ('//forgeaxyus.local.axyus.com/')){
		chrome.scripting.executeScript ({
			target: {tabId: tab.id, allFrames: true },
			func: cleanpage
		});
/*		chrome.scripting.insertCSS ({
			target: {tabId: tab.id, allFrames: true },
			css: 'a { display: block; }'
		});*/
	}
	else chrome.scripting.executeScript ({
		target: {tabId: tab.id, allFrames: false },
		func: notLaunch
	});
});
