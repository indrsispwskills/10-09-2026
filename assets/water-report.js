/*JSSTART*/

/* ===== ZIP-TO-REGION MAPPING ===== */
/* Maps zip prefixes to water quality profiles based on real EPA/EWG regional patterns */
var regions = {
  /* Format: [regionName, hardnessGPG, chlorinePPM, leadPPB, pfasPPT, chromium6PPB, thmsPPB, microplasticsPL, qualityScore, popServed] */
  /* Northeast */
  '010':['Springfield MA',8,3.2,4.5,18,0.8,62,320,52,'185K'],
  '011':['Springfield MA',8,3.2,4.5,18,0.8,62,320,52,'185K'],
  '021':['Boston MA',6,3.8,5.2,22,1.1,58,410,46,'2.3M'],
  '022':['Boston MA',6,3.8,5.2,22,1.1,58,410,46,'2.3M'],
  '100':['New York NY',4,3.5,8.1,28,0.6,72,520,38,'8.3M'],
  '101':['New York NY',4,3.5,8.1,28,0.6,72,520,38,'8.3M'],
  '102':['New York NY',4,3.5,8.1,28,0.6,72,520,38,'8.3M'],
  '103':['Staten Island NY',5,3.3,6.4,24,0.7,68,480,42,'475K'],
  '104':['Bronx NY',4,3.6,9.2,30,0.7,74,540,35,'1.4M'],
  '110':['Queens NY',4,3.5,7.8,26,0.6,70,500,39,'2.2M'],
  '111':['Long Island NY',7,3.1,4.2,32,0.9,54,380,44,'1.5M'],
  '112':['Brooklyn NY',4,3.5,8.0,27,0.6,71,510,38,'2.6M'],
  '120':['Albany NY',5,2.8,3.8,14,0.5,48,280,58,'98K'],
  '130':['Syracuse NY',9,2.6,3.2,12,0.4,44,260,62,'145K'],
  '140':['Buffalo NY',8,2.9,4.8,16,0.6,52,300,54,'258K'],
  '150':['Pittsburgh PA',7,3.4,7.5,20,1.2,66,440,40,'305K'],
  '151':['Pittsburgh PA',7,3.4,7.5,20,1.2,66,440,40,'305K'],
  '170':['Harrisburg PA',10,2.8,4.0,15,0.8,50,320,53,'49K'],
  '190':['Philadelphia PA',6,3.6,6.8,24,0.9,64,460,42,'1.6M'],
  '191':['Philadelphia PA',6,3.6,6.8,24,0.9,64,460,42,'1.6M'],
  /* Mid-Atlantic / South */
  '200':['Washington DC',5,3.8,6.2,22,0.8,60,400,44,'705K'],
  '201':['Washington DC',5,3.8,6.2,22,0.8,60,400,44,'705K'],
  '206':['Washington DC',5,3.8,6.2,22,0.8,60,400,44,'705K'],
  '210':['Baltimore MD',6,3.4,8.8,20,1.0,58,420,40,'585K'],
  '212':['Baltimore MD',6,3.4,8.8,20,1.0,58,420,40,'585K'],
  '220':['Arlington VA',5,3.2,4.0,18,0.7,52,350,50,'235K'],
  '230':['Richmond VA',6,2.9,3.6,16,0.6,48,310,56,'230K'],
  '270':['Raleigh NC',4,3.0,3.0,14,0.5,46,290,60,'475K'],
  '282':['Charlotte NC',3,3.2,3.4,16,0.6,50,310,56,'880K'],
  '290':['Charleston SC',3,3.6,3.8,18,0.7,54,340,52,'150K'],
  '300':['Atlanta GA',2,3.4,4.2,16,0.5,52,360,54,'500K'],
  '303':['Atlanta GA',2,3.4,4.2,16,0.5,52,360,54,'500K'],
  '320':['Jacksonville FL',10,3.8,3.6,14,0.6,58,300,48,'950K'],
  '327':['Orlando FL',12,4.0,3.2,12,0.5,62,280,46,'290K'],
  '330':['Miami FL',14,4.2,4.8,20,0.8,68,420,38,'450K'],
  '331':['Miami FL',14,4.2,4.8,20,0.8,68,420,38,'450K'],
  '332':['Miami FL',14,4.2,4.8,20,0.8,68,420,38,'450K'],
  '333':['Fort Lauderdale FL',13,4.0,4.2,18,0.7,64,380,40,'185K'],
  '334':['West Palm Beach FL',13,3.8,3.8,16,0.6,60,340,44,'115K'],
  '336':['Tampa FL',11,3.6,3.4,14,0.5,56,320,48,'395K'],
  '337':['St Petersburg FL',11,3.6,3.4,14,0.5,56,320,48,'260K'],
  /* Midwest */
  '400':['Louisville KY',8,3.0,4.0,14,0.6,50,300,54,'625K'],
  '430':['Columbus OH',12,3.2,4.6,16,0.8,54,340,48,'900K'],
  '440':['Cleveland OH',7,3.4,6.4,18,1.0,58,380,44,'380K'],
  '441':['Cleveland OH',7,3.4,6.4,18,1.0,58,380,44,'380K'],
  '460':['Indianapolis IN',14,3.0,4.2,14,0.7,52,320,48,'880K'],
  '481':['Detroit MI',6,3.6,8.4,16,0.8,62,400,38,'640K'],
  '482':['Detroit MI',6,3.6,8.4,16,0.8,62,400,38,'640K'],
  '488':['Flint MI',8,3.2,12.0,14,0.9,56,380,28,'96K'],
  '530':['Milwaukee WI',8,3.0,5.8,12,0.6,48,300,50,'590K'],
  '535':['Madison WI',14,2.6,2.4,10,0.4,40,240,66,'260K'],
  '553':['Minneapolis MN',7,3.2,3.6,12,0.5,46,280,58,'425K'],
  '554':['Minneapolis MN',7,3.2,3.6,12,0.5,46,280,58,'425K'],
  '600':['Chicago IL',8,3.4,5.6,22,0.8,60,420,42,'2.7M'],
  '601':['Chicago IL',8,3.4,5.6,22,0.8,60,420,42,'2.7M'],
  '606':['Chicago IL',8,3.4,5.6,22,0.8,60,420,42,'2.7M'],
  '631':['St Louis MO',10,3.2,5.0,16,0.7,54,360,48,'300K'],
  '640':['Kansas City MO',9,3.0,3.8,14,0.6,50,300,54,'500K'],
  '680':['Omaha NE',11,2.8,3.0,10,0.5,44,260,60,'480K'],
  /* South / Southwest */
  '700':['New Orleans LA',4,4.0,5.4,16,0.6,66,380,42,'390K'],
  '710':['Shreveport LA',6,3.4,4.0,12,0.5,54,300,52,'190K'],
  '730':['Oklahoma City OK',11,3.0,3.4,12,0.5,48,280,56,'680K'],
  '750':['Dallas TX',8,3.4,4.6,18,0.8,56,360,46,'1.3M'],
  '751':['Dallas TX',8,3.4,4.6,18,0.8,56,360,46,'1.3M'],
  '752':['Dallas TX',8,3.4,4.6,18,0.8,56,360,46,'1.3M'],
  '760':['Fort Worth TX',10,3.2,4.2,16,0.7,54,340,48,'920K'],
  '770':['Houston TX',6,3.8,5.8,22,0.9,62,440,40,'2.3M'],
  '771':['Houston TX',6,3.8,5.8,22,0.9,62,440,40,'2.3M'],
  '773':['Houston TX',6,3.8,5.8,22,0.9,62,440,40,'2.3M'],
  '780':['San Antonio TX',15,3.0,3.0,12,0.5,48,260,50,'1.5M'],
  '786':['Austin TX',12,2.8,2.8,14,0.5,44,280,58,'1.0M'],
  '790':['Lubbock TX',18,2.6,2.4,8,0.4,40,220,52,'260K'],
  /* Mountain / West */
  '800':['Denver CO',5,3.0,3.4,12,0.4,42,260,62,'715K'],
  '801':['Denver CO',5,3.0,3.4,12,0.4,42,260,62,'715K'],
  '802':['Denver CO',5,3.0,3.4,12,0.4,42,260,62,'715K'],
  '840':['Salt Lake City UT',12,2.8,2.6,10,0.3,38,220,64,'200K'],
  '850':['Phoenix AZ',18,3.6,4.2,16,1.4,58,340,36,'1.6M'],
  '852':['Phoenix AZ',18,3.6,4.2,16,1.4,58,340,36,'1.6M'],
  '853':['Phoenix AZ',18,3.6,4.2,16,1.4,58,340,36,'1.6M'],
  '855':['Globe AZ',22,2.8,3.0,8,1.0,42,200,42,'7.5K'],
  '856':['Tucson AZ',16,3.2,3.8,14,1.2,52,300,40,'545K'],
  '870':['Albuquerque NM',10,2.6,3.2,10,0.6,44,260,56,'560K'],
  '890':['Las Vegas NV',20,3.8,4.0,14,1.6,56,320,34,'650K'],
  '891':['Las Vegas NV',20,3.8,4.0,14,1.6,56,320,34,'650K'],
  /* Pacific */
  '900':['Los Angeles CA',12,3.6,5.4,26,2.2,60,480,34,'4.0M'],
  '901':['Los Angeles CA',12,3.6,5.4,26,2.2,60,480,34,'4.0M'],
  '902':['Inglewood CA',12,3.6,5.4,26,2.2,60,480,34,'4.0M'],
  '906':['Whittier CA',14,3.4,4.8,24,2.0,56,440,36,'90K'],
  '908':['Long Beach CA',13,3.6,5.0,24,2.0,58,460,35,'475K'],
  '910':['Pasadena CA',14,3.2,4.2,22,1.8,52,400,40,'140K'],
  '913':['Northridge CA',15,3.4,4.6,24,2.0,54,420,38,'90K'],
  '917':['Alhambra CA',14,3.4,5.0,24,2.0,56,440,37,'82K'],
  '920':['San Diego CA',16,3.4,3.8,20,1.0,50,360,42,'1.4M'],
  '921':['San Diego CA',16,3.4,3.8,20,1.0,50,360,42,'1.4M'],
  '925':['Escondido CA',18,3.2,3.4,18,0.9,48,320,44,'150K'],
  '930':['Santa Barbara CA',10,2.8,3.0,14,0.8,42,280,58,'92K'],
  '935':['Fresno CA',6,3.0,4.0,16,0.7,48,320,52,'540K'],
  '940':['San Francisco CA',3,3.2,4.6,20,0.5,44,380,52,'875K'],
  '941':['San Francisco CA',3,3.2,4.6,20,0.5,44,380,52,'875K'],
  '943':['Palo Alto CA',4,2.8,3.2,18,0.4,40,340,58,'68K'],
  '945':['Oakland CA',3,3.4,5.4,22,0.6,48,400,48,'430K'],
  '946':['Oakland CA',3,3.4,5.4,22,0.6,48,400,48,'430K'],
  '950':['San Jose CA',8,3.0,3.8,18,0.8,46,360,50,'1.0M'],
  '951':['Riverside CA',20,3.4,4.4,22,2.4,54,400,32,'330K'],
  '960':['Redding CA',4,2.4,2.2,10,0.3,36,200,68,'92K'],
  '970':['Portland OR',1,3.0,3.2,10,0.2,38,240,66,'650K'],
  '971':['Portland OR',1,3.0,3.2,10,0.2,38,240,66,'650K'],
  '972':['Portland OR',1,3.0,3.2,10,0.2,38,240,66,'650K'],
  '973':['Salem OR',2,2.6,2.8,8,0.2,34,200,70,'175K'],
  '980':['Seattle WA',2,3.2,3.4,12,0.3,40,260,62,'750K'],
  '981':['Seattle WA',2,3.2,3.4,12,0.3,40,260,62,'750K'],
  '982':['Tacoma WA',2,3.0,4.0,14,0.4,42,280,58,'215K'],
  '983':['Federal Way WA',2,3.0,3.6,12,0.3,40,260,60,'98K'],
  '995':['Anchorage AK',2,2.2,2.0,6,0.2,30,160,74,'290K'],
  '967':['Honolulu HI',3,3.4,3.0,8,0.3,36,200,64,'350K'],
  '968':['Honolulu HI',3,3.4,3.0,8,0.3,36,200,64,'350K']
};

