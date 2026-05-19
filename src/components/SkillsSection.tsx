import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import { motion, useInView } from 'framer-motion';

import { 
  Atom, FileCode2, Code2, BrainCircuit, Network, Layout,
  Server, FileCode, Coffee, Palette, Activity, TerminalSquare, 
  Globe, Brush, Bot, Github, Lightbulb, GitBranch, Container,
  Workflow, Blocks, Database, HardDrive, Wifi, Plug, Zap,
  Sparkles, Cloud, Gauge, Bug, MonitorSmartphone, Cog, Terminal
} from 'lucide-react';

const SKILLS = [
  // Large — core strengths
  { text: 'React', size: 'large', color: 'hsl(186,90%,50%)', icon: Atom },
  { text: 'Python', size: 'large', color: 'hsl(45,90%,50%)', icon: FileCode2 },
  { text: 'TypeScript', size: 'large', color: 'hsl(215,90%,60%)', icon: FileCode },
  { text: 'Automation', size: 'large', color: 'hsl(270,70%,65%)', icon: Bot },

  // Medium-Large — strong skills
  { text: 'AI Automation', size: 'medium-large', color: 'hsl(330,90%,60%)', icon: BrainCircuit },
  { text: 'System Design', size: 'medium-large', color: 'hsl(270,70%,65%)', icon: Network },
  { text: 'Web Dev', size: 'medium-large', color: 'hsl(150,80%,50%)', icon: Layout },
  { text: 'Node.js', size: 'medium-large', color: 'hsl(120,60%,50%)', icon: Server },

  // Medium — solid skills
  { text: 'JavaScript', size: 'medium', color: 'hsl(45,90%,50%)', icon: Code2 },
  { text: 'C++', size: 'medium', color: 'hsl(210,80%,50%)', icon: TerminalSquare },
  { text: 'Java', size: 'medium', color: 'hsl(15,80%,50%)', icon: Coffee },
  { text: 'Tailwind CSS', size: 'medium', color: 'hsl(195,90%,50%)', icon: Palette },
  { text: 'Framer Motion', size: 'medium', color: 'hsl(300,80%,50%)', icon: Activity },
  { text: 'Docker', size: 'medium', color: 'hsl(210,80%,60%)', icon: Container },
  { text: 'Git', size: 'medium', color: 'hsl(15,90%,55%)', icon: GitBranch },
  { text: 'n8n', size: 'medium', color: 'hsl(150,70%,50%)', icon: Workflow },
  { text: 'SQL', size: 'medium', color: 'hsl(200,70%,50%)', icon: Database },
  { text: 'Linux', size: 'medium', color: 'hsl(45,70%,50%)', icon: Terminal },
  { text: 'REST APIs', size: 'medium', color: 'hsl(25,90%,55%)', icon: Plug },
  { text: 'Data Structures', size: 'medium', color: 'hsl(280,60%,55%)', icon: Blocks },

  // Small — supporting skills
  { text: 'C', size: 'small', color: 'hsl(210,80%,40%)', icon: TerminalSquare },
  { text: 'HTML', size: 'small', color: 'hsl(15,90%,50%)', icon: Globe },
  { text: 'CSS', size: 'small', color: 'hsl(210,90%,50%)', icon: Brush },
  { text: 'GitHub', size: 'small', color: 'hsl(0,0%,90%)', icon: Github },
  { text: 'Problem Solving', size: 'small', color: 'hsl(330,90%,60%)', icon: Lightbulb },
  { text: 'OOP', size: 'small', color: 'hsl(260,60%,55%)', icon: Blocks },
  { text: 'DBMS', size: 'small', color: 'hsl(200,60%,45%)', icon: HardDrive },
  { text: 'PL/SQL', size: 'small', color: 'hsl(200,70%,40%)', icon: Database },
  { text: 'Networking', size: 'small', color: 'hsl(170,70%,50%)', icon: Wifi },
  { text: 'APIs', size: 'small', color: 'hsl(25,80%,50%)', icon: Plug },
  { text: 'Prompt Eng.', size: 'small', color: 'hsl(300,70%,55%)', icon: Sparkles },
  { text: 'GitHub Actions', size: 'small', color: 'hsl(220,70%,55%)', icon: Cog },
  { text: 'Cloud Basics', size: 'small', color: 'hsl(200,80%,60%)', icon: Cloud },
  { text: 'Performance', size: 'small', color: 'hsl(120,70%,45%)', icon: Gauge },
  { text: 'Debugging', size: 'small', color: 'hsl(0,70%,55%)', icon: Bug },
  { text: 'UI Engineering', size: 'small', color: 'hsl(186,80%,55%)', icon: MonitorSmartphone },
  { text: 'Auto Workflows', size: 'small', color: 'hsl(270,60%,55%)', icon: Zap },
];

