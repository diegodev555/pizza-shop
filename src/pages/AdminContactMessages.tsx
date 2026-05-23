import { useState, useEffect } from 'react';
import { adminApi } from '../api/admin';

export function AdminContactMessages() {
  const [messages, setMessages] = useState<{ id: number; name: string; email: string; phone: string | null; subject: string | null; message: string; status: string; createdAt: string }[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    try { setMessages(await adminApi.getContactMessages() as typeof messages); } catch (err) { console.error(err); } finally { setLoading(false); }
  }
  useEffect(() => { load(); }, []);

  async function handleStatus(id: number, status: string) {
    try {
      await adminApi.updateContactMessage(id, { status });
      load();
    } catch (err) {
      console.error(err);
    }
  }

  if (loading) return <div className="p-6 flex justify-center"><div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Contact Messages</h1>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Date</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Name</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Email</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Subject</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {messages.map(m => (
                <tr key={m.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-600">{new Date(m.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-sm font-medium">{m.name}</td>
                  <td className="px-4 py-3 text-sm">{m.email}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{m.subject || '-'}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      m.status === 'unread' ? 'bg-yellow-100 text-yellow-800' :
                      m.status === 'read' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>{m.status}</span>
                  </td>
                  <td className="px-4 py-3 text-right space-x-2">
                    {m.status === 'unread' && (
                      <button onClick={() => handleStatus(m.id, 'read')} className="text-green-600 hover:text-green-800 text-sm font-medium">Mark Read</button>
                    )}
                    {m.status !== 'archived' && (
                      <button onClick={() => handleStatus(m.id, 'archived')} className="text-gray-600 hover:text-gray-800 text-sm font-medium">Archive</button>
                    )}
                  </td>
                </tr>
              ))}
              {messages.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-gray-500">No messages yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {messages.filter(m => m.status !== 'archived').map(m => (
        <div key={m.id} className="bg-white rounded-xl shadow-md p-6 mt-4">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="font-bold text-gray-900">{m.name}</p>
              <p className="text-sm text-gray-600">{m.email}{m.phone ? ` | ${m.phone}` : ''}</p>
              {m.subject && <p className="text-sm font-medium text-gray-700 mt-1">Subject: {m.subject}</p>}
            </div>
            <p className="text-xs text-gray-500">{new Date(m.createdAt).toLocaleString()}</p>
          </div>
          <p className="text-gray-700 whitespace-pre-wrap">{m.message}</p>
        </div>
      ))}
    </div>
  );
}