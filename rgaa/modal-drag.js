const modalText = "<h2>infos de l'élément inspecté</h2><span class='cross'></span><span class='arrow'></span><span class='arrow vertical'></span><p></p>";
function closeModal (event){ event.target.parentElement.style.display = 'none'; }
function moveTopModal (event){
	if (event.target.parentElement.style.top ==='60%') event.target.parentElement.style.top = '0%';
	else event.target.parentElement.style.top = '60%';
}
function moveLeftModal (event){
	if (event.target.parentElement.style.left ==='60%') event.target.parentElement.style.left = '0%';
	else event.target.parentElement.style.left = '60%';
}
var modale = document.createElement ('section');
modale.innerHTML = modalText;
modale.id = 'modale';
modale.children[1].addEventListener ('click', closeModal);
modale.children[2].addEventListener ('click', moveLeftModal);
modale.children[3].addEventListener ('click', moveTopModal);
document.body.appendChild (modale);
