var text = document.body.children[0].innerHTML.toHtml();
text = text.toHtmlShapes();
// text = text.toLowerCase();
document.body.innerHTML = text.strip();

// récupérer les meta de mes articles
HTMLElement.prototype.findMeta = function(){
	if (! this.innerText.includes (': ')) return [];
	var f= this.innerText.indexOf (': ');
	if (f<2 || f>9) return [];
	else{
		const res =[ this.innerText.substring (0,f), this.innerText.substring (f+2) ];
		document.body.removeChild (this);
		return res;
}}
if (document.body.innerHTML.substring (3,10) === 'Sujet: '){
	var head = "<h1><a href='$Lien'>$Titre</a></h1><p>par <a href='$Laut'>$Auteur</a></p><p>à propos de $Sujet</p>";
	if (document.body.innerHTML.includes ('<p>Date: ')) head = head + '<p>date: $Date</p>';
	var meta = document.body.children[0].findMeta();
	while (meta.length ===2){
		head = head.replace ('$'+ meta[0], meta[1]);
		meta = document.body.children[0].findMeta();
	}
	if (head.includes ('$Titre')){
		var d=1+ window.location.pathname.lastIndexOf ('/');
		var titre = window.location.pathname.substring (d);
		if (titre.includes ('.')){
			d= titre.lastIndexOf ('.');
			titre = titre.substring (0,d);
		}
		titre = titre.replaceAll ('%20'," ");
		head = head.replace ('$Titre', titre);
	}
	document.body.innerHTML = head + document.body.innerHTML;
}
const metaNames =[ 'sujet', 'auteur', 'lien', 'laut', 'date', 'titre' ];
