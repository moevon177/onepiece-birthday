import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { launchConfetti } from '../effects/confetti.js';

export function initTreasure() {
  const chest = document.getElementById('treasureChest');
  const surprise = document.getElementById('treasureSurprise');
  const title = document.querySelector('#treasure .section-title');

  gsap.fromTo(chest, { opacity: 0, scale: 0.3 }, {
    opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.5)',
    scrollTrigger: {
      trigger: '#treasure',
      start: 'top 75%',
      toggleActions: 'play none none none'
    }
  });

  gsap.fromTo(title, { opacity: 0, y: 30 }, {
    opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
    scrollTrigger: {
      trigger: '#treasure',
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  });

  chest.addEventListener('click', () => {
    if (chest.classList.contains('open')) return;
    chest.classList.add('open');
    setTimeout(() => {
      chest.textContent = '📭';
      surprise.classList.add('show');
      launchConfetti(200);
    }, 400);
  });
}
