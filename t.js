var path = require('path');
var promise = require('./pdf-tool/promise.js');
//var ttf = require('./ttf_parse.js');
var pdfTool = require('./pdf-tool');
var utf8 = require('utf8');

var pdf = pdfTool.new();
var pr = promise.new();
//pr.debug='m';

pr.next(()=> {
	pdf.init({
		fonts: [
			'./pdf/ttf/FancyVR.ttf',
			'./pdf/ttf/oldlondon.ttf',
			'./pdf/ttf/freeserif.ttf',
			'./pdf/ttf/freeserifBold.ttf',
			'./pdf/ttf/freeserifItalic.ttf',
			'./pdf/ttf/freeserifBoldItalic.ttf'
		]
	}, pr.trigger)
}).next(()=> { 
	console.log('create new page');
	var np = pdf.newPage();
	np.stream = "2 J BT /ft 12 Tf 0 Tc 0 Tw 30 460 TD [(This is a test) -4265 (whatever)] TJ 0 -14 TD [(line 2)] TJ T* [(line 3) -7000 (and more)] TJ (line 4) ' 0 -14 TD \n";
	var txt = "A VR Declína a malo, et fac bonum: * et inhábita in sǽculum sǽculi.";
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
