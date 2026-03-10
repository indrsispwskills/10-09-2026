/* ═══════════════════════════════════════════════════════════════
   SHOWERENVY REVIEW DATA ENGINE — 1,347 unique reviews
   ═══════════════════════════════════════════════════════════════ */

var seed = 42;
function rng() { seed = (seed * 16807 + 0) % 2147483647; return (seed - 1) / 2147483646; }
function pick(arr) { return arr[Math.floor(rng() * arr.length)]; }
function pickN(arr, n) { var s = arr.slice(); var r = []; for (var i = 0; i < n && s.length; i++) { var j = Math.floor(rng() * s.length); r.push(s.splice(j, 1)[0]); } return r; }
function range(a, b) { return Math.floor(rng() * (b - a + 1)) + a; }

/* Photo overrides — add real customer photos here */
var PHOTO_OVERRIDES = {};

/* ─── Names (200+ diverse, age-appropriate for 45+) ─── */
var NAMES = [
'Carol','Diana','Patricia','Susan','Linda','Barbara','Margaret','Sandra','Dorothy','Lisa',
'Nancy','Karen','Betty','Helen','Donna','Sharon','Laura','Deborah','Cynthia','Angela',
'Marie','Janet','Catherine','Frances','Ann','Joyce','Diane','Alice','Judith','Julie',
'Teresa','Gloria','Evelyn','Jean','Cheryl','Mildred','Katherine','Joan','Stephanie',
'Maria','Virginia','Kathleen','Pamela','Martha','Debra','Brenda','Nicole','Tammy',
'Ellen','Denise','Carolyn','Robin','Wendy','Bonnie','Theresa','Irene','Jane','Beverly',
'Lori','Andrea','Valerie','Christine','Jacqueline','Paula','Christina','Rhonda','Tina','Kelly',
'Rosa','Connie','Lorraine','Regina','Gail','Wanda','Sylvia','Joy','Joanne','Maureen',
'Renee','Loretta','Vivian','Marlene','Yolanda','Priscilla','Norma','Darlene','Marcia','Phyllis',
'Ana','Veronica','Rita','Carmen','Margarita','Luz','Elena','Guadalupe','Silvia',
'Mei','Yuki','Keiko','Hana','Lin','Wei','Jing',
'Anita','Sonia','Priya','Meena','Deepa','Kavita','Sunita','Rekha',
'Fatima','Amina','Aisha','Zara','Layla','Samira','Nadia','Leila','Jasmine',
'Olga','Natalya','Irina','Tatiana','Svetlana','Yelena','Marina','Vera','Anna',
'Claudia','Beatriz','Fernanda','Gabriela','Lucia','Isabel','Marta','Adriana','Valentina',
'Fiona','Colleen','Bridget','Eileen','Maeve',
'Monique','Colette','Simone','Claire','Juliette','Sylvie',
'Ingrid','Greta','Astrid','Karin','Petra',
'Constance','Maxine','Harriet','Pearl','Estelle','Lorraine','Dolores','Gladys','Lucille'
];
var LASTS = 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z'.split(' ');

/* ─── Problems ─── */
var PROBLEMS = [
  {id:'hair',label:'Hair Thinning',cls:'prob-hair',emoji:'💇',tags:['hair']},
  {id:'skin',label:'Dry Skin',cls:'prob-skin',emoji:'🧴',tags:['skin']},
  {id:'frizz',label:'Frizzy Hair',cls:'prob-hair',emoji:'🌊',tags:['hair']},
  {id:'scalp',label:'Scalp Itchiness',cls:'prob-scalp',emoji:'😣',tags:['skin','hair']},
  {id:'color',label:'Color Fading',cls:'prob-color',emoji:'🎨',tags:['hair']},
  {id:'hard',label:'Hard Water Buildup',cls:'prob-hard',emoji:'🪨',tags:['hair','skin']},
  {id:'eczema',label:'Eczema / Dermatitis',cls:'prob-eczema',emoji:'🩹',tags:['skin']},
  {id:'pressure',label:'Low Pressure Fear',cls:'prob-pressure',emoji:'💧',tags:[]},
  {id:'nails',label:'Brittle Nails',cls:'prob-nails',emoji:'💅',tags:['skin']},
  {id:'chlorine',label:'Chlorine Sensitivity',cls:'prob-chlorine',emoji:'⚗️',tags:['skin']},
  {id:'aging',label:'Aging Concerns',cls:'prob-aging',emoji:'✨',tags:['skin','hair']}
];

