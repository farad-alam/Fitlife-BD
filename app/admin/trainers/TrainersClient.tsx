'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { addTrainer, updateTrainer, deleteTrainer } from './actions';

type Trainer = {
  id: string;
  name: string;
  specialization: string | null;
  experience: string | null;
  imageUrl: string | null;
  isVisible: boolean | null;
};

export function TrainersClient({ initialTrainers }: { initialTrainers: Trainer[] }) {
  const [trainers, setTrainers] = useState<Trainer[]>(initialTrainers);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [newTrainer, setNewTrainer] = useState({
    name: '',
    specialization: '',
    experience: '',
    imageUrl: '',
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const editFileInputRef = useRef<HTMLInputElement>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, isNew: boolean, trainerId?: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (isNew) setUploading(true);
    else setSavingId(trainerId || 'upload');

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
          setNewTrainer({ ...newTrainer, imageUrl: data.url });
        } else if (trainerId) {
          handleChange(trainerId, 'imageUrl', data.url);
        }
      } else {
        alert('Upload failed');
      }
    } catch (error) {
      console.error(error);
      alert('Upload failed');
    } finally {
      setUploading(false);
      setSavingId(null);
    }
  };

  const handleChange = (id: string, field: keyof Trainer, value: any) => {
    setTrainers(trainers.map(t => t.id === id ? { ...t, [field]: value } : t));
  };

  const handleSave = async (trainer: Trainer) => {
    setSavingId(trainer.id);
    await updateTrainer(trainer.id, {
      name: trainer.name,
      specialization: trainer.specialization || '',
      experience: trainer.experience || '',
      imageUrl: trainer.imageUrl || '',
      isVisible: trainer.isVisible ?? true,
    });
    setSavingId(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this trainer?')) {
      setSavingId(id);
      await deleteTrainer(id);
      setTrainers(trainers.filter(t => t.id !== id));
      setSavingId(null);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTrainer.name || !newTrainer.imageUrl) {
      alert('Name and Image are required');
      return;
    }
    setIsAdding(true);
    await addTrainer(newTrainer);
    window.location.reload();
  };

  return (
    <div className="space-y-8">
      {/* Add New Trainer Form */}
      <form onSubmit={handleAdd} className="bg-[#1A1A1A] p-6 rounded-xl border border-white/5 space-y-4">
        <h3 className="text-lg font-bold text-white mb-2">Add New Trainer</h3>
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-48 flex-shrink-0">
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Photo</label>
            <div 
              className="w-full aspect-[3/4] bg-[#111] border-2 border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-[#1AFF6B]/50 transition-colors relative overflow-hidden"
              onClick={() => fileInputRef.current?.click()}
            >
              {newTrainer.imageUrl ? (
                <Image src={newTrainer.imageUrl} alt="Preview" fill className="object-cover" />
              ) : (
                <span className="text-gray-500 text-sm">
                  {uploading ? 'Uploading...' : 'Click to Upload'}
                </span>
              )}
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*"
              onChange={(e) => handleFileUpload(e, true)}
            />
          </div>

          <div className="flex-1 space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Name</label>
              <input
                type="text"
                value={newTrainer.name}
                onChange={(e) => setNewTrainer({ ...newTrainer, name: e.target.value })}
                className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#1AFF6B]/50"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Specialization</label>
              <input
                type="text"
                value={newTrainer.specialization}
                onChange={(e) => setNewTrainer({ ...newTrainer, specialization: e.target.value })}
                className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#1AFF6B]/50"
                placeholder="e.g., Strength & Conditioning"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Experience</label>
              <input
                type="text"
                value={newTrainer.experience}
                onChange={(e) => setNewTrainer({ ...newTrainer, experience: e.target.value })}
                className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#1AFF6B]/50"
                placeholder="e.g., 5 Years"
              />
            </div>
          </div>
        </div>
        
        <button
          type="submit"
          disabled={isAdding || uploading}
          className="px-6 py-2.5 bg-[#1AFF6B] hover:bg-[#15e65d] text-black font-bold rounded-lg transition-colors disabled:opacity-50"
        >
          {isAdding ? 'Adding...' : 'Add Trainer'}
        </button>
      </form>

      {/* Existing Trainers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trainers.map((trainer) => (
          <div key={trainer.id} className="bg-[#1A1A1A] p-6 rounded-xl border border-white/5 flex flex-col gap-4 relative">
            <div className="flex items-center justify-between mb-2">
              <label className="flex items-center gap-2 text-xs text-gray-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={trainer.isVisible ?? true}
                  onChange={(e) => handleChange(trainer.id, 'isVisible', e.target.checked)}
                  className="accent-[#1AFF6B]"
                />
                Visible
              </label>
              <button
                onClick={() => handleDelete(trainer.id)}
                className="text-xs text-red-400 hover:text-red-300 transition-colors"
                disabled={savingId === trainer.id}
              >
                Delete
              </button>
            </div>

            <div className="relative w-full aspect-[3/4] bg-[#111] rounded-xl overflow-hidden group">
              {trainer.imageUrl && (
                <Image src={trainer.imageUrl} alt={trainer.name} fill className="object-cover" />
              )}
              <div 
                className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer backdrop-blur-sm"
                onClick={() => {
                  setEditingId(trainer.id);
                  editFileInputRef.current?.click();
                }}
              >
                <span className="text-white text-sm font-bold">Change Image</span>
              </div>
            </div>
            
            <input 
              type="file" 
              ref={editFileInputRef} 
              className="hidden" 
              accept="image/*"
              onChange={(e) => {
                if (editingId === trainer.id) handleFileUpload(e, false, trainer.id);
              }}
            />

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Name</label>
              <input
                type="text"
                value={trainer.name}
                onChange={(e) => handleChange(trainer.id, 'name', e.target.value)}
                className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#1AFF6B]/50"
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Specialization</label>
              <input
                type="text"
                value={trainer.specialization || ''}
                onChange={(e) => handleChange(trainer.id, 'specialization', e.target.value)}
                className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#1AFF6B]/50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Experience</label>
              <input
                type="text"
                value={trainer.experience || ''}
                onChange={(e) => handleChange(trainer.id, 'experience', e.target.value)}
                className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#1AFF6B]/50"
              />
            </div>

            <button
              onClick={() => handleSave(trainer)}
              disabled={savingId === trainer.id}
              className="w-full py-2.5 mt-2 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors disabled:opacity-50"
            >
              {savingId === trainer.id ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
