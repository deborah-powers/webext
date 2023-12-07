var metas = document.getElementById ('infos-page');

function createMetas(){
	if (! exists (metas)){
		metas = document.createElement ('div');
		metas.id = 'infos-page';
		metas.style = 'display: none';
		document.body.appendChild (metas);
		setMeta ('etat', 'propre');
		setMeta ('author', 'anonyme');
		setMeta ('subject', 'divers');
}}
function setMeta (name, value){
	if (exists (value)) value = value.toLowerCase();
	else value ="";
	var metaTag = metas.getElementsByClassName (name)[0];
	if (exists (metaTag)) metaTag.innerHTML = value;
	else{
		const metaTag = document.createElement ('p');
		metaTag.className = name;
		metaTag.innerHTML = value;
		metas.appendChild (metaTag);
}}
function getMeta (name){
	if (exists (metas)){
		const metaTag = document.getElementsByClassName (name)[0];
		if (exists (metaTag)) return metaTag.innerHTML;
		else return "";
	}
	else return "";
}