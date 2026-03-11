/* ═══ FAQ ═══ */
function xpToggle(btn){var body=btn.nextElementSibling,wasOpen=btn.classList.contains('open');var sec=btn.closest('section')||document;sec.querySelectorAll('.xp-btn.open').forEach(function(b){b.classList.remove('open');b.nextElementSibling.classList.remove('open')});if(!wasOpen){btn.classList.add('open');body.classList.add('open')}}

/* ═══ Reveal ═══ */
function makeObs(sel,opts){var o=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('vis');o.unobserve(e.target)}})},opts||{threshold:.08,rootMargin:'0px 0px -40px 0px'});document.querySelectorAll(sel).forEach(function(el){o.observe(el)})}
makeObs('.rv');makeObs('.rv-scale');makeObs('.rv-left');makeObs('.rv-right');
setTimeout(function(){document.querySelectorAll('.rv:not(.vis),.rv-scale:not(.vis),.rv-left:not(.vis),.rv-right:not(.vis)').forEach(function(el){el.classList.add('vis')})},3500);

/* ═══ Scroll Spy ═══ */
var trackerLinks=document.querySelectorAll('.tracker a');
var sectionIds=['hero','science','pressure','install','spa','filter','compare','timeline','reviews','faq'];
window.addEventListener('scroll',function(){var cur='';sectionIds.forEach(function(id){var el=document.getElementById(id);if(el&&el.getBoundingClientRect().top<=140)cur=id});trackerLinks.forEach(function(l){l.classList.toggle('act',l.getAttribute('href')==='#'+cur)})},{passive:true});

/* ═══ Helper ═══ */
function animObs(id,fn,th){var el=document.getElementById(id);if(!el)return;var obs=new IntersectionObserver(function(es){if(es[0].isIntersecting){fn();obs.unobserve(el)}},{threshold:th||.25});obs.observe(el)}

/* Hero drops */
animObs('heroVis',function(){document.getElementById('heroVis').classList.add('go')},.1);

/* ═══ ANIMATED COUNTERS ═══ */
animObs('trustBar',function(){
  document.querySelectorAll('.ctr').forEach(function(el){
    var end=parseFloat(el.dataset.end),suf=el.dataset.suf||'',dec=parseInt(el.dataset.dec)||0,fmt=el.dataset.fmt;
    var dur=2400,start=performance.now();
    function step(now){
      var p=Math.min((now-start)/dur,1);
      var ease=p<.5?(1-Math.cos(p*Math.PI))/2:(1+Math.sin((p-.5)*Math.PI))/2;
      var v=ease*end;
      if(dec)el.textContent=v.toFixed(dec)+suf;
      else{var n=Math.round(v);el.textContent=(fmt?n.toLocaleString('en-US'):n)+suf}
      if(p<1)requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  });
},.3);

/* Pressure */
animObs('pc1',function(){document.getElementById('m1').style.width='82%';document.getElementById('m2').style.width='60%'});
animObs('pc2',function(){document.getElementById('m3').style.width='46%'});

/* Ring */
animObs('ring',function(){document.getElementById('ring').classList.add('go')});

/* Spa */
['sr','sm','sj'].forEach(function(id){animObs(id,function(){document.getElementById(id).classList.add('go')},.15)});

/* ═══ Filter Cards ═══ */
(function(){var g=document.getElementById('filtGrid');if(!g)return;var cards=g.querySelectorAll('.filt-card');var obs=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){var idx=Array.prototype.indexOf.call(cards,e.target);setTimeout(function(){e.target.classList.add('on');var fill=e.target.querySelector('.filt-eff-fill');if(fill)setTimeout(function(){fill.style.width=fill.dataset.w+'%'},100)},idx*200);obs.unobserve(e.target)}})},{threshold:.15,rootMargin:'0px 0px -30px 0px'});cards.forEach(function(c){obs.observe(c)})})();

/* ═══ Comparison Table Row Stagger ═══ */
(function(){var rows=document.querySelectorAll('.cmp-row');var obs=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){var idx=Array.prototype.indexOf.call(rows,e.target);setTimeout(function(){e.target.classList.add('vis')},idx*80);obs.unobserve(e.target)}})},{threshold:.1});rows.forEach(function(r){obs.observe(r)})})();

/* ═══ Timeline ═══ */
(function(){var items=document.querySelectorAll('.tl-item'),fill=document.getElementById('tlFill'),wrap=document.getElementById('tlWrap');
var confStages=[{pct:0,label:'Starting your journey'},{pct:25,label:'First relief signs'},{pct:55,label:'Visible improvement'},{pct:80,label:'Real change happening'},{pct:100,label:'Full transformation'}];
var stage=0;
var obs=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('on');stage++;if(confStages[stage]){document.getElementById('confPct').textContent=confStages[stage].pct+'%';document.getElementById('confLabel').textContent=confStages[stage].label;document.getElementById('confFill').style.width=confStages[stage].pct+'%'}obs.unobserve(e.target)}})},{threshold:.2,rootMargin:'0px 0px -60px 0px'});
items.forEach(function(it){obs.observe(it)});
if(fill&&wrap)window.addEventListener('scroll',function(){var rect=wrap.getBoundingClientRect(),wh=window.innerHeight;if(rect.top<wh&&rect.bottom>0){var progress=Math.min(1,Math.max(0,(wh-rect.top)/(rect.height+wh*.3)));fill.style.height=(progress*100)+'%'}},{passive:true});
})();

