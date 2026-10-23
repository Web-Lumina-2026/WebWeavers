/* Home-only Three.js scene: colourful low-poly objects floating in a scroll tunnel. */
(() => {
  const canvas = document.getElementById('hero3d');
  if (!canvas || !window.THREE) return;
  const reduced = typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const renderer = new THREE.WebGLRenderer({canvas, antialias:true, alpha:true});
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.7));
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, .1, 100);
  camera.position.set(0,0,11);
  scene.add(new THREE.HemisphereLight(0xffffff,0x6a4d9b,2));
  const key = new THREE.DirectionalLight(0xffffff,2.5); key.position.set(4,6,8); scene.add(key);
  const colors = [0xff5caa,0xd5ff38,0xbba4ff,0xffe45e,0xf4eedb];
  const objects = [];
  const mat = color => new THREE.MeshStandardMaterial({color, roughness:.35, metalness:.18});
  // Primitive forms stand in for headphones, sneakers, phones, vinyl, paint and emoji.
  const make = (geo,color,x,y,z,scale,rot=0) => {
    const m = new THREE.Mesh(geo,mat(color)); m.position.set(x,y,z); m.scale.setScalar(scale); m.rotation.z=rot; scene.add(m); objects.push({mesh:m,baseY:y,baseX:x,phase:Math.random()*6.28}); return m;
  };
  make(new THREE.TorusGeometry(1,.18,12,36),colors[0],-2,1,0,1.05,.3); // headphones
  make(new THREE.BoxGeometry(1.1,2,.18),colors[2],2,1,-1,.75,-.25); // phone
  make(new THREE.CylinderGeometry(.95,.95,.14,48),colors[1],-1.8,-2,-2,.85,.2); // vinyl
  make(new THREE.TorusKnotGeometry(.65,.2,80,10),colors[3],2.1,-1.7,-1,.75,.4); // art blob
  make(new THREE.DodecahedronGeometry(.9,0),colors[1],.2,2.8,-3,.7,.4); // emoji-ish
  make(new THREE.BoxGeometry(1.4,.65,2),colors[0],3.1,2.8,-4,.7,.2); // sneaker-ish
  for(let i=0;i<22;i++) make(new THREE.IcosahedronGeometry(.12+Math.random()*.18,0),colors[i%colors.length],(Math.random()-.5)*8,(Math.random()-.5)*8,-2-Math.random()*14,.7,Math.random()*4);
  const resize=()=>{const r=canvas.getBoundingClientRect();renderer.setSize(Math.max(1,r.width),Math.max(1,r.height),false);camera.aspect=Math.max(1,r.width)/Math.max(1,r.height);camera.updateProjectionMatrix();};
  resize(); window.addEventListener('resize',resize);
  let scroll=0; window.addEventListener('scroll',()=>{scroll=window.scrollY/(document.documentElement.scrollHeight-innerHeight||1);},{passive:true});
  let t=0;
  function animate(){if(!reduced)requestAnimationFrame(animate);t+=.006;
    objects.forEach((o,i)=>{if(!reduced){o.mesh.rotation.y+=.003+(i%3)*.001;o.mesh.rotation.x+=.0015;o.mesh.position.y=o.baseY+Math.sin(t+o.phase)*.16-scroll*(i%4)*.4;}});
    camera.position.z=11-scroll*2.2;camera.position.x=Math.sin(scroll*3)*.3;camera.lookAt(0,0,-1);renderer.render(scene,camera);
  } animate();
  // Intro boot sequence; accessible text is updated with each status.
  const boot=document.getElementById('bootScreen'), line=document.getElementById('bootLine'), bar=document.getElementById('bootProgress');
  if(boot){
    const steps=['Checking vibes...','Loading culture.exe... 34%','Mounting playlists and pixels... 68%','Loading culture.exe... 100%'];
    let i=0; const show=()=>{if(line)line.textContent=steps[i];if(bar)bar.style.width=((i+1)/steps.length*100)+'%';i++;if(i<steps.length)setTimeout(show, reduced?0:350);else setTimeout(()=>boot.classList.add('done'),reduced?0:450);};show();
  }
  if(window.gsap && window.ScrollTrigger && !reduced){gsap.registerPlugin(ScrollTrigger);gsap.from('.portal-card',{y:45,opacity:0,stagger:.09,duration:.7,ease:'power2.out',scrollTrigger:{trigger:'.portal-grid',start:'top 85%'}});}
})();