// Draw OS-map style contour lines for the hero: two hills
(function drawContours() {
  const svg = document.getElementById('contours');
  if (!svg) return;
  const NS = 'http://www.w3.org/2000/svg';

  const hills = [
    { cx: 930, cy: 250, rings: 16, step: 30, seed: 1.3 },
    { cx: 260, cy: 760, rings: 12, step: 34, seed: 4.1 },
  ];

  function ring(cx, cy, r, seed, k) {
    const pts = [];
    const n = 140;
    for (let i = 0; i <= n; i++) {
      const t = (i / n) * Math.PI * 2;
      const wobble = 1
        + 0.16 * Math.sin(3 * t + seed + k * 0.22)
        + 0.08 * Math.sin(5 * t - seed * 1.7 + k * 0.1)
        + 0.04 * Math.sin(9 * t + seed * 2.3);
      pts.push([cx + Math.cos(t) * r * wobble * 1.25, cy + Math.sin(t) * r * wobble * 0.85]);
    }
    return 'M' + pts.map(p => p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join('L') + 'Z';
  }

  hills.forEach(h => {
    for (let k = 1; k <= h.rings; k++) {
      const p = document.createElementNS(NS, 'path');
      p.setAttribute('d', ring(h.cx, h.cy, k * h.step, h.seed, k));
      if (k % 5 === 0) p.setAttribute('class', 'index');
      svg.appendChild(p);
      const len = Math.ceil(p.getTotalLength());
      p.style.setProperty('--len', len);
      p.style.setProperty('--delay', (k * 0.05).toFixed(2) + 's');
    }
  });
})();
