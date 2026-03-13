import { useEffect, useRef, useCallback } from 'react';

const CustomCursor = () => {
  const outerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -100, y: -100 });
  const smoothPos = useRef({ x: -100, y: -100 });
  const isHovering = useRef(false);
  const prevMouse = useRef({ x: -100, y: -100 });

  interface Trail { x: number; y: number; alpha: number; size: number; color: string }
  interface Spark { x: number; y: number; vx: number; vy: number; life: number; color: string }
  interface Ripple { x: number; y: number; radius: number; alpha: number }
  interface HeroParticle { x: number; y: number; alpha: number; size: number; color: string; birth: number; duration: number }

  const trails = useRef<Trail[]>([]);
  const sparks = useRef<Spark[]>([]);
  const ripples = useRef<Ripple[]>([]);
  const heroParticles = useRef<HeroParticle[]>([]);

  const isInHero = useCallback((y: number) => {
    const heroEl = document.getElementById('hero');
    if (!heroEl) return false;
    const rect = heroEl.getBoundingClientRect();
    return y >= rect.top && y <= rect.bottom;
  }, []);

  const handleClick = useCallback((e: MouseEvent) => {
    // Ripple
    ripples.current.push({ x: e.clientX, y: e.clientY, radius: 5, alpha: 0.7 });
    // Burst particles
    const colors = ['hsl(270,70%,65%)', 'hsl(330,90%,60%)', 'hsl(186,90%,50%)', 'hsl(25,95%,60%)'];
    for (let i = 0; i < 12; i++) {
      const angle = (Math.PI * 2 * i) / 12;
      const speed = 2 + Math.random() * 3;
      sparks.current.push({
        x: e.clientX, y: e.clientY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      prevMouse.current = { ...mouse.current };
      mouse.current = { x: e.clientX, y: e.clientY };

      const dx = mouse.current.x - prevMouse.current.x;
      const dy = mouse.current.y - prevMouse.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy);

      const colors = ['hsl(270,70%,65%)', 'hsl(330,90%,60%)', 'hsl(186,90%,50%)', 'hsl(25,95%,60%)'];
      const c = colors[Math.floor(Math.random() * colors.length)];

      // Trail
      trails.current.push({
        x: e.clientX, y: e.clientY,
        alpha: 0.5,
        size: Math.min(3, 1 + speed * 0.04),
        color: c,
      });
      if (trails.current.length > 25) trails.current.shift();

      // Sparks on fast movement
      if (speed > 10) {
        sparks.current.push({
          x: e.clientX, y: e.clientY,
          vx: (Math.random() - 0.5) * 3,
          vy: (Math.random() - 0.5) * 3,
          life: 1, color: c,
        });
      }

      // Hero lingering particles
      if (isInHero(e.clientY) && speed > 3) {
        heroParticles.current.push({
          x: e.clientX, y: e.clientY,
          alpha: 0.6,
          size: 2 + Math.random() * 2,
          color: c,
          birth: performance.now(),
          duration: 2000,
        });
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      isHovering.current = !!(
        el.tagName === 'A' || el.tagName === 'BUTTON' ||
        el.closest('a') || el.closest('button') || el.closest('[role="button"]') ||
        el.closest('.card-hover-glow') || el.closest('.bg-gradient-card')
      );
    };

    let frame: number;
    const animate = () => {
      // Smooth follow
      smoothPos.current.x += (mouse.current.x - smoothPos.current.x) * 0.15;
      smoothPos.current.y += (mouse.current.y - smoothPos.current.y) * 0.15;

      // Outer ring
      if (outerRef.current) {
        const scale = isHovering.current ? 2.2 : 1;
        const borderHue = isHovering.current ? '330,90%,60%' : '270,70%,65%';
        outerRef.current.style.transform = `translate(${smoothPos.current.x - 20}px, ${smoothPos.current.y - 20}px) scale(${scale})`;
        outerRef.current.style.borderColor = `hsla(${borderHue},0.6)`;
        outerRef.current.style.background = isHovering.current
          ? 'radial-gradient(circle, hsla(330,90%,60%,0.12), hsla(270,70%,65%,0.06), transparent)'
          : 'radial-gradient(circle, hsla(270,70%,65%,0.1), hsla(186,90%,50%,0.05), transparent)';
      }

      // Inner dot
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouse.current.x - 4}px, ${mouse.current.y - 4}px)`;
      }

      // Canvas
      ctx.clearRect(0, 0, w, h);

      // Trails
      for (const t of trails.current) {
        t.alpha -= 0.025;
        ctx.beginPath();
        ctx.arc(t.x, t.y, t.size, 0, Math.PI * 2);
        ctx.fillStyle = t.color;
        ctx.globalAlpha = Math.max(0, t.alpha);
        ctx.fill();
      }
      trails.current = trails.current.filter(t => t.alpha > 0);

      // Sparks
      for (const s of sparks.current) {
        s.x += s.vx;
        s.y += s.vy;
        s.life -= 0.03;
        ctx.beginPath();
        ctx.arc(s.x, s.y, 1.5 * s.life, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = Math.max(0, s.life);
        ctx.fill();
      }
      sparks.current = sparks.current.filter(s => s.life > 0);

      // Ripples
      for (const r of ripples.current) {
        r.radius += 3;
        r.alpha -= 0.025;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = 'hsl(270,70%,65%)';
        ctx.lineWidth = 2;
        ctx.globalAlpha = Math.max(0, r.alpha);
        ctx.stroke();
      }
      ripples.current = ripples.current.filter(r => r.alpha > 0);

      // Hero lingering particles (behind content via z-index on canvas)
      const now = performance.now();
      for (const hp of heroParticles.current) {
        const elapsed = now - hp.birth;
        const remaining = 1 - elapsed / hp.duration;
        if (remaining <= 0) continue;
        ctx.beginPath();
        ctx.arc(hp.x, hp.y, hp.size * remaining, 0, Math.PI * 2);
        ctx.fillStyle = hp.color;
        ctx.globalAlpha = hp.alpha * remaining;
        ctx.fill();
      }
      heroParticles.current = heroParticles.current.filter(hp => now - hp.birth < hp.duration);

      ctx.globalAlpha = 1;
      frame = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('click', handleClick);
    frame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(frame);
    };
  }, [handleClick, isInHero]);

  return (
    <>
      {/* Hero particle canvas - behind hero content */}
      <canvas ref={canvasRef} className="fixed inset-0 z-[5] pointer-events-none" />
      {/* Outer glow ring */}
      <div
        ref={outerRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[9999]"
        style={{
          border: '1.5px solid hsla(270,70%,65%,0.6)',
          background: 'radial-gradient(circle, hsla(270,70%,65%,0.1), hsla(186,90%,50%,0.05), transparent)',
          transition: 'transform 0.08s ease-out, border-color 0.3s, background 0.3s',
          mixBlendMode: 'screen',
        }}
      />
      {/* Inner dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999]"
        style={{
          background: 'linear-gradient(135deg, hsl(270,70%,65%), hsl(330,90%,60%))',
          boxShadow: '0 0 10px hsl(270,70%,65%), 0 0 20px hsl(330,90%,60%)',
        }}
      />
    </>
  );
};

export default CustomCursor;