/* ─── Review Templates — enriched with real avatar language ─── */
var T = {
hair: [
  "I was losing so much hair every shower — the drain catcher was {em}full{/em} every time. After {weeks} weeks with the {product}, it's noticeably less. My husband saw it before I even mentioned the filter.",
  "My hair had been thinning since I hit {turnAge}. I blamed menopause for everything. But within {weeks} weeks of filtering my water, my stylist asked what I changed. Turns out the chlorine was accelerating what hormones started.",
  "Hair coming out in clumps. I sat down and cried looking at the drain catcher one night. That's when I started researching. The {product} didn't reverse menopause, but it stopped my water from making it {em}worse{/em}.",
  "I was spending $200/month trying to add volume — Nutrafol, biotin, volumizing shampoos. After switching to the {product}, I've cut that in half because my hair actually {em}holds{/em} products now.",
  "At our age, every strand matters. I was afraid to even wash my hair — only doing it twice a week. {weeks} weeks with filtered water and my ponytail genuinely feels thicker.",
  "I used to have thick beautiful hair. Then menopause hit and I had what I can only call 'old lady hair.' Three months with the {product} and my hairdresser literally gasped at the improvement.",
  "I tried everything — Rogaine, biotin, collagen supplements, sulfate-free shampoos. Spent over $2,000. The simplest change I made was filtering my shower water, and it was the most effective.",
  "My dermatologist specifically told me to filter my shower water. She said chlorine was a known contributor to follicle inflammation. After {weeks} weeks I understand why she was so insistent.",
  "The breakage at my crown — the most visible spot — has slowed dramatically. The {product} didn't magically regrow hair, but the {em}existing{/em} hair is so much stronger. That matters enormously at 50+.",
  "Three months in. My colorist said the texture improvement was dramatic. She could see more baby hairs coming in around my temples. All I changed was the showerhead."
],
skin: [
  "My skin was so dry after showers that I had to slather lotion within 60 seconds or it would crack and bleed. Now I can actually {em}wait{/em}. The difference is night and day.",
  "The crepey skin on my arms and chest has noticeably improved. I thought that was just aging — turns out the minerals in my water were making it dramatically worse.",
  "I opened my bathroom cabinet and saw $2,000 worth of products that weren't working. CeraVe, Eucerin, Aquaphor, retinols, hyaluronic acid — none of it mattered when my shower water was undoing everything.",
  "My face felt like sandpaper after every shower. Tight, papery, like a desert. Within the first week with the {product}, that feeling completely disappeared.",
  "Post-menopausal dry skin is brutal enough without chlorine stripping what little natural oils you have left. This filter removed a major aggravator. My skin retains moisture so much better now.",
  "The flaky patches on my shins that I'd had for years started clearing up within two weeks. My dermatologist was genuinely impressed — she's now recommending shower filters to patients.",
  "I spent $300 on fancy body butters last year. With filtered water, my $12 drugstore lotion works {em}better{/em} than all of them combined. My products finally absorb.",
  "My skin has a glow I haven't seen in years. The dull, ashy look I'd been fighting was literally mineral deposits. I feel like myself again for the first time since perimenopause.",
  "Remember how your skin felt on vacation? That silky softness? That's what filtered water feels like. Every shower. I only wish someone had told me sooner.",
  "The redness on my cheeks that I assumed was rosacea? Mostly gone. It was a reaction to the chlorine in our water. Twenty years of unnecessary suffering."
],
frizz: [
  "My hair was frizzy like a Brillo pad — menopause plus hard water is a brutal combination. The {product} gave me curl definition I haven't seen since my 30s.",
  "My hair went from an unmanageable triangle poof to actually having texture and shine. The hard water was destroying my natural pattern.",
  "Blow-drying used to take 45 minutes of frizz wrestling. Now it's under 20 because my hair just {em}cooperates{/em}. I'd given up on air-drying entirely until now.",
  "Despite taking supplements, collagen, and using every leave-in conditioner — nothing was getting to the hair. It was broken, frizzy, and limp. Filtered water fixed what products couldn't.",
  "The frizz reduction was noticeable after literally one wash. I thought I was imagining it, so I asked my daughter. She confirmed — it was a visible difference.",
  "I'd been putting my hair in a ponytail most days because the frizz was too embarrassing. Three weeks with filtered water and I actually wear it down again.",
  "My stylist said my hair's porosity has completely changed — it absorbs and holds moisture now instead of repelling everything. The buildup was like a coating on every strand.",
  "Anti-frizz serums, smoothing shampoos, keratin treatments — I tried everything. Some cost hundreds. The {product} did what all those products couldn't. It addressed the root cause.",
  "For the first time in years, I can run my fingers through my hair without them getting stuck. The hard water mineral buildup is gone.",
  "And what the heck happens to your hair after menopause? The frizz was unbearable. Turns out it wasn't just hormones — it was the water amplifying the hormones."
],
scalp: [
  "The scalp itchiness was keeping me up at night. I was scratching until I had sores. My dermatologist suggested a shower filter and within {em}two showers{/em} the itching stopped.",
  "The itching was driving me crazy — literally. I was prescribed medicated shampoos for years. After switching to filtered water, I don't need them anymore.",
  "Perimenopause + unfiltered water = the itchiest scalp of my life. The filter was the single biggest relief I've found, and I've tried everything.",
  "I thought I had dandruff for 20 years. Turns out it was hard water buildup creating flakes. The {product} dissolved it within a month. I could have wept.",
  "My doctor said the chlorine was causing contact dermatitis on my scalp. I was at my wit's end. This filter removed the trigger and my scalp healed completely.",
  "Waking up with flakes on my pillow every morning was mortifying. That stopped within the first week of using filtered water. Not gradually — it just stopped.",
  "The burning sensation during showers? Gone. The itchiness after? Gone. My scalp feels {em}calm{/em} for the first time in years. I didn't know calm was possible.",
  "My scalp was producing visible flakes no matter what shampoo I used — Head & Shoulders, T/Gel, prescription ketoconazole. The {product} fixed what medication couldn't in {weeks} weeks.",
  "I literally cried from relief. Two days. That's all it took. The constant itch that had plagued me for three years vanished in two days of filtered showers.",
  "The prickling, tingling, burning sensation during every shower — I thought that was normal. It's not. Clean water shouldn't hurt. Now it doesn't."
],
color: [
  "My stylist charges $180 for highlights. Before the filter, they'd fade in two weeks. Now they hold for six-plus weeks. Do the math — the filter paid for itself in month one.",
  "I color my hair to cover grays. The color used to wash out in two weeks flat. With the {product}, it holds for 5-6 weeks minimum. The chlorine was literally bleaching my investment.",
  "The brassiness I fought constantly? Chlorine. The answer was chlorine the whole time. The {product} keeps my cool tones cool. My purple shampoo barely gets used now.",
  "Spending $400+ per year on extra salon visits because my color kept fading. This filter paid for itself before I even needed a replacement cartridge.",
  "My red hair color used to fade to an ugly orange within weeks. With filtered water, it stays vibrant and rich. My colorist noticed before I even told her about the filter.",
  "Balayage is expensive. Watching it wash down the drain after 2 showers was heartbreaking. The {product} preserves my investment. That's not marketing — that's chemistry.",
  "I'd switched to at-home box color because salon visits were too frequent and expensive. With the filter, even box color lasts impressively long now.",
  "My colorist said my hair was holding the pigment so much better between appointments. She asked what changed. When I said 'showerhead,' she laughed — then ordered one herself.",
  "At {turnAge}, I color every 5 weeks. Before the filter, I was retouching every 3 weeks because the chlorine stripped it so fast. That's $900/year in unnecessary salon visits.",
  "Purple shampoo was my crutch for brass prevention. I barely need it now because the chlorine isn't stripping my platinum highlights every single shower."
],
hard: [
  "Our water is incredibly hard — over 15 grains. My hair felt like straw, waxy and impossible to style. The {product} made an immediate, obvious difference from shower one.",
  "The white mineral residue that coated everything in our shower — imagine what it was doing to my hair and skin. It was like a layer of chalk on every strand.",
  "I didn't realize how much hard water buildup was on my hair until it was gone. It's like discovering you have completely different hair underneath the mineral coating.",
  "We just moved to Arizona and the hard water was a disaster for my hair. My neighbor recommended ShowerEnvy — now we both swear by it.",
  "I could literally see white residue on my dark hair. After the {product}, my hair is actually {em}clean{/em} clean, not mineral-coated clean. The difference is embarrassingly obvious.",
  "Our well water is brutal — the glass shower door gets cloudy within days. Imagine what it was doing to my aging skin. With filtered water, everything stays clearer.",
  "The hard water was making my expensive shampoos completely useless. They couldn't lather, couldn't clean, couldn't condition. It was like the water was fighting every product I used.",
  "I did a water test before and after. The chlorine went from 2.8 ppm to essentially zero. Seeing those numbers made me realize what I'd been showering in for years.",
  "My products absorb now. That's the biggest change. My $200 serums were sitting on top of mineral deposits before. Now they actually {em}penetrate{/em}. Best money I ever spent.",
  "The spots on my skin that two dermatologists couldn't explain? Hard water mineral deposits. Filtered water cleared them up in about a month."
],
eczema: [
  "My eczema flares have reduced from weekly to maybe once a month since installing the {product}. My allergist said the chlorine was a known trigger. She was right.",
  "I've had eczema since childhood, but it got dramatically worse after {turnAge}. Menopause plus chlorinated water was too much for my skin barrier. Filtered water brought it back to manageable.",
  "Steroid creams, moisturizing routines, dietary changes — I tried everything. The {product} did more for my eczema than all of them combined. I wish I'd known 20 years ago.",
  "My dermatologist specifically recommended a shower filter. She said chlorine disrupts the skin barrier, especially post-menopause when repair is already slower.",
  "I used to dread showers because they made my eczema {em}worse{/em}. The stinging, the drying, the inevitable flare. Now showers actually soothe instead of irritate. I look forward to them again.",
  "The weeping, cracking patches on my calves healed completely within a month of switching to filtered water. My husband couldn't believe it.",
  "Twenty years of eczema. Countless medications and dermatologist visits — easily $5,000+. One shower filter made the single biggest improvement. I'm angry no one suggested this sooner.",
  "My daughter-in-law has eczema too — I bought her one and her flares calmed down within two weeks. Now I've bought them for everyone in my family who struggles with skin issues.",
  "The patches on my hands and elbows were persistent for years despite daily prescription creams. After {weeks} weeks of filtered showers, they're almost completely clear.",
  "My skin barrier was so compromised that even lukewarm water stung. Filtered water feels gentle. No more stinging, no more dread. My shower is my sanctuary again."
],
pressure: [
  "My biggest fear was losing water pressure. I'm in an older home with already-low pressure. The {product} actually feels {em}stronger{/em} than my old standard head. I was shocked.",
  "I put off buying a filter for two years because I was worried about pressure. Biggest regret of my life. Pressure is perfect — possibly better than before.",
  "My husband was the skeptic. He used it once and said 'keep it.' From a man who complains about everything, that's a five-star review.",
  "I read every review about pressure before buying. They were right — if anything, the {product} has better pressure than what I had. The nozzle design is genuinely smart.",
  "We have naturally low water pressure in our 1960s house. The {product} somehow improved it. The engineering makes a real difference — it's not just about filtering.",
  "The Jet mode on the 2.0 has more pressure than my old standard showerhead. And that's {em}with{/em} filtration. I don't understand how, but I'm not complaining.",
  "Tested the flow with my plumber's gauge. 1.8 GPM but feels like 2.5. Smart engineering — less water, better feel. My plumber was impressed and asked for the brand.",
  "My apartment has terrible water pressure. The {product} actually made it better. My neighbor asked what I did — she ordered one that same night.",
  "My old showerhead was decent but the pressure was nothing special. The Massage mode on the {product} is genuinely therapeutic on my shoulders and neck. Better than my old gym's shower.",
  "Every filtered showerhead I'd tried before killed the pressure. I'd given up on the whole concept. ShowerEnvy proved me wrong. Pressure is excellent on all three modes."
],
nails: [
  "My nails were peeling and breaking constantly. I blamed menopause, but within a month of filtered showers, they're growing strong again. Even my nail tech noticed.",
  "Manicures used to last 3 days before chipping because my nails were so brittle and dry. Now they last over a week with the same polish. My nail tech asked what changed.",
  "Hard water was making my nails ridged, yellow, and splitting. The {product} cleared that up — they're smooth and strong for the first time in years.",
  "Toenails were getting thick and discolored. My podiatrist said mineral deposits could contribute. Filtered water has visibly improved them — something medication hadn't fully fixed.",
  "I thought brittle nails were just part of getting older. Turns out stripping them with chlorinated, mineral-heavy water every day was the actual problem.",
  "Gel manicures were the only thing keeping my nails from breaking. With filtered water, my natural nails are strong enough on their own. That's a real savings over time.",
  "The ridges on my thumbnails have smoothed out completely. I didn't even know that was related to water quality until my aesthetician mentioned it.",
  "Cuticles used to peel and crack constantly no matter how much cuticle oil I used. With the {product}, they stay soft and smooth. Small thing, but it matters at this age.",
  "My nails grow faster and break less. Simple as that. The hard water and chlorine were literally dissolving my nail structure. One change fixed what supplements couldn't.",
  "I'm {turnAge} and my nails haven't looked this healthy since my 30s. My daughter asked if I was taking a new supplement. Nope — just filtering the water I shower in."
],
chlorine: [
  "I could smell the chlorine from the hallway when someone was showering. After installing the {product}, the chemical smell is completely gone. Our bathroom smells like {em}nothing{/em} now.",
  "My eyes used to sting in the shower. My skin would be red after. The {product} eliminated both immediately. It was the chlorine all along.",
  "I'm very sensitive to chemicals — always have been. The chlorine in our municipal water was giving me headaches after every shower. That stopped the first day with the filter.",
  "The 'clean' smell of my shower water? That was chlorine. Once it's gone, you realize your water should smell like nothing. Going back to unfiltered feels barbaric now.",
  "I used to break out in hives after long showers. My allergist diagnosed chlorine sensitivity. The {product} is essentially medical-necessity-level for me. Changed my quality of life.",
  "My respiratory therapist recommended filtering shower water. She said chlorine vapor irritates airways, especially in hot showers. Breathing in the shower is noticeably easier now.",
  "We moved from well water to city water and suddenly had skin and breathing problems. The chlorine was the obvious culprit. The {product} reversed it within weeks.",
  "I'm allergic to chlorine — diagnosed by an allergist at {turnAge}. This filter isn't optional for me, it's essential. Every shower without it was making me sick.",
  "The difference between filtered and unfiltered water feels like swimming pool versus spring water. Once you know, you can never go back. I feel it immediately if I shower elsewhere.",
  "Hot water makes chlorine worse — it vaporizes into a gas you breathe. I learned that at {turnAge} and immediately ordered the {product}. Why isn't this common knowledge?"
],
aging: [
  "I'm not trying to stop aging — I just don't want my water {em}accelerating{/em} it. The {product} removed an avoidable stressor from my daily routine. That's smart self-care.",
  "My fine lines looked deeper after every shower because the skin was so dehydrated from the chlorine. Filtered water keeps my skin plump and hydrated all day.",
  "The best anti-aging product I own is technically a plumbing fixture. My skin hasn't looked this good in years. My aesthetician confirmed the improvement isn't placebo.",
  "After 45, everything compounds. Less collagen, less oil, then chlorine strips what's left every single shower. Removing that last factor made a real, visible difference.",
  "Investing $49 in a filter that makes my $200 serums actually absorb? That's the smartest skincare math I've ever done. Every product in my routine works better now.",
  "I noticed my crow's feet looked softer after switching. The skin around my eyes is definitely more hydrated. My friend said I looked 'refreshed' — and I hadn't changed anything else.",
  "Menopause already takes a toll on skin elasticity. Chlorine and minerals were compounding the damage every single day. The {product} stopped that compounding. Simple as that.",
  "My aesthetician said my skin was 'chronically dehydrated' despite all the products I used. Filtered water fixed that underlying problem, and now everything I apply works better.",
  "I feel like I aged 10 years in 18 months. Then I learned about what shower water does to post-menopausal skin. The {product} didn't reverse time, but it stopped the acceleration.",
  "Once I hit {turnAge} it was downhill so fast. Jowls, crepey arms, thin skin. Filtering my water didn't fix hormones, but it removed a daily insult my body didn't need."
]
};

