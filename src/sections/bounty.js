import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

export function initBounty() {
  const poster = document.getElementById('bountyPoster');
  const title = document.querySelector('#bounty .section-title');

  gsap.fromTo(poster, { opacity: 0, y: 60, scale: 0.6 }, {
    opacity: 1, y: 0, scale: 1, duration: 1, ease: 'back.out(1.5)',
    scrollTrigger: {
      trigger: '#bounty',
      start: 'top 75%',
      toggleActions: 'play none none none'
    }
  });

  gsap.fromTo(title, { opacity: 0, y: 30 }, {
    opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
    scrollTrigger: {
      trigger: '#bounty',
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  });

  // 3D tilt on mouse move
  poster.addEventListener('mousemove', (e) => {
    const rect = poster.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    poster.style.transform = `perspective(1000px) rotateY(${x * -15}deg) rotateX(${y * 10}deg)`;
  });

  poster.addEventListener('mouseleave', () => {
    poster.style.transform = 'perspective(1000px) rotateY(0) rotateX(0)';
  });
}
