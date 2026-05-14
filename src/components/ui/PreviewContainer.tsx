import React, { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { Button } from './Button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from './Tabs'
import Text from './Text'

interface PreviewContainerProps {
  preview: React.ReactNode
  code: string
  language?: 'tsx' | 'jsx' | 'html'
}

export function PreviewContainer({ preview, code, language = 'tsx' }: PreviewContainerProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="border border-border-primary rounded-lg overflow-hidden bg-background-primary">
      <Tabs defaultValue="preview" className="w-full">
        <div className="border-b border-border-primary">
          <div className="flex items-center justify-between px-4">
            <TabsList className="bg-transparent">
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
            {copied && (
              <div className="flex items-center gap-2 text-xs text-text-success">
                <Check size={14} />
                Copied
              </div>
            )}
          </div>
        </div>

        {/* PREVIEW TAB */}
        <TabsContent value="preview" className="p-6 border-t-0">
          <div className="flex items-center justify-center min-h-[200px] bg-surface-secondary rounded-lg p-4">
            {preview}
          </div>
        </TabsContent>

        {/* CODE TAB */}
        <TabsContent value="code" className="p-0 border-t-0">
          <div className="relative">
            <pre className="overflow-x-auto p-4 bg-surface-secondary text-sm font-mono text-text-primary">
              <code>{code}</code>
            </pre>
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2"
              onClick={handleCopy}
            >
              <Copy size={16} />
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
