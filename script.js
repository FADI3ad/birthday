// Stars
const se=document.getElementById('stars');
for(let i=0;i<130;i++){
  const s=document.createElement('div');s.className='star';
  const z=Math.random()*3+1;
  s.style.cssText=`left:${Math.random()*100}%;top:${Math.random()*100}%;width:${z}px;height:${z}px;animation-duration:${Math.random()*4+2}s;animation-delay:${Math.random()*5}s;`;
  se.appendChild(s);
}

// Petals
const pe=document.getElementById('petals');
const pc=['🌸','🌷','🌺','❀','✿','💮'];
for(let i=0;i<22;i++){
  const p=document.createElement('div');p.className='petal';
  p.textContent=pc[Math.floor(Math.random()*pc.length)];
  p.style.cssText=`left:${Math.random()*100}%;font-size:${Math.random()*14+10}px;animation-duration:${Math.random()*9+6}s;animation-delay:${Math.random()*8}s;`;
  pe.appendChild(p);
}

// Confetti
function confetti(n){
  const col=['#f4a7b9','#e8637e','#d4a04a','#fff','#c94070','#fde8d8','#ffcce0'];
  for(let i=0;i<n;i++){
    const c=document.createElement('div');c.className='cp';
    c.style.cssText=`left:${Math.random()*100}%;background:${col[Math.floor(Math.random()*col.length)]};width:${Math.random()*9+4}px;height:${Math.random()*9+4}px;border-radius:${Math.random()>.5?'50%':'2px'};animation-duration:${Math.random()*2.5+1.5}s;animation-delay:${Math.random()*0.8}s;`;
    document.body.appendChild(c);
    setTimeout(()=>c.remove(),5000);
  }
}

// Auto-show scene on page load (intro is now index.html)
window.addEventListener('DOMContentLoaded', () => {
  confetti(80);
  const scene = document.getElementById('scene');
  scene.classList.add('up');
});

// Modal handling
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.add('show');
  }
}
function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.remove('show');
  }
}
// Close modals on clicking outside content
window.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal')) {
    closeModal(e.target.id);
  }
});

// Camera photo switching
let currentPhotoIndex = 0;
function changePhoto(dir) {
  const frames = document.querySelectorAll('.polaroid-frame');
  if (frames.length < 2) return;
  
  frames[currentPhotoIndex].style.display = 'none';
  
  currentPhotoIndex += dir;
  if (currentPhotoIndex < 0) currentPhotoIndex = frames.length - 1;
  if (currentPhotoIndex >= frames.length) currentPhotoIndex = 0;
  
  frames[currentPhotoIndex].style.display = 'block';
  document.querySelector('.gallery-counter').textContent = `${currentPhotoIndex + 1} / ${frames.length}`;
}

// Music playlist player logic
const audio = document.getElementById('bg-music');
const playBtn = document.getElementById('play-btn');
const vinyl = document.querySelector('.vinyl-record');
const progress = document.getElementById('music-progress');

function togglePlay() {
  if (!audio) return;
  if (audio.paused) {
    audio.play().catch(err => console.log("Audio play failed: ", err));
    playBtn.textContent = '❚❚';
    vinyl.style.animationPlayState = 'running';
  } else {
    audio.pause();
    playBtn.textContent = '▶';
    vinyl.style.animationPlayState = 'paused';
  }
}

if (audio) {
  audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
      const pct = (audio.currentTime / audio.duration) * 100;
      progress.style.width = `${pct}%`;
    }
  });
}

function seekAudio(event) {
  const progressBar = document.querySelector('.music-progress-bar');
  if (audio && progressBar && audio.duration) {
    const rect = progressBar.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const width = rect.width;
    audio.currentTime = (clickX / width) * audio.duration;
  }
}

