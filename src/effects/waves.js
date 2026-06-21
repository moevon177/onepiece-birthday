import gsap from 'gsap';

export function initWaves() {
  const container = document.createElement('div');
  container.className = 'ocean-bg';
  container.id = 'oceanBg';

  const waveW = 80;
  const segmentH = 120;
  const amp = 22;

  const layerConfigs = [
    { color: 'rgba(11,59,96,0.35)', speed: 1.0, delay: 0, yMove: 10 },
    { color: 'rgba(10,50,85,0.25)', speed: 1.4, delay: 0.4, yMove: 13 },
    { color: 'rgba(20,90,130,0.15)', speed: 1.8, delay: 0.8, yMove: 16 },
    { color: 'rgba(255,255,255,0.03)', speed: 2.2, delay: 1.2, yMove: 18 }
  ];

  function makeWaveSVG(width, height, side, color) {
    const n = Math.ceil(height / segmentH);
    const segH = height / n;
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svg.setAttribute('width', width);
    svg.setAttribute('height', height);
    svg.setAttribute('preserveAspectRatio', 'none');

    let d;
    if (side === 'right') {
      // Straight on right (x=width), wavy on left
      d = `M${width},0 L${width},${height}`;
      for (let i = 0; i < n; i++) {
        const y1 = height - i * segH;
        const yMid = y1 - segH / 2;
        const y2 = y1 - segH;
        if (i === 0) {
          d += ` L${amp * 0.3},${y1}`;
        }
        d += ` Q${amp},${yMid} ${amp * 0.3},${y2}`;
      }
    } else {
      // Straight on left (x=0), wavy on right
      d = `M0,0 L0,${height}`;
      for (let i = 0; i < n; i++) {
        const y1 = height - i * segH;
        const yMid = y1 - segH / 2;
        const y2 = y1 - segH;
        if (i === 0) {
          d += ` L${width - amp * 0.3},${y1}`;
        }
        d += ` Q${width - amp},${yMid} ${width - amp * 0.3},${y2}`;
      }
    }
    d += ' Z';

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', d);
    path.setAttribute('fill', color);
    svg.appendChild(path);

    return svg;
  }

  function createColumn(side) {
    const col = document.createElement('div');
    col.className = `wave-column wave-${side}`;

    layerConfigs.forEach((cfg, idx) => {
      const wrap = document.createElement('div');
      wrap.className = `wave-layer wave-layer-${idx}`;
      wrap.style.position = 'absolute';
      wrap.style.inset = '0';

      const h = Math.ceil(window.innerHeight / segmentH) * segmentH + segmentH;
      const svg = makeWaveSVG(waveW, h, side, cfg.color);
      svg.style.width = '100%';
      svg.style.height = h + 'px';
      wrap.appendChild(svg);

      col.appendChild(wrap);

      gsap.to(wrap, {
        y: -cfg.yMove,
        duration: 2.5 + cfg.speed * 0.5,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        delay: cfg.delay + (side === 'right' ? 0.3 : 0)
      });
    });

    return col;
  }

  container.appendChild(createColumn('left'));
  container.appendChild(createColumn('right'));
  document.body.prepend(container);
}
