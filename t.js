var path = require('path');
var promise = require('./pdf-tool/promise.js');
//var ttf = require('./ttf_parse.js');
var pdfTool = require('./pdf-tool');
var utf8 = require('utf8');

var pdf = pdfTool.new();
var pr = promise.new();

/*
var style = require('./pdf-tool/pdf-style.js');
var def = style.default;
var p = def.page;
p.margin=1;
p.gutter=1;
//p.num=2;
p.units='in';
console.log(p.units, p.x0, p.xmax, p.y0, p.ymin,
	p.getMargin(1), p.getMargin(2), p.getMargin(3), p.getMargin(4),
	p.pointsPerUnit);
//pr.debug='m';
var z1 = { a:2, b:3, z:4, q:'asdf', 
	fn: function(){ return this.a*this.b},
	get ps() {return this.a;}, 
	get gs() {return this.a;},
	set gs(v){ this.a=v;}
};
var z2 = { c:5, d:7, a:99, z:'z2 was here'};
var z3 = { e:9, f:'asdf', g:'z3 was here', d:99};
var z4 = promise.extend({},z1,z2,z3);
console.log(z4, z4.fn(), z4.gs);
return;
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
		]
	}, pr.trigger)
}).next(()=> { 
	console.log('create new page');
	var np = pdf.newPage();
	/*
	np.stream = "2 J BT /ft 12 Tf 0 Tc 0 Tw 30 460 TD [(This is a test) -4265 (whatever)] TJ 0 -14 TD [(line 2)] TJ T* [(line 3) -7000 (and more)] TJ (line 4) ' 0 -14 TD \n";
	*/
	var txt = "Declína a malo, et fac bonum: * et inhábita in sǽculum sǽculi.";
	var txt1 = 'Beátus vir, qui non ábiit in consílio impiórum, et in via peccatórum non stetit, * et in cáthedra pestiléntiæ non sedit: Sed in lege Dómini volúntas ejus, * et in lege ejus meditábitur die ac nocte.  Et erit tamquam lignum, quod plantátum est secus decúrsus aquárum, * quod fructum suum dabit in témpore suo: Et fólium ejus non défluet: * et ómnia quæcúmque fáciet, prosperabúntur.  Non sic ímpii, non sic: * sed tamquam pulvis, quem prójicit ventus a fácie terræ.  Ídeo non resúrgent ímpii in judício: * neque peccatóres in concílio justórum. Quóniam novit Dóminus viam justórum: * et iter impiórum períbit.';

	//console.log(pdf.cp, pdf.pages[0], pdf.pages.length);
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
	/*
	var ub = new Buffer(txt, 'utf16le');
	for(var i=0;i<ub.length-1;i+=2){
		var u0 = ub[i];
		ub[i] = ub[i+1];
		ub[i+1] = u0;
	}

	utxt = ub.toString('binary');
	np.stream += "/F1 12 Tf [(" + utxt + ")] TJ 0 -14 TD \n";
	np.stream += "/F2 12 Tf [(" + utxt + ")] TJ 0 -14 TD \n";
	np.stream += "/F3 12 Tf [(" + utxt + ")] TJ 0 -14 TD \n";
	np.stream += "/F4 12 Tf [(" + utxt + ")] TJ 0 -14 TD \n";
	np.stream += "/F5 12 Tf [(" + utxt + ")] TJ 0 -14 TD \n";
	np.stream += "/F6 12 Tf [(" + utxt + ")] TJ 0 -14 TD \n";

	np.stream += "ET";
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
