import { useState, useEffect } from 'react';
import { adminApi } from '../api/admin';
import { fetchAboutContent } from '../api/shop';
import type { AboutContentData } from '../types';

export function AdminAboutContent() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<AboutContentData>({
    title: '', subtitle: '', storyText: '', missionText: '', valuesText: '', chefName: '', chefTitle: '', chefBio: '',
  });
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchAboutContent().then(setForm).catch(() => {}).finally(() => setLoading(false));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await adminApi.updateAboutContent(form);
      setMessage({ type: 'success', text: 'About content updated!' });
    } catch (err) {
      setMessage({ type: 'error', text: err instanceof Error ? err.message : 'Failed to save' });
    } finally { setSaving(false); }
  }

  if (loading) return <div className="p-6 flex justify-center"><div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">About Page Content</h1>
      {message && (
        <div className={`mb-4 p-3 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message.text} <button onClick={() => setMessage(null)} className="float-right font-bold">&times;</button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input value={form.title || ''} onChange={e => setForm({ ...form, title: e.target.value })} className="w-full border rounded-lg px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Subtitle</label>
          <input value={form.subtitle || ''} onChange={e => setForm({ ...form, subtitle: e.target.value })} className="w-full border rounded-lg px-3 py-2" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Story Text</label>
          <textarea value={form.storyText || ''} onChange={e => setForm({ ...form, storyText: e.target.value })} className="w-full border rounded-lg px-3 py-2" rows={4} />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Mission Text</label>
          <textarea value={form.missionText || ''} onChange={e => setForm({ ...form, missionText: e.target.value })} className="w-full border rounded-lg px-3 py-2" rows={3} />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Values Text</label>
          <textarea value={form.valuesText || ''} onChange={e => setForm({ ...form, valuesText: e.target.value })} className="w-full border rounded-lg px-3 py-2" rows={3} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Chef Name</label>
          <input value={form.chefName || ''} onChange={e => setForm({ ...form, chefName: e.target.value })} className="w-full border rounded-lg px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Chef Title</label>
          <input value={form.chefTitle || ''} onChange={e => setForm({ ...form, chefTitle: e.target.value })} className="w-full border rounded-lg px-3 py-2" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Chef Bio</label>
          <textarea value={form.chefBio || ''} onChange={e => setForm({ ...form, chefBio: e.target.value })} className="w-full border rounded-lg px-3 py-2" rows={2} />
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