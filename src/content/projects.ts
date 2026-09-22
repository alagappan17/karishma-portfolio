import type { ProjectImage, ProjectRecord, ProjectTheme } from '../types/portfolio'

type EditableProject = {
  order?: number
  slug: string
  title: string
  shortTitle?: string
  category?: string
  industry?: string
  role?: string | null
  duration?: string | null
  platform?: string
  tools?: string[]
  summary?: string
  tags?: string[]
  theme?: ProjectTheme
  featured?: boolean
  homeOrder?: number
  cover?: string
  coverAlt?: string
  coverCaption?: string
  caseImages?: ProjectImage[]
}

type CaseStudy = {
  project: ProjectRecord
  markdown: string
  order: number
}

const files = import.meta.glob('./projects/*.md', { eager: true, query: '?raw', import: 'default' }) as Record<string, string>

function parseCaseStudy(path: string, source: string): CaseStudy {
  const match = source.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/)
  if (!match) throw new Error(`Case study ${path} needs JSON frontmatter between --- markers.`)

  let data: EditableProject
  try {
    data = JSON.parse(match[1]) as EditableProject
  } catch (error) {
    throw new Error(`Case study ${path} has invalid JSON frontmatter: ${error instanceof Error ? error.message : 'unknown error'}`, { cause: error })
  }

  if (!data.slug || !data.title) throw new Error(`Case study ${path} must include a slug and title.`)

  const cover: ProjectImage = {
    src: data.cover || `placeholder:${data.slug}`,
    alt: data.coverAlt || `${data.shortTitle || data.title} project cover`,
    caption: data.coverCaption || undefined,
  }

  return {
    order: Number.isFinite(data.order) ? data.order as number : Number.MAX_SAFE_INTEGER,
    project: {
      slug: data.slug,
      title: data.title,
      shortTitle: data.shortTitle || data.title,
      category: data.category || '',
      industry: data.industry || '',
      role: data.role || null,
      duration: data.duration || null,
      platform: data.platform || '',
      tools: data.tools || [],
      summary: data.summary || '',
      tags: data.tags || [],
      theme: data.theme || 'paper',
      featured: Boolean(data.featured),
      homeOrder: Number.isFinite(data.homeOrder) ? data.homeOrder : undefined,
      image: cover,
      caseImages: (data.caseImages || []).filter((image) => image?.src && image?.alt),
    },
    markdown: match[2].trim(),
  }
}

const caseStudies = Object.entries(files)
  .map(([path, source]) => parseCaseStudy(path, source))
  .sort((left, right) => left.order - right.order)

export const projects = caseStudies.map(({ project }) => project)
export const caseStudyContentBySlug = Object.fromEntries(caseStudies.map(({ project, markdown }) => [project.slug, markdown]))
