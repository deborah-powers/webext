// pour l'url https://psa-fs.ent.cgi.com/psc/fsprda/EMPLOYEE/ERP/c/ADMINISTER_EXPENSE_FUNCTIONS.TE_TIME_ENTRY.GBL?pslnkid=EP_TE_TIMEENT_EMP&amp;NavColl=true&amp;ICAGTarget=start&amp;ICAJAXTrf=true
HTMLSelectElement.prototype.setOption = function (option){
	for (var o=0; o< this.options.length; o++) if (option === this.options[o].value){
		this.selectedIndex = this.options[o].index;
		this.options[o].selected = 'true';
}}
// page a, travaux passagers
var tableau = document.getElementById ('trEX_TRC_MAP_VW$0_row25');
var inputs = null;
if (tableau !== null){
	inputs = tableau.getElementsByTagName ('input');
	for (var d=1; d<6; d++) inputs[d].value = '7,4';
}
// page b
tableau = document.getElementById ('trUC_EX_TDLY_FR2$0_row1');
if (tableau !== null){
	// pause repas
	inputs = tableau.getElementsByTagName ('input');
	for (var d=1; d<6; d++) inputs[d].value = '1';
	// temps de repos
	inputs = document.getElementById ('UC_EX_TDLY_FR$scroll$0').getElementsByTagName ('select');
	for (var d=0; d<21; d=d+7){
		inputs[d].setOption ('NA');
		inputs[d+1].setOption ('Y');
		inputs[d+2].setOption ('Y');
		inputs[d+3].setOption ('Y');
		inputs[d+4].setOption ('Y');
		inputs[d+5].setOption ('Y');
		inputs[d+6].setOption ('NA');
	}
	// lieu de travail
	inputs = document.getElementById ('UC_EX_TDLY_FR1$scroll$0').getElementsByTagName ('select');
	for (var d=1; d<14; d=d+7){
		inputs[d].setOption ('P');
		inputs[d+1].setOption ('T');
		inputs[d+2].setOption ('T');
		inputs[d+3].setOption ('P');
		inputs[d+4].setOption ('T');
}}