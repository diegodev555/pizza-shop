import { useState, useEffect } from 'react';
import { adminApi } from '../api/admin';
import { ConfirmDialog } from '../components/admin/ConfirmDialog';

export function AdminCategories() {
  const [categories, setCategories] = useState<{ id: number; name: string; slug: string; description: string | null; sortOrder: number; isActive: boolean }[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [sortOrder, setSortOrder] = useState(0);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{ id: number; name: string } | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function load() {
    try {
      const cats = await adminApi.getCategories();
      setCategories(cats);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => { load(); }, []);

  function reset() {
    setName(''); setSlug(''); setDescription(''); setSortOrder(0); setEditingId(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const data = { name, slug, description: description || null, sortOrder, isActive: true };
      if (editingId) {
        await adminApi.updateCategory(editingId, data);
        setMessage({ type: 'success', text: 'Category updated!' });
      } else {
        await adminApi.createCategory(data);
        setMessage({ type: 'success', text: 'Category created!' });
      }
      reset();
      load();
    } catch (err) {
      setMessage({ type: 'error', text: err instanceof Error ? err.message : 'Failed to save' });
    }
  }

  function handleEdit(cat: { id: number; name: string; slug: string; description: string | null; sortOrder: number }) {
    setName(cat.name); setSlug(cat.slug); setDescription(cat.description || ''); setSortOrder(cat.sortOrder); setEditingId(cat.id);
  }

  async function handleDelete(id: number) {
    setDeleting(true);
    try {
      await adminApi.deleteCategory(id);
      setMessage({ type: 'success', text: 'Category deleted!' });
      setDeleteTarget(null);
      load();
    } catch (err) {
      setMessage({ type: 'error', text: err instanceof Error ? err.message : 'Failed to delete' });
    } finally {
      setDeleting(false);
    }
  }

  if (loading) return <div className="p-6 flex justify-center"><div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Categories</h1>
      {message && (
        <div className={`mb-4 p-3 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message.text} <button onClick={() => setMessage(null)} className="float-right font-bold">&times;</button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 mb-6 flex flex-wrap gap-4 items-end">
        <div>
          <label className="block text-sm font-medium mb-1">Name *</label>
          <input value={name} onChange={e => setName(e.target.value)} required className="border rounded-lg px-3 py-2 w-48" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Slug *</label>
          <input value={slug} onChange={e => setSlug(e.target.value)} required className="border rounded-lg px-3 py-2 w-48" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <input value={description} onChange={e => setDescription(e.target.value)} className="border rounded-lg px-3 py-2 w-64" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Order</label>
          <input type="number" value={sortOrder} onChange={e => setSortOrder(Number(e.target.value))} className="border rounded-lg px-3 py-2 w-20" />
        </div>
        <button type="submit" className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700">{editingId ? 'Update' : 'Add'}</button>
        {editingId && <button type="button" onClick={reset} className="bg-gray-200 px-6 py-2 rounded-lg hover:bg-gray-300">Cancel</button>}
      </form>

      {categories.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <div className="text-6xl mb-4">📁</div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">No categories yet</h3>
          <p className="text-gray-500 mb-4">Create your first category to organize menu items.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Name</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Slug</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Description</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Order</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {categories.map(cat => (
                <tr key={cat.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium">{cat.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{cat.slug}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{cat.description || '-'}</td>
                  <td className="px-4 py-3 text-sm">{cat.sortOrder}</td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <button onClick={() => handleEdit(cat)} className="text-blue-600 hover:text-blue-800 text-sm font-medium">Edit</button>
                    <button onClick={() => setDeleteTarget({ id: cat.id, name: cat.name })} className="text-red-600 hover:text-red-800 text-sm font-medium">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmDialog
        isOpen={deleteTarget !== null}
        title="Delete Category"
        message={`Are you sure you want to delete "${deleteTarget?.name}"? Menu items assigned to this category must be reassigned first.`}
        confirmText="Delete"
        onConfirm={() => deleteTarget && handleDelete(deleteTarget.id)}
        onCancel={() => setDeleteTarget(null)}
        isLoading={deleting}
      />
    </div>
  );
}