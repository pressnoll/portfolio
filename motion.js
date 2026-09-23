import './motion.css';
import './motion-extra.css';
// Progressive enhancement: content remains readable if motion is unavailable.
const preference = matchMedia('(prefers-reduced-motion: reduce)');
const animations = new Set();
function sync() {
  document.documentElement.classList.toggle('motion-off', preference.matches);
  if (preference.matches) { animations.forEach(a => a.cancel()); animations.clear(); }
}
preference.addEventListener('change', sync);
sync();
function animate(element, frames, options = {}) {
  if (!element || preference.matches) return;
  const animation = element.animate(frames, {duration:850, easing:'cubic-bezier(.2,.75,.2,1)', ...options});
  animations.add(animation);
  animation.finished.then(() => animations.delete(animation), () => animations.delete(animation));
}
const heading = document.querySelector('.hero h1');
if (heading) {
  heading.setAttribute('aria-label', 'Temple Gideon');
  heading.innerHTML = '<span class="name-line" aria-hidden="true"><span>TEMPLE</span></span><span class="last-name name-line" aria-hidden="true"><span>GIDEON</span><span class="asterisk">✳</span></span>';
  heading.querySelectorAll('.name-line > span:not(.asterisk)').forEach((line,i) => animate(line,[{transform:'translateY(110%) rotate(3deg)'},{transform:'translateY(0) rotate(0deg)'}],{duration:1150,delay:i*140,fill:'backwards'}));
  animate(document.querySelector('.hero-meta'),[{opacity:0},{opacity:1}],{duration:900});
  animate(document.querySelector('.hero-bottom'),[{opacity:0,transform:'translateY(22px)'},{opacity:1,transform:'translateY(0)'}],{delay:280,fill:'backwards'});
}
const svg = document.querySelector('.signal-panel svg');
if (svg) {
  const ns='http://www.w3.org/2000/svg';
  ['M0 35H170Q250 35 290 100H495','M0 165H170Q250 165 290 100H495','M705 100H850Q910 100 960 35H1200','M705 100H1200'].forEach((d,i)=>{
    const path=document.createElementNS(ns,'path');
    path.setAttribute('d',d);path.setAttribute('pathLength','100');path.setAttribute('class','travelling-signal');path.style.animationDelay=`${i*.65}s`;svg.append(path);
  });
}
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    entry.target.classList.toggle('motion-active',entry.isIntersecting);
    if (!entry.isIntersecting || entry.target.dataset.revealed) return;
    entry.target.dataset.revealed='true';
    animate(entry.target,[{opacity:.05,transform:'translateY(35px)'},{opacity:1,transform:'translateY(0)'}]);
    if(entry.target.matches('.project')) {
      animate(entry.target.querySelector('.project-art'),[{clipPath:'inset(0 0 100% 0)'},{clipPath:'inset(0 0 0% 0)'}],{duration:1050});
    }
    entry.target.querySelectorAll('.bars i').forEach((bar,i)=>animate(bar,[{transform:'scaleX(0)'},{transform:'scaleX(1)'}],{delay:i*160,duration:1100}));
    entry.target.querySelectorAll('.project-copy > *, .contact-options > *').forEach((child,i)=>animate(child,[{opacity:0,transform:'translateY(15px)'},{opacity:1,transform:'translateY(0)'}],{delay:i*65,duration:700,fill:'backwards'}));
    if(entry.target.matches('.journey-list li')) animate(entry.target.querySelector('h3'),[{opacity:0,transform:'translateX(20px)'},{opacity:1,transform:'translateX(0)'}],{delay:100,fill:'backwards'});
  });
},{threshold:.08});
document.querySelectorAll('.section-heading,.project,.notebook,.about-photo,.about-copy,.contact,.signal-panel,.case-main > .project-art,.case-body,.case-main h1,.journey-list li').forEach(el=>observer.observe(el));
// Scroll-linked decoration uses one scheduled update per frame.
const progress=document.createElement('div');
progress.className='reading-progress';progress.setAttribute('aria-hidden','true');document.body.append(progress);
const journey=document.querySelector('.journey-list');let frame=0;
function updateScroll(){frame=0;const extent=document.documentElement.scrollHeight-innerHeight;progress.style.setProperty('--read',extent>0?String(scrollY/extent):'0');if(journey){const rect=journey.getBoundingClientRect();journey.style.setProperty('--journey-progress',String(Math.max(0,Math.min(1,(innerHeight*.7-rect.top)/rect.height))));}}
function scheduleScroll(){if(!frame)frame=requestAnimationFrame(updateScroll);}
addEventListener('scroll',scheduleScroll,{passive:true});addEventListener('resize',scheduleScroll);updateScroll();
// This equalizer decorates the labeled illustration; it is not live audio.
document.querySelectorAll('.convert-art .mini-drop b').forEach(el=>{el.innerHTML='<span class="audio-equalizer" aria-hidden="true">'+Array.from({length:13},(_,i)=>`<i style="--level:${[.3,.5,.8,.45,1,.65,.4,.9,.55,.75,.35,.6,.25][i]};--delay:${i*-0.13}s"></i>`).join('')+'</span>';});
if(matchMedia('(hover:hover) and (pointer:fine)').matches){document.querySelectorAll('.send-message,.whatsapp-link,.contact-link').forEach(el=>{el.classList.add('magnetic-link');el.addEventListener('pointermove',e=>{if(preference.matches)return;const rect=el.getBoundingClientRect();el.style.setProperty('--magnet-x',`${(e.clientX-rect.left-rect.width/2)*.07}px`);el.style.setProperty('--magnet-y',`${(e.clientY-rect.top-rect.height/2)*.12}px`);});el.addEventListener('pointerleave',()=>{el.style.setProperty('--magnet-x','0px');el.style.setProperty('--magnet-y','0px');});});}
// Pointer motion stays restrained and only runs for precise pointing devices.
if(matchMedia('(hover:hover) and (pointer:fine)').matches) {
  document.querySelectorAll('.project-art').forEach(panel=>{
    panel.addEventListener('pointermove',event=>{
      if(preference.matches)return;
      const rect=panel.getBoundingClientRect();
      panel.style.setProperty('--pointer-x',`${((event.clientX-rect.left)/rect.width-.5)*10}px`);
      panel.style.setProperty('--pointer-y',`${((event.clientY-rect.top)/rect.height-.5)*8}px`);
    });
    panel.addEventListener('pointerleave',()=>{panel.style.setProperty('--pointer-x','0px');panel.style.setProperty('--pointer-y','0px');});
  });
}