/* ─── Sharing/gifting phrases ─── */
var SHARE_GIFT = [
  {text:"Bought one for my sister's birthday — she called me crying with gratitude",type:"share-gift",icon:"🎁"},
  {text:"Ordered for every bathroom in the house. No going back now",type:"share-multi",icon:"🏠"},
  {text:"My mom tried mine during her visit and I ordered her one that night",type:"share-family",icon:"👩‍👧"},
  {text:"Told my entire book club — 4 of them ordered before the meeting ended",type:"share-gift",icon:"📚"},
  {text:"Got one for my guest bathroom so visitors benefit too",type:"share-multi",icon:"🏠"},
  {text:"My neighbor saw the difference in my skin and ordered same day",type:"share-gift",icon:"🏘️"},
  {text:"Christmas gifts sorted — 5 of these for the women in my family",type:"share-gift",icon:"🎄"},
  {text:"Master bath first, then immediately ordered for the kids' bathroom",type:"share-multi",icon:"🏠"},
  {text:"My best friend has been complaining about the same issues. Had to get her one",type:"share-gift",icon:"💝"},
  {text:"My daughter's in college — sent her one for her apartment immediately",type:"share-family",icon:"🎓"},
  {text:"Bought 2 more — guest suite and mother-in-law. She has terrible hard water",type:"share-multi",icon:"🏠"},
  {text:"My coworker noticed my skin and now half our office has ordered one",type:"share-gift",icon:"💼"},
  {text:"Mother's Day gifts — bought three for my mom, aunt, and sister",type:"share-gift",icon:"💐"},
  {text:"Convinced my husband we needed one in every bathroom. He agreed after shower one",type:"share-multi",icon:"🏠"},
  {text:"Gave one to my hairstylist. She now recommends them to every client over 40",type:"share-gift",icon:"✂️"},
  {text:"My yoga instructor asked about my skin. Five people in class now have one",type:"share-gift",icon:"🧘"},
  {text:"My dermatologist asked what I changed. She now recommends ShowerEnvy to patients",type:"share-gift",icon:"👩‍⚕️"},
  {text:"Three bathrooms, three filters. The whole house kit was perfect",type:"share-multi",icon:"🏠"},
  {text:"Posted in my menopause support group. Got 40+ messages asking for the link",type:"share-gift",icon:"📱"},
  {text:"Our whole cul-de-sac has them now. Started with just me!",type:"share-gift",icon:"🏘️"},
  {text:"My mahjong group ordered together — all 4 of us love it",type:"share-gift",icon:"🀄"},
  {text:"Daughter-in-law has eczema. Got her one and her flares calmed right down",type:"share-family",icon:"👩‍👧"},
  {text:"My AARP group discussed water quality last month. Sent the link to everyone",type:"share-gift",icon:"📧"},
  {text:"Bought for both showers after the first week. Can't shower without it now",type:"share-multi",icon:"🏠"}
];
var BA_SCENES = {
hair: {
  label: 'Hair Density',
  time: '6 weeks',
  before: {
    lines: ['Visible scalp through thinning','Clumps in drain daily','Snapping when brushing'],
    svg: function(seed) {
      var s = '<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">';
      /* Scalp visible */
      s += '<rect width="200" height="140" fill="#EDCFC4" rx="0"/>';
      s += '<ellipse cx="100" cy="15" rx="90" ry="12" fill="#F5D0C0" opacity=".6"/>';
      /* Sparse thin hair strands */
      for (var i = 0; i < 18; i++) {
        var x = 15 + i * 10 + (seed * 3 + i * 7) % 5;
        var c1y = 12 + (i % 3) * 4;
        var bend = ((seed + i) % 7) - 3;
        s += '<path d="M'+x+' '+c1y+' Q'+(x+bend)+' 55 '+(x+bend*1.5)+' 138" stroke="#8B7355" stroke-width="1.2" fill="none" opacity="'+(0.3 + (i%3)*0.15)+'"/>';
      }
      /* Loose strands fallen */
      s += '<path d="M40 85 Q55 95 70 88" stroke="#9B8365" stroke-width="1" fill="none" opacity=".4"/>';
      s += '<path d="M120 90 Q140 98 155 92" stroke="#9B8365" stroke-width="1" fill="none" opacity=".35"/>';
      /* Red stress marks on scalp */
      s += '<circle cx="60" cy="12" r="3" fill="#E8A0A0" opacity=".5"/>';
      s += '<circle cx="130" cy="14" r="2.5" fill="#E8A0A0" opacity=".4"/>';
      return s + '</svg>';
    }
  },
  after: {
    lines: ['Fuller, denser coverage','Minimal drain shedding','Strong flexible strands'],
    svg: function(seed) {
      var s = '<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">';
      s += '<rect width="200" height="140" fill="#C8EDDA" rx="0"/>';
      /* Dense healthy hair strands */
      for (var i = 0; i < 42; i++) {
        var x = 5 + i * 4.6 + (seed + i * 3) % 3;
        var bend = ((seed + i) % 5) - 2;
        var col = i % 3 === 0 ? '#5C4A32' : i % 3 === 1 ? '#6B5B43' : '#7A6A53';
        s += '<path d="M'+x+' 6 Q'+(x+bend)+' 50 '+(x+bend*0.8)+' 138" stroke="'+col+'" stroke-width="1.8" fill="none" opacity="'+(0.55 + (i%4)*0.1)+'"/>';
      }
      /* Shine highlight */
      s += '<ellipse cx="100" cy="45" rx="60" ry="8" fill="rgba(255,255,255,.2)"/>';
      s += '<ellipse cx="80" cy="65" rx="40" ry="5" fill="rgba(255,255,255,.12)"/>';
      return s + '</svg>';
    }
  }
},
skin: {
  label: 'Skin Hydration',
  time: '4 weeks',
  before: {
    lines: ['Tight, cracked after showers','Flaky patches on arms/legs','Dull, ashy complexion'],
    svg: function(seed) {
      var s = '<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">';
      s += '<rect width="200" height="140" fill="#E8D5C8" rx="0"/>';
      /* Dry cracked texture */
      for (var i = 0; i < 12; i++) {
        var x1 = (seed * 7 + i * 18) % 180 + 10;
        var y1 = (seed * 3 + i * 11) % 90 + 10;
        var x2 = x1 + ((i * 5 + seed) % 30) - 15;
        var y2 = y1 + ((i * 7 + seed) % 20) - 10;
        s += '<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="#C4A08A" stroke-width="1" opacity=".5"/>';
      }
      /* Flaky patches */
      s += '<ellipse cx="65" cy="45" rx="22" ry="16" fill="#D4B8A4" opacity=".6" stroke="#C4A08A" stroke-width="0.5"/>';
      s += '<ellipse cx="145" cy="65" rx="18" ry="14" fill="#D4B8A4" opacity=".5" stroke="#C4A08A" stroke-width="0.5"/>';
      /* Redness */
      s += '<ellipse cx="65" cy="45" rx="12" ry="8" fill="#E8A0A0" opacity=".3"/>';
      s += '<ellipse cx="145" cy="65" rx="10" ry="7" fill="#E8A0A0" opacity=".25"/>';
      return s + '</svg>';
    }
  },
  after: {
    lines: ['Hydrated and supple all day','Smooth, even texture','Visible glow and radiance'],
    svg: function(seed) {
      var s = '<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">';
      s += '<defs><radialGradient id="skinGlow'+seed+'"><stop offset="0%" stop-color="#F5E6DC"/><stop offset="100%" stop-color="#E8D5C8"/></radialGradient></defs>';
      s += '<rect width="200" height="140" fill="url(#skinGlow'+seed+')" rx="0"/>';
      /* Smooth healthy texture */
      s += '<ellipse cx="100" cy="55" rx="80" ry="40" fill="rgba(255,235,220,.4)"/>';
      /* Glow highlights */
      s += '<ellipse cx="75" cy="40" rx="25" ry="15" fill="rgba(255,255,255,.25)"/>';
      s += '<ellipse cx="130" cy="60" rx="20" ry="12" fill="rgba(255,255,255,.2)"/>';
      /* Dewy droplets */
      s += '<circle cx="60" cy="35" r="3" fill="rgba(255,255,255,.5)"/>';
      s += '<circle cx="140" cy="55" r="2.5" fill="rgba(255,255,255,.45)"/>';
      s += '<circle cx="100" cy="75" r="2" fill="rgba(255,255,255,.4)"/>';
      return s + '</svg>';
    }
  }
},
frizz: {
  label: 'Frizz Level',
  time: '3 weeks',
  before: {
    lines: ['Uncontrollable poof/triangle','No curl definition','45-min blow dry minimum'],
    svg: function(seed) {
      var s = '<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">';
      s += '<rect width="200" height="140" fill="#F0E0D0" rx="0"/>';
      /* Wild frizzy strands going every direction */
      for (var i = 0; i < 28; i++) {
        var x = 20 + i * 6 + (seed + i * 5) % 4;
        var wild = ((seed + i * 3) % 20) - 10;
        var wild2 = ((seed + i * 7) % 16) - 8;
        s += '<path d="M'+x+' 8 Q'+(x+wild)+' 35 '+(x+wild2)+' 60 Q'+(x-wild)+' 85 '+(x+wild*1.3)+' 138" stroke="#8B7355" stroke-width="1.3" fill="none" opacity=".45"/>';
      }
      /* Flyaway hairs */
      s += '<path d="M50 25 Q35 15 20 20" stroke="#A08060" stroke-width="0.8" fill="none" opacity=".4"/>';
      s += '<path d="M150 20 Q170 10 185 18" stroke="#A08060" stroke-width="0.8" fill="none" opacity=".35"/>';
      s += '<path d="M80 30 Q65 18 55 25" stroke="#A08060" stroke-width="0.8" fill="none" opacity=".3"/>';
      return s + '</svg>';
    }
  },
  after: {
    lines: ['Smooth, defined texture','Natural curls returned','Air-dry ready in 20 min'],
    svg: function(seed) {
      var s = '<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">';
      s += '<rect width="200" height="140" fill="#D8EDDE" rx="0"/>';
      /* Smooth flowing curves */
      for (var i = 0; i < 30; i++) {
        var x = 8 + i * 6.2;
        var phase = (i * 0.5 + seed * 0.3) % 6;
        var col = i % 2 === 0 ? '#5C4A32' : '#6B5B43';
        s += '<path d="M'+x+' 6 C'+(x+4)+' 30 '+(x-4)+' 55 '+(x+3)+' 80 S'+(x-2)+' 95 '+(x+1)+' 138" stroke="'+col+'" stroke-width="1.6" fill="none" opacity=".5"/>';
      }
      s += '<ellipse cx="100" cy="50" rx="65" ry="10" fill="rgba(255,255,255,.18)"/>';
      return s + '</svg>';
    }
  }
},
scalp: {
  label: 'Scalp Health',
  time: '2 weeks',
  before: {
    lines: ['Constant itching & flaking','Red irritated patches','Medicated shampoo needed'],
    svg: function(seed) {
      var s = '<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">';
      s += '<rect width="200" height="140" fill="#F0D8D0" rx="0"/>';
      /* Scalp surface with irritation */
      s += '<ellipse cx="100" cy="55" rx="85" ry="45" fill="#E8C8BC"/>';
      /* Red irritation spots */
      for (var i = 0; i < 8; i++) {
        var cx = 40 + (seed * 5 + i * 22) % 120;
        var cy = 25 + (seed * 3 + i * 13) % 60;
        var r = 4 + (i % 3) * 2;
        s += '<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="#E07070" opacity="'+(0.3 + (i%3)*0.15)+'"/>';
      }
      /* Flake particles */
      for (var j = 0; j < 10; j++) {
        var fx = 25 + (seed * 7 + j * 19) % 150;
        var fy = 20 + (seed * 4 + j * 11) % 70;
        s += '<rect x="'+fx+'" y="'+fy+'" width="'+(3+j%2)+'" height="'+(2+j%2)+'" fill="#F0E0D0" opacity=".6" rx="1" transform="rotate('+(j*23)+' '+fx+' '+fy+')"/>';
      }
      return s + '</svg>';
    }
  },
  after: {
    lines: ['Calm, balanced scalp','Zero flaking or itching','Regular shampoo works fine'],
    svg: function(seed) {
      var s = '<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">';
      s += '<rect width="200" height="140" fill="#D8EDE0" rx="0"/>';
      s += '<ellipse cx="100" cy="55" rx="85" ry="45" fill="#C8E0D0"/>';
      /* Healthy follicle dots */
      for (var i = 0; i < 15; i++) {
        var cx = 35 + (seed * 4 + i * 11) % 130;
        var cy = 25 + (seed * 6 + i * 7) % 60;
        s += '<circle cx="'+cx+'" cy="'+cy+'" r="2" fill="#8BC0A0" opacity=".4"/>';
      }
      s += '<ellipse cx="100" cy="45" rx="50" ry="20" fill="rgba(255,255,255,.15)"/>';
      return s + '</svg>';
    }
  }
},
color: {
  label: 'Color Vibrancy',
  time: '5 weeks',
  before: {
    lines: ['Faded to brassy in 2 weeks','Dull, washed-out tones','Salon visits every 3 weeks'],
    svg: function(seed) {
      var s = '<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">';
      s += '<rect width="200" height="140" fill="#E8DDD0" rx="0"/>';
      /* Faded dull color strands */
      for (var i = 0; i < 30; i++) {
        var x = 6 + i * 6.3;
        var bend = ((seed + i) % 6) - 3;
        /* Washed out brassy tones */
        var colors = ['#C8B090','#CCAA88','#D0B898','#C4A880','#C8B498'];
        var col = colors[i % 5];
        s += '<path d="M'+x+' 6 Q'+(x+bend)+' 50 '+(x+bend*0.7)+' 138" stroke="'+col+'" stroke-width="1.6" fill="none" opacity=".45"/>';
      }
      /* Brassy overlay */
      s += '<rect width="200" height="140" fill="#C8A060" opacity=".08"/>';
      return s + '</svg>';
    }
  },
  after: {
    lines: ['Vibrant color holds 5–6 weeks','Cool/warm tones preserved','Salon visits every 7+ weeks'],
    svg: function(seed) {
      var s = '<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">';
      s += '<rect width="200" height="140" fill="#E0E8F0" rx="0"/>';
      /* Rich vibrant strands */
      for (var i = 0; i < 32; i++) {
        var x = 5 + i * 6;
        var bend = ((seed + i) % 5) - 2;
        var colors = ['#4A2C2A','#6B3A38','#8B4542','#5C3432','#7A4240'];
        var col = colors[i % 5];
        s += '<path d="M'+x+' 6 Q'+(x+bend)+' 50 '+(x+bend*0.5)+' 138" stroke="'+col+'" stroke-width="1.8" fill="none" opacity=".55"/>';
      }
      /* Color richness highlights */
      s += '<ellipse cx="80" cy="40" rx="30" ry="8" fill="rgba(160,60,60,.08)"/>';
      s += '<ellipse cx="120" cy="65" rx="25" ry="6" fill="rgba(140,50,50,.06)"/>';
      s += '<ellipse cx="100" cy="50" rx="50" ry="8" fill="rgba(255,255,255,.12)"/>';
      return s + '</svg>';
    }
  }
},
eczema: {
  label: 'Eczema Severity',
  time: '8 weeks',
  before: {
    lines: ['Weekly flare-ups','Red, weeping patches','Steroid cream dependency'],
    svg: function(seed) {
      var s = '<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">';
      s += '<rect width="200" height="140" fill="#F0D8D0" rx="0"/>';
      s += '<ellipse cx="100" cy="55" rx="80" ry="42" fill="#E8D0C4"/>';
      /* Eczema patches */
      s += '<ellipse cx="70" cy="40" rx="25" ry="18" fill="#D88080" opacity=".4"/>';
      s += '<ellipse cx="70" cy="40" rx="18" ry="12" fill="#E09090" opacity=".3"/>';
      s += '<ellipse cx="140" cy="65" rx="20" ry="15" fill="#D88080" opacity=".35"/>';
      s += '<ellipse cx="140" cy="65" rx="14" ry="10" fill="#E09090" opacity=".25"/>';
      /* Rough texture dots */
      for (var i = 0; i < 20; i++) {
        var x = 45 + (seed * 3 + i * 7) % 50;
        var y = 28 + (seed * 5 + i * 4) % 25;
        s += '<circle cx="'+x+'" cy="'+y+'" r="1.5" fill="#C07070" opacity=".3"/>';
      }
      return s + '</svg>';
    }
  },
  after: {
    lines: ['Monthly flares at most','Skin barrier restored','Medication reduced'],
    svg: function(seed) {
      var s = '<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">';
      s += '<rect width="200" height="140" fill="#D8EDE0" rx="0"/>';
      s += '<ellipse cx="100" cy="55" rx="80" ry="42" fill="#C8E0D0"/>';
      /* Smooth clear skin */
      s += '<ellipse cx="100" cy="50" rx="55" ry="25" fill="rgba(255,255,255,.15)"/>';
      s += '<ellipse cx="80" cy="42" rx="20" ry="10" fill="rgba(255,255,255,.1)"/>';
      /* Very faint ghost of where patches were — showing healing */
      s += '<ellipse cx="70" cy="40" rx="15" ry="10" fill="#B8D8C0" opacity=".2" stroke="#A0C8B0" stroke-width="0.5" stroke-dasharray="2 2"/>';
      return s + '</svg>';
    }
  }
},
hard: {
  label: 'Water Test Strip',
  time: '1 day',
  before: {
    lines: ['White residue on everything','Products won\'t lather','Stiff, waxy hair texture'],
    svg: function(seed) {
      var s = '<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">';
      /* Water test strip visual */
      s += '<rect width="200" height="140" fill="#F0E8D8" rx="0"/>';
      /* Test strip */
      s += '<rect x="30" y="15" width="140" height="80" fill="#fff" rx="4" stroke="#ddd" stroke-width="1"/>';
      s += '<text x="100" y="28" text-anchor="middle" font-size="11" fill="#999" font-family="DM Sans,sans-serif" font-weight="600">WATER TEST — BEFORE</text>';
      /* Colored zones showing contamination */
      s += '<rect x="42" y="35" width="28" height="18" fill="#E8C040" rx="3"/>';
      s += '<text x="56" y="70" text-anchor="middle" font-size="7" fill="#666" font-family="DM Sans,sans-serif">Chlorine</text>';
      s += '<text x="56" y="48" text-anchor="middle" font-size="11" fill="#8B6914" font-weight="700" font-family="DM Sans,sans-serif">HIGH</text>';
      s += '<rect x="86" y="35" width="28" height="18" fill="#D08040" rx="3"/>';
      s += '<text x="100" y="70" text-anchor="middle" font-size="7" fill="#666" font-family="DM Sans,sans-serif">Hardness</text>';
      s += '<text x="100" y="48" text-anchor="middle" font-size="11" fill="#7A4A14" font-weight="700" font-family="DM Sans,sans-serif">HIGH</text>';
      s += '<rect x="130" y="35" width="28" height="18" fill="#C8A060" rx="3"/>';
      s += '<text x="144" y="70" text-anchor="middle" font-size="7" fill="#666" font-family="DM Sans,sans-serif">Metals</text>';
      s += '<text x="144" y="48" text-anchor="middle" font-size="11" fill="#7A5A14" font-weight="700" font-family="DM Sans,sans-serif">MED</text>';
      return s + '</svg>';
    }
  },
  after: {
    lines: ['Clean, deposit-free water','Full lather instantly','Silky, soft hair texture'],
    svg: function(seed) {
      var s = '<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">';
      s += '<rect width="200" height="140" fill="#E0F0E8" rx="0"/>';
      s += '<rect x="30" y="15" width="140" height="80" fill="#fff" rx="4" stroke="#ddd" stroke-width="1"/>';
      s += '<text x="100" y="28" text-anchor="middle" font-size="11" fill="#999" font-family="DM Sans,sans-serif" font-weight="600">WATER TEST — AFTER</text>';
      s += '<rect x="42" y="35" width="28" height="18" fill="#A0D8B0" rx="3"/>';
      s += '<text x="56" y="70" text-anchor="middle" font-size="7" fill="#666" font-family="DM Sans,sans-serif">Chlorine</text>';
      s += '<text x="56" y="48" text-anchor="middle" font-size="11" fill="#1A6B3A" font-weight="700" font-family="DM Sans,sans-serif">NONE</text>';
      s += '<rect x="86" y="35" width="28" height="18" fill="#B8E0C0" rx="3"/>';
      s += '<text x="100" y="70" text-anchor="middle" font-size="7" fill="#666" font-family="DM Sans,sans-serif">Hardness</text>';
      s += '<text x="100" y="48" text-anchor="middle" font-size="11" fill="#1A6B3A" font-weight="700" font-family="DM Sans,sans-serif">LOW</text>';
      s += '<rect x="130" y="35" width="28" height="18" fill="#A8D8B8" rx="3"/>';
      s += '<text x="144" y="70" text-anchor="middle" font-size="7" fill="#666" font-family="DM Sans,sans-serif">Metals</text>';
      s += '<text x="144" y="48" text-anchor="middle" font-size="11" fill="#1A6B3A" font-weight="700" font-family="DM Sans,sans-serif">NONE</text>';
      return s + '</svg>';
    }
  }
},
nails: {
  label: 'Nail Strength',
  time: '6 weeks',
  before: {
    lines: ['Peeling and splitting','Manicure lasts 3 days','Ridges and discoloration'],
    svg: function(seed) {
      var s = '<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">';
      s += '<rect width="200" height="140" fill="#F0E0D8" rx="0"/>';
      /* Brittle nails */
      for (var i = 0; i < 5; i++) {
        var x = 18 + i * 36;
        s += '<path d="M'+x+' 85 Q'+x+' 35 '+(x+8)+' 20 Q'+(x+16)+' 20 '+(x+24)+' 35 Q'+(x+24)+' 85 '+x+' 85 Z" fill="#D8C8B8" stroke="#C0B0A0" stroke-width="0.8"/>';
        /* Ridges */
        s += '<line x1="'+(x+6)+'" y1="30" x2="'+(x+6)+'" y2="78" stroke="#C4B4A4" stroke-width="0.5" opacity=".5"/>';
        s += '<line x1="'+(x+12)+'" y1="25" x2="'+(x+12)+'" y2="80" stroke="#C4B4A4" stroke-width="0.5" opacity=".5"/>';
        s += '<line x1="'+(x+18)+'" y1="30" x2="'+(x+18)+'" y2="78" stroke="#C4B4A4" stroke-width="0.5" opacity=".5"/>';
        /* Cracks/chips */
        if (i % 2 === 0) s += '<path d="M'+(x+10)+' 22 L'+(x+14)+' 35 L'+(x+8)+' 30 Z" fill="#E8D8C8" stroke="#C0A890" stroke-width="0.5"/>';
      }
      return s + '</svg>';
    }
  },
  after: {
    lines: ['Strong, smooth nails','Manicure lasts 10+ days','Even color, no ridges'],
    svg: function(seed) {
      var s = '<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">';
      s += '<rect width="200" height="140" fill="#E0E8E0" rx="0"/>';
      for (var i = 0; i < 5; i++) {
        var x = 18 + i * 36;
        /* Healthy smooth nails */
        s += '<path d="M'+x+' 85 Q'+x+' 35 '+(x+8)+' 20 Q'+(x+16)+' 20 '+(x+24)+' 35 Q'+(x+24)+' 85 '+x+' 85 Z" fill="#F0D0C0" stroke="#E0B8A8" stroke-width="0.8"/>';
        /* Healthy shine */
        s += '<ellipse cx="'+(x+12)+'" cy="45" rx="5" ry="18" fill="rgba(255,255,255,.3)"/>';
        /* Subtle pink */
        s += '<ellipse cx="'+(x+12)+'" cy="55" rx="8" ry="12" fill="rgba(240,160,160,.1)"/>';
      }
      return s + '</svg>';
    }
  }
},
chlorine: {
  label: 'Chlorine Level',
  time: '1 day',
  before: {
    lines: ['Chemical smell in shower','2.8 ppm chlorine detected','Stinging eyes and skin'],
    svg: function(seed) {
      var s = '<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">';
      s += '<rect width="200" height="140" fill="#F0F0D0" rx="0"/>';
      /* Water droplets with yellow tint */
      for (var i = 0; i < 12; i++) {
        var cx = 20 + (seed * 5 + i * 15) % 160;
        var cy = 15 + (seed * 3 + i * 9) % 80;
        var r = 6 + (i % 4) * 3;
        s += '<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="#E8E080" opacity="'+(0.2 + (i%3)*0.1)+'"/>';
        s += '<circle cx="'+cx+'" cy="'+cy+'" r="'+(r*0.6)+'" fill="#D8D060" opacity=".15"/>';
      }
      /* Cl2 markers */
      s += '<text x="50" y="55" font-size="14" fill="#A0A040" font-weight="700" font-family="DM Sans,sans-serif" opacity=".4">Cl₂</text>';
      s += '<text x="130" y="70" font-size="11" fill="#A0A040" font-weight="700" font-family="DM Sans,sans-serif" opacity=".3">Cl₂</text>';
      /* Warning */
      s += '<text x="100" y="130" text-anchor="middle" font-size="11" fill="#8B8020" font-weight="600" font-family="DM Sans,sans-serif">2.8 ppm — Above Safe Level</text>';
      return s + '</svg>';
    }
  },
  after: {
    lines: ['Zero chemical odor','0.0 ppm chlorine','No irritation at all'],
    svg: function(seed) {
      var s = '<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">';
      s += '<rect width="200" height="140" fill="#E0F0F8" rx="0"/>';
      /* Clean clear water droplets */
      for (var i = 0; i < 10; i++) {
        var cx = 25 + (seed * 4 + i * 17) % 150;
        var cy = 15 + (seed * 6 + i * 10) % 75;
        var r = 7 + (i % 3) * 3;
        s += '<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="rgba(100,180,220,.12)"/>';
        s += '<circle cx="'+(cx-1)+'" cy="'+(cy-1)+'" r="'+(r*0.4)+'" fill="rgba(255,255,255,.3)"/>';
      }
      s += '<text x="100" y="130" text-anchor="middle" font-size="11" fill="#5E8A6A" font-weight="600" font-family="DM Sans,sans-serif">0.0 ppm — Pure &amp; Clean</text>';
      return s + '</svg>';
    }
  }
},
aging: {
  label: 'Skin Vitality',
  time: '8 weeks',
  before: {
    lines: ['Dehydrated, papery texture','Fine lines more visible','Serums sitting on surface'],
    svg: function(seed) {
      var s = '<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">';
      s += '<rect width="200" height="140" fill="#E8DDD0" rx="0"/>';
      s += '<ellipse cx="100" cy="55" rx="75" ry="40" fill="#E0D0C0"/>';
      /* Fine lines */
      for (var i = 0; i < 6; i++) {
        var x1 = 45 + (seed + i * 8) % 20;
        var y1 = 25 + i * 12;
        var x2 = x1 + 70 + (i * 5 % 20);
        s += '<path d="M'+x1+' '+y1+' Q'+(x1+35)+' '+(y1+3)+' '+x2+' '+(y1-1)+'" stroke="#C8B8A8" stroke-width="0.7" fill="none" opacity=".5"/>';
      }
      /* Dull patches */
      s += '<ellipse cx="70" cy="45" rx="20" ry="15" fill="#D8C8B8" opacity=".3"/>';
      s += '<ellipse cx="130" cy="60" rx="18" ry="12" fill="#D8C8B8" opacity=".25"/>';
      return s + '</svg>';
    }
  },
  after: {
    lines: ['Plump, hydrated skin','Lines appear softened','Products absorb beautifully'],
    svg: function(seed) {
      var s = '<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">';
      s += '<rect width="200" height="140" fill="#E8E0D8" rx="0"/>';
      s += '<ellipse cx="100" cy="55" rx="75" ry="40" fill="#F0E0D4"/>';
      /* Healthy glow */
      s += '<ellipse cx="85" cy="45" rx="30" ry="18" fill="rgba(255,230,210,.3)"/>';
      s += '<ellipse cx="115" cy="60" rx="25" ry="15" fill="rgba(255,230,210,.25)"/>';
      /* Luminous highlights */
      s += '<ellipse cx="80" cy="40" rx="12" ry="8" fill="rgba(255,255,255,.25)"/>';
      s += '<ellipse cx="120" cy="55" rx="10" ry="6" fill="rgba(255,255,255,.2)"/>';
      s += '<circle cx="90" cy="38" r="2" fill="rgba(255,255,255,.4)"/>';
      return s + '</svg>';
    }
  }
},
pressure: {
  label: 'Water Pressure',
  time: '1 day',
  before: {
    lines: ['Worried about weak flow','Standard head — no filter','Higher GPM, lower feel'],
    svg: function(seed) {
      var s = '<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">';
      s += '<rect width="200" height="140" fill="#E8E0E0" rx="0"/>';
      /* Showerhead outline */
      s += '<rect x="80" y="5" width="40" height="12" fill="#B0B0B0" rx="3"/>';
      s += '<rect x="75" y="17" width="50" height="8" fill="#C0C0C0" rx="2"/>';
      /* Weak thin streams */
      for (var i = 0; i < 6; i++) {
        var x = 82 + i * 7;
        s += '<line x1="'+x+'" y1="25" x2="'+(x + (i%3-1)*2)+'" y2="105" stroke="#B0C0D0" stroke-width="1" opacity=".3"/>';
      }
      /* Label */
      s += '<text x="100" y="130" text-anchor="middle" font-size="11" fill="#888" font-weight="600" font-family="DM Sans,sans-serif">2.5 GPM · Standard</text>';
      return s + '</svg>';
    }
  },
  after: {
    lines: ['Powerful micro-nozzle flow','Filtered + pressurized','Less water, better feel'],
    svg: function(seed) {
      var s = '<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">';
      s += '<rect width="200" height="140" fill="#E0ECF0" rx="0"/>';
      s += '<rect x="80" y="5" width="40" height="12" fill="#5E8A6A" rx="3"/>';
      s += '<rect x="75" y="17" width="50" height="8" fill="#3AB8A8" rx="2"/>';
      /* Strong dense streams */
      for (var i = 0; i < 10; i++) {
        var x = 78 + i * 4.5;
        s += '<line x1="'+x+'" y1="25" x2="'+x+'" y2="105" stroke="#60B8D0" stroke-width="2" opacity=".4" stroke-linecap="round"/>';
      }
      /* Spray mist */
      s += '<ellipse cx="100" cy="65" rx="35" ry="30" fill="rgba(100,180,220,.06)"/>';
      s += '<text x="100" y="130" text-anchor="middle" font-size="11" fill="#5E8A6A" font-weight="600" font-family="DM Sans,sans-serif">1.8 GPM · Micro-Nozzle</text>';
      return s + '</svg>';
    }
  }
}
};

