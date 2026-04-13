import type { PaginatedPosts, PostDetail, PostListItem, Tag, Category } from '@/types/blog'
import type { ProjectDetail, ProjectListItem, ProjectCategory } from '@/types/project'
import type {
  AvailabilitySlot,
  BookingFormData,
  BookingOrderResponse,
  BookingConfirmData,
  BookingDetail,
} from '@/types/booking'
import type { HireEnquiryFormData, ContactFormData } from '@/types/enquiry'

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000'

// ---------------------------------------------------------------------------
// Core fetch helper
// ---------------------------------------------------------------------------

interface FetchOptions extends RequestInit {
  token?: string
}

async function apiFetch<T>(path: string, options: FetchOptions = {}): Promise<T> {
  const { token, ...rest } = options
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(rest.headers ?? {}),
  }

  const res = await fetch(`${API_BASE}${path}`, { ...rest, headers })

  if (!res.ok) {
    const body = await res.text()
    throw new Error(`API ${res.status} on ${path}: ${body}`)
  }

  // 204 No Content
  if (res.status === 204) return undefined as T
  return res.json() as Promise<T>
}

// ---------------------------------------------------------------------------
// Blog
// ---------------------------------------------------------------------------

export async function getPosts(params?: {
  tag?: string
  category?: string
  search?: string
  page?: number
}): Promise<PaginatedPosts> {
  const qs = new URLSearchParams()
  if (params?.tag) qs.set('tag', params.tag)
  if (params?.category) qs.set('category', params.category)
  if (params?.search) qs.set('search', params.search)
  if (params?.page) qs.set('page', String(params.page))
  return apiFetch<PaginatedPosts>(`/api/blog/posts/?${qs}`)
}

export async function getPost(slug: string): Promise<PostDetail> {
  return apiFetch<PostDetail>(`/api/blog/posts/${slug}/`)
}

export async function getAllPostSlugs(): Promise<string[]> {
  const data = await apiFetch<PaginatedPosts>('/api/blog/posts/?page_size=1000')
  return data.results.map((p) => p.slug)
}

export async function getTags(): Promise<Tag[]> {
  return apiFetch<Tag[]>('/api/blog/tags/')
}

export async function getCategories(): Promise<Category[]> {
  return apiFetch<Category[]>('/api/blog/categories/')
}

// Admin: create/update post
export async function createPost(
  data: Partial<PostDetail>,
  token: string
): Promise<PostDetail> {
  return apiFetch<PostDetail>('/api/blog/posts/', {
    method: 'POST',
    body: JSON.stringify(data),
    token,
  })
}

export async function updatePost(
  id: number,
  data: Partial<PostDetail>,
  token: string
): Promise<PostDetail> {
  return apiFetch<PostDetail>(`/api/blog/posts/${id}/`, {
    method: 'PATCH',
    body: JSON.stringify(data),
    token,
  })
}

// ---------------------------------------------------------------------------
// Portfolio / Projects
// ---------------------------------------------------------------------------

export async function getProjects(params?: {
  category?: ProjectCategory
  featured?: boolean
}): Promise<ProjectListItem[]> {
  const qs = new URLSearchParams()
  if (params?.category) qs.set('category', params.category)
  if (params?.featured) qs.set('is_featured', 'true')
  return apiFetch<ProjectListItem[]>(`/api/portfolio/projects/?${qs}`)
}

export async function getProject(slug: string): Promise<ProjectDetail> {
  return apiFetch<ProjectDetail>(`/api/portfolio/projects/${slug}/`)
}

export async function getAllProjectSlugs(): Promise<string[]> {
  const data = await apiFetch<ProjectListItem[]>('/api/portfolio/projects/')
  return data.map((p) => p.slug)
}

// Admin
export async function createProject(
  data: Partial<ProjectDetail>,
  token: string
): Promise<ProjectDetail> {
  return apiFetch<ProjectDetail>('/api/portfolio/projects/', {
    method: 'POST',
    body: JSON.stringify(data),
    token,
  })
}

export async function updateProject(
  id: number,
  data: Partial<ProjectDetail>,
  token: string
): Promise<ProjectDetail> {
  return apiFetch<ProjectDetail>(`/api/portfolio/projects/${id}/`, {
    method: 'PATCH',
    body: JSON.stringify(data),
    token,
  })
}

// ---------------------------------------------------------------------------
// Bookings
// ---------------------------------------------------------------------------

export async function getAvailability(): Promise<AvailabilitySlot[]> {
  return apiFetch<AvailabilitySlot[]>('/api/bookings/availability/')
}

export async function createBookingOrder(
  data: BookingFormData
): Promise<BookingOrderResponse> {
  return apiFetch<BookingOrderResponse>('/api/bookings/create-order/', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export async function confirmBookingPayment(
  data: BookingConfirmData
): Promise<{ success: boolean; booking: BookingDetail }> {
  return apiFetch<{ success: boolean; booking: BookingDetail }>(
    '/api/bookings/confirm/',
    { method: 'POST', body: JSON.stringify(data) }
  )
}

// Admin
export async function getAdminBookings(token: string): Promise<BookingDetail[]> {
  return apiFetch<BookingDetail[]>('/api/bookings/list/', { token })
}

export async function getAdminAvailability(token: string): Promise<AvailabilitySlot[]> {
  return apiFetch<AvailabilitySlot[]>('/api/bookings/availability/', { token })
}

export async function updateAvailability(
  data: Partial<AvailabilitySlot> & { date: string },
  token: string
): Promise<AvailabilitySlot> {
  return apiFetch<AvailabilitySlot>('/api/admin/availability/', {
    method: 'PATCH',
    body: JSON.stringify(data),
    token,
  })
}

// ---------------------------------------------------------------------------
// Enquiries
// ---------------------------------------------------------------------------

export async function submitHireEnquiry(data: HireEnquiryFormData): Promise<void> {
  return apiFetch<void>('/api/enquiries/hire/', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export async function submitContactMessage(data: ContactFormData): Promise<void> {
  return apiFetch<void>('/api/enquiries/contact/', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

// ---------------------------------------------------------------------------
// Auth
// ---------------------------------------------------------------------------

export async function loginAdmin(
  email: string,
  password: string
): Promise<{ access: string; refresh: string }> {
  return apiFetch<{ access: string; refresh: string }>('/api/auth/token/', {
    method: 'POST',
    body: JSON.stringify({ username: email, password }),
  })
}

export async function refreshToken(
  refresh: string
): Promise<{ access: string }> {
  return apiFetch<{ access: string }>('/api/auth/token/refresh/', {
    method: 'POST',
    body: JSON.stringify({ refresh }),
  })
}

// ---------------------------------------------------------------------------
// Admin dashboard stats
// ---------------------------------------------------------------------------

export interface DashboardStats {
  total_posts: number
  published_posts: number
  total_projects: number
  bookings_this_month: number
  paid_bookings_this_month: number
  revenue_this_month: number
  new_enquiries: number
  total_enquiries: number
}

export async function getDashboardStats(token: string): Promise<DashboardStats> {
  return apiFetch<DashboardStats>('/api/admin/stats/', { token })
}
