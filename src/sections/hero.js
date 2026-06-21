import gsap from 'gsap';

export function initHero(onComplete) {
  const bg = document.getElementById('speed-lines-bg');
  for (let i = 0; i < 30; i++) {
    const line = document.createElement('div');
    line.className = 'speed-line';
    line.style.left = Math.random() * 100 + '%';
    line.style.animationDelay = Math.random() * 2 + 's';
    line.style.animationDuration = (1 + Math.random() * 1.5) + 's';
    line.style.height = (30 + Math.random() * 50) + 'px';
    bg.appendChild(line);
  }

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, onComplete });

  tl.fromTo('#heroBadge', { opacity: 0, x: -80, rotate: -10 }, { opacity: 1, x: 0, rotate: -3, duration: 0.8 })
    .fromTo('#heroTitle', { opacity: 0, y: 80, scale: 0.8 }, { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'back.out(1.5)' }, '-=0.3')
    .to('#impactFlash', { opacity: 0.5, duration: 0.05 })
    .to('#impactFlash', { opacity: 0, duration: 0.3 })
    .fromTo('#heroSub', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.2')
    .fromTo('#heroShip', { opacity: 0, y: -60, scale: 0.5 }, { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'bounce.out' }, '-=0.2')
    .fromTo('#scrollIndicator', { opacity: 0 }, { opacity: 1, duration: 0.5 }, '-=0.1');

  // Scroll click
  document.getElementById('scrollIndicator').addEventListener('click', () => {
    document.getElementById('letter').scrollIntoView({ behavior: 'smooth' });
  });

  // Mouse parallax on ship
  const hero = document.getElementById('hero');
  hero.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 15;
    gsap.to('#heroShip', { x, y, duration: 0.6, ease: 'power2.out', overwrite: 'auto' });
  });
}
