import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

export function initNakama() {
  const cards = document.querySelectorAll('.nakama-card');
  const title = document.querySelector('#nakama .section-title');

  gsap.fromTo(title, { opacity: 0, y: 30 }, {
    opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
    scrollTrigger: {
      trigger: '#nakama',
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  });

  cards.forEach((card, i) => {
    gsap.fromTo(card, { opacity: 0, y: 40 }, {
      opacity: 1, y: 0, duration: 0.6, delay: i * 0.15, ease: 'power3.out',
      scrollTrigger: {
        trigger: '#nakama',
        start: 'top 70%',
        toggleActions: 'play none none none'
      }
    });
  });
}
