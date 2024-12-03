Element.prototype.findFrame = function(){
	if (this.tagName === 'SECTION') return this;
	else return this.parentElement.findFrame();
}
const voletRgaa = document.createElement ('section');
voletRgaa.id = 'volet-rgaa';
voletRgaa.addEventListener ('dblclick', function (event){
	const frame = event.target.findFrame();
	if (frame.style.left ==='75%') frame.style.left = '0%';
	else frame.style.left = '75%';
});
document.body.appendChild (voletRgaa);
