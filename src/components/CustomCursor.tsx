import { useEffect, useRef, useCallback } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const isHovering = useRef(false);
  const velocity = useRef({ x: 0, y: 0 });
  const prevTarget = useRef({ x: -100, y: -100 });
  const trails = useRef<{ x: number; y: number; alpha: number; size: number; color: string }[]>([]);
  const sparks = useRef<{ x: number; y: number; vx: number; vy: number; life: number; color: string }[]>([]);
  const ripples = useRef<{ x: number; y: number; radius: number; alpha: number }[]>([]);

  const handleClick = useCallback((e: MouseEvent) => {
    ripples.current.push({ x: e.clientX, y: e.clientY, radius: 5, alpha: 0.6 });
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
      prevTarget.current = { ...target.current };
      target.current = { x: e.clientX, y: e.clientY };
      velocity.current = {
        x: target.current.x - prevTarget.current.x,
        y: target.current.y - prevTarget.current.y,
      };

      const speed = Math.sqrt(velocity.current.x ** 2 + velocity.current.y ** 2);

      // Add trail points
      trails.current.push({
        x: e.clientX,
        y: e.clientY,
        alpha: 0.6,
        size: Math.min(3, 1 + speed * 0.05),
        color: isHovering.current ? 'hsl(270,70%,60%)' : 'hsl(217,91%,60%)',
      });
      if (trails.current.length > 30) trails.current.shift();

      // Sparks on fast movement
      if (speed > 8) {
        for (let i = 0; i < 2; i++) {
          sparks.current.push({
            x: e.clientX,
            y: e.clientY,
            vx: (Math.random() - 0.5) * 4,
            vy: (Math.random() - 0.5) * 4,
            life: 1,
            color: ['hsl(217,91%,60%)', 'hsl(186,90%,50%)', 'hsl(270,70%,60%)', 'hsl(330,90%,60%)'][Math.floor(Math.random() * 4)],
          });
        }
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      isHovering.current = !!(el.tagName === 'A' || el.tagName === 'BUTTON' || el.closest('a') || el.closest('button') || el.closest('[role="button"]'));
    };

    let frame: number;
    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.12;
      pos.current.y += (target.current.y - pos.current.y) * 0.12;

      if (cursorRef.current) {
        const scale = isHovering.current ? 2 : 1;
        const borderColor = isHovering.current ? 'hsla(270,70%,60%,0.6)' : 'hsla(217,91%,60%,0.4)';
        cursorRef.current.style.transform = `translate(${pos.current.x - 22}px, ${pos.current.y - 22}px) scale(${scale})`;
        cursorRef.current.style.borderColor = borderColor;
      }

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate(${target.current.x - 4}px, ${target.current.y - 4}px)`;
      }

      // Canvas effects
      ctx.clearRect(0, 0, w, h);

      // Draw trails
      for (let i = 0; i < trails.current.length; i++) {
        const t = trails.current[i];
        t.alpha -= 0.02;
        ctx.beginPath();
        ctx.arc(t.x, t.y, t.size, 0, Math.PI * 2);
        ctx.fillStyle = t.color;
        ctx.globalAlpha = Math.max(0, t.alpha);
        ctx.fill();
      }
      trails.current = trails.current.filter(t => t.alpha > 0);

      // Draw sparks
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

      // Draw ripples
      for (const r of ripples.current) {
        r.radius += 3;
        r.alpha -= 0.02;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = 'hsl(217,91%,60%)';
        ctx.lineWidth = 2;
        ctx.globalAlpha = Math.max(0, r.alpha);
        ctx.stroke();
      }
      ripples.current = ripples.current.filter(r => r.alpha > 0);

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
  }, [handleClick]);

  return (
    <>
      <canvas ref={canvasRef} className="fixed inset-0 z-[9998] pointer-events-none" />
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-11 h-11 rounded-full pointer-events-none z-[9999] transition-[border-color] duration-300"
        style={{
          background: 'radial-gradient(circle, hsla(217,91%,60%,0.15), hsla(270,70%,60%,0.08), transparent)',
          border: '1.5px solid hsla(217,91%,60%,0.4)',
          mixBlendMode: 'screen',
          transition: 'transform 0.1s ease-out, border-color 0.3s',
        }}
      />
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999]"
        style={{
          background: 'linear-gradient(135deg, hsl(217,91%,60%), hsl(186,90%,50%))',
          boxShadow: '0 0 12px hsl(217,91%,60%), 0 0 24px hsl(186,90%,50%)',
        }}
      />
    </>
  );
};

export default CustomCursor;
