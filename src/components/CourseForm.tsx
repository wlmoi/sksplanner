import React, { useState } from 'react';
import { Course, CourseCategory } from '../types/types';

const categories: CourseCategory[] = [
  'MK wajib ITB',
  'MK Wajib Prodi',
  'MK Pilihan Dalam Prodi',
  'MK Pilihan Luar Prodi',
  'MK Pilihan Bebas'
];

export default function CourseForm({ onAddCourse }: { 
  onAddCourse: (course: Course) => void 
}) {
  const [form, setForm] = useState<Omit<Course, 'semester'>>({
    code: '',
    name: '',
    sks: 2,
    category: 'MK wajib ITB'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddCourse({ ...form });
    setForm({ code: '', name: '', sks: 2, category: 'MK wajib ITB' });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded-lg mb-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Kode MK"
          className="p-2 border rounded"
          value={form.code}
          onChange={e => setForm({ ...form, code: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Nama MK"
          className="p-2 border rounded"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          required
        />
        <label htmlFor="sks-select">SKS</label>
        <select
          id="sks-select"
          className="p-2 border rounded"
          value={form.sks}
          onChange={e => setForm({ ...form, sks: parseInt(e.target.value) })}
        >
          {[2, 3, 4].map(sks => (
            <option key={sks} value={sks}>{sks} SKS</option>
          ))}
        </select>
        <label htmlFor="category-select">Kategori</label>
        <select
          id="category-select"
          className="p-2 border rounded"
          value={form.category}
          onChange={e => setForm({ ...form, category: e.target.value as CourseCategory })}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <button 
        type="submit"
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Tambah Mata Kuliah
      </button>
    </form>
  );
}