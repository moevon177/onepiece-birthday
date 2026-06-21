const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');
let pieces = [];
let running = false;

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

export function launchConfetti(count = 150) {
  const colors = ['#F5D742', '#D32F2F', '#0B3B60', '#F0F4F8', '#FF6B6B', '#FFD93D'];
  for (let i = 0; i < count; i++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * canvas.height * 0.5,
      w: 6 + Math.random() * 8,
      h: 6 + Math.random() * 8,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 4,
      vy: 2 + Math.random() * 4,
      rot: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 8,
      gravity: 0.05 + Math.random() * 0.05,
      opacity: 0.8 + Math.random() * 0.2
    });
  }
  if (!running) {
    running = true;
    animate();
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let alive = false;
  for (let i = pieces.length - 1; i >= 0; i--) {
    const p = pieces[i];
    p.x += p.vx;
    p.vy += p.gravity;
    p.y += p.vy;
    p.rot += p.rotSpeed;
    p.vx *= 0.99;
    if (p.y > canvas.height + 20) {
      pieces.splice(i, 1);
      continue;
    }
    alive = true;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot * Math.PI / 180);
    ctx.globalAlpha = p.opacity;
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
    ctx.restore();
  }
  if (alive) {
    requestAnimationFrame(animate);
  } else {
    running = false;
  }
}
