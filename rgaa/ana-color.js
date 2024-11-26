const colorModal = `<section id='color-contrast'>
	<input type='color' id='col-a-picker' onchange='pickColor("a",this.value)' /><input type='color' id='col-o-picker' onchange='pickColor("o",this.value)' />
	<p>choisir la première couleur:</p><input type='text' id='col-a-code' onchange='pickColorCode("a",this.value)' />
	<p>choisir la seconde couleur:</p><input type='text' id='col-o-code' onchange='pickColorCode("o",this.value)' />
	<div>
		<h2>qualité du contraste: <span class='$contrastEtat'>$contrast:1</span> pour une taille de $fontSize</h2>
		<p></p><p>AA</p><p>AAA</p>
		<p>grand texte (>18pt)</p><p class='$grandTextAA'>$grandTextAA</p><p class='$grandTextAAA'>$grandTextAAA</p>
		<p>petit texte (>14pt) ou gras</p><p class='$petitTextAA'>$petitTextAA</p><p class='$petitTextAAA'>$petitTextAAA</p>
	</div>
	<h2>choisir dans la page</h2>
	<button onclick='chooseFromPage()'>choisir</button>
<script type='text/javascript'>
	pickColor ('a', '#0AF0AF');
	pickColor ('o', '#CEFADA');
</script></section>`;

document.body.innerHTML = document.body.innerHTML + colorModal;

