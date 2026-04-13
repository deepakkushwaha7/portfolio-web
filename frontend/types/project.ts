export type ProjectCategory = 'AI_PRODUCT' | 'SAAS' | 'STARTUP' | 'CONSULTING'

export interface ProjectMetric {
  label: string
  value: string
}

export interface ProjectLinks {
  live?: string
  github?: string
  case_study?: string
}

export interface ProjectListItem {
  id: number
  title: string
  slug: string
  tagline: string
  cover_image: string
  tech_tags: string[]
  category: ProjectCategory
  is_featured: boolean
  order: number
  date_range: string
  company: string
  role: string
}

export interface ProjectDetail extends ProjectListItem {
  description: string
  gallery: string[]
  links: ProjectLinks
  metrics: ProjectMetric[]
  updated_at: string
}
