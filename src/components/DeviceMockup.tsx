import { motion } from 'framer-motion'

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.6 } },
}
const row = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
}

function MockSidebar() {
  const items = ['Button', 'Card', 'Badge', 'Tabs', 'Switch', 'Divider', 'CodeBlock']
  return (
    <div className="w-28 h-full border-r flex flex-col py-3 gap-0.5 flex-shrink-0"
      style={{ borderColor: 'rgba(0,0,0,0.08)', background: 'rgba(0,0,0,0.015)' }}>
      <p className="px-3 pb-1 text-[7px] font-semibold uppercase tracking-widest"
        style={{ color: 'rgba(0,0,0,0.35)' }}>
        Components
      </p>
      {items.map((item, i) => (
        <motion.div
          key={item}
          variants={row}
          className="mx-1.5 px-2 py-1 rounded text-[8px] font-medium"
          style={{
            background: i === 0 ? 'rgba(0,122,255,0.12)' : 'transparent',
            color: i === 0 ? '#007aff' : 'rgba(0,0,0,0.5)',
          }}
        >
          {item}
        </motion.div>
      ))}
    </div>
  )
}

function MockContent() {
  return (
    <div className="flex-1 p-4 flex flex-col gap-3 overflow-hidden">
      {/* Header */}
      <motion.div variants={row}>
        <p className="text-[10px] font-semibold" style={{ color: '#1d1d1f' }}>Button</p>
        <p className="text-[7px] mt-0.5" style={{ color: 'rgba(0,0,0,0.45)' }}>
          Triggers an action or event.
        </p>
      </motion.div>

      {/* Install badge */}
      <motion.div variants={row}
        className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[7px] font-mono w-fit"
        style={{ background: '#1d1d1f', color: '#fff' }}>
        <span style={{ color: '#0a84ff' }}>$</span>
        npx apple-ds add Button
      </motion.div>

      {/* Preview */}
      <motion.div variants={row}
        className="rounded-lg p-3 flex items-center gap-2"
        style={{ background: '#f5f5f7' }}>
        <div className="px-3 py-1.5 rounded-full text-[8px] font-semibold text-white"
          style={{ background: '#007aff' }}>
          Continue
        </div>
        <div className="px-3 py-1.5 rounded-full text-[8px] font-semibold border"
          style={{ borderColor: 'rgba(0,0,0,0.15)', color: '#1d1d1f' }}>
          Cancel
        </div>
      </motion.div>

      {/* Code block */}
      <motion.div variants={row}
        className="rounded-lg p-2.5 text-[6.5px] font-mono leading-relaxed"
        style={{ background: '#1d1d1f', color: '#98989d' }}>
        <span style={{ color: '#ff7eb6' }}>import </span>
        <span style={{ color: '#ffe082' }}>{'{ Button }'}</span>
        <span style={{ color: '#ff7eb6' }}> from </span>
        <span style={{ color: '#a5d6a7' }}>'@/components/ui/Button'</span>
        {'\n\n'}
        <span style={{ color: '#60d9fa' }}>&lt;Button</span>
        <span style={{ color: '#ffe082' }}> variant</span>
        <span style={{ color: '#fff' }}>=</span>
        <span style={{ color: '#a5d6a7' }}>"primary"</span>
        <span style={{ color: '#60d9fa' }}>&gt;</span>
        <span style={{ color: '#fff' }}>Continue</span>
        <span style={{ color: '#60d9fa' }}>&lt;/Button&gt;</span>
      </motion.div>
    </div>
  )
}

export default function DeviceMockup() {
  return (
    <div className="relative w-full max-w-lg mx-auto select-none">
      {/* Glow behind */}
      <div className="absolute inset-x-8 top-8 bottom-0 rounded-2xl blur-2xl opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, #007aff 0%, #5856d6 100%)' }} />

      {/* MacBook lid + screen */}
      <div className="relative">
        {/* Screen bezel */}
        <div className="rounded-t-xl overflow-hidden"
          style={{
            background: '#1d1d1f',
            padding: '8px 8px 0',
            boxShadow: '0 0 0 1px rgba(255,255,255,0.08)',
          }}>
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-3 rounded-b-xl z-10"
            style={{ background: '#1d1d1f' }} />

          {/* Screen */}
          <div className="rounded-lg overflow-hidden"
            style={{ background: '#ffffff', aspectRatio: '16/10' }}>
            {/* Nav bar */}
            <div className="flex items-center px-3 h-6 border-b gap-3"
              style={{ borderColor: 'rgba(0,0,0,0.08)', background: 'rgba(255,255,255,0.85)' }}>
              <div className="flex gap-1">
                {['#ff5f57', '#febc2e', '#28c840'].map((c) => (
                  <div key={c} className="w-1.5 h-1.5 rounded-full" style={{ background: c }} />
                ))}
              </div>
              <div className="flex-1 flex items-center justify-center">
                <div className="flex gap-4">
                  {['Docs', 'Components', 'GitHub'].map((l) => (
                    <span key={l} className="text-[7px] font-medium" style={{ color: 'rgba(0,0,0,0.45)' }}>{l}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* App UI */}
            <motion.div
              className="flex h-full"
              variants={stagger}
              initial="hidden"
              animate="visible"
            >
              <MockSidebar />
              <MockContent />
            </motion.div>
          </div>
        </div>

        {/* Hinge + base */}
        <div className="h-1.5 mx-0 rounded-b-sm"
          style={{ background: 'linear-gradient(to bottom, #2d2d2f, #1a1a1c)' }} />
        <div className="h-3 mx-[-5%] rounded-b-xl"
          style={{
            background: 'linear-gradient(to bottom, #2a2a2c, #222224)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
          }} />
        {/* Base reflection line */}
        <div className="h-px mx-[5%] mt-0.5 rounded-full"
          style={{ background: 'rgba(255,255,255,0.12)' }} />
      </div>
    </div>
  )
}
