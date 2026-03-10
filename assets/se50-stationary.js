/* ============================================
   PURCHASE BOX INTERACTIVITY
   ============================================ */
function togglePurchase(type){
  document.querySelectorAll('.toggle-opt').forEach(function(el){
    el.classList.remove('active');
    if(el.dataset.type===type) el.classList.add('active');
  });
  var fp=document.getElementById('filterPrice'),ac=document.getElementById('annualCost'),dc=document.getElementById('dailyCost');
  if(type==='subscribe'){
    fp.innerHTML='$24.65 <span style="font-size:14px;color:var(--sage)">(15% off)</span>';
    ac.textContent='$49.30/year';dc.textContent='$0.38/day';
  } else {
    fp.innerHTML='$29.00 <span style="font-size:14px;color:var(--lt)">(full price)</span>';
    ac.textContent='$58.00/year';dc.textContent='$0.40/day';
  }
}
function selectFinish(el,name){
  document.querySelectorAll('.finish-opt').forEach(function(o){o.classList.remove('active')});
  el.classList.add('active');document.getElementById('finishName').textContent=name;
  var button = document.getElementById('se50CheckoutButton');
  var price = el.getAttribute('data-variant-price-formatted');
  if (button) {
    button.disabled = !el.getAttribute('data-variant-id');
    button.textContent = 'Buy Now — ' + (price || '');
  }
  document.querySelectorAll('[data-price-display]').forEach(function(node){
    if (price) node.textContent = price;
  });
}

(function(){
  var purchaseRoot = document.querySelector('[data-se50-purchase]');
  if(!purchaseRoot) return;
  var button = document.getElementById('se50CheckoutButton');
  var activeFinish = purchaseRoot.querySelector('.finish-opt.active');
  if(activeFinish){ selectFinish(activeFinish, activeFinish.getAttribute('data-finish') || activeFinish.getAttribute('data-option1') || ''); }

  if(button){
    button.addEventListener('click', function(){
      var selected = purchaseRoot.querySelector('.finish-opt.active');
      if(!selected) return;
      var base = purchaseRoot.dataset.checkoutBaseUrl || '';
      if(!base) return;
      var variantKey = purchaseRoot.dataset.variantKey || 'variant';
      var purchaseKey = purchaseRoot.dataset.purchaseKey || 'purchase';
      var oneTimeVal = purchaseRoot.dataset.oneTime || 'one_time';
      var subscriptionVal = purchaseRoot.dataset.subscription || 'subscription';
      var purchaseType = document.querySelector('.toggle-opt.active')?.dataset.type === 'onetime' ? oneTimeVal : subscriptionVal;
      var variantValue = selected.getAttribute('data-variant-sku') || selected.getAttribute('data-variant-id');
      if(!variantValue) return;
      var url = new URL(base, window.location.origin);
      url.searchParams.set(variantKey, variantValue);
      url.searchParams.set(purchaseKey, purchaseType);
      url.searchParams.set('quantity', '1');
      window.location.href = url.toString();
    });
  }
})();

(function(){
  var isMobile = window.innerWidth <= 768;
  var obs = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  },{threshold: isMobile ? 0.08 : 0.12, rootMargin:'0px 0px -30px 0px'});
  document.querySelectorAll('.reveal').forEach(function(el){ obs.observe(el) });
})();
(function(){var pipeline=document.getElementById('stagePipeline');if(!pipeline)return;var items=pipeline.querySelectorAll('.stage-item');var connectors=pipeline.querySelectorAll('.stage-connector');var isMobile=window.innerWidth<=768;var stageDelay=isMobile?400:600;var activated=false;var obs=new IntersectionObserver(function(entries){if(entries[0].isIntersecting&&!activated){activated=true;items.forEach(function(item,i){setTimeout(function(){item.classList.add('active');var circle=item.querySelector('.stage-num svg circle');if(circle) circle.style.strokeDashoffset='0';if(connectors[i]){setTimeout(function(){connectors[i].classList.add('animated');},300);}},i*stageDelay);});obs.unobserve(pipeline);}},{threshold:isMobile?0.05:0.15});obs.observe(pipeline);})();
(function(){var track=document.getElementById('tlTrack');if(!track)return;var fill=document.getElementById('tlLineFill');var dots=[document.getElementById('tlDot1'),document.getElementById('tlDot2'),document.getElementById('tlDot3'),document.getElementById('tlDot4')];var cards=[document.getElementById('tlCard1'),document.getElementById('tlCard2'),document.getElementById('tlCard3'),document.getElementById('tlCard4')];var isMobile=window.innerWidth<=768;var cardDelay=isMobile?500:700;var activated=false;var obs=new IntersectionObserver(function(entries){if(entries[0].isIntersecting&&!activated){activated=true;fill.style.height='100%';dots.forEach(function(dot,i){setTimeout(function(){if(dot) dot.classList.add('lit');if(cards[i]){cards[i].classList.add('active');cards[i].style.opacity='1';cards[i].style.transform='none';}},300+i*cardDelay);});obs.unobserve(track);}},{threshold:isMobile?0.05:0.1});cards.forEach(function(c){if(c){c.style.opacity='0';c.style.transform='translateY(20px)';c.style.transition='all .6s cubic-bezier(.16,1,.3,1)';}});obs.observe(track);})();
(function(){var grid=document.getElementById('pressureGrid');if(!grid)return;var activated=false;var circ=2*Math.PI*56;var obs=new IntersectionObserver(function(entries){if(entries[0].isIntersecting&&!activated){activated=true;var g1=document.getElementById('g1');var g2=document.getElementById('g2');if(g1) g1.style.strokeDashoffset=circ*(1-0.88);if(g2) g2.style.strokeDashoffset=circ*(1-0.46);var m1=document.getElementById('m1');var m2=document.getElementById('m2');var m7=document.getElementById('m7');if(m1) m1.style.width='88%';if(m2) m2.style.width='95%';if(m7) m7.style.width='46%';obs.unobserve(grid);}},{threshold:0.15});obs.observe(grid);})();
(function(){var bar=document.getElementById('mobileCartBar');if(!bar||window.innerWidth>768)return;bar.style.transform='translateY(100%)';bar.style.transition='transform .4s cubic-bezier(.16,1,.3,1)';var shown=false;var heroObs=new IntersectionObserver(function(entries){if(!entries[0].isIntersecting&&!shown){shown=true;bar.style.transform='translateY(0)';}else if(entries[0].isIntersecting&&shown){shown=false;bar.style.transform='translateY(100%)';}},{threshold:0});var hero=document.querySelector('.hero-grid');if(hero) heroObs.observe(hero);})();
document.querySelectorAll('a[href^="#"]').forEach(function(a){a.addEventListener('click',function(e){var id=this.getAttribute('href');if(id&&id.length>1){var el=document.querySelector(id);if(el){e.preventDefault();var offset=window.innerWidth<=768?60:70;var top=el.getBoundingClientRect().top+window.pageYOffset-offset;window.scrollTo({top:top,behavior:'smooth'});}}});});
function toggleMobileNav(){var o=document.getElementById('mobOverlay'),m=document.getElementById('mobMenu');if(o&&m){o.classList.toggle('open');m.classList.toggle('open');document.body.style.overflow=m.classList.contains('open')?'hidden':''}}