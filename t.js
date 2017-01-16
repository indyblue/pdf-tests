var path = require('path');
var promise = require('./pdf-tool/promise.js');
var pdfTool = require('./pdf-tool');
var utf8 = require('utf8');
var style = require('./pdf-tool/pdf-style.js');

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

pr.next(()=> {
	pdf.init({
		fonts: [
			'./pdf/ttf/freeserif.ttf',
			'./pdf/ttf/freeserifBold.ttf',
			'./pdf/ttf/freeserifItalic.ttf',
			'./pdf/ttf/freeserifBoldItalic.ttf',
			'./pdf/ttf/FancyVR.ttf',
			'./pdf/ttf/oldlondon.ttf'
		],
		styles: {
			//default: style.qlegal({block:{align:'j'}}),
			default: 'qlegal',
			vr: {font:{fid:5, color:'0 1 1 0 k'}},
			rubric: {font:{fid:3, color:'0 1 1 0 k'}},
			b: {font:{fid:2}},
			i: {font:{fid:3}},
			bi: {font:{fid:4}},
			drop: { block: { 
				drop: { chars: 1, fid: 6, size:22, lead:18, color: '0 1 1 0 k' } } },
			head: {font:{fid:6, size:14, lead:14, color:'0 1 1 0 k'},
					block:{align:'c'}}
		}
	}, pr.trigger)
}).next(()=> { 
	console.log('create new page');
	var np = pdf.page;
	/*
	np.stream = "2 J BT /ft 12 Tf 0 Tc 0 Tw 30 460 TD [(This is a test) -4265 (whatever)] TJ 0 -14 TD [(line 2)] TJ T* [(line 3) -7000 (and more)] TJ (line 4) ' 0 -14 TD \n";
	*/
	var txt = "De­clí­na a ma­lo, et fac bo­num: * et in­há­bi­ta in sǽ­cu­lum sǽ­cu­li.";
	//var txt = "Declína a malo, et fac bonum: * et inhábita in sǽculum sǽculi.";
	var txt1 = 'Beátus vir, qui non ábiit in consílio im­piórum, et in via peccatórum non ste­tit, * et in cáthedra pestiléntiæ non sedit: Sed in lege Dómini vo­lún­tas ejus, * et in lege ejus me­di­tá­bi­tur die ac nocte.\tEt erit tamquam lignum, quod plantátum est secus de­cúr­sus aquárum, * quod fructum suum dabit in témpore suo: Et fó­li­um ejus non défluet: * et ómnia quæ­cúm­que fáciet, prosperabúntur. Non sic ímpii, non sic: * sed tam­quam pulvis, quem prójicit ventus a fácie terræ. Ídeo non resúrgent ím­pii in judício: * neque peccatóres in concílio justórum. Quóniam novit Dó­mi­nus viam justórum: * et iter im­pi­ó­rum períbit.';

	np.pushStyle('vr');
	var x = np.parseLine('V.',0);
	np.popStyle();
	var x = np.parseLine(' De­us in ad­ju­tó­ri­um me­um in­tén­de.',1);
	np.pushStyle('vr');
	var x = np.parseLine(' R.',0);
	np.popStyle();
	var x = np.parseLine(' Dó­mi­ne ad ad­ju­ván­dum me fes­tí­na.',1);

	np.pushStyle('head');
	var x = np.parseLine('Declina a Malo',1);
	np.popStyle();

	np.pushStyle('drop');
	var x = np.parseLine(txt1,2);
	/*
	for(var i=65; i<91;i++)
		var x = np.parseLine(String.fromCharCode(i)+txt+' '+txt,2);
	np.popStyle();
	/*
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
	var x = np.parseLine('  '+txt1,0);
	var x = np.parseLine('  '+txt1,0);
	var x = np.parseLine('  '+txt1,1);
	//console.log('lb', np.lineBuffer);
	//console.log('xw',np.style.block.xw);
	// */
	np.flushPage();
	np.endPage();
	// block.xw, page: x0, xmax, y0, ymin, yh
	/* 
		- construct line array using block.xw
		- unless something else happens, add line array and compare to page.yh?
			- iterate array until last entry before sum>=yh
			- repeat for other columns
			- once all columns are full, or once block/section style changes,
				- balance lines between columns
				- write them, noting the x position on page after write
			- eventually we're going to have to figure out the v-align stuff too
	*/
	console.log(x);
	//console.log(pdf.cp, pdf.pages[0], pdf.pages.length);
	/*
	pdf.cp.stream = '.1 w 0 0 1 rg '+pdf.cp.box();
	pdf.cp.startText();
	pdf.cp.setStyle(6,16,'100%','0 g','c');
	pdf.cp.addText('AD PRIMAM',1);
	pdf.cp.setStyle(5,12,14,'0 1 1 0 k','j'); pdf.cp.addText('V. ');
	pdf.cp.setStyle(1,12,14,'0 g'); pdf.cp.addText(txt);
	pdf.cp.setStyle(5,12,14,'0 1 1 0 k'); pdf.cp.addText(' R. ');
	pdf.cp.setStyle(2,12,14,'0 g'); pdf.cp.addText(txt);
	pdf.cp.setStyle(5,12,14,'0 1 1 0 k'); pdf.cp.addText(' R. ');
	pdf.cp.setStyle(3,12,14,'0 g'); pdf.cp.addText(txt);
	pdf.cp.setStyle(5,12,14,'0 1 1 0 k'); pdf.cp.addText(' R. ');
	pdf.cp.setStyle(4,12,14,'0 g'); pdf.cp.addText(txt,1);
	pdf.cp.setStyle(1,12,14,'0 g'); pdf.cp.addText(txt1,1);
	pdf.cp.setStyle(1,12,14,'0 g'); pdf.cp.addText(txt1,1);
	pdf.cp.setStyle(1,12,14,'0 g'); pdf.cp.addText(txt1,1);

	pdf.cp.setStyle(6,16,'200%','0 g','c'); pdf.cp.addText('AD PRIMAM',1);
	pdf.cp.setStyle(1,12,14,'0 g','j'); pdf.cp.addText(txt1,1);
	pdf.cp.setStyle(6,16,'200%','0 g','c'); pdf.cp.addText('AD PRIMAM',1);
	pdf.cp.setStyle(1,12,14,'0 g','j'); pdf.cp.addText(txt1,1);
	pdf.cp.setStyle(6,16,'200%','0 g','c'); pdf.cp.addText('AD PRIMAM',1);
	pdf.cp.setStyle(1,12,14,'0 g','j'); pdf.cp.addText(txt1,1);
	pdf.cp.setStyle(6,16,'200%','0 g','c'); pdf.cp.addText('AD PRIMAM',1);
	pdf.cp.setStyle(1,12,14,'0 g','j'); pdf.cp.addText(txt1,1);
	pdf.cp.endText();
	*/
	pr.trigger();
}).next(()=> { 
	pr.trigger();
}).finally(()=> { 
	console.log('save');
	pdf.save(path.join(__dirname,'output.pdf'), pr.trigger);
	console.log('yay we be done'); 
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
