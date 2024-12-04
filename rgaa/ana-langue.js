// la langue de la page
var pageLang = 'page: erreur, la langue doit être précisée dans la balise html';
// console.dir (document.documentElement);
if (document.documentElement.lang !=="") pageLang = 'page: '+ document.documentElement.lang +' (lang)';
else if (document.documentElement.attributes['xml:lang'] !== undefined) pageLang = 'page: '+ document.documentElement.attributes['xml:lang'].value +' (xml:lang)';
pageLang = pageLang + '<br/>direction: ';
if (document.documentElement.dir ==="") pageLang = pageLang + 'défaut (ltr)';
else if (document.documentElement.dir === 'ltr') pageLang = pageLang + 'ltr';
else if (document.documentElement.dir === 'rtl') pageLang = pageLang + 'rtl';
else pageLang = pageLang + document.documentElement.dir + 'erreur, la direction doit valoir ltr ou rtl';

Element.prototype.addInfos = function(){
	if (this.infos ===""){
		const direction = this.getAttribute ('dir');
		if (this.lang !=="") this.infos = 'langue: '+ this.lang + '<br/>';
		if (direction === 'ltr') this.infos = this.infos + 'direction: ltr<br/>';
		else if (direction === 'rtl') this.infos = this.infos + 'direction: rtl<br/>';
		else if (direction.isEmpty()) this.infos = this.infos + 'direction: celle du parent<br/>';
		else this.infos = this.infos + 'direction: '+ direction +'. ERREUR, elle doit valoir ltr ou rtl. celle du parent est prise par défaut<br/>';
		this.infos = this.infos + pageLang;
}}
Element.prototype.addBorder = function(){
	var border = 'dotted 4px deeppink';
	if (this.dir === 'ltr') border = border.replace ('deeppink', 'lime');
	else if (this.dir === 'rtl') border = border.replace ('deeppink', 'red');
	else if (this.dir !=="") border = border.replace ('deeppink', '#420');
	if (this.lang !=="") border = border.replace ('dotted', 'solid');
	this.style.border = border;
}
// la langue des blocs
var blocLang = document.body.getByAttribute ('dir');
for (var i=0; i< blocLang.length; i++) blocLang[i].addAll();
var blocLang = document.body.getByAttribute ('lang');
for (var i=0; i< blocLang.length; i++) blocLang[i].addAll();

