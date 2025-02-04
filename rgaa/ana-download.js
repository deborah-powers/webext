const fileExtensions =[ 'pdf', 'odt', 'doc', 'docx', 'xlsx', 'csv', 'tsv', 'png', 'bmp', 'jpg', 'jpeg', 'gif', 'tiff', 'heif', 'heic' ];
const downloadWords =[ 'télécharge', 'telecharge', 'download' ];
// les liens
var elements = document.getElementsByTagName ('a');
for (var e=0; e< elements.length; e++){
	if (elements[e].getAttribute ('download') === null && elements[e].href.includes ('.')){
	const extenPos =1+ elements[e].href.lastIndexOf ('.');
	var extension = elements[e].href.substring (extenPos);
	if (extension [extension.length -1] ==='/') extension = extension.substring (0, extension.length -1);
	if (fileExtensions.includes (extension)) elements[e].classList.add ('rgaa-highlight');
}}
// les boutons
elements = document.getElementsByTagName ('button');
for (var e=0; e< elements.length; e++){
	var isDownload = false;
	const textLower = elements[e].innerText.toLowerCase();
	for (var t=0; t< downloadWords.length; t++){
		if (textLower.includes (downloadWords[t])) isDownload = true;
	}
	if (isDownload) elements[e].classList.add ('rgaa-highlight');
}
// les inputs de téléchargement
elements = document.getElementsByTagName ('input');
for (var e=0; e< elements.length; e++){
	if (elements[e].type === 'button' || elements[e].type === 'submit'){
	var isDownload = false;
	const textLower = elements[e].value.toLowerCase();
	for (var t=0; t< downloadWords.length; t++){
		if (textLower.includes (downloadWords[t])) isDownload = true;
	}
	if (isDownload) elements[e].classList.add ('rgaa-highlight');
}}
