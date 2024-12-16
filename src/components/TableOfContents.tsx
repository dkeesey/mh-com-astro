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
        rootMargin: '-20% 0% -35% 0%',
        threshold: 0
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
                  'block py-1 text-sm transition-colors hover:text-foreground/80',
                  activeSection === id
                    ? 'font-medium text-foreground'
                    : 'text-foreground/60'
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
