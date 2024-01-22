HTMLSelectElement.prototype.selectValue = function (value){
	for (var o=0; o< this.options.length; o++){
		this.options[o].selected ="";
		if (value === this.options[o].value){
			this.selectedIndex = this.options[o].index;
			this.options[o].selected = 'selected';
}}}
// document.getElementById ('invenio_ad_publication_condition').selectValue ('medium');
document.getElementById ('invenio_ad_publication_lostAt').value = '20/12/2023';
// document.getElementById ('invenio_ad_publication_zipcode').selectValue ('Bus (75000)');
// document.getElementById ('invenio_ad_publication_add_date_bus_line_number').selectValue ('35');
document.getElementById ('invenio_ad_publication_address').value = "autour de l'arrêt riquet direction gare du nord, vers 15h";


/*
document.getElementById ('').selectValue ('');
20/12/2023
bus 35
autour de l'arrêt riquet direction gare du nord, vers 15h30
*/
