import { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    let mouse = { x: w / 2, y: h / 2 };

    const particles: { x: number; y: number; vx: number; vy: number; size: number; color: string; alpha: number; baseAlpha: number }[] = [];
    const largeParticles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number; hue: number }[] = [];

    for (let i = 0; i < 100; i++) {
      const alpha = Math.random() * 0.5 + 0.1;
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        size: Math.random() * 2.5 + 0.5,
        color: ['#8B5CF6', '#EC4899', '#06B6D4', '#F97316', '#A78BFA'][Math.floor(Math.random() * 5)],
        alpha,
        baseAlpha: alpha,
      });
    }

    for (let i = 0; i < 8; i++) {
      largeParticles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        size: Math.random() * 40 + 20,
        alpha: Math.random() * 0.04 + 0.02,
        hue: [270, 330, 186, 25][Math.floor(Math.random() * 4)],
      });
    }

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    const handleMouse = (e: MouseEvent) => {
      mouse = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouse);

    let time = 0;
    let frame: number;
    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.01;

      for (const lp of largeParticles) {
        lp.x += lp.vx;
        lp.y += lp.vy;
        if (lp.x < -50) lp.x = w + 50;
        if (lp.x > w + 50) lp.x = -50;
        if (lp.y < -50) lp.y = h + 50;
        if (lp.y > h + 50) lp.y = -50;

        const grad = ctx.createRadialGradient(lp.x, lp.y, 0, lp.x, lp.y, lp.size);
        grad.addColorStop(0, `hsla(${lp.hue},80%,60%,${lp.alpha})`);
        grad.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(lp.x, lp.y, lp.size, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 250) {
          p.vx += dx * 0.00008;
          p.vy += dy * 0.00008;
          p.alpha = p.baseAlpha + (1 - dist / 250) * 0.3;
        } else {
          p.alpha += (p.baseAlpha - p.alpha) * 0.05;
        }

        p.vx *= 0.999;
        p.vy *= 0.999;

        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      });

      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            const alpha = 0.08 * (1 - dist / 130);
            ctx.globalAlpha = alpha;
            ctx.strokeStyle = '#8B5CF6';
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 0.015;
      ctx.beginPath();
      ctx.moveTo(0, h * 0.6);
      for (let x = 0; x <= w; x += 10) {
        const y = h * 0.6 + Math.sin(x * 0.003 + time * 2) * 40 + Math.sin(x * 0.007 + time * 3) * 20;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.closePath();
      ctx.fillStyle = 'hsl(270,70%,65%)';
      ctx.fill();

      ctx.globalAlpha = 1;
      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouse);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div className="fixed inset-0 z-0">
        <div
          className="absolute inset-0 animate-gradient"
          style={{
            background: 'radial-gradient(ellipse at 20% 50%, hsla(270,70%,65%,0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, hsla(330,90%,60%,0.07) 0%, transparent 50%), radial-gradient(ellipse at 50% 80%, hsla(186,90%,50%,0.05) 0%, transparent 50%), radial-gradient(ellipse at 70% 60%, hsla(25,95%,60%,0.04) 0%, transparent 40%)',
            backgroundSize: '200% 200%',
          }}
        />
      </div>
      <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(hsla(270,70%,65%,0.3) 1px, transparent 1px), linear-gradient(90deg, hsla(270,70%,65%,0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
    </>
  );
};

export default AnimatedBackground;
