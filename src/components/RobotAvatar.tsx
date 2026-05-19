import React, { useState, Suspense } from 'react';

const Spline = React.lazy(() => import('@splinetool/react-spline'));

const SPLINE_SCENE_URL = 'https://prod.spline.design/SjXFLm7uiJQTiqNv/scene.splinecode';

const RobotAvatar = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div
      className="hidden md:block absolute top-0 right-0 w-1/2 h-full pointer-events-none z-10"
      style={{ background: 'transparent' }}
    >
      {/* 3D scene container */}
      <div className="absolute inset-0 w-full h-full pointer-events-auto">
        <Suspense fallback={null}>
          <Spline 
            scene={SPLINE_SCENE_URL} 
            onLoad={() => setIsLoading(false)}
          />
        </Suspense>
      </div>

      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center">
          <div className="relative flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full border-4 border-cyan-500/20 border-t-cyan-500 animate-spin" />
            <div className="text-cyan-400 font-mono text-sm tracking-widest animate-pulse">
              INITIALIZING NEXBOT...
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RobotAvatar;
