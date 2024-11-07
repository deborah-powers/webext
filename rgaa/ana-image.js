HTMLImageElement.prototype.addLabel = function(){
	var label = this._addLabel();
	label.innerHTML = label.innerHTML +'<br/>'+ this.verifyAttr ('alt');
}
document.body.verifyRole();
var images = document.getElementsByTagName ('img');
for (var i=0; i< images.length; i++) images[i].addLabel();

