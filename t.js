var path = require('path');
var promise = require('promise.das');
var pdfTool = require('pdf-tool.das');
//var utf8 = require('utf8');
var style = pdfTool.style;

var pdf = pdfTool.new();
var pr = promise.new();

/*

var ltr = style.letter();
var qleg = style.qlegal({font:{fid:4, color:'0 1 1 0 k'}});
promise.extend(ltr, {block:{_tabs:[
	{ position: '.5*ppi' }, 
	{ position: '1*ppi' }, 
	{ position: '1.5*ppi' }, 
	{ position: '2*ppi' }, 
	{ position: '2.5*ppi' }, 
	{position: 'this.xw',align:'l'}
]}});
console.log(qleg.block.xw, qleg.block.tabs);
console.log(ltr.block.xw, ltr.block.tabs);
var p = qleg.page;
p.margin=1;
p.gutter=1;
//p.num=2;
p.units='in';
return;
/*
console.log(p.units, p.x0, p.xmax, p.y0, p.ymin,
	p.getMargin(1), p.getMargin(2), p.getMargin(3), p.getMargin(4),
	p.pointsPerUnit);
//pr.debug='m';
// */
var dt0 = Date.now();
pr.next(()=> {
	pdf.init({
		fonts: [
			'./ttf/freeserif.ttf',
			'./ttf/freeserifBold.ttf',
			'./ttf/freeserifItalic.ttf',
			'./ttf/freeserifBoldItalic.ttf',
			'./ttf/FancyVR.ttf',
			'./ttf/oldlondon.ttf'
		],
		styles: {
			default: style.qlegal({
				font:{size:8, lead:9},
				block:{align:'j'},
				section:{columns:2, spacing:0.1},
				page:{ margin:[ .3, .25, .25, .25],
					header:{
					suppress: [1],
					font: {fid:1, size:6, color:'0 1 1 0 k'},
					right:'{+inside}\t{+middle}\t[{#}]',
					left:'[{#}]\t{-middle}\t{-inside}'
				}}
			}),
			title: { section: {columns:1 } },
			//default: 'qlegal',
			vr: {font:{fid:5, color:'0 1 1 0 k'}},
			rubric: {font:{fid:3, color:'0 1 1 0 k'}},
			tilde: {font:{fid:5, color:'.6 0 .4 .1 k' }},
			b: {font:{fid:2}},
			i: {font:{fid:3}},
			bi: {font:{fid:4}},
			sp1: {font:{spacing:1}},
			sup: {font:{rise:4, size:5 }},
			drop: { block: { 
				drop: { chars: 1, fid: 6, lead:24, size:24*1.3, color: '0 1 1 0 k' } } },
			drop6: { block: { 
				drop: { chars: 1, fid: 6, lead:45, size:45*1.4, color: '0 1 1 0 k' } } },
			head: {font:{fid:6, size:14, lead:14, color:'0 1 1 0 k'},
					block:{align:'c'}}
		}
	}, pr.trigger)
}).next(()=> { 
	console.log('create new page', (Date.now()-dt0)/1e3); dt0 = Date.now();
	var np = pdf.page;
	/*
	np.stream = "2 J BT /ft 12 Tf 0 Tc 0 Tw 30 460 TD [(This is a test) -4265 (whatever)] TJ 0 -14 TD [(line 2)] TJ T* [(line 3) -7000 (and more)] TJ (line 4) ' 0 -14 TD \n";
	*/
	var txt = "De­clí­na a ma­lo, et fac bo­num: * et in­há­bi­ta in sǽ­cu­lum sǽ­cu­li.";
	//var txt = "Declína a malo, et fac bonum: * et inhábita in sǽculum sǽculi.";
	var txt1 = 'Be­á­tus vir, qui non ábi­it in con­sí­lio im­pi­ó­rum, et in via pec­ca­tó­rum non ste­tit, * et in cá­the­dra pes­ti­lén­tiæ non se­dit: Sed in le­ge Dó­mi­ni vo­lún­tas ejus, * et in le­ge ejus me­di­tá­bi­tur die ac noc­te. Et erit tam­quam lig­num, quod plan­tá­tum est se­cus de­cúr­sus aquá­rum, * quod fruc­tum su­um da­bit in tém­po­re suo: Et fó­li­um ejus non déf­lu­et: * et óm­nia quæ­cúm­que fá­ci­et, pros­pe­ra­bún­tur. Non sic ím­pii, non sic: * sed tam­quam pul­vis, quem pró­ji­cit ven­tus a fá­cie ter­ræ. Ideo non re­súr­gent ím­pii in ju­dí­cio: * ne­que pec­ca­tó­res in con­cí­lio jus­tó­rum. Quó­ni­am no­vit Dó­mi­nus vi­am jus­tó­rum: * et iter im­pi­ó­rum pe­rí­bit.';

	np.pushStyle('head');
	var x = np.parseLine('ad Vesperas',1);
	np.setField('middle', 'ad Vesperas');
	np.setField('inside', '');
	np.popStyle();
	np.pushStyle('vr');
	var x = np.parseLine('V.',2);
	np.popStyle();
	var x = np.parseLine(' De­us in ad­ju­tó­ri­um me­um in­tén­de.',0);
	np.pushStyle('vr');
	var x = np.parseLine(' R.',0);
	np.popStyle();
	var x = np.parseLine(' Dó­mi­ne ad ad­ju­ván­dum me fes­tí­na.',0);
	np.pushStyle('sup');
	var x = np.parseLine('24',0);
	np.popStyle();
	var x = np.parseLine('',1);
	np.pushStyle('sp1');
	//var x = np.parseLine(txt1,1);
	np.popStyle();

	np.pushStyle('head');
	var x = np.parseLine('Declina a Malo, et Fac Bonum',1);
	np.popStyle();

	// np.pushStyle('drop');
	// var x = np.parseLine(txt1,2);
//*
	np.pushStyle('drop6');
	var x = np.parseLine('In te, Dó­mi­ne, spe­rá­vi, * non con­fun­dar in.',2);
	np.popStyle();
	var x = np.parseLine('In te, Dó­mi­ne, spe­rá­vi, * non con­fun­dar in.',2);
	var x = np.parseLine('In te, Dó­mi­ne, spe­rá­vi, * non con­fun­dar in.',2);
	np.pushStyle('drop');
	var x = np.parseLine('Dó­mi­ne, Dó­mi­nus nos­ter, * quam ad­mi­rá­bi­le est no­men tu­um in uni­vér­sa ter­ra!',2);
	np.popStyle();
	var x = np.parseLine('Quó­ni­am ele­vá­ta est mag­ni­fi­cén­tia tua, * su­per cæ­los.',2);
	var x = np.parseLine('Ex ore in­fán­tium et lac­tén­tium per­fe­cís­ti lau­dem prop­ter ini­mí­cos tu­os, * ut dé­stru­as ini­mí­cum et ul­tó­rem.',2);
	var x = np.parseLine('Quó­ni­am vi­dé­bo cæ­los tu­os, ópe­ra di­gi­tó­rum tu­ó­rum: * lu­nam et stel­las, quæ tu fun­dás­ti.',2);
	var x = np.parseLine('Quid est ho­mo quod me­mor es ejus? * aut fí­li­us hó­mi­nis, quó­ni­am ví­si­tas eum?',2);
	var x = np.parseLine('Minu­ís­ti eum pau­lo mi­nus ab An­ge­lis, gló­ria et ho­nó­re co­ro­nás­ti eum: * et con­sti­tu­ís­ti eum su­per ópe­ra má­nu­um tu­á­rum.',2);
	var x = np.parseLine('Omnia sub­je­cís­ti sub pé­di­bus ejus, * oves et bo­ves uni­vér­sas: ín­su­per et pé­co­ra cam­pi.',2);
	var x = np.parseLine('Vólu­cres cæ­li, et pis­ces ma­ris, * qui per­ám­bu­lant sé­mi­tas ma­ris.',2);
	var x = np.parseLine('Dómi­ne, Dó­mi­nus nos­ter, * quam ad­mi­rá­bi­le est no­men tu­um in uni­vér­sa ter­ra!',2);
// */
	/*
	np.pushStyle('drop');
	for(var j=0;j<4;j++){
		for(var i=65; i<91;i++) {
			//np.setField('inside', String.fromCharCode(i));
			//console.log('dt',i, String.fromCharCode(i));
			var x = np.parseLine(String.fromCharCode(i)+txt+' '+txt,2,
			{inside:String.fromCharCode(i) });
		}
	}
	np.popStyle();
	//*/

	np.pushStyle('title');
	np.pushStyle('head');
	var x = np.parseLine('ad Vesperas titulum',1);
	np.popStyle();
	np.popStyle();

	np.pushStyle('rubric');
	var x = np.parseLine('  '+txt1,0);
	np.popStyle();
	np.pushStyle('b');
	var x = np.parseLine('  '+txt1,0);
	np.popStyle();
	var x = np.parseLine('  '+txt1,0);
	np.pushStyle('bi');
	var x = np.parseLine('  '+txt1,0);
	np.popStyle();
	np.pushStyle('drop');
	for(var i=1;i<9;i++){
		//console.log('filler',i, 20);
		var x = np.parseLine(txt1,3);
	}
	np.popStyle();

	np.pushStyle('drop');
	var rnd = 65 + Math.random()*(91-65);
	console.log(rnd);
	var rnd = 77.1;
	for(var i=65; i<rnd;i++) {
		//console.log('dt',i, String.fromCharCode(i));
		var x = np.parseLine(String.fromCharCode(i)+txt+' '+txt,2);
	}
	np.popStyle();

	//console.log('lb', np.lineBuffer);
	//console.log('xw',np.style.block.xw);
	// */
	np.flushPage();
	np.endPage();

	console.log(x);
	//console.log(pdf.cp, pdf.pages[0], pdf.pages.length);

pr.trigger();
}).next(()=> { 
	pr.trigger();
}).finally(()=> { 
	console.log('save', (Date.now()-dt0)/1e3); dt0 = Date.now();
	pdf.save(path.join(__dirname,'output.pdf'), pr.trigger);
	console.log('yay we be done', (Date.now()-dt0)/1e3); dt0 = Date.now();
}).start();

/*
ttf.parse('./pdf/ttf/FancyVR.ttf', createttf);
ttf.parse('./pdf/ttf/oldlondon.ttf', createttf);
ttf.parse('./pdf/ttf/freeserif.ttf', createttf);
ttf.parse('./pdf/ttf/freeserifBold.ttf', createttf);
ttf.parse('./pdf/ttf/freeserifItalic.ttf', createttf);
ttf.parse('./pdf/ttf/freeserifBoldItalic.ttf', createttf);

function createttf(f) {
	ttf.save('', f, null);
	//console.log(ttf.stringify(f,null,2));
	tcnt--;
	if(tcnt==0) console.log('all done');
	//else console.log(tcnt);
}
*/
