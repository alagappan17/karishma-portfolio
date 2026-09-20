export type ProjectTheme = 'blue' | 'butter' | 'ink' | 'lilac' | 'paper'

export interface ProjectImage {
  alt: string
  src: string
  caption?: string
}

export interface ProjectRecord {
  slug: string
  title: string
  shortTitle: string
  category: string
  industry: string
  role: string | null
  duration: string | null
  platform: string
  tools: string[]
  summary: string
  tags: string[]
  theme: ProjectTheme
  featured: boolean
  image: ProjectImage
  caseImages?: ProjectImage[]
}

export interface CaseStudyDocument {
  overview: string
  markdown: string
}
