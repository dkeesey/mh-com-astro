'use client'

import { useEffect, useState } from 'react'
import { ScrollArea } from "@components/ui/scroll-area"
import { cn } from "@lib/utils"

interface TableOfContentsProps {
  sections: {
    id: string
    title: string
    description?: string
  }[]
}

const TableOfContents = ({ sections }: TableOfContentsProps) => {
  const [activeSection, setActiveSection] = useState<string>('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-10% 0% -80% 0%',
        threshold: [0, 0.2, 0.4, 0.6, 0.8, 1]
      }
    )

    sections.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [sections])

  return (
    <div className="hidden lg:block sticky top-24 ml-8 w-64">
      <div className="space-y-4">
        <p className="font-medium">On this page</p>
        <ScrollArea className="h-[calc(100vh-200px)] pr-4">
          <div className="space-y-2">
            {sections.map(({ id, title, description }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector(`#${id}`)?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                  })
                  history.pushState(null, '', `#${id}`)
                }}
                className={cn(
                  'block py-2 text-sm transition-all duration-300 ease-in-out relative pl-4',
                  'text-blue-300 hover:text-amber-300 hover:bg-gray-800/30 visited:text-blue-300',
                  activeSection === id
                    ? [
                        'font-medium text-amber-300',
                        'bg-gray-800/20',
                        'before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-amber-400',
                        'before:transition-all before:duration-300'
                      ].join(' ')
                    : ''
                )}
              >
                {title}
                {description && (
                  <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
                    {description}
                  </p>
                )}
              </a>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}

export default TableOfContents;
