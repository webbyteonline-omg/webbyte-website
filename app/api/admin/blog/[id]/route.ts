import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const { title, slug, excerpt, content, coverImage, tags, published } = await req.json()

    const post = await prisma.blogPost.update({
      where: { id },
      data: {
        ...(title       !== undefined && { title }),
        ...(slug        !== undefined && { slug }),
        ...(excerpt     !== undefined && { excerpt }),
        ...(content     !== undefined && { content }),
        ...(coverImage  !== undefined && { coverImage }),
        ...(tags        !== undefined && { tags }),
        ...(published   !== undefined && { published, publishedAt: published ? new Date() : null }),
      },
    })
    return NextResponse.json({ post })
  } catch (err: any) {
    if (err.code === 'P2002') return NextResponse.json({ error: 'Slug already exists' }, { status: 409 })
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    await prisma.blogPost.delete({ where: { id } })
    return NextResponse.json({ ok: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
