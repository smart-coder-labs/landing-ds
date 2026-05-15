import React, { useEffect, useRef } from 'react'
import { Check, Copy } from 'lucide-react'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'

export interface CodeBlockProps {
  code: string
  language?: string
  showLineNumbers?: boolean
  className?: string
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'typescript',
  showLineNumbers = false,
  className = '',
}) => {
  const [copied, setCopied] = React.useState(false)
  const codeRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (codeRef.current) {
      hljs.highlightElement(codeRef.current)
    }
  }, [code, language])

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const lines = code.split('\n')

  return (
    <div
      className={`relative group rounded-xl overflow-hidden bg-[#1e1e1e] border border-border-primary w-full ${className}`}
      style={{ backgroundColor: '#1e1e1e' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#252526] border-b border-[#3e3e42]">
        <span className="text-xs font-medium text-[#858585] uppercase tracking-wider">
          {language}
        </span>
        <button
          onClick={handleCopy}
          className="p-1.5 rounded-lg hover:bg-[#3e3e42] text-[#858585] hover:text-[#cccccc] transition-colors focus:outline-none focus:ring-2 focus:ring-[#007acc]/20"
          aria-label="Copy code"
        >
          {copied ? (
            <Check className="w-4 h-4 text-[#4ec9b0]" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Code Container */}
      <div className="w-full">
        <pre className="font-mono text-sm leading-relaxed m-0 p-4 overflow-x-auto" style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
          <code
            ref={codeRef}
            className={`language-${language}`}
            style={{
              display: 'block',
              color: '#d4d4d4',
            }}
          >
            {showLineNumbers
              ? lines.map((line, i) => (
                  <div key={i} style={{ display: 'table-row' }}>
                    <span
                      style={{
                        display: 'table-cell',
                        textAlign: 'right',
                        paddingRight: '1rem',
                        color: '#858585',
                        userSelect: 'none',
                        width: '2.5rem',
                        fontVariantNumeric: 'tabular-nums',
                      }}
                    >
                      {i + 1}
                    </span>
                    <span
                      style={{
                        display: 'table-cell',
                        whiteSpace: 'pre',
                      }}
                    >
                      {line || ' '}
                    </span>
                  </div>
                ))
              : code}
          </code>
        </pre>
      </div>

      {/* Custom Highlight.js Theme Override */}
      <style>{`
        .hljs {
          background: #1e1e1e !important;
          color: #d4d4d4 !important;
        }
        .hljs-string { color: #ce9178; }
        .hljs-number { color: #b5cea8; }
        .hljs-literal { color: #569cd6; }
        .hljs-attr { color: #9cdcfe; }
        .hljs-variable { color: #9cdcfe; }
        .hljs-function { color: #dcdcaa; }
        .hljs-class { color: #4ec9b0; }
        .hljs-title { color: #dcdcaa; }
        .hljs-keyword { color: #569cd6; }
        .hljs-params { color: #d4d4d4; }
        .hljs-meta { color: #858585; }
        .hljs-comment { color: #6a9955; }
        .hljs-symbol { color: #ce9178; }
        .hljs-type { color: #4ec9b0; }
        .hljs-selector-attr { color: #ce9178; }
        .hljs-selector-class { color: #dcdcaa; }
      `}</style>
    </div>
  )
}

CodeBlock.displayName = 'CodeBlock'
