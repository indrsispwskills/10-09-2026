/* Scroll reveal */
var obs=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add("vis");obs.unobserve(e.target)}})},{threshold:0.05,rootMargin:"0px 0px -40px 0px"});
document.querySelectorAll(".rv").forEach(function(el){obs.observe(el)});
setTimeout(function(){document.querySelectorAll(".rv:not(.vis)").forEach(function(el){el.classList.add("vis")})},2500);

/* Scroll to top */
window.addEventListener("scroll",function(){var b=document.getElementById("scrollTop");if(b){if(window.scrollY>500)b.classList.add("show");else b.classList.remove("show")}},{passive:true});

/* TOC active state */
var sections=document.querySelectorAll(".policy-section[id]");
var tocLinks=document.querySelectorAll(".toc a");
if(sections.length&&tocLinks.length){
  window.addEventListener("scroll",function(){
    var scrollPos=window.scrollY+120;
    sections.forEach(function(sec){
      if(sec.offsetTop<=scrollPos&&sec.offsetTop+sec.offsetHeight>scrollPos){
        tocLinks.forEach(function(a){a.classList.remove("active")});
        var link=document.querySelector(".toc a[href=\"#"+sec.id+"\"]");
        if(link)link.classList.add("active");
      }
    });
  },{passive:true});
}

/* Mobile nav toggle */
function toggleMobileNav(){
  var o=document.getElementById('mobOverlay');
  var m=document.getElementById('mobMenu');
  var h=document.querySelector('.ham');
  if(o&&m){
    o.classList.toggle('open');
    m.classList.toggle('open');
    document.body.style.overflow=m.classList.contains('open')?'hidden':'';
  }
  if(h)h.classList.toggle('open');
}
/* Close mobile nav on link click */
document.querySelectorAll('.mob-link').forEach(function(a){
  a.addEventListener('click',function(){toggleMobileNav()});
});