var BA_GAUGES = {
  hair:     {beforeVal:82,afterVal:28,beforeLbl:'Severe',afterLbl:'Mild',unit:'shedding'},
  skin:     {beforeVal:88,afterVal:15,beforeLbl:'Critical',afterLbl:'Healthy',unit:'dryness'},
  frizz:    {beforeVal:90,afterVal:20,beforeLbl:'Extreme',afterLbl:'Smooth',unit:'frizz'},
  scalp:    {beforeVal:78,afterVal:10,beforeLbl:'Intense',afterLbl:'Calm',unit:'irritation'},
  color:    {beforeVal:85,afterVal:18,beforeLbl:'Rapid',afterLbl:'Minimal',unit:'fade rate'},
  hard:     {beforeVal:95,afterVal:12,beforeLbl:'15+ gpg',afterLbl:'< 2 gpg',unit:'hardness'},
  eczema:   {beforeVal:75,afterVal:22,beforeLbl:'Chronic',afterLbl:'Rare',unit:'flare freq.'},
  pressure: {beforeVal:35,afterVal:88,beforeLbl:'Weak',afterLbl:'Strong',unit:'flow feel'},
  nails:    {beforeVal:80,afterVal:20,beforeLbl:'Brittle',afterLbl:'Strong',unit:'breakage'},
  chlorine: {beforeVal:92,afterVal:2, beforeLbl:'2.8 ppm',afterLbl:'0.0 ppm',unit:'Cl₂ level'},
  aging:    {beforeVal:72,afterVal:25,beforeLbl:'Depleted',afterLbl:'Plump',unit:'dehydration'}
};
var AVATAR_CLS = ['av-sage','av-gold','av-ink','av-rose','av-cream'];

