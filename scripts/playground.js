const demos = [
  {
    id: 'theme-gen',
    title: 'Theme generator',
    description: 'Tweak accent hue + brightness; updates CSS variables live and previews swatches.',
    code: `const applyTheme = (h, l) => {
  const accent = \`hsl(\${h} 100% 70%)\`;
  const accent2 = \`hsl(\${(h + 60) % 360} 95% \${l}%)\`;
  document.documentElement.style.setProperty('--accent', accent);
  document.documentElement.style.setProperty('--accent-2', accent2);
};`,
    render(container) {
      const output = container.querySelector('.play-output');
      const hueInput = container.querySelector('[data-hue]');
      const lightInput = container.querySelector('[data-light]');

      const update = () => {
        const h = Number(hueInput.value);
        const l = Number(lightInput.value);
        const accent = `hsl(${h} 100% 70%)`;
        const accent2 = `hsl(${(h + 60) % 360} 95% ${l}%)`;
        document.documentElement.style.setProperty('--accent', accent);
        document.documentElement.style.setProperty('--accent-2', accent2);
        output.innerHTML = `
          <div class="grid-2">
            <div class="pill" style="background:${accent};color:#0a0f1c">Accent</div>
            <div class="pill" style="background:${accent2};color:#0a0f1c">Accent 2</div>
          </div>
          <p class="mono">--accent: ${accent}</p>
          <p class="mono">--accent-2: ${accent2}</p>
        `;
      };
      hueInput.addEventListener('input', update);
      lightInput.addEventListener('input', update);
      update();
    }
  },
  {
    id: 'bubble',
    title: 'Bubble sort visualizer',
    description: 'Step through a bubble sort; shows swaps and highlights comparisons.',
    code: `function bubbleStep(arr, i, j) {
  if (arr[j] > arr[j + 1]) {
    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
  }
  return { arr, nextI: j + 1 === i ? i - 1 : i, nextJ: (j + 1) % i };
}`,
    render(container) {
      const output = container.querySelector('.play-output');
      const shuffleBtn = container.querySelector('[data-shuffle]');
      const stepBtn = container.querySelector('[data-step]');
      const autoBtn = container.querySelector('[data-auto]');
      let arr = [9, 2, 7, 4, 5, 1, 8];
      let i = arr.length - 1;
      let j = 0;
      let autoTimer;

      const renderBars = () => {
        output.innerHTML = '';
        const barWrap = document.createElement('div');
        barWrap.style.display = 'grid';
        barWrap.style.gridTemplateColumns = `repeat(${arr.length}, 1fr)`;
        barWrap.style.gap = '6px';
        arr.forEach((n, idx) => {
          const bar = document.createElement('div');
          bar.style.height = `${n * 10 + 30}px`;
          bar.style.background = (idx === j || idx === j + 1) ? 'linear-gradient(120deg, var(--accent), var(--accent-2))' : 'var(--surface-2)';
          bar.style.borderRadius = '10px';
          bar.style.border = '1px solid var(--border)';
          bar.title = n.toString();
          barWrap.appendChild(bar);
        });
        output.appendChild(barWrap);
      };

      const step = () => {
        if (i <= 0) { stopAuto(); return; }
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }
        j++;
        if (j >= i) { j = 0; i--; }
        renderBars();
      };

      const shuffle = () => {
        arr = arr.sort(() => Math.random() - 0.5);
        i = arr.length - 1;
        j = 0;
        renderBars();
      };

      const stopAuto = () => {
        clearInterval(autoTimer);
        autoBtn.textContent = 'Auto play';
      };

      shuffleBtn.addEventListener('click', () => { stopAuto(); shuffle(); });
      stepBtn.addEventListener('click', () => { step(); });
      autoBtn.addEventListener('click', () => {
        if (autoTimer) { stopAuto(); return; }
        autoBtn.textContent = 'Stop';
        autoTimer = setInterval(() => {
          step();
          if (i <= 0) stopAuto();
        }, 450);
      });

      renderBars();
    }
  },
  {
    id: 'hover-physics',
    title: 'Springy hover card',
    description: 'Card tilts toward your cursor and eases back with a spring.',
    code: `const damp = 0.12;
const card = document.querySelector('.spring-card');
let vx = 0, vy = 0, rx = 0, ry = 0;
card.addEventListener('pointermove', (e) => {
  const rect = card.getBoundingClientRect();
  const dx = e.clientX - (rect.left + rect.width / 2);
  const dy = e.clientY - (rect.top + rect.height / 2);
  rx = -(dy / rect.height) * 10;
  ry = (dx / rect.width) * 10;
});
requestAnimationFrame(function tick(){
  vx += (rx - vx) * damp;
  vy += (ry - vy) * damp;
  card.style.transform = \`rotateX(\${vx}deg) rotateY(\${vy}deg)\`;
  requestAnimationFrame(tick);
});`,
    render(container) {
      const card = container.querySelector('.spring-card');
      const reset = () => { card.style.transform = 'rotateX(0deg) rotateY(0deg)'; };
      let targetX = 0, targetY = 0;
      let rx = 0, ry = 0;
      const damp = 0.12;
      const animate = () => {
        rx += (targetX - rx) * damp;
        ry += (targetY - ry) * damp;
        card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
        requestAnimationFrame(animate);
      };
      card.addEventListener('pointermove', (e) => {
        const rect = card.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        targetX = -(dy / rect.height) * 10;
        targetY = (dx / rect.width) * 10;
      });
      card.addEventListener('pointerleave', () => { targetX = 0; targetY = 0; reset(); });
      animate();
    }
  }
];

function renderPlayground() {
  const container = document.getElementById('playgroundContainer');
  if (!container) return;
  demos.forEach(demo => {
    const card = document.createElement('article');
    card.className = 'card play-card';
    card.innerHTML = `
      <header>
        <p class="eyebrow">Live demo</p>
        <h3>${demo.title}</h3>
        <p class="summary">${demo.description}</p>
      </header>
      <div class="controls">
        ${demo.id === 'theme-gen' ? `
          <label class="mono">Hue <input class="slider" type="range" min="0" max="360" value="160" data-hue aria-label="Accent hue"></label>
          <label class="mono">Accent 2 lightness <input class="slider" type="range" min="30" max="80" value="60" data-light aria-label="Accent 2 lightness"></label>
        ` : ''}
        ${demo.id === 'bubble' ? `
          <div class="cta-row">
            <button class="btn ghost" data-shuffle>Shuffle</button>
            <button class="btn ghost" data-step>Step</button>
            <button class="btn primary" data-auto>Auto play</button>
          </div>
        ` : ''}
      </div>
      <div class="play-output ${demo.id === 'hover-physics' ? 'spring-card' : ''}">${demo.id === 'hover-physics' ? '<p class="mono">Move pointer ↗</p>' : ''}</div>
      <button class="text-link code-toggle" aria-expanded="false">Show code</button>
      <pre class="code-block"><code>${demo.code}</code></pre>
    `;
    container.appendChild(card);

    const codeBtn = card.querySelector('.code-toggle');
    const codeBlock = card.querySelector('.code-block');
    codeBtn?.addEventListener('click', () => {
      const open = codeBlock.classList.toggle('show');
      codeBtn.setAttribute('aria-expanded', String(open));
      codeBtn.textContent = open ? 'Hide code' : 'Show code';
    });

    demo.render(card);
  });
}

document.addEventListener('DOMContentLoaded', renderPlayground);
