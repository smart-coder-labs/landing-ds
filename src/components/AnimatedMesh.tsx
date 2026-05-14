import { useEffect, useRef } from 'react'

/**
 * CSS-only animated gradient mesh — Apple Vision Pro style.
 * Zero dependencies beyond React. Uses @keyframes injected once.
 */
export default function AnimatedMesh({ className = '' }: { className?: string }) {
  const injected = useRef(false)

  useEffect(() => {
    if (injected.current) return
    injected.current = true

    const style = document.createElement('style')
    style.textContent = `
      @keyframes mesh-drift-1 {
        0%,100% { transform: translate(0%, 0%) scale(1); }
        33%      { transform: translate(4%, -6%) scale(1.08); }
        66%      { transform: translate(-3%, 4%) scale(0.95); }
      }
      @keyframes mesh-drift-2 {
        0%,100% { transform: translate(0%, 0%) scale(1); }
        33%      { transform: translate(-5%, 3%) scale(1.06); }
        66%      { transform: translate(4%, -5%) scale(1.02); }
      }
      @keyframes mesh-drift-3 {
        0%,100% { transform: translate(0%, 0%) scale(1.05); }
        50%      { transform: translate(3%, 5%) scale(0.97); }
      }
      @keyframes mesh-drift-4 {
        0%,100% { transform: translate(0%, 0%) scale(1); }
        40%      { transform: translate(-4%, -3%) scale(1.04); }
        80%      { transform: translate(2%, 4%) scale(0.98); }
      }
      .mesh-blob { position: absolute; border-radius: 50%; filter: blur(80px); will-change: transform; }
      .mesh-blob-1 { animation: mesh-drift-1 18s ease-in-out infinite; }
      .mesh-blob-2 { animation: mesh-drift-2 22s ease-in-out infinite; }
      .mesh-blob-3 { animation: mesh-drift-3 26s ease-in-out infinite; }
      .mesh-blob-4 { animation: mesh-drift-4 20s ease-in-out infinite; }
    `
    document.head.appendChild(style)
  }, [])

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden>
      {/* Blue — top left */}
      <div
        className="mesh-blob mesh-blob-1"
        style={{
          width: '55%', height: '55%',
          top: '-10%', left: '-10%',
          background: 'radial-gradient(ellipse, rgba(0,122,255,0.10) 0%, transparent 70%)',
        }}
      />
      {/* Purple — top right */}
      <div
        className="mesh-blob mesh-blob-2"
        style={{
          width: '45%', height: '50%',
          top: '-5%', right: '-8%',
          background: 'radial-gradient(ellipse, rgba(88,86,214,0.08) 0%, transparent 70%)',
        }}
      />
      {/* Mint — bottom left */}
      <div
        className="mesh-blob mesh-blob-3"
        style={{
          width: '40%', height: '45%',
          bottom: '-8%', left: '5%',
          background: 'radial-gradient(ellipse, rgba(52,199,89,0.06) 0%, transparent 70%)',
        }}
      />
      {/* Warm — bottom right */}
      <div
        className="mesh-blob mesh-blob-4"
        style={{
          width: '40%', height: '40%',
          bottom: '-5%', right: '0%',
          background: 'radial-gradient(ellipse, rgba(255,159,10,0.06) 0%, transparent 70%)',
        }}
      />
    </div>
  )
}
