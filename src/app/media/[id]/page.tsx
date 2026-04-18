import type { Metadata } from 'next';
import PostDetailClient from './PostDetailClient';
import type { Post } from '@/lib/types';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3001/api/v1';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://uchennaokonkwo.com';

async function fetchPost(id: string): Promise<Post | null> {
  try {
    const res = await fetch(`${API_BASE}/posts/${id}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

function excerpt(text: string, max = 160): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  return clean.length <= max ? clean : clean.slice(0, max).replace(/\s\S*$/, '') + '…';
}

export async function generateMetadata(
  { params }: { params: { id: string } }
): Promise<Metadata> {
  const post = await fetchPost(params.id);

  if (!post) {
    return { title: 'Article Not Found | Hon. Uchenna Harris Okonkwo' };
  }

  const title       = post.title;
  const description = post.subcontent ?? excerpt(post.content);
  const image       = post.Media?.[0]?.url ?? null;
  const url         = `${SITE_URL}/media/${post.id}`;

  return {
    title: `${title} | Hon. Uchenna Harris Okonkwo`,
    description,
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      publishedTime: post.createdAt,
      siteName: 'Hon. Uchenna Harris Okonkwo',
      ...(image && {
        images: [{ url: image, width: 1200, height: 630, alt: title }],
      }),
    },
    twitter: {
      card: image ? 'summary_large_image' : 'summary',
      title,
      description,
      ...(image && { images: [image] }),
    },
  };
}

export default async function MediaDetailPage({ params }: { params: { id: string } }) {
  const post = await fetchPost(params.id);
  return <PostDetailClient id={params.id} initialPost={post} />;
}
