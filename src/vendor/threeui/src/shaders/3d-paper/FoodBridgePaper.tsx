import { useEffect, useRef, useState, type CSSProperties } from 'react';
import foodBridgeMenuSource from './sources/foodbridge-menu.html?raw';
import '../threeui.css';

export function FoodBridgePaper({ className = '', style }: { className?: string; style?: CSSProperties }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [documentVisible, setDocumentVisible] = useState(() => typeof document === 'undefined' || !document.hidden);
  const [hostVisible, setHostVisible] = useState(true);
  const [ready, setReady] = useState(false);
  const [motionAllowed, setMotionAllowed] = useState(() => typeof window === 'undefined' || !window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [webglAvailable, setWebglAvailable] = useState(true);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || typeof IntersectionObserver === 'undefined') return undefined;
    const observer = new IntersectionObserver(([entry]) => setHostVisible(entry?.isIntersecting ?? true), { rootMargin: '80px' });
    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => setMotionAllowed(!query.matches);
    query.addEventListener?.('change', updateMotion);
    const canvas = document.createElement('canvas');
    setWebglAvailable(!!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    return () => query.removeEventListener?.('change', updateMotion);
  }, []);

  useEffect(() => {
    const update = () => setDocumentVisible(!document.hidden);
    document.addEventListener('visibilitychange', update);
    return () => document.removeEventListener('visibilitychange', update);
  }, []);

  const mounted = hostVisible && documentVisible && motionAllowed && webglAvailable;

  useEffect(() => {
    setReady(false);
  }, [mounted]);

  return (
    <div
      ref={hostRef}
      className={`threeui-background three-d-paper${className ? ` ${className}` : ''}`}
      role="group"
      aria-label="FoodBridge surplus menu, shown on an interactive 3D paper sheet"
      data-state={!mounted ? 'paused' : ready ? 'ready' : 'loading'}
      style={{ position: 'relative', overflow: 'hidden', background: '#FFF6E5', pointerEvents: 'auto', ...style }}
    >
      {mounted ? (
        <iframe
          title="Today’s Menu of Surplus"
          srcDoc={foodBridgeMenuSource}
          sandbox="allow-scripts"
          loading="lazy"
          onLoad={() => setReady(true)}
          style={{
            position: 'absolute', inset: 0, display: 'block', width: '100%', height: '100%', border: 0,
            background: '#FFF6E5', opacity: ready ? 1 : 0, pointerEvents: ready ? 'auto' : 'none',
            transition: 'opacity 240ms ease-out',
          }}
        />
      ) : null}
    </div>
  );
}
