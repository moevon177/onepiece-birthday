import gsap from 'gsap';

export function initSplash() {
  const splash = document.getElementById('splash');

  splash.innerHTML = `
    <canvas class="splash-speedlines" id="splashCanvas"></canvas>
    <div class="splash-jolly">
      <img src="/logo_onepiece.svg" alt="One Piece" />
    </div>
    <div class="splash-age" id="splashAge">25</div>
    <div class="splash-sub" id="splashSub">— ONE PIECE —</div>
  `;

  initSpeedLines(splash);

  const flash = document.getElementById('impactFlash');

  const tl = gsap.timeline({
    onComplete: () => {
      splash.classList.add('hidden');
    }
  });

  tl.fromTo('.splash-jolly', { scale: 0, opacity: 0, rotation: -180 }, {
    scale: 1, opacity: 1, rotation: 0, duration: 1.2, ease: 'elastic.out(1, 0.5)'
  })
  .to('.splash-jolly', { scale: 1.08, duration: 0.15, yoyo: true, repeat: 1 })
  .to(flash, { opacity: 0.8, duration: 0.05 })
  .to(flash, { opacity: 0, duration: 0.3 })
  .fromTo('#splashAge', { opacity: 0, scale: 4 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(2)' })
  .to('#splashAge', { scale: 1.2, duration: 0.15, yoyo: true, repeat: 1 })
  .to(flash, { opacity: 0.7, duration: 0.03 })
  .to(flash, { opacity: 0, duration: 0.3 })
  .fromTo('#splashSub', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.2')
  .to(splash, { opacity: 0, duration: 0.6, delay: 1 }, '-=0.2');
}

function initSpeedLines(container) {
  const canvas = container.querySelector('#splashCanvas');
  const ctx = canvas.getContext('2d');
  const lines = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  for (let i = 0; i < 60; i++) {
    lines.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      speed: 8 + Math.random() * 20,
      length: 30 + Math.random() * 60,
      width: 1 + Math.random() * 2,
      opacity: 0.05 + Math.random() * 0.15
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#F5D742';
    for (const l of lines) {
      l.y += l.speed;
      if (l.y > canvas.height + l.length) {
        l.y = -l.length;
        l.x = Math.random() * canvas.width;
      }
      ctx.globalAlpha = l.opacity;
      ctx.lineWidth = l.width;
      ctx.beginPath();
      ctx.moveTo(l.x, l.y);
      const angle = 0.15;
      ctx.lineTo(l.x + Math.sin(angle) * l.length, l.y + Math.cos(angle) * l.length);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }
  draw();
}