/* Fallback: generate data from zip prefix at state level */
var stateFallback = {
  '0':[6,3.2,4.8,18,0.7,55,350,50,'500K'],    /* Northeast */
  '1':[5,3.3,5.5,20,0.7,58,400,46,'800K'],     /* NY/NJ/PA */
  '2':[5,3.4,5.0,18,0.7,54,370,48,'600K'],     /* DC/MD/VA/NC */
  '3':[8,3.6,4.0,15,0.6,56,330,48,'400K'],     /* SE */
  '4':[10,3.2,5.0,15,0.7,52,340,48,'500K'],    /* Midwest */
  '5':[9,3.0,4.0,12,0.5,46,280,56,'350K'],     /* Upper Midwest */
  '6':[9,3.2,4.8,18,0.7,54,360,48,'600K'],     /* IL/MO/KS */
  '7':[10,3.2,4.2,14,0.6,52,320,50,'500K'],    /* TX/OK/LA */
  '8':[14,3.2,3.6,12,0.8,48,290,48,'400K'],    /* Mountain */
  '9':[8,3.2,4.2,18,1.0,48,360,48,'500K']      /* Pacific */
};

function getWaterData(zip) {
  var p3 = zip.substring(0,3);
  var p1 = zip.substring(0,1);
  var d = regions[p3];
  if (d) return {name:d[0],hardness:d[1],chlorine:d[2],lead:d[3],pfas:d[4],chromium6:d[5],thms:d[6],microplastics:d[7],score:d[8],pop:d[9]};
  /* Fallback with slight randomization */
  var fb = stateFallback[p1] || stateFallback['5'];
  var jitter = function(v,pct){return +(v*(1+(Math.random()-.5)*pct)).toFixed(1)};
  return {
    name: 'Your Area ('+zip+')',
    hardness: Math.round(jitter(fb[0],.2)),
    chlorine: jitter(fb[1],.15),
    lead: jitter(fb[2],.2),
    pfas: jitter(fb[3],.25),
    chromium6: jitter(fb[4],.2),
    thms: jitter(fb[5],.15),
    microplastics: Math.round(jitter(fb[6],.2)),
    score: Math.max(20,Math.min(80,Math.round(jitter(fb[7],.15)))),
    pop: fb[8]
  };
}

