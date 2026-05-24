import { useState, useEffect } from 'react';
import { adminApi } from '../api/admin';
import type { ApiShopInfo } from '../types';

interface OpeningHour {
  day: string;
  open: string;
  close: string;
}

interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

function parseJsonArray<T>(value: string): T[] {
  try { return JSON.parse(value) as T[]; } catch { return []; }
}

export function AdminShopInfo() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: '', tagline: '', phone: '', email: '',
    address: '', city: '', state: '', zipCode: '', country: '',
    mapUrl: '',
  });
  const [openingHours, setOpeningHours] = useState<OpeningHour[]>([
    { day: 'Monday', open: '09:00', close: '22:00' },
  ]);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const shop = await adminApi.getShopInfo();
        if (shop) {
          setForm({
            name: shop.name || '',
            tagline: shop.tagline || '',
            phone: shop.phone || '',
            email: shop.email || '',
            address: shop.address || '',
            city: shop.city || '',
            state: shop.state || '',
            zipCode: shop.zipCode || '',
            country: shop.country || '',
            mapUrl: shop.mapUrl || '',
          });
          setOpeningHours(parseJsonArray<OpeningHour>(shop.openingHours));
          setSocialLinks(parseJsonArray<SocialLink>(shop.socialLinks));
        }
      } catch (err) {
        console.error('Failed to load shop info', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await adminApi.updateShopInfo({
        ...form,
        tagline: form.tagline || null,
        mapUrl: form.mapUrl || null,
        state: form.state || null,
        zipCode: form.zipCode || null,
        country: form.country || null,
        openingHours: openingHours as [{ day: string; open: string; close: string }],
        socialLinks: socialLinks as [{ platform: string; url: string; icon: string }],
      });
      setMessage({ type: 'success', text: 'Shop info updated!' });
    } catch (err) {
      setMessage({ type: 'error', text: err instanceof Error ? err.message : 'Failed to save' });
    } finally { setSaving(false); }
  }

  function addHour() {
    setOpeningHours([...openingHours, { day: '', open: '09:00', close: '22:00' }]);
  }

  function updateHour(index: number, field: keyof OpeningHour, value: string) {
    const hours = [...openingHours];
    hours[index] = { ...hours[index], [field]: value };
    setOpeningHours(hours);
  }

  function removeHour(index: number) {
    setOpeningHours(openingHours.filter((_, i) => i !== index));
  }

  function addSocialLink() {
    setSocialLinks([...socialLinks, { platform: '', url: '', icon: 'link' }]);
  }

  function updateSocialLink(index: number, field: keyof SocialLink, value: string) {
    const links = [...socialLinks];
    links[index] = { ...links[index], [field]: value };
    setSocialLinks(links);
  }

  function removeSocialLink(index: number) {
    setSocialLinks(socialLinks.filter((_, i) => i !== index));
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

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-bold mb-4">Basic Info</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Opening Hours</h2>
            <button type="button" onClick={addHour} className="text-sm bg-gray-100 px-3 py-1 rounded-lg hover:bg-gray-200">+ Add</button>
          </div>
          {openingHours.length === 0 && <p className="text-gray-500 text-sm">No hours set</p>}
          {openingHours.map((hour, i) => (
            <div key={i} className="flex items-center gap-2 mb-2">
              <input value={hour.day} onChange={e => updateHour(i, 'day', e.target.value)} placeholder="Day" className="border rounded-lg px-3 py-2 w-32" />
              <input value={hour.open} onChange={e => updateHour(i, 'open', e.target.value)} placeholder="Open" className="border rounded-lg px-3 py-2 w-24" />
              <span className="text-gray-500">-</span>
              <input value={hour.close} onChange={e => updateHour(i, 'close', e.target.value)} placeholder="Close" className="border rounded-lg px-3 py-2 w-24" />
              <button type="button" onClick={() => removeHour(i)} className="text-red-500 text-sm">Remove</button>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Social Links</h2>
            <button type="button" onClick={addSocialLink} className="text-sm bg-gray-100 px-3 py-1 rounded-lg hover:bg-gray-200">+ Add</button>
          </div>
          {socialLinks.length === 0 && <p className="text-gray-500 text-sm">No social links set</p>}
          {socialLinks.map((link, i) => (
            <div key={i} className="flex items-center gap-2 mb-2">
              <input value={link.platform} onChange={e => updateSocialLink(i, 'platform', e.target.value)} placeholder="Platform" className="border rounded-lg px-3 py-2 w-32" />
              <input value={link.url} onChange={e => updateSocialLink(i, 'url', e.target.value)} placeholder="URL" className="border rounded-lg px-3 py-2 flex-1" />
              <input value={link.icon} onChange={e => updateSocialLink(i, 'icon', e.target.value)} placeholder="Icon" className="border rounded-lg px-3 py-2 w-24" />
              <button type="button" onClick={() => removeSocialLink(i)} className="text-red-500 text-sm">Remove</button>
            </div>
          ))}
        </div>

        <div className="flex space-x-4">
          <button type="submit" disabled={saving} className="bg-red-600 text-white px-8 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50">
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}