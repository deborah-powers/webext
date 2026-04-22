function testDependency(){
	console.log ('%cje suis une dépendence', 'color: teal; font-size: 2em');
}
function testDependencyTwo(){
	console.log ('%cje suis une seconde dépendence', 'color: purple; font-size: 2em');
}
const toExport ={
	doudou: testDependency, dada: testDependencyTwo
}