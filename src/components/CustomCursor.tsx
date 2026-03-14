import { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const outerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const outerPos = useRef({ x: 0, y: 0 });
  const hovering = useRef(false);
  const hasMoved = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const outer = outerRef.current;
    const dot = dotRef.current;
    if (!canvas || !outer || !dot) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    // Hide default cursor
    document.body.style.cursor = 'none';

    interface Particle { x: number; y: number; alpha: number; size: number; color: string }
    interface Spark { x: number; y: number; vx: number; vy: number; life: number; color: string }

    const trail: Particle[] = [];
    const sparks: Spark[] = [];
    const colors = ['hsl(270,70%,65%)', 'hsl(330,90%,60%)', 'hsl(186,90%,50%)', 'hsl(25,95%,60%)'];

    const onMove = (e: MouseEvent) => {
      hasMoved.current = true;
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      // Add trail particles (multiple per move for more intensity)
      for (let j = 0; j < 3; j++) {
        trail.push({
          x: e.clientX + (Math.random() - 0.5) * 10,
          y: e.clientY + (Math.random() - 0.5) * 10,
          alpha: 0.4 + Math.random() * 0.3,
          size: 1.5 + Math.random() * 1.5,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
      if (trail.length > 50) trail.splice(0, trail.length - 50);

      // Hero lingering particles
      const heroEl = document.getElementById('hero');
      if (heroEl) {
        const rect = heroEl.getBoundingClientRect();
        if (e.clientY >= rect.top && e.clientY <= rect.bottom) {
          trail.push({
            x: e.clientX + (Math.random() - 0.5) * 8,
            y: e.clientY + (Math.random() - 0.5) * 8,
            alpha: 0.6,
            size: 2.5,
            color: colors[Math.floor(Math.random() * colors.length)],
          });
        }
      }
    };

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      hovering.current = !!(
        el.tagName === 'A' || el.tagName === 'BUTTON' ||
        el.closest('a') || el.closest('button') || el.closest('[role="button"]') ||
        el.closest('.card-hover-glow') || el.closest('.bg-gradient-card')
      );
    };

    const onClick = (e: MouseEvent) => {
      for (let i = 0; i < 10; i++) {
        const angle = (Math.PI * 2 * i) / 10;
        const speed = 1.5 + Math.random() * 2.5;
        sparks.push({
          x: e.clientX, y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    let raf: number;
    const loop = () => {
      // Smooth outer follow
      outerPos.current.x += (mousePos.current.x - outerPos.current.x) * 0.15;
      outerPos.current.y += (mousePos.current.y - outerPos.current.y) * 0.15;

      const scale = hovering.current ? 1.8 : 1;
      const borderColor = hovering.current ? 'hsla(330,90%,60%,0.6)' : 'hsla(270,70%,65%,0.5)';

      outer.style.transform = `translate(${outerPos.current.x - 20}px, ${outerPos.current.y - 20}px) scale(${scale})`;
      outer.style.borderColor = borderColor;
      outer.style.opacity = hasMoved.current ? '1' : '0';

      dot.style.transform = `translate(${mousePos.current.x - 4}px, ${mousePos.current.y - 4}px)`;
      dot.style.opacity = hasMoved.current ? '1' : '0';

      // Canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw trail
      for (let i = trail.length - 1; i >= 0; i--) {
        const p = trail[i];
        p.alpha -= 0.02;
        if (p.alpha <= 0) { trail.splice(i, 1); continue; }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      }

      // Draw sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.life -= 0.03;
        if (s.life <= 0) { sparks.splice(i, 1); continue; }
        ctx.beginPath();
        ctx.arc(s.x, s.y, 1.5 * s.life, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = s.life;
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    window.addEventListener('click', onClick);
    raf = requestAnimationFrame(loop);

    return () => {
      document.body.style.cursor = '';
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('click', onClick);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="fixed inset-0 z-[5] pointer-events-none" />
      <div
        ref={outerRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[9999] opacity-0"
        style={{
          border: '1.5px solid hsla(270,70%,65%,0.5)',
          background: 'radial-gradient(circle, hsla(270,70%,65%,0.1), hsla(186,90%,50%,0.05), transparent)',
          transition: 'border-color 0.3s, opacity 0.3s',
          willChange: 'transform',
        }}
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999] opacity-0"
        style={{
          background: 'linear-gradient(135deg, hsl(270,70%,65%), hsl(330,90%,60%))',
          boxShadow: '0 0 10px hsl(270,70%,65%), 0 0 20px hsl(330,90%,60%)',
          willChange: 'transform',
        }}
      />
    </>
  );
};

export default CustomCursor;
