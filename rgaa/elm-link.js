/* dépend de encart.js, de ana-common.js et de ana-name.js
prendre en compte la valeur des pseudo-classes :before et :after
*/
var links = document.getElementsByTagName ('a');
for (var i=0; i< links.length; i++) links[i].addInfos();
links = document.body.getAllByRole ('link');
for (var i=0; i< links.length; i++) links[i].addInfos();