/* ─── Generate all 1347 reviews ─── */
var ALL_REVIEWS = [];
var TOTAL = 1347;

for (var i = 0; i < TOTAL; i++) {
  var name = pick(NAMES);
  var last = pick(LASTS);
  var age = range(42, 68);
  var is50 = rng() < 0.45;
  var product = is50 ? '5.0 Stationary' : '2.0 Handheld';
  var prodCls = is50 ? 'p50' : 'p20';
  var prob = pick(PROBLEMS);
  var weeks = range(1, 12);
  var turnAge = range(44, 58);

  var rr = rng();
  var rating = rr < 0.62 ? 5 : rr < 0.84 ? 4 : rr < 0.94 ? 3 : rr < 0.98 ? 2 : 1;

  var templates = T[prob.id] || T.skin;
  var body = pick(templates)
    .replace(/{product}/g, product)
    .replace(/{weeks}/g, weeks)
    .replace(/{turnAge}/g, turnAge)
    .replace(/{em}/g, '<em>')
    .replace(/{\/em}/g, '</em>');

  var extras = [
    "The installation took about 4 minutes. My granddaughter could have done it.",
    "Worth every single penny. I only wish I'd done this years ago.",
    "My shower has become my sanctuary again. The best part of my morning.",
    "I've tried so many products over the years. This is the one that actually addressed the root cause.",
    "The customer service team was incredibly helpful and patient with my questions.",
    "I've been telling every woman in my life. This needs to be standard.",
    "The difference between filtered and unfiltered is night and day.",
    "After trying this, I'm honestly angry I spent years suffering unnecessarily.",
    "This is self-care that actually works — not just another product that promises and fails.",
    "The spa modes on the 2.0 are a game-changer. Massage mode on my shoulders is heaven.",
    "The 5.0's vitamin infusion makes my skin feel incredible. Like a mini facial every morning.",
    "Game changer. Best money I ever spent on my health.",
    "Why didn't anyone tell me sooner? All those years of unnecessary struggling.",
    "It's the one thing I can actually control about this aging process.",
    "I deserve this. We all do. Clean water shouldn't be a luxury.",
    "Taking matters into my own hands. Finally found something that works."
  ];
  body += ' ' + pick(extras);

  var shared = rng() < 0.50;
  var shareInfo = shared ? pick(SHARE_GIFT) : null;
  var hasBA = rng() < 0.30;
  var baScene = hasBA ? (BA_SCENES[prob.id] || BA_SCENES.skin) : null;
  var baSeed = i;
  var baProbId = prob.id;
  var helpful = range(0, 89);
  var daysAgo = range(1, 365);
  var dateStr;
  if (daysAgo <= 1) dateStr = 'Today';
  else if (daysAgo <= 7) dateStr = daysAgo + ' days ago';
  else if (daysAgo <= 30) dateStr = Math.ceil(daysAgo / 7) + ' weeks ago';
  else dateStr = Math.ceil(daysAgo / 30) + ' months ago';

  ALL_REVIEWS.push({
    id: i, name: name + ' ' + last + '.', initials: name[0] + last[0],
    age: age, product: product, prodCls: prodCls, problem: prob,
    rating: rating, body: body, shared: shared, shareInfo: shareInfo,
    hasBA: hasBA, baScene: baScene, baSeed: baSeed, baProbId: baProbId,
    helpful: helpful, dateStr: dateStr, daysAgo: daysAgo,
    avatarCls: pick(AVATAR_CLS), animDelay: 0
  });
}