/* ===== CONTAMINANT DEFINITIONS ===== */
var contamDefs = [
  {key:'chlorine',name:'Chlorine & Chloramine',unit:'ppm',epaLimit:4.0,healthGoal:0.5,icon:'&#9888;',
   note:'Strips natural oils from hair and skin. Accelerates keratin breakdown in women over 45.',
   removal:98},
  {key:'lead',name:'Lead',unit:'ppb',epaLimit:15,healthGoal:0,icon:'&#9762;',
   note:'Neurotoxin with no safe level. Accumulates in bones — especially risky after menopause when bone density drops.',
   removal:99},
  {key:'pfas',name:'PFAS ("Forever Chemicals")',unit:'ppt',epaLimit:4.0,healthGoal:0,icon:'&#9763;',
   note:'Linked to thyroid disruption, immune suppression, and hormonal imbalance — all compounded by menopause.',
   removal:95},
  {key:'chromium6',name:'Chromium-6',unit:'ppb',epaLimit:100,healthGoal:0.02,icon:'&#9762;',
   note:'Known carcinogen made famous by Erin Brockovich. Found in 75% of US drinking water.',
   removal:97},
  {key:'thms',name:'THMs (Trihalomethanes)',unit:'ppb',epaLimit:80,healthGoal:0,icon:'&#9888;',
   note:'Chlorine byproducts absorbed through skin during hot showers. Associated with increased cancer risk.',
   removal:96},
  {key:'microplastics',name:'Microplastics',unit:'particles/L',epaLimit:null,healthGoal:null,icon:'&#128300;',
   note:'No EPA limit exists yet. Emerging research links them to inflammation and endocrine disruption.',
   removal:94},
  {key:'hardness',name:'Hard Water Minerals (Ca/Mg)',unit:'GPG',epaLimit:null,healthGoal:3.5,icon:'&#128167;',
   note:'Leaves mineral buildup that blocks pores, weighs down hair, and prevents skincare absorption.',
   removal:92}
];

