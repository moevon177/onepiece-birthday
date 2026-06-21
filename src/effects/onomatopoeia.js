import gsap from 'gsap';

const words = [
  'GOMU GOMU NO!!!', 'DAISHINKAN!!!', 'GEAR 5!!!',
  'NAKAMA!!!', 'ONE PIECE!!!', 'HAPPY BIRTHDAY!!!'
];

export function spawnOnomatopoeia() {
  const el = document.createElement('div');
  el.className = 'ono';
  el.textContent = words[Math.floor(Math.random() * words.length)];
  el.style.left = (10 + Math.random() * 60) + '%';
  el.style.top = (10 + Math.random() * 50) + '%';
  el.style.fontSize = (40 + Math.random() * 80) + 'px';
  el.style.transform = `rotate(${-20 + Math.random() * 40}deg)`;
  document.body.appendChild(el);
  gsap.fromTo(el, { opacity: 0, scale: 0.3 }, {
    opacity: 0.7, scale: 1, duration: 0.4, ease: 'back.out(2)',
    onComplete: () => {
      gsap.to(el, {
        opacity: 0, scale: 2, duration: 0.8, delay: 0.6,
        onComplete: () => el.remove()
      });
    }
  });
}