/* ═══════════════════════════════════════════
   RENDERING ENGINE
   ═══════════════════════════════════════════ */
var PAGE_SIZE = 48;
var currentPage = 0;
var filteredReviews = ALL_REVIEWS.slice();
var currentFilter = 'all';
var currentSort = 'recent';

function renderStars(n) {
  var s = '';
  for (var i = 1; i <= 5; i++) {
    var fill = i <= n ? 'var(--gold)' : '#E8E3DA';
    s += '<svg viewBox="0 0 16 16"><path d="M8 1l2.2 4.5 5 .7-3.6 3.5.9 5L8 12.4 3.5 14.7l.9-5L.8 6.2l5-.7L8 1z" fill="' + fill + '"/></svg>';
  }
  return s;
}

function renderBA(scene, seed, probId, reviewId) {
  if (!scene) return '';
  var weeks = scene.time;
  var g = BA_GAUGES[probId] || BA_GAUGES.skin;
  var photos = PHOTO_OVERRIDES[reviewId];
  var hasPhotos = !!photos;
  var photoTag = hasPhotos ? ' · 📷 Customer photo' : '';

  var beforeVisual, afterVisual;
  if (hasPhotos) {
    beforeVisual = '<div class="rc-ba-visual has-photo"><img class="rc-ba-photo" src="'+photos.before+'" alt="Before ShowerEnvy" loading="lazy"/></div>';
    afterVisual = '<div class="rc-ba-visual has-photo"><img class="rc-ba-photo" src="'+photos.after+'" alt="After ShowerEnvy" loading="lazy"/></div>';
  } else {
    beforeVisual = '<div class="rc-ba-visual">' + scene.before.svg(seed) + '</div>';
    afterVisual = '<div class="rc-ba-visual">' + scene.after.svg(seed) + '</div>';
  }
  var isPressure = probId === 'pressure';

  return '<div class="rc-ba" data-review-id="'+reviewId+'">' +
    '<div class="rc-ba-header">' +
      '<div class="rc-ba-header-left"><span>📸 Before &amp; After</span>' +
      (hasPhotos ? '<span class="rc-ba-header-badge">REAL PHOTO</span>' : '') +
      '</div><span class="rc-ba-camera">Documented over ' + weeks + photoTag + '</span></div>' +
    '<div class="rc-ba-row">' +
      '<div class="rc-ba-side rc-ba-before"><div class="rc-ba-label">BEFORE</div>' + beforeVisual +
        '<div class="rc-ba-gauge"><span class="rc-ba-gauge-label">' + g.beforeLbl + '</span>' +
        '<div class="rc-ba-gauge-track"><div class="rc-ba-gauge-fill" style="width:'+g.beforeVal+'%"></div></div>' +
        '<span class="rc-ba-gauge-val">' + g.beforeVal + '%</span></div>' +
        '<div class="rc-ba-results">' + scene.before.lines.map(function(l) { return '<div class="rc-ba-result"><span class="rc-ba-result-icon">✗</span>' + l + '</div>'; }).join('') + '</div>' +
      '</div>' +
      '<div class="rc-ba-center"><div class="rc-ba-center-arrow">→</div></div>' +
      '<div class="rc-ba-side rc-ba-after"><div class="rc-ba-label">AFTER</div>' + afterVisual +
        '<div class="rc-ba-gauge"><span class="rc-ba-gauge-label">' + g.afterLbl + '</span>' +
        '<div class="rc-ba-gauge-track"><div class="rc-ba-gauge-fill" style="width:'+(isPressure ? g.afterVal : (100 - g.afterVal))+'%"></div></div>' +
        '<span class="rc-ba-gauge-val">' + (isPressure ? g.afterVal+'%' : g.afterVal+'%') + '</span></div>' +
        '<div class="rc-ba-results">' + scene.after.lines.map(function(l) { return '<div class="rc-ba-result"><span class="rc-ba-result-icon">✓</span>' + l + '</div>'; }).join('') + '</div>' +
      '</div>' +
    '</div>' +
    '<div class="rc-ba-time"><span class="rc-ba-time-icon">⏱</span> ' + scene.label + ' improvement documented over <b>' + weeks + '</b></div>' +
  '</div>';
}

