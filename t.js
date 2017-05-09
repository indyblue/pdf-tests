var path = require('path');
var fs = require('fs');
var promise = require('promise.das');
var pdfTool = require('pdf-tool.das');
var style = pdfTool.style;

var pdf = pdfTool.new();
var pr = promise.new();

var dt0 = Date.now();
pr.next(()=> {
	var fs = 10;
	var s = {
			default: style.qlegal({
				font:{size:fs, lead:fs*9/8},
				block:{align:'j', fill:'tilde'},
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
			rubric: {font:{size:fs*.75, lead:fs*.75*9/8, color:'0 1 1 0 k'},
				block:{fill:''}},
			red: {font:{color:'0 1 1 0 k'}},
			nonrubric: {font:{fid:1, color:'0 g'}},
			tilde: {font:{fid:5, color:'.3 0 .2 .05 k' }},
			b: {font:{fid:2}},
			i: {font:{fid:3}},
			bi: {font:{fid:4}},
			sp1: {font:{spacing:1}},
			sup: {font:{rise:0.4*fs, size:0.6*fs }},
			drop: { block: { 
				drop: { chars: 1, fid: 6, lead:3*fs, size:3*fs*1.3, color: '0 1 1 0 k' } } },
			drop6: { block: { 
				drop: { chars: 1, fid: 6, lead:6*fs, size:6*fs*1.4, color: '0 1 1 0 k' } } },
			head: {font:{fid:6, size:2*fs, lead:2*fs, color:'0 1 1 0 k'},
					block:{align:'c'},
					section:{columns:1}},
			ind: { block: { firstLineIndent: .25 },
				font:{size:fs, lead:fs*9/8 }}
		};
			s.d= s.drop;
			s.r= s.rubric;
			s.nr= s.nonrubric;
			s.VR= s.vr;

		var lout = {
			book:1,
			sig:5,
			stack:1
		};
		lout = 0; // comment this line to print q-legal booklet form!
	pdf.init({
		fonts: [
			'./ttf/freeserif.ttf',
			'./ttf/freeserifBold.ttf',
			'./ttf/freeserifItalic.ttf',
			'./ttf/freeserifBoldItalic.ttf',
			'./ttf/FancyVR.ttf',
			'./ttf/oldlondon.ttf'
		],
		styles: s,
		layout: lout
	}, pr.trigger);
}).next(()=> {
//*
	var np = pdf.page;

	var html = fs.readFileSync('/home/user/0das/pdf/Liturgy/Rituale_romanum/commendationis_animae.vi.html', 'utf8');
	np.writeHtml(html);
// */
	pr.trigger();
}).next(()=> {
	var np = pdf.page;
//*
	console.log('create new page', (Date.now()-dt0)/1e3); dt0 = Date.now();

	var txt = "De­clí­na a ma­lo, et fac bo­num: * et in­há­bi­ta in sǽ­cu­lum sǽ­cu­li.";

	np.pushStyle('drop6');
	var rnd = 65 + Math.random()*(91-65);
	//console.log(rnd);
	var rnd = 91;
	for(var i=65; i<rnd;i++) {
		var x = np.parseLine(String.fromCharCode(i)+txt.repeat(10),2);
	}
	np.popStyle();


// */
	np.flushPage();
	np.endPage();
pr.trigger();
}).next(()=> { 
	pr.trigger();
}).next(()=> { 
	console.log('save', (Date.now()-dt0)/1e3); dt0 = Date.now();
	pdf.save(path.join(__dirname,'output.pdf'), pr.trigger);
}).finally(()=> {
	console.log('done!', (Date.now()-dt0)/1e3); dt0 = Date.now();
}).start();

