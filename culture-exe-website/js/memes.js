/* Meme wall reactions and local meme generator */
(() => {
 const emojis=['✨','😂','💀','🔥','🫶','😭'];
 document.querySelectorAll('.react-tile').forEach(tile=>tile.addEventListener('click',e=>{
   const b=document.createElement('span');b.className='reaction-burst';b.textContent=emojis[Math.floor(Math.random()*emojis.length)];
   const r=tile.getBoundingClientRect();b.style.left=(e.clientX-r.left)+'px';b.style.top=(e.clientY-r.top)+'px';tile.appendChild(b);setTimeout(()=>b.remove(),850);
 }));
 const form=document.getElementById('memeForm'), top=document.getElementById('topText'), bottom=document.getElementById('bottomText');
 function update(){document.getElementById('memeTopPreview').textContent=top.value||'YOUR TOP TEXT';document.getElementById('memeBottomPreview').textContent=bottom.value||'YOUR BOTTOM TEXT';}
 if(form){form.addEventListener('submit',e=>{e.preventDefault();update();});top.addEventListener('input',update);bottom.addEventListener('input',update);}
 const download=document.getElementById('downloadMeme');
 if(download)download.addEventListener('click',()=>{
   const c=document.createElement('canvas');c.width=900;c.height=900;const ctx=c.getContext('2d');
   ctx.fillStyle='#a4d8c6';ctx.fillRect(0,0,900,900);ctx.textAlign='center';ctx.textBaseline='top';
   ctx.font='bold 46px sans-serif';ctx.lineWidth=5;ctx.strokeStyle='#fff';ctx.fillStyle='#111';
   const wrap=(text,y)=>{const words=text.split(' ');let line='',lines=[];words.forEach(w=>{const test=line?line+' '+w:w;if(ctx.measureText(test).width>820){lines.push(line);line=w}else line=test;});if(line)lines.push(line);lines.slice(0,3).forEach((l,i)=>{ctx.strokeText(l,450,y+i*55);ctx.fillText(l,450,y+i*55);});};
   wrap(top.value||'YOUR TOP TEXT',30);ctx.font='180px sans-serif';ctx.fillText('🦝',450,300);ctx.font='bold 46px sans-serif';wrap(bottom.value||'YOUR BOTTOM TEXT',790);
   const a=document.createElement('a');a.download='my-culture-meme.png';a.href=c.toDataURL('image/png');a.click();
 });
 const egg=document.getElementById('easterEgg');if(egg)egg.addEventListener('click',()=>{for(let i=0;i<22;i++){const s=document.createElement('span');s.textContent=emojis[i%emojis.length];s.style.cssText=`position:fixed;left:${Math.random()*95}vw;top:${Math.random()*90}vh;z-index:150;font-size:2rem;pointer-events:none;animation:burst 1s forwards`;document.body.appendChild(s);setTimeout(()=>s.remove(),1000);}});
})();