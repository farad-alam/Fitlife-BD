'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { addTransformation, updateTransformation, deleteTransformation } from './actions';

type Transformation = {
  id: string;
  name: string;
  goal: string | null;
  quote: string | null;
  imageBefore: string | null;
  imageAfter: string | null;
  isVisible: boolean | null;
};

export function TransformationsClient({ initialData }: { initialData: Transformation[] }) {
  const [items, setItems] = useState<Transformation[]>(initialData);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [uploadingState, setUploadingState] = useState<{ id: string | null, type: 'before' | 'after' } | null>(null);

  const [newItem, setNewItem] = useState({
    name: '',
    goal: '',
    quote: '',
    imageBefore: '',
    imageAfter: '',
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, isNew: boolean, type: 'before' | 'after', itemId?: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingState({ id: isNew ? 'new' : (itemId || null), type });

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();

      if (data.url) {
        if (isNew) {
          setNewItem(prev => ({ ...prev, [type === 'before' ? 'imageBefore' : 'imageAfter']: data.url }));
        } else if (itemId) {
          handleChange(itemId, type === 'before' ? 'imageBefore' : 'imageAfter', data.url);
        }
      } else {
        alert('Upload failed');
      }
    } catch (error) {
      console.error(error);
      alert('Upload failed');
    } finally {
      setUploadingState(null);
    }
    
    // Reset file input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleChange = (id: string, field: keyof Transformation, value: any) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const handleSave = async (item: Transformation) => {
    setSavingId(item.id);
    await updateTransformation(item.id, {
      name: item.name,
      goal: item.goal || '',
      quote: item.quote || '',
      imageBefore: item.imageBefore || '',
      imageAfter: item.imageAfter || '',
      isVisible: item.isVisible ?? true,
    });
    setSavingId(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this transformation?')) {
      setSavingId(id);
      await deleteTransformation(id);
      setItems(items.filter(item => item.id !== id));
      setSavingId(null);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.name || !newItem.imageBefore || !newItem.imageAfter) {
      alert('Name and both Before & After Images are required');
      return;
    }
    setIsAdding(true);
    await addTransformation(newItem);
    window.location.reload();
  };

  return (
    <div className="space-y-8">
      {/* Hidden file input for all uploads */}
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*"
        onChange={(e) => {
          if (uploadingState) {
            const isNew = uploadingState.id === 'new';
            const itemId = isNew ? undefined : uploadingState.id as string;
            handleFileUpload(e, isNew, uploadingState.type, itemId);
          }
        }}
      />

      {/* Add New Transformation Form */}
      <form onSubmit={handleAdd} className="bg-[#1A1A1A] p-6 rounded-xl border border-white/5 space-y-4">
        <h3 className="text-lg font-bold text-white mb-4">Add New Transformation</h3>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Images Section */}
          <div className="flex gap-4 w-full md:w-[400px] flex-shrink-0">
            <div className="flex-1">
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Before Image</label>
              <div 
                className="w-full aspect-[4/5] bg-[#111] border-2 border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-[#1AFF6B]/50 transition-colors relative overflow-hidden"
                onClick={() => {
                  setUploadingState({ id: 'new', type: 'before' });
                  fileInputRef.current?.click();
                }}
              >
                {newItem.imageBefore ? (
                  <Image src={newItem.imageBefore} alt="Before" fill className="object-cover" />
                ) : (
                  <span className="text-gray-500 text-sm">
                    {uploadingState?.id === 'new' && uploadingState?.type === 'before' ? 'Uploading...' : 'Upload'}
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex-1">
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2">After Image</label>
              <div 
                className="w-full aspect-[4/5] bg-[#111] border-2 border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-[#1AFF6B]/50 transition-colors relative overflow-hidden"
                onClick={() => {
                  setUploadingState({ id: 'new', type: 'after' });
                  fileInputRef.current?.click();
                }}
              >
                {newItem.imageAfter ? (
                  <Image src={newItem.imageAfter} alt="After" fill className="object-cover" />
                ) : (
                  <span className="text-gray-500 text-sm">
                    {uploadingState?.id === 'new' && uploadingState?.type === 'after' ? 'Uploading...' : 'Upload'}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Name</label>
              <input
                type="text"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#1AFF6B]/50"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Goal / Achievement</label>
              <input
                type="text"
                value={newItem.goal}
                onChange={(e) => setNewItem({ ...newItem, goal: e.target.value })}
                className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#1AFF6B]/50"
                placeholder="e.g., Lost 15kg in 3 months"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Quote</label>
              <textarea
                value={newItem.quote}
                onChange={(e) => setNewItem({ ...newItem, quote: e.target.value })}
                className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#1AFF6B]/50 h-24 resize-none"
                placeholder="Member's testimonial..."
              />
            </div>
          </div>
        </div>
        
        <button
          type="submit"
          disabled={isAdding || !!uploadingState}
          className="px-6 py-2.5 bg-[#1AFF6B] hover:bg-[#15e65d] text-black font-bold rounded-lg transition-colors disabled:opacity-50 mt-4"
        >
          {isAdding ? 'Adding...' : 'Add Transformation'}
        </button>
      </form>

      {/* Existing Transformations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {items.map((item) => (
          <div key={item.id} className="bg-[#1A1A1A] p-6 rounded-xl border border-white/5 flex flex-col gap-4 relative">
            <div className="flex items-center justify-between mb-2">
              <label className="flex items-center gap-2 text-xs text-gray-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={item.isVisible ?? true}
                  onChange={(e) => handleChange(item.id, 'isVisible', e.target.checked)}
                  className="accent-[#1AFF6B]"
                />
                Visible
              </label>
              <button
                onClick={() => handleDelete(item.id)}
                className="text-xs text-red-400 hover:text-red-300 transition-colors"
                disabled={savingId === item.id}
              >
                Delete
              </button>
            </div>

            <div className="flex gap-4">
              {/* Before Image */}
              <div className="flex-1">
                <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Before</label>
                <div 
                  className="relative w-full aspect-[4/5] bg-[#111] rounded-lg overflow-hidden group cursor-pointer"
                  onClick={() => {
                    setUploadingState({ id: item.id, type: 'before' });
                    fileInputRef.current?.click();
                  }}
                >
                  {item.imageBefore && (
                    <Image src={item.imageBefore} alt="Before" fill className="object-cover" />
                  )}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity backdrop-blur-sm">
                    <span className="text-white text-xs font-bold">
                      {uploadingState?.id === item.id && uploadingState?.type === 'before' ? 'Uploading...' : 'Change'}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* After Image */}
              <div className="flex-1">
                <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">After</label>
                <div 
                  className="relative w-full aspect-[4/5] bg-[#111] rounded-lg overflow-hidden group cursor-pointer"
                  onClick={() => {
                    setUploadingState({ id: item.id, type: 'after' });
                    fileInputRef.current?.click();
                  }}
                >
                  {item.imageAfter && (
                    <Image src={item.imageAfter} alt="After" fill className="object-cover" />
                  )}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity backdrop-blur-sm">
                    <span className="text-white text-xs font-bold">
                      {uploadingState?.id === item.id && uploadingState?.type === 'after' ? 'Uploading...' : 'Change'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3 mt-2">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Name</label>
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => handleChange(item.id, 'name', e.target.value)}
                  className="w-full bg-[#111] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#1AFF6B]/50"
                />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Goal / Achievement</label>
                <input
                  type="text"
                  value={item.goal || ''}
                  onChange={(e) => handleChange(item.id, 'goal', e.target.value)}
                  className="w-full bg-[#111] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#1AFF6B]/50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Quote</label>
                <textarea
                  value={item.quote || ''}
                  onChange={(e) => handleChange(item.id, 'quote', e.target.value)}
                  className="w-full bg-[#111] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#1AFF6B]/50 h-20 resize-none"
                />
              </div>
            </div>

            <button
              onClick={() => handleSave(item)}
              disabled={savingId === item.id}
              className="w-full py-2.5 mt-2 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors disabled:opacity-50"
            >
              {savingId === item.id ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
