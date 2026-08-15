'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { addGalleryImage, updateGalleryImage, deleteGalleryImage } from './actions';

type GalleryImage = {
  id: string;
  imageUrl: string;
  caption: string | null;
  category: string | null;
  isVisible: boolean | null;
};

export function GalleryClient({ initialImages }: { initialImages: GalleryImage[] }) {
  const [images, setImages] = useState<GalleryImage[]>(initialImages);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();

      if (data.url) {
        // Automatically save to DB
        await addGalleryImage({
          imageUrl: data.url,
          caption: '',
          category: 'Gym',
        });
        window.location.reload();
      } else {
        alert('Upload failed');
      }
    } catch (error) {
      console.error(error);
      alert('Upload failed');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleChange = (id: string, field: keyof GalleryImage, value: any) => {
    setImages(images.map(img => img.id === id ? { ...img, [field]: value } : img));
  };

  const handleSave = async (img: GalleryImage) => {
    setSavingId(img.id);
    await updateGalleryImage(img.id, {
      caption: img.caption || '',
      category: img.category || '',
      isVisible: img.isVisible ?? true,
    });
    setSavingId(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this image?')) {
      setSavingId(id);
      await deleteGalleryImage(id);
      setImages(images.filter(img => img.id !== id));
      setSavingId(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Upload New Image */}
      <div className="bg-[#1A1A1A] p-6 rounded-xl border border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-white">Upload New Image</h3>
          <p className="text-xs text-gray-400 mt-1">Upload high-quality images to display on the public gallery.</p>
        </div>
        
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/*"
          onChange={handleFileUpload}
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="px-6 py-2.5 bg-[#1AFF6B] hover:bg-[#15e65d] text-black font-bold rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          {uploading ? (
            'Uploading...'
          ) : (
            <>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12h14" />
              </svg>
              Select Image
            </>
          )}
        </button>
      </div>

      {/* Existing Images Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((img) => (
          <div key={img.id} className="bg-[#1A1A1A] rounded-xl border border-white/5 overflow-hidden flex flex-col relative group">
            <div className="relative w-full aspect-square bg-[#111]">
              <Image src={img.imageUrl} alt="Gallery item" fill className="object-cover" />
              <div className="absolute top-2 right-2 flex gap-2">
                <label className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg flex items-center gap-2 text-xs text-white cursor-pointer border border-white/10">
                  <input
                    type="checkbox"
                    checked={img.isVisible ?? true}
                    onChange={(e) => handleChange(img.id, 'isVisible', e.target.checked)}
                    className="accent-[#1AFF6B]"
                  />
                  Visible
                </label>
              </div>
            </div>

            <div className="p-4 flex flex-col gap-3">
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Category</label>
                <select
                  value={img.category || 'Gym'}
                  onChange={(e) => handleChange(img.id, 'category', e.target.value)}
                  className="w-full bg-[#111] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#1AFF6B]/50 appearance-none cursor-pointer"
                >
                  <option value="Gym">Gym / Equipment</option>
                  <option value="Classes">Classes</option>
                  <option value="Members">Members</option>
                  <option value="Trainers">Trainers</option>
                  <option value="Events">Events</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Caption</label>
                <input
                  type="text"
                  value={img.caption || ''}
                  onChange={(e) => handleChange(img.id, 'caption', e.target.value)}
                  placeholder="Optional caption..."
                  className="w-full bg-[#111] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#1AFF6B]/50"
                />
              </div>

              <div className="flex gap-2 mt-1">
                <button
                  onClick={() => handleSave(img)}
                  disabled={savingId === img.id}
                  className="flex-1 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-bold rounded-lg transition-colors disabled:opacity-50"
                >
                  {savingId === img.id ? 'Saving...' : 'Save'}
                </button>
                <button
                  onClick={() => handleDelete(img.id)}
                  disabled={savingId === img.id}
                  className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-sm font-bold rounded-lg transition-colors disabled:opacity-50"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
