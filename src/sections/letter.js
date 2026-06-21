import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

export function initLetter() {
  const paper = document.getElementById('letterPaper');
  const title = document.querySelector('#letter .section-title');

  gsap.fromTo(paper, { opacity: 0, rotationY: 90, transformPerspective: 1000 }, {
    opacity: 1, rotationY: 0, duration: 1, ease: 'power3.out',
    scrollTrigger: {
      trigger: '#letter',
      start: 'top 75%',
      toggleActions: 'play none none none'
    }
  });

  gsap.fromTo(title, { opacity: 0, y: 30 }, {
    opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
    scrollTrigger: {
      trigger: '#letter',
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  });

  // Typewriter
  const text = `Sayangku Seliyaa... di hari spesialmu yang ke-25 ini, aku ingin kau tahu bahwa setiap petualangan hidup terasa lebih bermakna bersamamu. Kamu adalah nakama sejatiku, harta karun terbesarku di lautan luas dunia ini. Seperti Luffy yang tak pernah menyerah mencari One Piece, aku pun tak akan pernah menyerah untuk membuatmu tersenyum. Selamat ulang tahun, cintaku. Ayo kita lanjutkan petualangan ini bersama! 🌊❤️`;
  const el = document.getElementById('typewriter');
  let idx = 0;
  let started = false;

  ScrollTrigger.create({
    trigger: '#letter',
    start: 'top 60%',
    once: true,
    onEnter: () => {
      if (started) return;
      started = true;
      setTimeout(() => {
        function type() {
          if (idx < text.length) {
            el.textContent += text[idx];
            idx++;
            const delay = text[idx - 1] === '.' || text[idx - 1] === '!' || text[idx - 1] === '?' ? 40 : 20;
            setTimeout(type, delay);
          } else {
            document.getElementById('cursorBlink').style.display = 'none';
          }
        }
        type();
      }, 500);
    }
  });
}
