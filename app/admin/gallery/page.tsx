import { db } from '@/db';
import { galleryImages } from '@/db/schema';
import { GalleryClient } from './GalleryClient';
import { asc } from 'drizzle-orm';

export default async function GalleryPage() {
  let imagesList: any[] = [];
  try {
    imagesList = await db.select().from(galleryImages).orderBy(asc(galleryImages.sortOrder));
  } catch (error) {
    console.error('Failed to fetch gallery images:', error);
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-white mb-2">Gallery Manager</h1>
        <p className="text-gray-400">Manage images displayed in the public gallery section.</p>
      </div>

      <GalleryClient initialImages={imagesList as any} />
    </div>
  );
}
