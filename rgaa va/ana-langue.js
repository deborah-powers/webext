// la langue de la page
var pageLang = 'page: erreur, la langue doit être précisée dans la balise html';
// console.dir (document.documentElement);
if (document.documentElement.lang !=="") pageLang = 'page: '+ document.documentElement.lang +' (lang)';
else if (document.documentElement.attributes['xml:lang'] !== undefined) pageLang = 'page: '+ document.documentElement.attributes['xml:lang'].value +' (xml:lang)';
else if (navigator.language) pageLang = 'page: '+ navigator.language +' (navigateur)';

// la direction du texte
pageLang = pageLang + '<br/>direction: ';
if (document.documentElement.dir ==="") pageLang = pageLang + 'défaut (ltr)';
else if (document.documentElement.dir === 'ltr') pageLang = pageLang + 'ltr';
else if (document.documentElement.dir === 'rtl') pageLang = pageLang + 'rtl';
else pageLang = pageLang + document.documentElement.dir +' erreur, la direction doit valoir ltr ou rtl';
pageLang = '<hr/>'+ pageLang;

Element.prototype.addInfos = function(){
	if (this.infos ===""){
		if (this.lang !=="") this.infos = 'langue: '+ this.lang + '<br/>';
		const direction = this.getAttribute ('dir');
		console.log (this, direction);
		if (direction === 'ltr') this.infos = this.infos + 'direction: ltr<br/>';
		else if (direction === 'rtl') this.infos = this.infos + 'direction: rtl<br/>';
		else if (! exists (direction)) this.infos = this.infos + 'direction: celle du parent<br/>';
		else this.infos = this.infos + 'direction: '+ direction +'. ERREUR<br/>';
		this.infos = this.infos + pageLang;
}}
// la langue des blocs
var blocLang = document.body.getByAttribute ('dir');
for (var i=0; i< blocLang.length; i++) blocLang[i].addAll();
var blocLang = document.body.getByAttribute ('lang');
for (var i=0; i< blocLang.length; i++) blocLang[i].addAll();

