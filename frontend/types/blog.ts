export interface Tag {
  id: number
  name: string
  slug: string
}

export interface Category {
  id: number
  name: string
  slug: string
  description: string
}

export interface PostListItem {
  id: number
  title: string
  slug: string
  excerpt: string
  cover_image: string
  tags: Tag[]
  category: Category | null
  published_at: string
  read_time: number
  meta_description: string
}

export interface PostDetail extends PostListItem {
  body: string
  meta_title: string
  og_image: string
  updated_at: string
}

export interface PaginatedPosts {
  count: number
  next: string | null
  previous: string | null
  results: PostListItem[]
}
