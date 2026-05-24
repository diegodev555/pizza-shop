import { useState, useEffect } from 'react';
import { adminApi } from '../api/admin';
import { ConfirmDialog } from '../components/admin/ConfirmDialog';

interface MenuItemForm {
  name: string;
  slug: string;
  description: string;
  price: number;
  imageUrl: string;
  rating: number;
  tags: string;
  isFeatured: boolean;
  spiceLevel: string;
  isVeg: boolean;
  isVegan: boolean;
  isGlutenFree: boolean;
  isAvailable: boolean;
  categoryId: number;
  sortOrder: number;
}

const emptyForm: MenuItemForm = {
  name: '', slug: '', description: '', price: 0, imageUrl: '',
  rating: 0, tags: '', isFeatured: false, spiceLevel: '',
  isVeg: false, isVegan: false, isGlutenFree: false,
  isAvailable: true, categoryId: 0, sortOrder: 0,
};

export function AdminMenuItems() {
  const [items, setItems] = useState<unknown[]>([]);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<MenuItemForm>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{ id: number; name: string } | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [categoriesLoading, setCategoriesLoading] = useState(false);

  async function load() {
    try {
      setLoading(true);
      setCategoriesLoading(true);
      const [menuItems, cats] = await Promise.all([
        adminApi.getMenuItems(),
        adminApi.getCategories(),
      ]);
      setItems(menuItems as unknown[]);
      setCategories(cats);
      setCategoriesLoading(false);
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: err instanceof Error ? err.message : 'Failed to load data' });
    } finally {
      setLoading(false);
      setCategoriesLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.categoryId) {
      setMessage({ type: 'error', text: 'Please select a category' });
      return;
    }
    try {
      const data = {
        ...form,
        price: Number(form.price),
        rating: Number(form.rating),
        sortOrder: Number(form.sortOrder),
        categoryId: Number(form.categoryId),
        tags: form.tags ? form.tags.split(',').map(t => t.trim()) : [],
        imageUrl: form.imageUrl || null,
        spiceLevel: form.spiceLevel || null,
      };
      if (editingId) {
        await adminApi.updateMenuItem(editingId, data);
        setMessage({ type: 'success', text: 'Menu item updated!' });
      } else {
        await adminApi.createMenuItem(data);
        setMessage({ type: 'success', text: 'Menu item created!' });
      }
      resetForm();
      load();
    } catch (err) {
      setMessage({ type: 'error', text: err instanceof Error ? err.message : 'Failed to save' });
    }
  }

  function handleEdit(item: Record<string, unknown>) {
    setForm({
      name: item.name as string || '',
      slug: item.slug as string || '',
      description: item.description as string || '',
      price: Number(item.price) || 0,
      imageUrl: (item.imageUrl as string) || '',
      rating: Number(item.rating) || 0,
      tags: Array.isArray(item.tags) ? (item.tags as string[]).join(', ') : (item.tags as string) || '',
      isFeatured: Boolean(item.isFeatured),
      spiceLevel: (item.spiceLevel as string) || '',
      isVeg: Boolean(item.isVeg),
      isVegan: Boolean(item.isVegan),
      isGlutenFree: Boolean(item.isGlutenFree),
      isAvailable: item.isAvailable !== false,
      categoryId: Number(item.categoryId) || 0,
      sortOrder: Number(item.sortOrder) || 0,
    });
    setEditingId(item.id as number);
    setShowForm(true);
  }

  async function handleDelete(id: number) {
    setDeleting(true);
    try {
      await adminApi.deleteMenuItem(id);
      setMessage({ type: 'success', text: 'Menu item deleted!' });
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Menu Items</h1>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">Add New Item</button>
      </div>

      {message && (
        <div className={`mb-4 p-3 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message.text}
          <button onClick={() => setMessage(null)} className="float-right font-bold">&times;</button>
        </div>
      )}

      {showForm && (
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h2 className="text-lg font-bold mb-4">{editingId ? 'Edit Menu Item' : 'Add Menu Item'}</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name *</label>
              <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required className="w-full border rounded-lg px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Slug *</label>
              <input value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} required className="w-full border rounded-lg px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Price *</label>
              <input type="number" step="0.01" value={form.price} onChange={e => setForm({ ...form, price: Number(e.target.value) })} required className="w-full border rounded-lg px-3 py-2" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="w-full border rounded-lg px-3 py-2" rows={2} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Category *</label>
              {categoriesLoading ? (
                <div className="w-full border rounded-lg px-3 py-2 bg-gray-50 text-gray-400">Loading categories...</div>
              ) : categories.length === 0 ? (
                <div className="w-full border rounded-lg px-3 py-2 bg-yellow-50 text-yellow-700 text-sm">
                  No categories found. Create one first.
                </div>
              ) : (
                <select
                  value={form.categoryId}
                  onChange={e => setForm({ ...form, categoryId: Number(e.target.value) })}
                  required
                  className={`w-full border rounded-lg px-3 py-2 ${!form.categoryId ? 'text-gray-400' : ''}`}
                >
                  <option value={0} disabled>Select a category...</option>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              )}
              {!form.categoryId && showForm && (
                <p className="text-red-500 text-xs mt-1">Category is required</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Image URL</label>
              <input value={form.imageUrl} onChange={e => setForm({ ...form, imageUrl: e.target.value })} className="w-full border rounded-lg px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Tags (comma separated)</label>
              <input value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })} className="w-full border rounded-lg px-3 py-2" placeholder="bestseller, vegetarian" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Rating</label>
              <input type="number" step="0.1" min="0" max="5" value={form.rating} onChange={e => setForm({ ...form, rating: Number(e.target.value) })} className="w-full border rounded-lg px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Sort Order</label>
              <input type="number" value={form.sortOrder} onChange={e => setForm({ ...form, sortOrder: Number(e.target.value) })} className="w-full border rounded-lg px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Spice Level</label>
              <select value={form.spiceLevel} onChange={e => setForm({ ...form, spiceLevel: e.target.value })} className="w-full border rounded-lg px-3 py-2">
                <option value="">None</option>
                <option value="mild">Mild</option>
                <option value="medium">Medium</option>
                <option value="hot">Hot</option>
              </select>
            </div>
            <div className="flex items-center space-x-6">
              <label className="flex items-center space-x-2">
                <input type="checkbox" checked={form.isFeatured} onChange={e => setForm({ ...form, isFeatured: e.target.checked })} />
                <span className="text-sm">Featured</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" checked={form.isVeg} onChange={e => setForm({ ...form, isVeg: e.target.checked })} />
                <span className="text-sm">Vegetarian</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" checked={form.isVegan} onChange={e => setForm({ ...form, isVegan: e.target.checked })} />
                <span className="text-sm">Vegan</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" checked={form.isGlutenFree} onChange={e => setForm({ ...form, isGlutenFree: e.target.checked })} />
                <span className="text-sm">GF</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" checked={form.isAvailable} onChange={e => setForm({ ...form, isAvailable: e.target.checked })} />
                <span className="text-sm">Available</span>
              </label>
            </div>
            <div className="flex space-x-4">
              <button type="submit" className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700">{editingId ? 'Update' : 'Create'}</button>
              <button type="button" onClick={resetForm} className="bg-gray-200 px-6 py-2 rounded-lg hover:bg-gray-300">Cancel</button>
            </div>
          </form>
        </div>
      )}

      {items.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <div className="text-6xl mb-4">🍕</div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">No menu items yet</h3>
          <p className="text-gray-500 mb-4">Create your first menu item to get started.</p>
          <button onClick={() => { resetForm(); setShowForm(true); }} className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700">
            Add Menu Item
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Price</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Category</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Featured</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Available</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {items.map((item) => {
                  const i = item as Record<string, unknown>;
                  const categoryName = (i as { category?: { name: string } }).category?.name || '-';
                  return (
                    <tr key={i.id as number} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{i.name as string}</td>
                      <td className="px-4 py-3 text-sm">${Number(i.price).toFixed(2)}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{categoryName}</td>
                      <td className="px-4 py-3 text-sm">{i.isFeatured ? '✅' : '❌'}</td>
                      <td className="px-4 py-3 text-sm">{i.isAvailable !== false ? '✅' : '❌'}</td>
                      <td className="px-4 py-3 text-right space-x-2">
                        <button onClick={() => handleEdit(i)} className="text-blue-600 hover:text-blue-800 text-sm font-medium">Edit</button>
                        <button onClick={() => setDeleteTarget({ id: i.id as number, name: i.name as string })} className="text-red-600 hover:text-red-800 text-sm font-medium">Delete</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={deleteTarget !== null}
        title="Delete Menu Item"
        message={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        onConfirm={() => deleteTarget && handleDelete(deleteTarget.id)}
        onCancel={() => setDeleteTarget(null)}
        isLoading={deleting}
      />
    </div>
  );
}