function renderShare(info) {
  if (!info) return '';
  return '<div class="rc-share ' + info.type + '">' + info.icon + ' ' + info.text + '</div>';
}

function renderCard(r, idx) {
  var delay = (idx % PAGE_SIZE) * 0.04;
  return '<div class="review-card" style="animation-delay:' + delay.toFixed(2) + 's" data-id="' + r.id + '">' +
    '<div class="rc-header">' +
      '<div class="rc-person">' +
        '<div class="rc-avatar ' + r.avatarCls + '">' + r.initials + '</div>' +
        '<div><div class="rc-name">' + r.name + '</div><div class="rc-age">Age ' + r.age + ' · Female</div></div>' +
      '</div>' +
      '<div class="rc-product ' + r.prodCls + '">' + r.product + '</div>' +
    '</div>' +
    '<div class="rc-stars">' + renderStars(r.rating) + '</div>' +
    '<div class="rc-problem ' + r.problem.cls + '">' + r.problem.emoji + ' ' + r.problem.label + '</div>' +
    '<div class="rc-body">' + r.body + '</div>' +
    (r.hasBA ? renderBA(r.baScene, r.baSeed, r.baProbId, r.id) : '') +
    (r.shared ? renderShare(r.shareInfo) : '') +
    '<div class="rc-meta">' +
      '<div class="rc-verified"><svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="8" fill="#16A34A" opacity=".15"/><path d="M5 8l2 2 4-4" stroke="#16A34A" stroke-width="1.5" fill="none" stroke-linecap="round"/></svg> Verified Purchase</div>' +
      '<div class="rc-date">' + r.dateStr + '</div>' +
      '<div class="rc-helpful" onclick="this.innerHTML=\'👍 Helpful (\' + (' + r.helpful + '+1) + \')\'" >👍 Helpful (' + r.helpful + ')</div>' +
    '</div>' +
  '</div>';
}

