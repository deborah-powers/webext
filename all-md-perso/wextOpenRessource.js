function openRessource (filePath){
	// la ressource commence par http://, https:// ou file:///C:/
	const xhttp = new XMLHttpRequest();
	xhttp.open ('GET', filePath, false);
	xhttp.send();
	if (xhttp.status ==0 || xhttp.status ==200) return xhttp.responseText;
	else return "";
}
function openRessourceLocal (fileName){
	// fileName est dans le dossier de l'extension
//	const filePath = chrome.extension.getURL (fileName);
	const filePath = browser.runtime.getURL (fileName);
	return openRessource (filePath);
}
