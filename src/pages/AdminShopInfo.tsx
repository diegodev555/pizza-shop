import { useState, useEffect } from 'react';
import { adminApi } from '../api/admin';
import { fetchShopInfo } from '../api/shop';
import type { ShopInfo } from '../types';

export function AdminShopInfo() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: '', phone: '', email: '', address: '', city: '', state: '', zipCode: '', country: '',
    tagline: '', mapUrl: '',
  });
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchShopInfo().then(shop => {
      setForm({
        name: shop.name, phone: shop.phone, email: shop.email,
        address: shop.address.street, city: shop.address.city,
        state: shop.address.state, zipCode: shop.address.zipCode,
        country: shop.address.country, tagline: '', mapUrl: '',
      });
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await adminApi.updateShopInfo(form);
      setMessage({ type: 'success', text: 'Shop info updated!' });
    } catch (err) {
      setMessage({ type: 'error', text: err instanceof Error ? err.message : 'Failed to save' });
    } finally { setSaving(false); }
  }

  if (loading) return <div className="p-6 flex justify-center"><div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Shop Information</h1>
      {message && (
        <div className={`mb-4 p-3 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message.text} <button onClick={() => setMessage(null)} className="float-right font-bold">&times;</button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name *</label>
          <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required className="w-full border rounded-lg px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tagline</label>
          <input value={form.tagline} onChange={e => setForm({ ...form, tagline: e.target.value })} className="w-full border rounded-lg px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Phone *</label>
          <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} required className="w-full border rounded-lg px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email *</label>
          <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required className="w-full border rounded-lg px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Address *</label>
          <input value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} required className="w-full border rounded-lg px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">City *</label>
          <input value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} required className="w-full border rounded-lg px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">State</label>
          <input value={form.state} onChange={e => setForm({ ...form, state: e.target.value })} className="w-full border rounded-lg px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Zip Code</label>
          <input value={form.zipCode} onChange={e => setForm({ ...form, zipCode: e.target.value })} className="w-full border rounded-lg px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Country</label>
          <input value={form.country} onChange={e => setForm({ ...form, country: e.target.value })} className="w-full border rounded-lg px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Map URL</label>
          <input value={form.mapUrl} onChange={e => setForm({ ...form, mapUrl: e.target.value })} className="w-full border rounded-lg px-3 py-2" />
        </div>
        <div className="md:col-span-3">
          <button type="submit" disabled={saving} className="bg-red-600 text-white px-8 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50">
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}