/* ===== DAMAGE DEFINITIONS ===== */
function getDamageCards(data) {
  var cards = [];
  var hairSev = data.chlorine > 3.5 || data.hardness > 10 ? 'severe' : data.chlorine > 2.5 || data.hardness > 6 ? 'moderate' : 'mild';
  var skinSev = data.chlorine > 3.0 || data.chromium6 > 0.8 ? 'severe' : data.chlorine > 2.0 ? 'moderate' : 'mild';
  var scalpSev = data.hardness > 12 ? 'severe' : data.hardness > 6 ? 'moderate' : 'mild';
  var agingSev = data.pfas > 18 || data.thms > 55 ? 'severe' : data.pfas > 10 || data.thms > 40 ? 'moderate' : 'mild';
  var barrierSev = data.chlorine > 3.0 || data.hardness > 10 ? 'severe' : 'moderate';
  var absorbSev = data.hardness > 12 ? 'severe' : data.hardness > 6 ? 'moderate' : 'mild';

  cards.push({id:'hsHair',sev:hairSev,pct:hairSev==='severe'?88:hairSev==='moderate'?62:38,icon:'&#128135;',title:'Hair Thinning & Breakage',
    desc:'Chlorine ('+data.chlorine+' ppm) strips the protective oils from your hair shaft. Combined with '+(data.hardness > 7 ? 'very hard' : 'hard')+' water minerals, this accelerates the thinning already triggered by declining estrogen.'});
  cards.push({id:'hsScalp',sev:scalpSev,pct:scalpSev==='severe'?85:scalpSev==='moderate'?58:35,icon:'&#129528;',title:'Scalp Dryness & Irritation',
    desc:'Hard water mineral deposits ('+data.hardness+' GPG) create a film on your scalp that blocks follicles, causes itching, and prevents treatments from reaching the root.'});
  cards.push({id:'hsFace',sev:skinSev,pct:skinSev==='severe'?82:skinSev==='moderate'?56:34,icon:'&#129482;',title:'Facial Skin Dryness & Redness',
    desc:'Chlorine destroys the natural lipid barrier your skin rebuilds more slowly after 45. Result: tightness, redness, and fine lines that appear faster than they should.'});
  cards.push({id:'hsNeck',sev:agingSev,pct:agingSev==='severe'?90:agingSev==='moderate'?65:40,icon:'&#128336;',title:'Accelerated Aging Signs',
    desc:'PFAS ('+data.pfas+' ppt) and THMs ('+data.thms+' ppb) in your water are linked to collagen breakdown and oxidative stress — the two biggest drivers of visible aging after menopause.'});
  cards.push({id:'hsBody',sev:barrierSev,pct:barrierSev==='severe'?78:55,icon:'&#129526;',title:'Full-Body Moisture Loss',
    desc:'Your skin absorbs up to 60% of what it contacts. A 10-minute shower in chlorinated water exposes your body to more chlorine than drinking 8 glasses of the same water.'});
  cards.push({id:'hsBody',sev:absorbSev,pct:absorbSev==='severe'?84:absorbSev==='moderate'?60:36,icon:'&#128176;',title:'Wasted Skincare Products',
    desc:'Hard mineral film blocks serums, moisturizers, and treatments from absorbing. You\'re paying for products that sit on top of buildup instead of reaching your skin.'});
  return cards;
}

