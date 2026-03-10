// ── Scroll Spy Navigation ──
(function(){
  var links=document.querySelectorAll('.nav-link[data-section]');
  var sections=[];
  links.forEach(function(l){
    var s=document.getElementById(l.getAttribute('data-section'));
    if(s)sections.push({el:s,link:l});
  });
  var navBar=document.getElementById('navBar');
  var navProg=document.getElementById('navProgress');
  var btt=document.getElementById('btt');

  function update(){
    var sy=window.scrollY||window.pageYOffset;
    var docH=document.documentElement.scrollHeight-window.innerHeight;
    // Progress bar
    if(navProg)navProg.style.width=(sy/docH*100)+'%';
    // Nav shadow
    if(navBar)navBar.classList.toggle('scrolled',sy>20);
    // Back to top
    if(btt)btt.classList.toggle('vis',sy>800);
    // Active section
    var current='';
    sections.forEach(function(s){
      if(s.el.getBoundingClientRect().top<=120)current=s.link.getAttribute('data-section');
    });
    links.forEach(function(l){l.classList.toggle('active',l.getAttribute('data-section')===current)});
  }
  window.addEventListener('scroll',update,{passive:true});
  update();
})();

// ── FAQ Toggle ──
function toggleFaq(b){
  var a=b.nextElementSibling,o=b.classList.contains('open');
  document.querySelectorAll('.faq-q.open').forEach(function(q){q.classList.remove('open');q.setAttribute('aria-expanded','false');q.nextElementSibling.classList.remove('open')});
  if(!o){b.classList.add('open');b.setAttribute('aria-expanded','true');a.classList.add('open')}
}

// ── Scroll Reveal ──
var ro=new IntersectionObserver(function(e){e.forEach(function(en){if(en.isIntersecting){en.target.classList.add('vis');ro.unobserve(en.target)}})},{threshold:.08,rootMargin:'0px 0px -60px 0px'});
document.querySelectorAll('.reveal').forEach(function(el){ro.observe(el)});

// ── Pressure Meter Animation ──
var po=new IntersectionObserver(function(e){e.forEach(function(en){if(en.isIntersecting){en.target.querySelectorAll('.p-meter').forEach(function(m){m.classList.add('anim')});po.unobserve(en.target)}})},{threshold:.3});
var pg=document.getElementById('pressureGrid');if(pg)po.observe(pg);

// ── Dual Timeline ──
(function(){
  var cards=document.querySelectorAll('.tl-card');
  var dots=document.querySelectorAll('.tl-dot');
  var sp=document.getElementById('spProg');
  var fill=document.getElementById('tlFill');
  if(!cards.length)return;
  var mo=new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if(!en.isIntersecting)return;
      var c=en.target,i=parseInt(c.getAttribute('data-m')),t=c.getAttribute('data-t');
      c.classList.add('act');c.classList.add(t==='gold'?'act-g':'act-s');
      dots.forEach(function(d){if(parseInt(d.getAttribute('data-d'))===i)d.classList.add(t==='gold'?'act-g':'act')});
    });
    // Progress
    var mx=-1;document.querySelectorAll('.tl-card.act').forEach(function(c){var i=parseInt(c.getAttribute('data-m'));if(i>mx)mx=i});
    var p=mx>=0?Math.min((mx+1)/4*100,100):0;
    if(fill)fill.style.width=p+'%';
    if(sp){var h=sp.parentElement?sp.parentElement.offsetHeight:1;sp.style.height=(p/100*h)+'px'}
  },{threshold:.3,rootMargin:'0px 0px -12% 0px'});
  cards.forEach(function(c){mo.observe(c)});
})();

function toggleSeMobileNav(){
  var o=document.getElementById('seMobOverlay'),m=document.getElementById('seMobMenu');
  if(o&&m){o.classList.toggle('open');m.classList.toggle('open');document.body.style.overflow=m.classList.contains('open')?'hidden':''}
}