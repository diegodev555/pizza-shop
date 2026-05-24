import { useState, useEffect } from 'react';
import { adminApi } from '../api/admin';
import type { ApiTestimonial } from '../types';
import { ConfirmDialog } from '../components/admin/ConfirmDialog';

export function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState<ApiTestimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({ name: '', role: '', review: '', rating: 5, avatarUrl: '', isFeatured: true });
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{ id: number; name: string } | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function load() {
    try { setTestimonials(await adminApi.getTestimonials()); } catch (err) { console.error(err); } finally { setLoading(false); }
  }
  useEffect(() => { load(); }, []);

  function reset() { setForm({ name: '', role: '', review: '', rating: 5, avatarUrl: '', isFeatured: true }); setEditingId(null); }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const data = { ...form, role: form.role || null, avatarUrl: form.avatarUrl || null, rating: Number(form.rating) };
      if (editingId) {
        await adminApi.updateTestimonial(editingId, data);
        setMessage({ type: 'success', text: 'Testimonial updated!' });
      } else {
        await adminApi.createTestimonial(data);
        setMessage({ type: 'success', text: 'Testimonial created!' });
      }
      reset(); load();
    } catch (err) {
      setMessage({ type: 'error', text: err instanceof Error ? err.message : 'Failed to save' });
    }
  }

  function handleEdit(t: ApiTestimonial) {
    setForm({ name: t.name, role: t.role || '', review: t.review, rating: t.rating, avatarUrl: t.avatarUrl || '', isFeatured: t.isFeatured });
    setEditingId(t.id);
  }

  async function handleDelete(id: number) {
    setDeleting(true);
    try {
      await adminApi.deleteTestimonial(id);
      setMessage({ type: 'success', text: 'Testimonial deleted!' });
      setDeleteTarget(null);
      load();
    } catch (err) {
      setMessage({ type: 'error', text: err instanceof Error ? err.message : 'Failed to delete' });
    } finally { setDeleting(false); }
  }

  if (loading) return <div className="p-6 flex justify-center"><div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Testimonials</h1>
      {message && (
        <div className={`mb-4 p-3 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message.text} <button onClick={() => setMessage(null)} className="float-right font-bold">&times;</button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name *</label>
          <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required className="w-full border rounded-lg px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Role</label>
          <input value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} className="w-full border rounded-lg px-3 py-2" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Review *</label>
          <textarea value={form.review} onChange={e => setForm({ ...form, review: e.target.value })} required className="w-full border rounded-lg px-3 py-2" rows={3} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Rating (1-5)</label>
          <input type="number" min="1" max="5" value={form.rating} onChange={e => setForm({ ...form, rating: Number(e.target.value) })} className="w-full border rounded-lg px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Avatar URL</label>
          <input value={form.avatarUrl} onChange={e => setForm({ ...form, avatarUrl: e.target.value })} className="w-full border rounded-lg px-3 py-2" />
        </div>
        <div className="flex items-center space-x-2">
          <label className="flex items-center space-x-2">
            <input type="checkbox" checked={form.isFeatured} onChange={e => setForm({ ...form, isFeatured: e.target.checked })} />
            <span className="text-sm">Featured</span>
          </label>
        </div>
        <div className="flex items-end space-x-4">
          <button type="submit" className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700">{editingId ? 'Update' : 'Create'}</button>
          {editingId && <button type="button" onClick={reset} className="bg-gray-200 px-6 py-2 rounded-lg">Cancel</button>}
        </div>
      </form>

      {testimonials.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <div className="text-6xl mb-4">⭐</div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">No testimonials yet</h3>
          <p className="text-gray-500 mb-4">Add your first customer testimonial.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Name</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Role</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Rating</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Featured</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {testimonials.map(t => (
                <tr key={t.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium">{t.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{t.role || '-'}</td>
                  <td className="px-4 py-3 text-sm">{'⭐'.repeat(t.rating)}</td>
                  <td className="px-4 py-3 text-sm">{t.isFeatured ? '✅' : '❌'}</td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <button onClick={() => handleEdit(t)} className="text-blue-600 hover:text-blue-800 text-sm font-medium">Edit</button>
                    <button onClick={() => setDeleteTarget({ id: t.id, name: t.name })} className="text-red-600 hover:text-red-800 text-sm font-medium">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmDialog
        isOpen={deleteTarget !== null}
        title="Delete Testimonial"
        message={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        onConfirm={() => deleteTarget && handleDelete(deleteTarget.id)}
        onCancel={() => setDeleteTarget(null)}
        isLoading={deleting}
      />
    </div>
  );
}