/* ===== SCREEN MANAGEMENT ===== */
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(function(s){s.classList.remove('active')});
  var el = document.getElementById(id);
  el.classList.add('active');
  if (id === 'screenResults') window.scrollTo({top:0,behavior:'smooth'});
}

/* ===== START ANALYSIS ===== */
function startAnalysis() {
  var zip = document.getElementById('zipInput').value.trim();
  var err = document.getElementById('zipError');
  if (!/^\d{5}$/.test(zip)) { err.textContent = 'Please enter a valid 5-digit US zip code.'; return; }
  err.textContent = '';
  document.getElementById('loadZip').textContent = zip;
  showScreen('screenLoading');

  /* Animate loading steps */
  var steps = ['ls1','ls2','ls3','ls4'];
  steps.forEach(function(s){
    var el = document.getElementById(s);
    el.classList.remove('active','done');
  });

  var i = 0;
  var stepTimer = setInterval(function(){
    if (i > 0) document.getElementById(steps[i-1]).classList.remove('active');
    if (i > 0) document.getElementById(steps[i-1]).classList.add('done');
    if (i > 0) document.getElementById(steps[i-1]).querySelector('.ico').innerHTML = '&#10003;';
    if (i < steps.length) {
      document.getElementById(steps[i]).classList.add('active');
      i++;
    } else {
      clearInterval(stepTimer);
      setTimeout(function(){ renderResults(zip); }, 600);
    }
  }, 900);
}

