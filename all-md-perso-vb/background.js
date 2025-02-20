const mycss = 'body { background-color: salmon; }';
const filecss = 'file:///C:/wamp64/www/site-dp/library-css/perso.css';
const myjs = `document.head.innerHTML = "<title></title><meta name='viewport' content='width=device-width,initial-scale=1'/><meta charset='utf-8'/><base target='_blank'><link rel='icon' type='image/svg+xml' href='file:///C:/wamp64/www/site-dp/data/nounours-perso.svg'/><link rel='stylesheet' type='text/css' href='file:///C:/wamp64/www/site-dp/library-css/structure.css'/><link rel='stylesheet' type='text/css' href='file:///C:/wamp64/www/site-dp/library-css/perso.css' media='screen'/><link rel='stylesheet' type='text/css' href='file:///C:/wamp64/www/site-dp/library-css/shapes.css'/><script type='text/javascript' src='file:///C:/wamp64/www/site-dp/library-js/textFct.js'></script><script type='text/javascript' src='file:///C:/wamp64/www/site-dp/library-js/htmlFct.js'></script>";`;

function addScript (scriptName){
	const scriptFile = 'file:///C:/wamp64/www/site-dp/library-js/' + scriptName + '.js';
	const xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		console.log (this.readyState, this.responseText, window.location.href);
		if (this.readyState ===4){
			browser.tabs.query ({currentWindow: true, active: true}, function (tabs){
				console.log ('coucou', window.location.href);
				browser.tabs.executeScript ({ code: this.responseText });
			});
		}
		else if (this.readyState ===5){
			const myScriptTag = document.createElement ('script');
			myScriptTag.innerHTML = this.responseText;
			myScriptTag.type = 'text/javascript';
			document.head.appendChild (myScriptTag);
	}};
	xhttp.open ('GET', scriptFile, true);
	xhttp.send();
}
addScript ('textFct');
/*
browser.tabs.query ({currentWindow: true, active: true}, function (tabs){
	const activeTab = tabs[0];
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		if (this.readyState ==4){
			console.log ('fichier css ouvert', window.location.href, this.responseText);
			browser.tabs.insertCSS ({ code: this.responseText });
		}
		else console.log ("impossible d'ouvrir le fichier", this.readyState, window.location.href);
	};
	xhttp.open ('GET', filecss, true);
	xhttp.send();
});
browser.tabs.onUpdated.addListener (function(){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		if (this.readyState ==4){
			console.log ('fichier css ouvert', window.location.href);
			browser.tabs.insertCSS ({ code: this.responseText });
		}
		else console.log ("impossible d'ouvrir le fichier", this.readyState, window.location.href);
	};
	xhttp.open ('GET', filecss, true);
	xhttp.send();
});*/
