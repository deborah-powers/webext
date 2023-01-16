// dépend de ana-name.js

var infos ="";

Element.prototype.addInfos = function(){
	infos = infos +'\n'+ this.tagName +'\t'+ this.role +'\n'+ this.compareNames();
}