/* const modalHtml = `<link rel='stylesheet' type='text/css' href='color-style.css' />
	<div id='color-picker'>
		<button onclick='chooseFromPage()'>choisir dans la page</button>
		<p>choisir la première couleur</p>
		<input type='color' id='col-a-picker' onchange='pickColor("a",this.value)' />
		<input type='text' id='col-a-code' onchange='pickColorCode("a",this.value)' />
		<p>choisir la seconde couleur</p>
		<input type='color' id='col-o-picker' onchange='pickColor("o",this.value)' />
		<input type='text' id='col-o-code' onchange='pickColorCode("o",this.value)' />
	</div>
	<div id='color-quality'>
		<h2>qualité du contraste: $contrast:1 <span>pour une taille de $fontSize</span></h2>
		<p></p><p>AA</p><p>AAA</p>
		<p>grand texte (> 18pt ou 24px)</p><p class='$grandTextAA'>$grandTextAA</p><p class='$grandTextAAA'>$grandTextAAA</p>
		<p>petit texte (> 14pt ou 18px) ou gras</p><p class='$petitTextAA'>$petitTextAA</p><p class='$petitTextAAA'>$petitTextAAA</p>
	</div>
<script type='text/javascript' src='` + chrome.runtime.getURL ('color-script.js') + `'></script>
<script type='text/javascript'>
	pickColor ('a', '#0AF0AF');
	pickColor ('o', '#CEFADA');
</script>`;

var modale = document.createElement ('section');
modale.innerHTML = modalHtml;
modale.id = 'color-contrast';
document.body.appendChild (modale);
*/
const fileName = chrome.extension.getURL ('color-modal.html');
var xhttp = new XMLHttpRequest();
xhttp.open ('GET', fileName, false);
xhttp.send();
var textRes = null;
if (xhttp.status ==0 || xhttp.status ==200) document.body.innerHTML = document.body.innerHTML + xhttp.responseText;
else console.log ("modale introuvable: color-modal.html");

