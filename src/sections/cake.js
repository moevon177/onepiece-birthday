import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { launchConfetti } from '../effects/confetti.js';

export function initCake() {
  const container = document.getElementById('cakeContainer');
  const title = document.querySelector('#cake .section-title');

  gsap.fromTo(container, { opacity: 0, scale: 0.5 }, {
    opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.5)',
    scrollTrigger: {
      trigger: '#cake',
      start: 'top 75%',
      toggleActions: 'play none none none'
    }
  });

  gsap.fromTo(title, { opacity: 0, y: 30 }, {
    opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
    scrollTrigger: {
      trigger: '#cake',
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  });

  // Click candle to blow
  document.getElementById('cakeEmoji').addEventListener('click', () => {
    const fire = document.getElementById('candleFire');
    const hint = document.getElementById('cakeHint');
    const bubble = document.getElementById('wishBubble');
    if (fire.style.display === 'none') return;

    gsap.to(fire, { scaleY: 2, scaleX: 1.5, duration: 0.1, yoyo: true, repeat: 2 });
    setTimeout(() => {
      fire.style.display = 'none';
      hint.textContent = '🥳 Wish terkirim!';
      bubble.classList.add('show');
      launchConfetti();
    }, 400);
  });
}
