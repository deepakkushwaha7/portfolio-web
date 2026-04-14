import type { MetadataRoute } from 'next'
import type { PaginatedPosts, PostListItem } from '@/types/blog'
import {
  getBackendBaseUrl,
  SITE_URL,
  STATIC_PUBLIC_PATHS,
  WORK_CASE_STUDY_SLUGS,
} from '@/lib/site'

export const revalidate = 3600

type SitemapEntry = MetadataRoute.Sitemap[number]

async function fetchJson<T>(path: string): Promise<T> {
  const res = await fetch(`${getBackendBaseUrl()}${path}`, {
    next: { revalidate },
  })

  if (!res.ok) {
    throw new Error(`Failed sitemap fetch for ${path}: ${res.status}`)
  }

  return res.json() as Promise<T>
}

function staticEntries(): SitemapEntry[] {
  const now = new Date()

  return STATIC_PUBLIC_PATHS.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: path === '/blog' ? 'daily' : 'weekly',
    priority: path === '/' ? 1 : path === '/mock-interview' ? 0.95 : 0.9,
  }))
}

function workEntries(): SitemapEntry[] {
  const now = new Date()

  return WORK_CASE_STUDY_SLUGS.map((slug) => ({
    url: `${SITE_URL}/work/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))
}

async function blogEntries(): Promise<SitemapEntry[]> {
  try {
    const posts = await fetchJson<PaginatedPosts>('/api/blog/posts/?page_size=1000')

    return posts.results.map((post: PostListItem) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.published_at,
      changeFrequency: 'monthly',
      priority: 0.7,
    }))
  } catch (error) {
    console.error('Unable to load blog URLs for sitemap:', error)
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogUrls = await blogEntries()

  return [...staticEntries(), ...workEntries(), ...blogUrls]
}
