import { useState, useEffect } from 'react';
import { adminApi } from '../api/admin';
import type { ApiPromotion } from '../types';
import { ConfirmDialog } from '../components/admin/ConfirmDialog';

export function AdminPromotions() {
  const [promotions, setPromotions] = useState<ApiPromotion[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({ title: '', description: '', discountText: '', imageUrl: '', code: '', validUntil: '', isActive: true });
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{ id: number; name: string } | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function load() {
    try { setPromotions(await adminApi.getPromotions()); } catch (err) { console.error(err); } finally { setLoading(false); }
  }
  useEffect(() => { load(); }, []);

  function reset() { setForm({ title: '', description: '', discountText: '', imageUrl: '', code: '', validUntil: '', isActive: true }); setEditingId(null); }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const data = { ...form, imageUrl: form.imageUrl || null, code: form.code || null, validUntil: form.validUntil || null };
      if (editingId) {
        await adminApi.updatePromotion(editingId, data);
        setMessage({ type: 'success', text: 'Promotion updated!' });
      } else {
        await adminApi.createPromotion(data);
        setMessage({ type: 'success', text: 'Promotion created!' });
      }
      reset(); load();
    } catch (err) {
      setMessage({ type: 'error', text: err instanceof Error ? err.message : 'Failed to save' });
    }
  }

  function handleEdit(p: ApiPromotion) {
    setForm({ title: p.title, description: p.description, discountText: p.discountText, imageUrl: p.imageUrl || '', code: p.code || '', validUntil: p.validUntil || '', isActive: p.isActive });
    setEditingId(p.id);
  }

  async function handleDelete(id: number) {
    setDeleting(true);
    try {
      await adminApi.deletePromotion(id);
      setMessage({ type: 'success', text: 'Promotion deleted!' });
      setDeleteTarget(null);
      load();
    } catch (err) {
      setMessage({ type: 'error', text: err instanceof Error ? err.message : 'Failed to delete' });
    } finally { setDeleting(false); }
  }

  if (loading) return <div className="p-6 flex justify-center"><div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Promotions</h1>
      {message && (
        <div className={`mb-4 p-3 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message.text} <button onClick={() => setMessage(null)} className="float-right font-bold">&times;</button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title *</label>
          <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required className="w-full border rounded-lg px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Discount Text *</label>
          <input value={form.discountText} onChange={e => setForm({ ...form, discountText: e.target.value })} required className="w-full border rounded-lg px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Code</label>
          <input value={form.code} onChange={e => setForm({ ...form, code: e.target.value })} className="w-full border rounded-lg px-3 py-2" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Description *</label>
          <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required className="w-full border rounded-lg px-3 py-2" rows={2} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Image URL</label>
          <input value={form.imageUrl} onChange={e => setForm({ ...form, imageUrl: e.target.value })} className="w-full border rounded-lg px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Valid Until</label>
          <input value={form.validUntil} onChange={e => setForm({ ...form, validUntil: e.target.value })} className="w-full border rounded-lg px-3 py-2" placeholder="2026-12-31" />
        </div>
        <div className="flex items-center space-x-2">
          <label className="flex items-center space-x-2">
            <input type="checkbox" checked={form.isActive} onChange={e => setForm({ ...form, isActive: e.target.checked })} />
            <span className="text-sm">Active</span>
          </label>
        </div>
        <div className="flex items-end space-x-4">
          <button type="submit" className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700">{editingId ? 'Update' : 'Create'}</button>
          {editingId && <button type="button" onClick={reset} className="bg-gray-200 px-6 py-2 rounded-lg">Cancel</button>}
        </div>
      </form>

      {promotions.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <div className="text-6xl mb-4">🏷️</div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">No promotions yet</h3>
          <p className="text-gray-500 mb-4">Create your first promotion to offer special deals.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Title</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Discount</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Code</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Active</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {promotions.map(p => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium">{p.title}</td>
                  <td className="px-4 py-3 text-sm">{p.discountText}</td>
                  <td className="px-4 py-3 text-sm">{p.code || '-'}</td>
                  <td className="px-4 py-3 text-sm">{p.isActive ? '✅' : '❌'}</td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <button onClick={() => handleEdit(p)} className="text-blue-600 hover:text-blue-800 text-sm font-medium">Edit</button>
                    <button onClick={() => setDeleteTarget({ id: p.id, name: p.title })} className="text-red-600 hover:text-red-800 text-sm font-medium">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmDialog
        isOpen={deleteTarget !== null}
        title="Delete Promotion"
        message={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        onConfirm={() => deleteTarget && handleDelete(deleteTarget.id)}
        onCancel={() => setDeleteTarget(null)}
        isLoading={deleting}
      />
    </div>
  );
}