/* Trend counters and vote widget */
(() => {
 const counters=document.querySelectorAll('[data-count]');
 if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){const el=entry.target,target=Number(el.dataset.count);let n=0;const step=Math.max(1,Math.ceil(target/35));const timer=setInterval(()=>{n=Math.min(target,n+step);el.textContent=n.toLocaleString();if(n>=target)clearInterval(timer);},25);observer.unobserve(el);}}),{threshold:.5});counters.forEach(c=>observer.observe(c));}else counters.forEach(c=>c.textContent=c.dataset.count);
 const buttons=document.querySelectorAll('[data-vote]'),result=document.getElementById('voteResult');let counts={Cringe:0,Mid:0,Iconic:0};
 buttons.forEach(b=>b.addEventListener('click',()=>{counts[b.dataset.vote]++;buttons.forEach(x=>x.classList.toggle('selected',x===b));result.textContent=`YOUR VOTE: ${b.dataset.vote.toUpperCase()} ✳ DEMO TALLY — CRINGE ${counts.Cringe} / MID ${counts.Mid} / ICONIC ${counts.Iconic}`;}));
})();