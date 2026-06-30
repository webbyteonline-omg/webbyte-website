import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const posts = await prisma.blogPost.findMany({ orderBy: { createdAt: 'desc' } })
    return NextResponse.json({ posts })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const { title, slug, excerpt, content, coverImage, tags } = await req.json()
    if (!title || !slug) return NextResponse.json({ error: 'title and slug required' }, { status: 400 })

    const post = await prisma.blogPost.create({
      data: { title, slug, excerpt: excerpt || '', content: content || '', coverImage: coverImage || null, tags: tags || null, published: false },
    })
    return NextResponse.json({ post }, { status: 201 })
  } catch (err: any) {
    if (err.code === 'P2002') return NextResponse.json({ error: 'Slug already exists' }, { status: 409 })
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
