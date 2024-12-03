const voletHtml = `<div id='color-picker'>
	<p id='color-text'>choisir dans la page</p>
	<p>couleur du texte</p>
	<input type='color' id='col-a-picker' />
	<input type='text' id='col-a-code' />
	<p>couleur du fond</p>
	<input type='color' id='col-o-picker' />
	<input type='text' id='col-o-code' />
</div>
<div id='color-quality'>
	<h2>qualité du contraste: $contrast:1 <span>pour une taille de $fontSize</span></h2>
	<p></p><p>AA</p><p>AAA</p>
	<p>grand texte</p><p class='$grandTextAA'>$grandTextAA</p><p class='$grandTextAAA'>$grandTextAAA</p>
	<p>petit texte</p><p class='$petitTextAA'>$petitTextAA</p><p class='$petitTextAAA'>$petitTextAAA</p>
	<p id='color-bord'>bordure</p><p>$luxBord</p><p class='$bordAA'>$bordAA</p>
</div>`;
voletRgaa.innerHTML = voletHtml;
/*
const fileName = chrome.extension.getURL ('color-modal.html');
var xhttp = new XMLHttpRequest();
xhttp.open ('GET', fileName, false);
xhttp.send();
var textRes = null;
if (xhttp.status ==0 || xhttp.status ==200) document.body.innerHTML = document.body.innerHTML + xhttp.responseText;
else console.log ("modale introuvable: color-modal.html");
*/
