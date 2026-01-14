// Types for the blog application

export type PostStatus = 'draft' | 'published' | 'scheduled';

export type AppRole = 'admin' | 'editor' | 'user';

export interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserRole {
  id: string;
  user_id: string;
  role: AppRole;
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  color: string | null;
  icon: string | null;
  created_at: string;
  updated_at: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  featured_image: string | null;
  category_id: string | null;
  author_id: string | null;
  status: PostStatus;
  reading_time: number;
  views_count: number;
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  // Joined data
  category?: Category;
  author?: Profile;
  tags?: Tag[];
}

// Type for posts with all relations populated
export interface PostWithRelations extends Post {
  category: Category | null;
  author: Profile | null;
  tags: Tag[];
}

export interface PostTag {
  post_id: string;
  tag_id: string;
}

export interface Advertisement {
  id: string;
  name: string;
  type: 'adsense' | 'banner';
  position: 'header' | 'sidebar' | 'article-top' | 'article-middle' | 'article-bottom';
  adsense_code: string | null;
  banner_image: string | null;
  banner_link: string | null;
  is_active: boolean;
  priority: number;
  clicks_count: number;
  impressions_count: number;
  start_date: string | null;
  end_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  name: string | null;
  is_active: boolean;
  source: string;
  subscribed_at: string;
  unsubscribed_at: string | null;
  created_at: string;
}

// Helper function to generate slug from text
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9\s-]/g, '') // Remove special chars
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
}

// Calculate reading time from content
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const textOnly = content.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  const wordCount = textOnly.split(' ').filter(word => word.length > 0).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}