// Blow candles surprise logic
let candlesBlown = [false, false, false];
function blowCandle(index) {
  const flame = document.getElementById(`flame-${index}`);
  if (flame && flame.style.display !== 'none') {
    flame.style.display = 'none';
    candlesBlown[index - 1] = true;
    confetti(15);
    
    // Check if all blown
    if (candlesBlown.every(v => v === true)) {
      setTimeout(() => {
        confetti(150);
        const hint = document.querySelector('.blow-hint');
        if (hint) {
          hint.textContent = "أتمنى لكِ يا ليلي أمنية جميلة قد تحققت! ✨❤️";
          hint.style.color = "var(--pink)";
        }
      }, 400);
    }
  }
}

// Restart - go back to index.html
function restart() {
  // Reset audio
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
  }
  
  // Navigate back to index page
  window.location.href = 'index.html';
}

// Diagnostic helper to show if images fail to load
window.addEventListener('error', function(e) {
  if (e.target && e.target.tagName === 'IMG') {
    let debugDiv = document.getElementById('debug-logs');
    if (!debugDiv) {
      debugDiv = document.createElement('div');
      debugDiv.id = 'debug-logs';
      debugDiv.style.cssText = 'position:fixed;bottom:15px;left:15px;background:rgba(30,5,10,0.95);color:#ff6b6b;padding:12px 18px;border-radius:10px;z-index:9999;font-size:13px;font-family:monospace;max-width:320px;border:2px solid #ff4a4a;box-shadow:0 10px 30px rgba(0,0,0,0.5);direction:ltr;text-align:left;';
      document.body.appendChild(debugDiv);
    }
    debugDiv.innerHTML += `<div style="margin-bottom:6px;">❌ <b>Failed to load image:</b><br>${e.target.src.split('/').pop()}</div>`;
  }
}, true);

// Letters Scene Logic
function openLettersScene() {
  const mainScene = document.getElementById('scene');
  const lettersScene = document.getElementById('letters-scene');
  const heartContainer = document.getElementById('laser-heart-container');
  const heartPath = document.getElementById('laser-heart-path');
  const wrapper = document.querySelector('.envelope-wrapper');
  const hint = document.querySelector('.envelope-hint');
  
  mainScene.style.opacity = '0';
  
  setTimeout(() => {
    mainScene.style.display = 'none';
    lettersScene.style.display = 'block';
    
    // Fade in scene
    void lettersScene.offsetWidth;
    lettersScene.style.opacity = '1';
    
    // Reset envelope state
    const env = document.querySelector('.envelope');
    env.classList.remove('open');
    document.getElementById('env-flap').style.zIndex = '6';
    
    // Hide envelope & hint initially
    wrapper.style.opacity = '0';
    wrapper.style.animation = 'none';
    if (hint) {
      hint.style.display = 'none';
      hint.style.animation = 'none';
    }
    
    // Reset letters
    document.querySelectorAll('.draggable-letter').forEach((l, i) => {
      l.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      l.style.transform = '';
      l.style.left = '0px';
      l.style.top = 'auto';
      l.style.bottom = '0px';
      l.style.zIndex = 3 - i;
      delete l.dataset.dragged;
    });
    
    // === PHASE 1: Show laser heart and draw it ===
    heartContainer.style.display = 'block';
    heartContainer.style.opacity = '1';
    heartPath.style.animation = 'none';
    heartPath.style.strokeDashoffset = '800';
    heartPath.style.fill = 'transparent';
    void heartPath.offsetWidth;
    heartPath.style.animation = 'drawLaserHeart 2.5s ease forwards';
    
    // === PHASE 2: After heart is drawn, pulse it then morph to envelope ===
    setTimeout(() => {
      // Pulse the heart
      heartContainer.style.transition = 'transform 0.6s ease, opacity 0.8s ease';
      heartContainer.style.transform = 'translate(-50%, -50%) scale(1.3)';
      
      setTimeout(() => {
        // Shrink & fade heart while envelope appears
        heartContainer.style.transform = 'translate(-50%, -50%) scale(0.6)';
        heartContainer.style.opacity = '0';
        
        // Show envelope with entrance animation
        wrapper.style.opacity = '1';
        void wrapper.offsetWidth;
        wrapper.style.animation = 'envelopeEnter 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards';
        
        // Show hint text
        if (hint) {
          hint.style.display = 'block';
          void hint.offsetWidth;
          hint.style.animation = 'fadeInUp 1.5s ease 0.8s forwards';
        }
        
        // Clean up heart
        setTimeout(() => {
          heartContainer.style.display = 'none';
          heartContainer.style.transform = 'translate(-50%, -50%)';
        }, 1000);
        
      }, 700); // wait after pulse
    }, 2600); // wait for draw animation
    
  }, 600); // wait for fade out
}

