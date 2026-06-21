import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

import { initSplash } from './sections/splash.js';
import { initHero } from './sections/hero.js';
import { initLetter } from './sections/letter.js';
import { initBounty } from './sections/bounty.js';
import { initNakama } from './sections/nakama.js';
import { initCake } from './sections/cake.js';
import { initTreasure } from './sections/treasure.js';
import { startParticles } from './effects/particles.js';
import { spawnOnomatopoeia } from './effects/onomatopoeia.js';
import { initWaves } from './effects/waves.js';
import './style.css';

document.addEventListener('DOMContentLoaded', () => {
  initWaves();
  startParticles();

  initSplash();

  initHero(() => {
    // Start onomatopoeia after hero animation
    const hero = document.getElementById('hero');
    const obs = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          spawnOnomatopoeia();
          const interval = setInterval(spawnOnomatopoeia, 3000);
          const stopObs = new IntersectionObserver((e2) => {
            for (const e of e2) {
              if (!e.isIntersecting) clearInterval(interval);
            }
          }, { threshold: 0.1 });
          stopObs.observe(hero);
          obs.disconnect();
        }
      }
    }, { threshold: 0.1 });
    obs.observe(hero);
  });

  initLetter();
  initBounty();
  initNakama();
  initCake();
  initTreasure();

  // Refresh ScrollTrigger after everything is set
  ScrollTrigger.refresh();
});
