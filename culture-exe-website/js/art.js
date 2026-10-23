/* Art gallery modal viewer */
(() => {
 const viewer=document.getElementById('artViewer');if(!viewer)return;
 const glyphs=['◉','✳','☻','▧','✺','♡'];
 const artwork=[
  'assets/art-neon-daydream.png',
  'assets/art-concrete-bloom.png',
  'assets/art-soft-glitch.png',
  'assets/art-after-the-scroll.png',
  'assets/art-dream-machine.png',
  'assets/art-fan-universe.png'
 ];
 document.querySelectorAll('.art-piece').forEach((piece,i)=>{
  const placeholder=piece.querySelector('.art-placeholder');
  const fallback=placeholder.innerHTML;
  const source=artwork[i];
  if(source){
   const image=document.createElement('img');
   image.className='art-image';
   image.src=source;
   image.alt=piece.dataset.title;
   placeholder.replaceChildren(image);
   placeholder.classList.add('art-image-frame');
   image.addEventListener('error',()=>{
    placeholder.innerHTML=fallback;
    placeholder.classList.remove('art-image-frame');
   },{once:true});
  }
  piece.addEventListener('click',()=>{
   document.getElementById('viewerTitle').textContent=piece.dataset.title;
   document.getElementById('viewerArtist').textContent=piece.dataset.artist;
   document.getElementById('viewerDescription').textContent=piece.dataset.description;
   const viewerArt=document.getElementById('viewerArt');
   if(source){
    const image=document.createElement('img');
    image.src=source;
    image.alt=piece.dataset.title;
    viewerArt.replaceChildren(image);
   }else{
    viewerArt.textContent=glyphs[i%glyphs.length];
   }
   viewer.classList.add('open');viewer.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';
  });
 });
 function close(){viewer.classList.remove('open');viewer.setAttribute('aria-hidden','true');document.body.style.overflow='';}
 document.getElementById('viewerClose').addEventListener('click',close);
 viewer.addEventListener('click',e=>{if(e.target===viewer)close();});
 document.addEventListener('keydown',e=>{if(e.key==='Escape')close();});
})();