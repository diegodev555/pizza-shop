import { useState, useEffect } from 'react';
import { adminApi } from '../api/admin';
import { fetchHomeContent } from '../api/shop';
import type { HomeContentData } from '../types';

export function AdminHomeContent() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<HomeContentData>({
    heroTitle: '', heroSubtitle: '', heroCtaPrimaryText: '', heroCtaPrimaryLink: '',
    heroCtaSecondaryText: '', heroCtaSecondaryLink: '', aboutHeadline: '', aboutText: '',
    whyChooseUsTitle: '', whyChooseUsText: '',
  });
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchHomeContent().then(setForm).catch(() => {}).finally(() => setLoading(false));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await adminApi.updateHomeContent(form);
      setMessage({ type: 'success', text: 'Home content updated!' });
    } catch (err) {
      setMessage({ type: 'error', text: err instanceof Error ? err.message : 'Failed to save' });
    } finally { setSaving(false); }
  }

  if (loading) return <div className="p-6 flex justify-center"><div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Home Page Content</h1>
      {message && (
        <div className={`mb-4 p-3 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message.text} <button onClick={() => setMessage(null)} className="float-right font-bold">&times;</button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Hero Title</label>
          <input value={form.heroTitle || ''} onChange={e => setForm({ ...form, heroTitle: e.target.value })} className="w-full border rounded-lg px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Hero Subtitle</label>
          <input value={form.heroSubtitle || ''} onChange={e => setForm({ ...form, heroSubtitle: e.target.value })} className="w-full border rounded-lg px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">CTA Primary Text</label>
          <input value={form.heroCtaPrimaryText || ''} onChange={e => setForm({ ...form, heroCtaPrimaryText: e.target.value })} className="w-full border rounded-lg px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">CTA Primary Link</label>
          <input value={form.heroCtaPrimaryLink || ''} onChange={e => setForm({ ...form, heroCtaPrimaryLink: e.target.value })} className="w-full border rounded-lg px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">CTA Secondary Text</label>
          <input value={form.heroCtaSecondaryText || ''} onChange={e => setForm({ ...form, heroCtaSecondaryText: e.target.value })} className="w-full border rounded-lg px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">CTA Secondary Link</label>
          <input value={form.heroCtaSecondaryLink || ''} onChange={e => setForm({ ...form, heroCtaSecondaryLink: e.target.value })} className="w-full border rounded-lg px-3 py-2" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">About Headline</label>
          <input value={form.aboutHeadline || ''} onChange={e => setForm({ ...form, aboutHeadline: e.target.value })} className="w-full border rounded-lg px-3 py-2" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">About Text</label>
          <textarea value={form.aboutText || ''} onChange={e => setForm({ ...form, aboutText: e.target.value })} className="w-full border rounded-lg px-3 py-2" rows={3} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Why Choose Us Title</label>
          <input value={form.whyChooseUsTitle || ''} onChange={e => setForm({ ...form, whyChooseUsTitle: e.target.value })} className="w-full border rounded-lg px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Why Choose Us Text</label>
          <textarea value={form.whyChooseUsText || ''} onChange={e => setForm({ ...form, whyChooseUsText: e.target.value })} className="w-full border rounded-lg px-3 py-2" rows={2} />
        </div>
        <div className="md:col-span-2">
          <button type="submit" disabled={saving} className="bg-red-600 text-white px-8 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50">
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}