/* ═══ Install card hover ═══ */
document.querySelectorAll('.grid-install .card').forEach(function(c){
  c.addEventListener('mouseenter',function(){c.style.transform='translateY(-6px)';c.style.boxShadow='0 12px 36px rgba(31,29,26,.1)'});
  c.addEventListener('mouseleave',function(){c.style.transform='';c.style.boxShadow=''});
});

/* ═══ 2-Tier Offer Toggle ═══ */
var curOpt=1;
function selectOpt(n,m){
  curOpt=n;
  var o1=document.getElementById('opt1'),o2=document.getElementById('opt2'),cta=document.getElementById('heroCta');
  if(n===1){
    o1.style.borderColor='var(--sage)';o1.style.background='var(--sage3)';
    o2.style.borderColor='var(--bdr)';o2.style.background='#fff';
    if(cta){cta.textContent='Add to Cart — $49';cta.className='btn btn--rose';}
  }else{
    o1.style.borderColor='var(--bdr)';o1.style.background='#fff';
    o2.style.borderColor='var(--gold)';o2.style.background='var(--gold3)';
    if(cta){cta.textContent='Add Bundle to Cart — $79';cta.className='btn btn--rose';}
  }
  /* Update nav cart button too */
  var cb=document.querySelector('.cart-btn');
  if(cb) cb.textContent=n===1?'Add to Cart — $49':'Add Bundle — $79';

  console.log(m);
  document.getElementById("heroCta").setAttribute("data-variant", m);
  // document.querySelector(".cart-btn").setAttribute("data-variant", m);

  document.querySelectorAll(".cart-btn").forEach(btn => {
  btn.setAttribute("data-variant", m);
});
}

/* ═══ SE20 Shopify Purchase Sync ═══ */
(function(){
  var panel=document.querySelector('[data-se20-purchase]');
  if(!panel)return;
  var variants=[];
  try{variants=JSON.parse(panel.getAttribute('data-product')||'[]')}catch(e){variants=[]}
  var checkoutBase=panel.getAttribute('data-checkout-base-url')||'';
  var variantKey=panel.getAttribute('data-variant-key')||'variant';
  var purchaseKey=panel.getAttribute('data-purchase-key')||'purchase';
  var oneTime=panel.getAttribute('data-one-time')||'one_time';
  var subscription=panel.getAttribute('data-subscription')||'subscription';
  var currentVariant=variants[0]||null;
  var currentPurchase=oneTime;

  function formatMoney(cents){
    var n=(Number(cents)||0)/100;
    return '$'+n.toFixed(2).replace(/\.00$/,'');
  }

  function setVariantByName(name){
    var match=variants.find(function(v){return v.option1===name});
    if(match) currentVariant=match;
    var target=document.querySelector('#heroCta');
    if(target&&currentVariant){
      target.textContent=(curOpt===1?'Add to Cart — ':'Add Bundle to Cart — ')+formatMoney(currentVariant.price);
    }
  }

  document.querySelectorAll('[data-se20-finish]').forEach(function(btn){
    btn.addEventListener('click',function(){
      document.querySelectorAll('[data-se20-finish]').forEach(function(b){
        b.style.borderColor='var(--bdr)';b.style.background='#fff';b.style.color='var(--mut)';
      });
      btn.style.borderColor='var(--sage)';btn.style.background='var(--sage3)';btn.style.color='var(--ink)';
      setVariantByName(btn.getAttribute('data-finish-name'));
    });
  });

  document.querySelectorAll('[data-se20-purchase]').forEach(function(opt){
    opt.addEventListener('click',function(){currentPurchase=opt.getAttribute('data-se20-purchase')==='subscription'?subscription:oneTime;});
  });

  var cta=document.getElementById('heroCta');
  if(cta){
    cta.addEventListener('click',function(){
      if(!checkoutBase||!currentVariant)return;
      var value=currentVariant.sku&&currentVariant.sku.length?currentVariant.sku:currentVariant.id;
      var url=new URL(checkoutBase,window.location.origin);
      url.searchParams.set(variantKey,value);
      url.searchParams.set(purchaseKey,currentPurchase);
      window.location.href=url.toString();
    });
  }
})();


function toggleMobileNav(){
  var o=document.getElementById("mobOverlay"),m=document.getElementById("mobMenu");
  if(o&&m){o.classList.toggle("open");m.classList.toggle("open");document.body.style.overflow=m.classList.contains("open")?"hidden":""}
}