const getSize = (sizeCat: string, width: number, totalSkills: number) => {
  const isMobile = width < 768;
  
  // Higher floor (0.7) and higher base (1.4) = bigger, more congested bubbles
  const densityFactor = Math.max(0.7, 20 / totalSkills); 
  const base = (isMobile ? 0.65 : 1.4) * densityFactor; 
  
  if (sizeCat === 'large') return 75 * base;
  if (sizeCat === 'medium-large') return 65 * base;
  if (sizeCat === 'medium') return 55 * base;
  return 46 * base; // small
};

const SkillsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const bubbleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bodiesRef = useRef<Matter.Body[]>([]);
  const dragConstraintRef = useRef<Matter.Constraint | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!inView || !containerRef.current) return;
    setHasStarted(true);

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Setup Matter.js Engine
    const engine = Matter.Engine.create({
      enableSleeping: true,
    });
    engineRef.current = engine;
    
    // Physics tweaks
    engine.world.gravity.y = 0.5; // Natural gravity

    // 2. Setup Boundaries
    const wallOptions = { 
      isStatic: true,
      restitution: 0.5,
      friction: 0.1,
      render: { visible: false }
    };
    
    const ground = Matter.Bodies.rectangle(width / 2, height + 50, width * 2, 100, wallOptions);
    const leftWall = Matter.Bodies.rectangle(-50, height / 2, 100, height * 2, wallOptions);
    const rightWall = Matter.Bodies.rectangle(width + 50, height / 2, 100, height * 2, wallOptions);
    const ceiling = Matter.Bodies.rectangle(width / 2, -2000, width * 2, 100, wallOptions); // High ceiling
    
    Matter.World.add(engine.world, [ground, leftWall, rightWall, ceiling]);

    // 3. Create Bubbles
    const bodies = SKILLS.map((skill, index) => {
      const radius = getSize(skill.size, width, SKILLS.length);
      // Stagger start positions safely below the ceiling
      const startX = Math.max(radius, Math.min(width - radius, Math.random() * width));
      const startY = -100 - (Math.random() * 300) - (index * 30); 
      
      return Matter.Bodies.circle(startX, startY, radius, {
        restitution: 0.8, // Bouncier
        friction: 0.1,
        frictionAir: 0.005, // Less air resistance for more liveliness
        density: 0.04,
        label: skill.text,
        sleepThreshold: 120, // Sleep less easily
      });
    });

    Matter.World.add(engine.world, bodies);
    bodiesRef.current = bodies;

    // 4. Custom Drag Logic to prevent scroll hijacking
    const handlePointerMove = (e: PointerEvent) => {
      if (dragConstraintRef.current && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        dragConstraintRef.current.pointA = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        };
      }
    };

    const handlePointerUp = () => {
      if (dragConstraintRef.current && engineRef.current) {
        Matter.World.remove(engineRef.current.world, dragConstraintRef.current);
        dragConstraintRef.current = null;
      }
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    // 5. Physics Constraints & Ambient Micro-Movement
    Matter.Events.on(engine, 'beforeUpdate', () => {
      bodies.forEach(body => {
        // --- 1. Rotation Limits (Prevent upside-down text) ---
        // Clamp the angle between -90 and +90 degrees (-PI/2 to PI/2)
        const maxAngle = Math.PI / 2.2; // Slightly less than 90 degrees for readability
        if (body.angle > maxAngle) {
          Matter.Body.setAngle(body, maxAngle);
          Matter.Body.setAngularVelocity(body, 0);
        } else if (body.angle < -maxAngle) {
          Matter.Body.setAngle(body, -maxAngle);
          Matter.Body.setAngularVelocity(body, 0);
        }

        // --- 2. Ambient Micro-Movement ---
        // Only apply force occasionally to bubbles that are nearly still
        if (body.speed < 1 && Math.random() < 0.05) {
          Matter.Sleeping.set(body, false);
          Matter.Body.applyForce(body, body.position, {
            x: (Math.random() - 0.5) * 0.005 * body.mass,
            y: (Math.random() - 0.5) * 0.005 * body.mass
          });
        }
      });
    });

    // 6. Run Physics and Sync DOM
    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);

    let animationFrameId: number;

    const updateDOM = () => {
      bodies.forEach((body, index) => {
        const domNode = bubbleRefs.current[index];
        if (domNode) {
          // Using strict translation to match Matter.js coordinates
          // Matter.js body.position is the center of the circle
          domNode.style.transform = `translate(${body.position.x - domNode.offsetWidth / 2}px, ${body.position.y - domNode.offsetHeight / 2}px) rotate(${body.angle}rad)`;
        }
      });
      animationFrameId = requestAnimationFrame(updateDOM);
    };
    
    updateDOM();

    // 7. Handle Resize dynamically
    const handleResize = () => {
      if (!containerRef.current) return;
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;
      
      // Update walls
      Matter.Body.setPosition(ground, { x: newWidth / 2, y: newHeight + 50 });
      Matter.Body.setPosition(rightWall, { x: newWidth + 50, y: newHeight / 2 });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('resize', handleResize);
      Matter.Runner.stop(runner);
      Matter.Engine.clear(engine);
      Matter.World.clear(engine.world, false);
      cancelAnimationFrame(animationFrameId);
    };
  }, [inView]);

  return (
    <section className="section-padding relative min-h-screen flex items-center justify-center" id="skills" ref={sectionRef}>
      <div className="max-w-7xl mx-auto w-full z-10 flex flex-col items-center justify-center">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-6 md:mb-10"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-3">
            Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Arsenal</span>
          </h2>
          <p className="text-muted-foreground font-body max-w-2xl mx-auto text-sm md:text-base">
            A dynamic overview of my capabilities. Grab, toss, and interact with the skills.
          </p>
        </motion.div>

        {/* Physics Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full flex justify-center"
        >
          <div 
            ref={containerRef}
            className="relative w-full max-w-4xl h-[400px] md:h-[480px] rounded-[2.5rem] overflow-hidden bg-black/20 backdrop-blur-3xl border border-white/10 shadow-[0_0_80px_rgba(6,182,212,0.1)] group select-none pointer-events-none"
          >
            {/* Ambient Background Glow inside container */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

            {/* Render Bubbles as DOM Elements */}
            {hasStarted && SKILLS.map((skill, index) => {
              // We need an initial size so DOM renders correctly before the first animation frame
              const radius = containerRef.current ? getSize(skill.size, containerRef.current.clientWidth, SKILLS.length) : 50;
              
              return (
                <div
                  key={skill.text}
                  ref={(el) => (bubbleRefs.current[index] = el)}
                  className="absolute top-0 left-0 flex items-center justify-center rounded-full bg-white/5 backdrop-blur-xl border text-white font-heading font-semibold cursor-grab active:cursor-grabbing hover:bg-white/10 transition-colors duration-300 pointer-events-auto"
                  style={{
                    width: radius * 2,
                    height: radius * 2,
                    // Starting them off-screen or totally hidden until Matter.js places them
                    transform: `translate(-1000px, -1000px)`,
                    boxShadow: `0 0 25px ${skill.color}60, inset 0 0 20px ${skill.color}40`,
                    borderColor: `${skill.color}80`,
                    touchAction: 'none', // Prevents scrolling while physically dragging a bubble on mobile
                  }}
                  onMouseEnter={(e) => {
                    // Hover effects
                    e.currentTarget.style.boxShadow = `0 0 40px ${skill.color}90, inset 0 0 30px ${skill.color}60`;
                    e.currentTarget.style.borderColor = skill.color;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = `0 0 25px ${skill.color}60, inset 0 0 20px ${skill.color}40`;
                    e.currentTarget.style.borderColor = `${skill.color}80`;
                  }}
                  onPointerDown={(e) => {
                    if (!engineRef.current || !containerRef.current) return;
                    const body = bodiesRef.current[index];
                    if (!body) return;
                
                    e.currentTarget.setPointerCapture(e.pointerId);
                
                    const rect = containerRef.current.getBoundingClientRect();
                    const point = {
                      x: e.clientX - rect.left,
                      y: e.clientY - rect.top
                    };
                
                    if (dragConstraintRef.current) {
                      Matter.World.remove(engineRef.current.world, dragConstraintRef.current);
                    }
                
                    dragConstraintRef.current = Matter.Constraint.create({
                      pointA: point,
                      bodyB: body,
                      pointB: { x: 0, y: 0 },
                      stiffness: 0.2,
                      damping: 0.1,
                      render: { visible: false }
                    });
                
                    Matter.World.add(engineRef.current.world, dragConstraintRef.current);
                  }}
                >
                  <div className="flex flex-col items-center justify-center pointer-events-none gap-0.5" style={{ width: radius * 1.6, height: radius * 1.6 }}>
                    {skill.icon && (
                      <skill.icon 
                        size={Math.max(12, radius * 0.38)} 
                        color={skill.color} 
                        strokeWidth={1.5}
                        style={{ flexShrink: 0 }}
                      />
                    )}
                    <span 
                      className="text-center leading-tight break-words overflow-hidden"
                      style={{ 
                        fontSize: `${Math.max(0.45, Math.min(0.75, (radius * 1.4) / Math.max(skill.text.length, 1) * 0.14))}rem`,
                        maxWidth: radius * 1.5,
                        wordBreak: 'break-word',
                      }}
                    >
                      {skill.text}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default SkillsSection;
