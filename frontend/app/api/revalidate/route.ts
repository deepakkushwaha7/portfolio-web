import { revalidatePath, revalidateTag } from 'next/cache'
import type { NextRequest } from 'next/server'

// Called by Django webhook when a post/project is published
// POST /api/revalidate?secret=xxx&type=blog&slug=my-post-slug

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')

  if (secret !== process.env.REVALIDATION_SECRET) {
    return Response.json({ error: 'Invalid secret' }, { status: 401 })
  }

  const type = request.nextUrl.searchParams.get('type') // 'blog' | 'project'
  const slug = request.nextUrl.searchParams.get('slug')

  try {
    if (type === 'blog') {
      revalidatePath('/blog')
      if (slug) revalidatePath(`/blog/${slug}`)
      revalidateTag('blog-posts', 'max')
    } else if (type === 'project') {
      revalidatePath('/work')
      if (slug) revalidatePath(`/work/${slug}`)
      revalidateTag('projects', 'max')
    } else {
      // Revalidate everything
      revalidatePath('/', 'layout')
    }

    return Response.json({ revalidated: true, type, slug })
  } catch (err) {
    return Response.json({ error: String(err) }, { status: 500 })
  }
}