function closeLettersScene() {
  const mainScene = document.getElementById('scene');
  const lettersScene = document.getElementById('letters-scene');
  
  lettersScene.style.opacity = '0';
  
  setTimeout(() => {
    lettersScene.style.display = 'none';
    mainScene.style.display = 'flex';
    void mainScene.offsetWidth;
    mainScene.style.opacity = '1';
  }, 800);
}

// Images Scene Logic
function openImagesScene() {
  const mainScene = document.getElementById('scene');
  const imagesScene = document.getElementById('images-scene');
  
  mainScene.style.opacity = '0';
  
  setTimeout(() => {
    mainScene.style.display = 'none';
    imagesScene.style.display = 'flex';
    
    // Fade in
    void imagesScene.offsetWidth;
    imagesScene.style.opacity = '1';
  }, 600);
}

function closeImagesScene() {
  const mainScene = document.getElementById('scene');
  const imagesScene = document.getElementById('images-scene');
  
  imagesScene.style.opacity = '0';
  
  setTimeout(() => {
    imagesScene.style.display = 'none';
    mainScene.style.display = 'flex';
    void mainScene.offsetWidth;
    mainScene.style.opacity = '1';
  }, 800);
}

function openEnvelope() {
  const env = document.querySelector('.envelope');
  if (!env.classList.contains('open')) {
    env.classList.add('open');
    setTimeout(() => {
      document.getElementById('env-flap').style.zIndex = '2';
      const hint = document.querySelector('.envelope-hint');
      if (hint) hint.style.display = 'none';
    }, 300);
  }
}

// Drag functionality for letters
let highestZ = 10;
document.querySelectorAll('.draggable-letter').forEach(letter => {
  let isDragging = false;
  let startX, startY;
  
  letter.addEventListener('mousedown', startDrag);
  letter.addEventListener('touchstart', startDrag, {passive: false});

  function startDrag(e) {
    if (!document.querySelector('.envelope').classList.contains('open')) return;
    
    if (!letter.dataset.dragged) {
      const rect = letter.getBoundingClientRect();
      const parentRect = letter.parentElement.getBoundingClientRect();
      letter.style.bottom = 'auto';
      letter.style.left = (rect.left - parentRect.left) + 'px';
      letter.style.top = (rect.top - parentRect.top) + 'px';
      letter.style.transform = `rotate(${letter.dataset.rot || 0}deg)`;
      letter.dataset.dragged = 'true';
    }

    isDragging = true;
    highestZ++;
    letter.style.zIndex = highestZ;
    letter.style.transition = 'none';
    
    let clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    let clientY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;
    
    startX = clientX - parseFloat(letter.style.left || 0);
    startY = clientY - parseFloat(letter.style.top || 0);
    
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDrag);
    document.addEventListener('touchmove', drag, {passive: false});
    document.addEventListener('touchend', stopDrag);
  }

  function drag(e) {
    if (!isDragging) return;
    e.preventDefault();
    let clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    let clientY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;
    
    letter.style.left = (clientX - startX) + 'px';
    letter.style.top = (clientY - startY) + 'px';
  }

  function stopDrag() {
    isDragging = false;
    letter.style.transition = 'transform 0.3s ease';
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', stopDrag);
    document.removeEventListener('touchmove', drag);
    document.removeEventListener('touchend', stopDrag);
  }
});