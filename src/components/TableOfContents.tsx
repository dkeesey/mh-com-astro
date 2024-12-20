'use client'

import { useEffect, useState } from 'react'
import { ScrollArea } from "@components/ui/scroll-area"
import { cn } from "@lib/utils"

// Styling constants for Table of Contents
const tocStyles = {
  container: 'hidden lg:block sticky top-24 ml-8 w-64',
  wrapper: 'space-y-4',
  headerTitle: 'font-medium text-gray-200',
  scrollArea: 'h-[calc(100vh-200px)] pr-4',
  list: 'space-y-2',
  link: {
    base: [
      // Layout
      'block py-2 text-sm pl-4',
      'relative',
      // Colors & Transitions
      'text-gray-400 hover:text-gray-200',
      'transition-all duration-300 ease-in-out',
      // Vertical Bar
      'before:content-[""]',
      'before:absolute before:left-0 before:top-1/2',
      'before:h-[80%] before:w-0.5',
      'before:bg-amber-400',
      'before:-translate-y-1/2',
      'before:transition-all before:duration-300 before:ease-in-out',
      'before:origin-center',
      'before:scale-y-0 before:opacity-0',
      // Hover effect
      'hover:before:scale-y-50 hover:before:opacity-50'
    ].join(' '),
    active: 'text-amber-300 before:!scale-y-100 before:!opacity-100 transform scale-[1.02] origin-left'
  },
  title: {
    base: 'transition-all duration-300 ease-in-out font-normal',
    active: 'font-medium'
  },
  description: {
    base: [
      'text-xs text-gray-500 line-clamp-2 mt-0.5',
      'transition-all duration-300 ease-in-out',
      'group-hover:text-gray-400'
    ].join(' '),
    active: 'text-amber-200/70'
  }
} as const

interface TableOfContentsProps {
  sections: {
    id: string
    title: string
    description?: string
  }[]
}

const TableOfContents = ({ sections }: TableOfContentsProps) => {
  const [activeSection, setActiveSection] = useState<string>('');
  const [debugIntersecting, setDebugIntersecting] = useState<string[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry with the highest intersection ratio
        const visibleEntries = entries.filter(entry => entry.isIntersecting);
        setDebugIntersecting(visibleEntries.map(e => e.target.id));
        
        if (visibleEntries.length > 0) {
          const mostVisible = visibleEntries.reduce((prev, current) => {
            return (current.intersectionRatio > prev.intersectionRatio) ? current : prev;
          });
          setActiveSection(mostVisible.target.id);
        }
      },
      {
        rootMargin: '-20% 0% -35% 0%',
        threshold: [0, 0.25, 0.5, 0.75, 1]
      }
    );

    // Observe all section elements
    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [sections]);

  return (
    <div className={tocStyles.container}>
      <div className={tocStyles.wrapper}>
        <p className={tocStyles.headerTitle}>On this page</p>
        {/* Debug info */}
        <div className="text-xs text-gray-500 mb-2">
          Active: {activeSection}<br/>
          Visible: {debugIntersecting.join(', ')}
        </div>
        <ScrollArea className={tocStyles.scrollArea}>
          <div className={tocStyles.list}>
            {sections.map(({ id, title, description }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(`#${id}`)?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                    inline: 'nearest'
                  });
                  setActiveSection(id);
                  history.pushState(null, '', `#${id}`);
                }}
                className={cn(
                  tocStyles.link.base,
                  activeSection === id && tocStyles.link.active
                )}
              >
                <div className="relative">
                  <span className={cn(
                    tocStyles.title.base,
                    activeSection === id && tocStyles.title.active
                  )}>
                    {title}
                  </span>
                  {description && (
                    <p className={cn(
                      tocStyles.description.base,
                      activeSection === id && tocStyles.description.active
                    )}>
                      {description}
                    </p>
                  )}
                </div>
              </a>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}

export default TableOfContents;