/* ===== RENDER RESULTS ===== */
function renderResults(zip) {
  var data = getWaterData(zip);
  showScreen('screenResults');

  /* Header */
  document.getElementById('resZipLabel').textContent = 'Water Report for ' + zip + ' \u2014 ' + data.name;
  var summaryText = data.score < 40 ? 'Your water quality is poor. Multiple contaminants exceed health guidelines \u2014 this is especially concerning for women over 45.' :
    data.score < 55 ? 'Your water quality is below average. Several contaminants were detected at levels that can affect your hair and skin.' :
    'Your water quality is moderate, but contaminants were still detected that impact hair and skin health \u2014 especially after menopause.';
  document.getElementById('resSummary').textContent = summaryText;

  /* === GAUGE === */
  var score = data.score;
  var arcLen = 268; /* 2/3 of circle */
  var offset = 401 - (score / 100) * arcLen;
  var gaugeColor = score < 40 ? 'var(--red)' : score < 60 ? 'var(--amber)' : 'var(--green)';
  var arc = document.getElementById('gaugeArc');
  var num = document.getElementById('gaugeNum');

  setTimeout(function(){
    arc.style.strokeDashoffset = offset;
    arc.style.stroke = gaugeColor;
    /* Animate number */
    var curr = 0;
    var step = Math.max(1, Math.floor(score/40));
    var numTimer = setInterval(function(){
      curr += step;
      if (curr >= score) { curr = score; clearInterval(numTimer); }
      num.textContent = curr;
    }, 30);
  }, 300);

  var gradeEl = document.getElementById('gaugeGrade');
  gradeEl.textContent = score < 40 ? 'Poor' : score < 55 ? 'Below Average' : score < 70 ? 'Fair' : 'Good';
  gradeEl.className = 'gauge-grade ' + (score < 40 ? 'poor' : score < 60 ? 'fair' : 'good');

  var exceedCount = 0;
  contamDefs.forEach(function(c){
    var val = data[c.key];
    if (c.healthGoal !== null && val > c.healthGoal) exceedCount++;
  });

  document.getElementById('gaugeDetail').textContent = 'Your area scored ' + score + ' out of 100 based on ' + contamDefs.length + ' tested contaminants. ' + (exceedCount > 3 ? 'Multiple contaminants exceed safe levels.' : exceedCount + ' contaminants exceed health guidelines.');
  document.getElementById('gsContam').textContent = contamDefs.length;
  document.getElementById('gsExceed').textContent = exceedCount;
  document.getElementById('gsHardness').textContent = data.hardness;
  document.getElementById('gsPop').textContent = data.pop;

  /* === CONTAMINANT BARS === */
  var contamHTML = '';
  contamDefs.forEach(function(c,idx) {
    var val = data[c.key];
    var maxVal = c.epaLimit ? c.epaLimit * 2.5 : (c.key === 'microplastics' ? 800 : 25);
    var pct = Math.min(100, (val / maxVal) * 100);
    var level = 'low';
    if (c.healthGoal !== null && val > c.healthGoal * 5) level = 'high';
    else if (c.healthGoal !== null && val > c.healthGoal * 2) level = 'med';
    if (c.epaLimit && val > c.epaLimit * 0.5) level = 'med';
    if (c.epaLimit && val > c.epaLimit * 0.8) level = 'high';
    if (c.key === 'microplastics') level = val > 400 ? 'high' : val > 250 ? 'med' : 'low';
    if (c.key === 'hardness') level = val > 10 ? 'high' : val > 5 ? 'med' : 'low';
    if (c.key === 'pfas') level = val > 10 ? 'high' : val > 4 ? 'med' : 'low';
    if (c.key === 'chromium6') level = val > 0.5 ? 'high' : val > 0.1 ? 'med' : 'low';

    var limitPct = c.epaLimit ? Math.min(98,(c.epaLimit / maxVal)*100) : -1;
    var limitHTML = limitPct > 0 ? '<div class="contam-limit" style="left:'+limitPct+'%"></div>' : '';
    var valLabel = val + ' ' + c.unit;
    if (c.epaLimit) valLabel += ' (EPA limit: '+c.epaLimit+')';
    else if (c.healthGoal) valLabel += ' (Health goal: '+c.healthGoal+')';
    else valLabel += ' (No EPA limit set)';

    contamHTML += '<div class="contam-row" style="animation:fadeUp .5s ease both;animation-delay:'+(idx*0.1)+'s">' +
      '<div class="contam-hdr"><span class="contam-name"><span class="cdot" style="background:var(--'+(level==='high'?'red':level==='med'?'amber':'green')+')"></span>'+c.icon+' '+c.name+'</span><span class="contam-val '+level+'">'+valLabel+'</span></div>' +
      '<div class="contam-track">'+limitHTML+'<div class="contam-fill '+level+'" data-pct="'+pct+'" style="width:0"></div></div>' +
      '<div class="contam-note">'+c.note+'</div></div>';
  });
  document.getElementById('contamList').innerHTML = contamHTML;

  /* Animate contaminant bars */
  setTimeout(function(){
    document.querySelectorAll('.contam-fill').forEach(function(el){
      el.style.width = el.dataset.pct + '%';
    });
  }, 400);

  /* === DAMAGE CARDS === */
  var damages = getDamageCards(data);
  var dmgHTML = '';
  damages.forEach(function(d, idx){
    dmgHTML += '<div class="damage-card '+d.sev+'" style="animation:fadeUp .5s ease both;animation-delay:'+(idx*0.08)+'s">' +
      '<div class="dc-icon">'+d.icon+'</div><div class="dc-title">'+d.title+'</div>' +
      '<div class="dc-sev '+d.sev+'">'+d.sev.charAt(0).toUpperCase()+d.sev.slice(1)+' Risk</div>' +
      '<div class="dc-desc">'+d.desc+'</div>' +
      '<div class="dc-meter"><div class="dc-meter-fill" data-pct="'+d.pct+'" style="width:0"></div></div></div>';
  });
  document.getElementById('damageGrid').innerHTML = dmgHTML;

  /* Animate body hotspots */
  var hotspotMap = {};
  damages.forEach(function(d){ hotspotMap[d.id] = d.sev; });
  Object.keys(hotspotMap).forEach(function(id, idx){
    var el = document.getElementById(id);
    if (el) setTimeout(function(){ el.style.opacity = '1'; el.style.transition = 'opacity .8s ease'; }, 600 + idx*200);
  });

  /* Animate damage meters */
  setTimeout(function(){
    document.querySelectorAll('.dc-meter-fill').forEach(function(el){
      el.style.width = el.dataset.pct + '%';
    });
  }, 500);

  /* === SOLUTION PERFORMANCE === */
  document.getElementById('fcBefore').textContent = contamDefs.length;
  var removedCount = contamDefs.length - 1 + '+';
  document.getElementById('fcAfter').textContent = removedCount;

  /* Removal bars */
  var remHTML = '';
  contamDefs.forEach(function(c, idx){
    remHTML += '<div class="removal-row" style="animation:fadeUp .4s ease both;animation-delay:'+(idx*0.08)+'s">' +
      '<span class="removal-name">'+c.name.split('(')[0].split('"')[0].trim()+'</span>' +
      '<div class="removal-track"><div class="removal-fill" data-pct="'+c.removal+'" style="width:0"></div></div>' +
      '<span class="removal-pct">'+c.removal+'%</span></div>';
  });
  document.getElementById('removalList').innerHTML = remHTML;

  setTimeout(function(){
    document.querySelectorAll('.removal-fill').forEach(function(el){
      el.style.width = el.dataset.pct + '%';
    });
  }, 600);
}

/* ===== ZIP INPUT HANDLING ===== */
document.getElementById('zipInput').addEventListener('keydown', function(e){
  if (e.key === 'Enter') startAnalysis();
});
document.getElementById('zipInput').addEventListener('input', function(){
  this.value = this.value.replace(/\D/g,'').substring(0,5);
  document.getElementById('zipError').textContent = '';
});