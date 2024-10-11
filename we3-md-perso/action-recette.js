/* pour mes fichiers de recette
leur titre: "rf xxx - zfyy.txt"
rf fonction comptable lot 2 et complement p1- zf02.txt
*/
const styleRf =`<style type='text/css'>
h1 {
	font-size: 1.2em;
	border-width: 0.4em;
	border-top-style: double;
	border-bottom-style: double;
	background-color: var(--fond-color);
}
h2 {
	font-size: 1.2em;
	color: var(--page-color);
	background-color: var(--bord-color);
}
h2.ok { background-color: teal; }
h2.ko { background-color: crimson; }
h3 { border-bottom-style: solid; }
</style>`;
if (window.location.origin === 'file://' && window.location.href.includes ('/rf%20')){
	// mettre en forme les blocs de test
	const tests = document.getElementsByTagName ('h2');
	for (var h=0; h< tests.length; h++){
		if (tests[h].nextElementSibling.innerText.substring (0,7) === 'Titre: '){
			tests[h].innerHTML = tests[h].innerHTML + tests[h].nextElementSibling.innerText.substring (5);
			if (tests[h].nextElementSibling.nextElementSibling.nextElementSibling.innerText === 'Resultat obtenu: Ok') tests[h].className = 'ok';
			else if (tests[h].nextElementSibling.nextElementSibling.nextElementSibling.innerText.includes ('Resultat obtenu: Ko')) tests[h].className = 'ko';
			tests[h].parentElement.removeChild (tests[h].nextElementSibling);
		}
	}
	document.body.innerHTML = document.body.innerHTML.replaceAll ('<p>Resultat obtenu: Ok</p>', "");
	document.body.innerHTML = document.body.innerHTML.replaceAll ('<p>Resultat obtenu: Ko.', '<p>test ko.');
	document.body.innerHTML = document.body.innerHTML.replaceAll ('<p>Resultat obtenu: Ko,', '<p>test ko.');
	document.body.innerHTML = document.body.innerHTML.replaceAll ('Resultat obtenu: Non réalisable,', 'test irréalisable.');
	document.body.innerHTML = document.body.innerHTML.replaceAll ('Resultat obtenu: Non réalisable.', 'test irréalisable.');
	document.head.innerHTML = document.head.innerHTML + styleRf;
}