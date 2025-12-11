
function doaction (event){
	const iframe = document.getElementById ('myframe');
	iframe.contentWindow.postMessage ({ data: '10 + 20' }, '*');
}
document.addEventListener ('DOMContentLoaded', function(){
	document.body.addEventListener ('click', doaction);
});