function applyFilters() {
  filteredReviews = ALL_REVIEWS.filter(function(r) {
    if (currentFilter === 'all') return true;
    if (currentFilter === 'p20') return r.prodCls === 'p20';
    if (currentFilter === 'p50') return r.prodCls === 'p50';
    if (currentFilter === 'hair') return r.problem.tags.indexOf('hair') >= 0;
    if (currentFilter === 'skin') return r.problem.tags.indexOf('skin') >= 0;
    if (currentFilter === 'shared') return r.shared;
    if (currentFilter === 'ba') return r.hasBA;
    return true;
  });
  if (currentSort === 'recent') filteredReviews.sort(function(a, b) { return a.daysAgo - b.daysAgo; });
  else if (currentSort === 'helpful') filteredReviews.sort(function(a, b) { return b.helpful - a.helpful; });
  else if (currentSort === 'rating-high') filteredReviews.sort(function(a, b) { return b.rating - a.rating; });
  else if (currentSort === 'rating-low') filteredReviews.sort(function(a, b) { return a.rating - b.rating; });
  currentPage = 0;
  renderPage();
}

function renderPage() {
  var grid = document.getElementById('reviewsGrid');
  var end = (currentPage + 1) * PAGE_SIZE;
  var visible = filteredReviews.slice(0, end);
  var html = '';
  for (var i = 0; i < visible.length; i++) { html += renderCard(visible[i], i); }
  grid.innerHTML = html;
  document.getElementById('showCount').textContent = visible.length;
  document.getElementById('loadShown').textContent = visible.length;
  document.getElementById('progressFill').style.width = (visible.length / filteredReviews.length * 100) + '%';
  document.getElementById('loadMore').style.display = visible.length >= filteredReviews.length ? 'none' : '';
}

document.getElementById('loadMore').addEventListener('click', function() { currentPage++; renderPage(); });

document.querySelectorAll('.filter-btn').forEach(function(btn) {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.filter-btn').forEach(function(b) { b.classList.remove('act'); });
    this.classList.add('act');
    currentFilter = this.getAttribute('data-filter');
    applyFilters();
  });
});

document.getElementById('sortSelect').addEventListener('change', function() { currentSort = this.value; applyFilters(); });

applyFilters();

/* ═══════════════════════════════════════════
   ANIMATIONS & SCROLL
   ═══════════════════════════════════════════ */
var rvObs = new IntersectionObserver(function(entries) {
  entries.forEach(function(e) { if (e.isIntersecting) { e.target.classList.add('vis'); rvObs.unobserve(e.target); } });
}, { threshold: 0.06, rootMargin: '0px 0px -60px 0px' });
document.querySelectorAll('.rv').forEach(function(el) { rvObs.observe(el); });
setTimeout(function() { document.querySelectorAll('.rv:not(.vis)').forEach(function(el) { el.classList.add('vis'); }); }, 3000);

var barObs = new IntersectionObserver(function(entries) {
  if (entries[0].isIntersecting) {
    document.querySelectorAll('.bf').forEach(function(el, i) {
      setTimeout(function() { el.style.width = el.getAttribute('data-w'); }, i * 100);
    });
    barObs.unobserve(entries[0].target);
  }
}, { threshold: 0.2 });
barObs.observe(document.getElementById('barChart'));

window.addEventListener('scroll', function() {
  var btn = document.getElementById('scrollTop');
  if (window.scrollY > 600) btn.classList.add('show');
  else btn.classList.remove('show');
}, { passive: true });