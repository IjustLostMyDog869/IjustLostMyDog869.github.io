// script.js
// A simple Plexus effect using HTML5 Canvas
const canvas = document.getElementById('plexus');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

const POINT_COUNT = 100;
const MAX_DISTANCE = 100;
const points = [];
const mouse = { x: null, y: null };

for (let i = 0; i < POINT_COUNT; i++) {
  points.push({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.7,
    vy: (Math.random() - 0.5) * 0.7
  });
}

function drawLine(p1, p2, alpha) {
  ctx.beginPath();
  ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.stroke();
}

function animate() {
  ctx.fillStyle = '#0f0f1f';
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < points.length; i++) {
    const p = points[i];
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > width) p.vx *= -1;
    if (p.y < 0 || p.y > height) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = "#ffffff";
    ctx.fill();

    for (let j = i + 1; j < points.length; j++) {
      const q = points[j];
      const dx = p.x - q.x;
      const dy = p.y - q.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < MAX_DISTANCE) {
        drawLine(p, q, 1 - dist / MAX_DISTANCE);
      }
    }

    if (mouse.x !== null && mouse.y !== null) {
      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < MAX_DISTANCE) {
        drawLine(p, mouse, 1 - dist / MAX_DISTANCE);
      }
    }
  }

  requestAnimationFrame(animate);
}

canvas.addEventListener('mousemove', e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

canvas.addEventListener('mouseleave', () => {
  mouse.x = null;
  mouse.y = null;
});

window.addEventListener('resize', () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});

animate();
